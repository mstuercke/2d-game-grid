import * as path from 'path'
import {buildNpmPackage, type TsConfigFilename} from '@mstuercke/bun-utils'

export default (async () => {
  await buildNpmPackage({
    tsconfigFileName: path.resolve(__dirname, '../tsconfig.build.json') as TsConfigFilename,
  })
})()
