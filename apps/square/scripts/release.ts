import {releaseNpmPackage} from '@mstuercke/node-utils/npmPackage'
import packageJson from '../package.json' with {type: 'json'}

await releaseNpmPackage({
  packageJson,
  npmAuthToken: process.env.NPM_TOKEN as string,
})
