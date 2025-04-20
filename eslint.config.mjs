/*
 * Mocha harness - Standard test harness for using Mocha with Sinon and Chai
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/mocha-bootstrap/
 *
 * Released under the MIT license
 * https://github.com/asmblah/mocha-bootstrap/raw/master/MIT-LICENSE.txt
 */

import buildbeltConfig from 'buildbelt/eslint.config.mjs';

export default buildbeltConfig.map((config) =>
    Object.assign(config, {
        files: [
            '{src,test}/**/*.{js,jsx,mjs,mts,ts,tsx}',
            '*.{js,jsx,mjs,mts,ts,tsx}',
        ],
        rules: Object.assign({}, config.rules, {
            '@typescript-eslint/no-require-imports': 'off',
        }),
    }),
);
