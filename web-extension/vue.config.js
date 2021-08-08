module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/assets/variables.scss";`
            },
        },
    },
    devServer: {
        port: 8080,
        https: true
    },
    pages: {
        popup: {
            template: "public/popup.html",
            entry: "./src/popup/main.js",
            title: "Popup",
        },
        options: {
            template: "public/options.html",
            entry: "./src/options/main.js",
            title: "Options",
        },
        standalone: {
            template: "public/standalone.html",
            entry: "./src/standalone/main.js",
            title: "Standalone",
            filename: "index.html",
        },
    },
    pluginOptions: {
        browserExtension: {
            manifestTransformer: (manifest) => {
                if (process.env.NODE_ENV === 'development') {
                    manifest.content_security_policy = manifest.content_security_policy.replace('script-src', 'script-src http://localhost:8098');
                }
                return manifest;
            },
            componentOptions: {
                background: {
                    entry: "src/background.js",
                },
                contentScripts: {
                    entries: {
                        "content-script": ["src/content-scripts/content-script.js"],
                    },
                },
            },
        },
    },
};
