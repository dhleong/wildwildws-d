#!/usr/bin/env node

const meow = require('meow');
const { Daemon } = require('./src/wildwildws');

const cli = meow(`
    Usage
      $ wildwildws-d <url> <options>
 
    Options
      --header, -h  Specify a header in NAME:VALUE format
 
    Examples
      $ wildwildws-d wss://foo.com -h Authorization:token
`, {
    flags: {
        header: {
            type: 'string',
            alias: 'h'
        }
    }
});

const url = cli.input[0];
if (!url) cli.showHelp();

const daemon = new Daemon(cli.input[0], {
    headers: (cli.flags.header || []).map(raw => {
        const parts = raw.split(':');
        const name = parts.shift();
        const val = parts.join(":");
        return [name, val];
    }).reduce((m, [k, v]) => {
        m[k] = v;
        return m;
    }, {}),
});
daemon.open();

daemon.process(process.stdin, process.stdout);
