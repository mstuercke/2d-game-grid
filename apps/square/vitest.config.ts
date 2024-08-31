import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      all: true,
      skipFull: true,
      thresholds: {
        "**/**": {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
        },
      },
      provider: "istanbul",
      include: ["src/**/*.ts", "!**/*.{fixture,mock}.ts", "!**/index.ts"],
    },
    clearMocks: true,
    unstubGlobals: true,
  },
})
