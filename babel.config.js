module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./src'],
                    extensions: [
                        '.ts',
                        '.tsx',
                        '.jsx',
                        '.js',
                        '.json',
                    ],
                    alias: {
                      "@assets": "./assets",
                      "@common": "./src/common",
                      "@modules": "./src/modules",
                      "@components": "./src/components",
                      "@hooks": "./src/hooks",
                      "@interfaces": "./src/interfaces",
                      "@screens": "./src/screens"
                    },
                },
            ]
        ]
    };
};
