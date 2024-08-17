import * as path from 'path'
import {buildNpmPackage} from '@mstuercke/bun-utils/npmPackage'
import type {TsConfigFilename} from '@mstuercke/bun-utils/types'

await buildNpmPackage({
  tsconfigFileName: path.resolve(__dirname, '../tsconfig.build.cjs.json') as TsConfigFilename,
  outDir: 'dist/cjs',
})

await buildNpmPackage({
  tsconfigFileName: path.resolve(__dirname, '../tsconfig.build.esm.json') as TsConfigFilename,
  outDir: 'dist/esm',
})
