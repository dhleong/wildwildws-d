
const WebSocket = require('ws');

class Daemon {
    constructor(uri, opts) {
        this.uri = uri;
        this.opts = opts;
    }

    open() {
        this.ws = new WebSocket(this.uri, this.opts);
    }

    process(input, output) {
        this.ws.on('message', data => {
            output.write(data + '\n');
        });

        this.ws.on('open', () => {
            input.resume();
            input.on('data', chunk => {
                if (chunk instanceof Buffer) {
                    chunk = chunk.toString();
                }
                this.ws.send(chunk);
            });
        });

        this.ws.on('close', () => {
            // stop accepting input (this will allow the cli to quit)
            input.pause();
        });
    }
}

module.exports = {
    Daemon,
};
