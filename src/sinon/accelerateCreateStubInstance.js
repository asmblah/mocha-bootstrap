/*
 * Mocha harness - Standard test harness for using Mocha with Sinon and Chai
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/mocha-bootstrap/
 *
 * Released under the MIT license
 * https://github.com/asmblah/mocha-bootstrap/raw/master/MIT-LICENSE.txt
 */

'use strict';

/**
 * Accelerates .createStubInstance(...) for the given Sinon instance.
 *
 * @param {Object} sinon
 */
module.exports = function (sinon) {
    const stubFactories = new WeakMap();

    /**
     * Install an optimized version of `sinon.createStubInstance(...)`
     *
     * @param {class} Class
     * @returns {*}
     */
    sinon.createStubInstance = function (Class) {
        if (typeof Class !== 'function') {
            throw new TypeError(
                'createStubInstance() :: The constructor should be a function.',
            );
        }

        if (!stubFactories.has(Class)) {
            const code = ['var methodStub, stub = Object.create(prototype);'];

            /*jshint forin:false */
            for (const propertyName in Class.prototype) {
                const propertyValue = Class.prototype[propertyName];

                if (typeof propertyValue !== 'function') {
                    continue;
                }

                code.push(
                    'methodStub = stub.' + propertyName + ' = sinon.stub();',
                    'methodStub.restore = function () { delete stub["' +
                        propertyName +
                        '"]; };',
                );
            }

            code.push('return stub;');

            const stubFactoryFactory = new Function(
                'sinon, prototype',
                'return function () {' + code.join('\n') + '};',
            );

            stubFactories.set(
                Class,
                stubFactoryFactory(sinon, Class.prototype),
            );
        }

        return stubFactories.get(Class)();
    };
};
