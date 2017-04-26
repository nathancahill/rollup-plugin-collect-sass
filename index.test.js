
import fs from 'fs'
import { rollup } from 'rollup'

import collectSass from './index.js'

const unJS = str => str
    .trim()
    .replace(/\\n/g, '')
    .replace(/\n/g, '')
    .replace(/\\"/g, '"')

test('simple', done => {
    return rollup({
        entry: 'fixtures/simple.js',
        plugins: [
            collectSass(),
        ]
    }).then(bundle => {
        const output = unJS(bundle.generate({ format: 'es' }).code)
        const expected = `"${unJS(fs.readFileSync('fixtures/simple-output.css').toString())}"`

        expect(output).toEqual(expect.stringContaining(expected))
        done()
    })
})

test('imports', done => {
    return rollup({
        entry: 'fixtures/imports.js',
        plugins: [
            collectSass(),
        ]
    }).then(bundle => {
        const output = unJS(bundle.generate({ format: 'es' }).code)
        const expected = `"${unJS(fs.readFileSync('fixtures/imports-output.css').toString())}"`

        expect(output).toEqual(expect.stringContaining(expected))
        done()
    })
})

test('multiple imports', done => {
    return rollup({
        entry: 'fixtures/multiple.js',
        plugins: [
            collectSass(),
        ]
    }).then(bundle => {
        const output = unJS(bundle.generate({ format: 'es' }).code)
        const expected = `"${unJS(fs.readFileSync('fixtures/multiple-output.css').toString())}"`

        expect(output).toEqual(expect.stringContaining(expected))
        done()
    })
})

test('without importOnce', done => {
    return rollup({
        entry: 'fixtures/dedupe.js',
        plugins: [
            collectSass(),
        ]
    }).then(bundle => {
        const output = unJS(bundle.generate({ format: 'es' }).code)
        const expected = `"${unJS(fs.readFileSync('fixtures/dedupe-output.css').toString())}"`

        expect(output).toEqual(expect.stringContaining(expected))
        done()
    })
})

test('with importOnce', done => {
    return rollup({
        entry: 'fixtures/dedupe.js',
        plugins: [
            collectSass({
                importOnce: true,
            }),
        ]
    }).then(bundle => {
        const output = unJS(bundle.generate({ format: 'es' }).code)
        const expected = `"${unJS(fs.readFileSync('fixtures/dedupe-output-importOnce.css').toString())}"`

        expect(output).toEqual(expect.stringContaining(expected))
        done()
    })
})

test('import node_modules', done => {
    return rollup({
        entry: 'fixtures/node-modules.js',
        plugins: [
            collectSass(),
        ]
    }).then(bundle => {
        const output = unJS(bundle.generate({ format: 'es' }).code)
        const expected = `"${unJS(fs.readFileSync('fixtures/node-modules-output.css').toString())}"`

        expect(output).toEqual(expect.stringContaining(expected))
        done()
    })
})
