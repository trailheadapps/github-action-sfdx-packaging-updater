const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.node,
                ...globals.jest
            }
        }
    }
];
