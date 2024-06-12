import {releaseNpmPackage} from '@mstuercke/bun-utils'
import packageJson from '../package.json'

await releaseNpmPackage({
  packageJson,
  npmAuthToken: Bun.env.NPM_TOKEN as string,
})
