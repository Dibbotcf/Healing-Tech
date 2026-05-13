import { getPayload } from 'payload'
import config from './src/payload.config'
import dotenv from 'dotenv'

dotenv.config()

async function sync() {
  console.log('Starting DB sync...')
  try {
    const payload = await getPayload({ config })
    console.log('Payload initialized. Checking DB...')
    
    // In Payload 3, the adapter should handle this if push: true is set
    // We just need to trigger the initialization
    
    console.log('DB sync complete (or triggered).')
    process.exit(0)
  } catch (err) {
    console.error('Sync failed:', err)
    process.exit(1)
  }
}

sync()
