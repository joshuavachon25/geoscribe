import { defineConfig } from "tsup"

export default defineConfig({
    entry: ["src/main.ts", "src/cli.ts"], // Multiple entry points
    format: ["cjs", "esm"], // Output formats
    splitting: false, // Disable code-splitting (useful for libraries)
    sourcemap: true, // Generate source maps
    clean: true, // Clean the output directory before building
    dts: true, // Generate TypeScript declaration files
    minify: false, // Disable minification for easier debugging
    target: "es2020", // Specify the JavaScript version
    shims: false, // Disable Node.js shims
    outDir: "dist", // Output directory
})