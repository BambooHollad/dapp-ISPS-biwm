import { join } from "path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssPluginPx2rem from "postcss-plugin-px2rem";
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue({
        reactivityTransform: true,
    }),],
    resolve: {
        alias: {
            '@': join(__dirname, "src")
        }
    },
    server: {
        host: true,
        open: true,
        port: 82,
        proxy: {
          '/api': {
            target: 'http://44.192.48.164', // 目标服务器地址
            changeOrigin: true, // 是否改变源地址
            rewrite: (path) => path.replace(/^\/api/, '')
          }
        }
    },
    build: {
        outDir: "dist",
        assetsDir: "static",
        assetsInlineLimit: 150000
    },
    css: {
        preprocessorOptions: {
            less: {
                charset: false,
                additionalData: '@import "./src/style/global.less";',
            }
        },
        postcss: {
            plugins: [
                postcssPluginPx2rem({
                    rootValue: 37.5,
                    exclude: /(node_module)/,
                    mediaQuery: false,
                }),
            ]
        },
    }
})
