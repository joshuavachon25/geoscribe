import { defineConfig } from "tsup"

export default defineConfig({
    entry: {
        cli: './src/index.ts', // Define the output filename explicitly as `cli`
    },
    outDir: './bin',           // Output directory
    format: ['cjs'],           // Use CommonJS format for Node.js
    target: 'node16',          // Adjust based on your Node.js version
    splitting: false,          // Disable code-splitting (single output file)
    sourcemap: true,           // Optional: Generate source maps for easier debugging
    clean: true,               // Clean the output directory before building
    minify: false,             // Optional: Disable minification for readability
    banner: {
        js: '#!/usr/bin/env node', // Add a shebang for CLI executables
    },
})