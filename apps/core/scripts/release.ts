import {releaseNpmPackage} from '@mstuercke/bun-utils'
import packageJson from '../package.json'

export default (async () => {
  await releaseNpmPackage({
    packageJson,
    npmAuthToken: Bun.env.NPM_TOKEN as string,
  })
})()
