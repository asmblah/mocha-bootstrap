/*
 * Mocha harness - Standard test harness for using Mocha with Sinon and Chai
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/mocha-bootstrap/
 *
 * Released under the MIT license
 * https://github.com/asmblah/mocha-bootstrap/raw/master/MIT-LICENSE.txt
 */

'use strict';

const accelerateCreateStubInstance = require('../../src/sinon/accelerateCreateStubInstance');
const expect = require('chai').expect;
const realSinon = require('sinon');

describe('accelerateCreateStubInstance()', function () {
    let fakeSinon, MyClass;

    beforeEach(function () {
        fakeSinon = { stub: realSinon.stub };
        MyClass = function () {};

        MyClass.prototype.myMethod = function () {
            return 'original result';
        };
    });

    it('should be able to create an instance of a class', function () {
        accelerateCreateStubInstance(fakeSinon);

        const myStub = fakeSinon.createStubInstance(MyClass);
        myStub.myMethod.returns(1234);

        expect(myStub).to.be.an.instanceOf(MyClass);
        expect(myStub.myMethod()).to.equal(1234);
    });

    it("should be able to restore a stubbed method's original implementation", function () {
        accelerateCreateStubInstance(fakeSinon);

        const myStub = fakeSinon.createStubInstance(MyClass);
        myStub.myMethod.restore();

        expect(myStub).to.be.an.instanceOf(MyClass);
        expect(myStub.myMethod()).to.equal('original result');
    });
});
