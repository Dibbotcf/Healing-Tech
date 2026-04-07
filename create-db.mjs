import pg from 'pg'
const { Client } = pg

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '123654',
  database: 'postgres',
})

try {
  await client.connect()
  console.log('Connected to PostgreSQL')
  
  const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = 'healing-technology'`)
  
  if (res.rowCount === 0) {
    await client.query(`CREATE DATABASE "healing-technology"`)
    console.log('Database "healing-technology" created successfully!')
  } else {
    console.log('Database "healing-technology" already exists.')
  }
} catch (err) {
  console.error('Error:', err.message)
  process.exit(1)
} finally {
  await client.end()
}
