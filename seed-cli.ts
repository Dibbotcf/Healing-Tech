import { getPayload } from 'payload'
import configPromise from './src/payload.config'

async function run() {
  try {
    console.log('getting payload...')
    const payload = await getPayload({ config: configPromise })
    console.log('got payload!', payload.config.serverURL)
  } catch(e) {
    console.error('ERROR INITIALIZING PAYLOAD:', e)
  }
}
run()
