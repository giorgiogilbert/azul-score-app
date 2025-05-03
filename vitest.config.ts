import { defineConfig } from 'vitest/config'
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "./"),
        },
    },
    test: {
        coverage: {
            reporter: ['text', 'html'], // other options: 'lcov', 'json', etc.
            include: ['helper/**'],
            reportsDirectory: './coverage',
            thresholds: {
                statements: 80,
                branches: 80,
                functions: 80,
                lines: 80,
            },
        },
    },
})
