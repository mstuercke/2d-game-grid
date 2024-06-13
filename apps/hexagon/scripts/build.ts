import * as path from 'path'
import {buildNpmPackage, type TsConfigFilename} from '@mstuercke/bun-utils'

await buildNpmPackage({
  tsconfigFileName: path.resolve(__dirname, '../tsconfig.build.cjs.json') as TsConfigFilename,
  outDir: 'dist/cjs',
})

await buildNpmPackage({
  tsconfigFileName: path.resolve(__dirname, '../tsconfig.build.esm.json') as TsConfigFilename,
  outDir: 'dist/esm',
})
