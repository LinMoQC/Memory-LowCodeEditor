import path from 'path'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'

export default {
    input: 'src/lowcodeEditor/index.ts',
    output: [
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: true,
            exports: 'named'
        },
        {
            file: 'dist/index.cjs.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named'
        }
    ],
    plugins: [
        postcss({
            modules: true,
            extract: true,
            minimize: true,
            sourceMap: true
        }),
        resolve({
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        }),
        commonjs({
            include: /node_modules/
        }),
        typescript({
            tsconfig: "./tsconfig.build.json",
            useTsconfigDeclarationDir: true,
            clean: true,
            abortOnError: true
        }),
        babel({
            babelHelpers: 'bundled',
            extensions: ['.ts', '.tsx'],
            presets: [
                '@babel/preset-react',
                '@babel/preset-typescript'
            ],
            plugins: [
                '@babel/plugin-proposal-class-properties'
            ]
        }),
        terser({
            format: {
                comments: false
            }
        })
    ],
    external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'antd',
        'dayjs',
        'react-dnd',
        'react-dnd-html5-backend'
    ]
}