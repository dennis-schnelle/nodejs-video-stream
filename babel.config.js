module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3,
                loose: true,
                modules: false,
            },
        ],
        ['@babel/preset-react'],
        [
            '@babel/preset-typescript',
            {
                allExtensions: true,
                loose: true,
                isTSX: true,
            },
        ],
    ],
    plugins: [
        '@loadable/babel-plugin',
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        'module:fast-async',
        'babel-plugin-smart-webpack-import',
        [
            '@babel/plugin-transform-runtime',
            {
                helpers: true,
                regenerator: false,
            },
        ],
        'babel-plugin-macros',
    ].filter(Boolean),
    env: {
        test: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/typescript'],
            plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-transform-runtime',
                '@loadable/babel-plugin',
            ],
        },
    },
};
