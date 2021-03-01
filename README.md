# Mocha test bootstrap

Sets up [Sinon][], [Chai as Promised][], [Sinon-Chai][] and [Chai as Promised][].

Also installs an accelerated implementation of Sinon's `.createStubInstance(...)` method for speed.

[Chai]: https://www.chaijs.com/
[Chai as Promised]: https://www.chaijs.com/plugins/chai-as-promised/
[Sinon]: https://github.com/sinonjs/sinon
[Sinon-Chai]: https://www.chaijs.com/plugins/sinon-chai/

## Usage

First install with NPM:
```shell
npm install --save-dev mocha-bootstrap
```

then require the bootstrap when running Mocha, for example:
```shell
mocha -r mocha-bootstrap --recursive test/unit/
```
