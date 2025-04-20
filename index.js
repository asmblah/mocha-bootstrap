/*
 * Mocha harness - Standard test harness for using Mocha with Sinon and Chai
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/mocha-bootstrap/
 *
 * Released under the MIT license
 * https://github.com/asmblah/mocha-bootstrap/raw/master/MIT-LICENSE.txt
 */

'use strict';

/*global WeakMap */
const accelerateCreateStubInstance = require('./src/sinon/accelerateCreateStubInstance');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(chaiAsPromised);
chai.use(sinonChai);

accelerateCreateStubInstance(sinon);

// Install root hooks.
exports.mochaHooks = {
    afterEach: function () {
        // After every test, restore all stubbed methods.
        // Without this, memory will leak as Sinon keeps a reference to every stub
        // internally (see sinon/lib/sinon/sandbox.js).
        sinon.restore();
    },
};
