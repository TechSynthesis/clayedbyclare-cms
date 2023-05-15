import checkDiskSpace from 'check-disk-space'
import express from 'express'
import nodemailer from 'nodemailer'
// import nodemailerSendgrid from 'nodemailer-sendgrid'
import path from 'path'
import payload from 'payload'

// eslint-disable-next-line
require('dotenv').config()

const app = express()

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

// Check Storage
app.get('/api/disk-space', async (req, res) => {
  try {
    const diskSpace = await checkDiskSpace('/')
    res.json(diskSpace)
    // eslint-disable-next-line @typescript-eslint/no-implicit-any-catch
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// const sendGridAPIKey = process.env.SENDGRID_API_KEY

// // const sendgridConfig = {
// //   transportOptions: nodemailerSendgrid({
// //     apiKey: sendGridAPIKey,
// //   }),
// // }

const transport = nodemailer.createTransport({
  host: process.env.PAYLOAD_NODEMAILER_HOST,
  port: parseInt(process.env.PAYLOAD_NODEMAILER_PORT),
  secure: true,
  auth: {
    user: process.env.PAYLOAD_NODEMAILER_USER,
    pass: process.env.PAYLOAD_NODEMAILER_PASSWORD,
  },
})

const start = async (): Promise<void> => {
  app.use('/assets', express.static(path.resolve(__dirname, '../assets')))
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    email: {
      fromName: process.env.PAYLOAD_WEBSITE_NAME || 'TechInverted CMS',
      fromAddress: process.env.PAYLOAD_NODEMAILER_USER || 'jason@techinverted.com',
      // ...sendgridConfig,
      transport,
    },
    onInit: () => {
      payload.logger.info(`Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Add your own express routes here

  app.listen(process.env.PORT, async () => {
    payload.logger.info(`Server listening on port ${process.env.PORT}`)
  })
}

start()
