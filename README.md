wildwildws-d
============

*CLI daemon for vim-wildwildws*

## What?

wildwildws-d is a CLI program for interacting with websockets using
standard IO streams. It is intended to be embedded in other
programs—specifically, the [vim-wildwildws][1] plugin.

Data from `stdin` is sent to the socket, and messages from the socket
are written to `stdout`, separated by a newline character. Headers can
be provided as arguments.

## How?

Install via npm:

    npm i -g wildwildws-d

Then just pass the url and, optionally, headers:

    wildwildws-d wss://my.app/ws --header Authorization:'Bearer 12345'

[1]: https://github.com/dhleong/vim-wildwildws
