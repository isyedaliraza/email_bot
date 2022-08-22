// Importing required modules
const dotenv = require('dotenv')
const fs = require('fs')
const cron = require('node-cron')
const nodemailer = require('nodemailer')

// Configure environment variables
dotenv.config()

// Create email transporter
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD,
	},
})

// Reading the body of the email from body.html file
const body = fs.readFileSync('body.html')

// Schedule a cron that will run every Monday to Friday from 9 AM to 6 PM
cron.schedule('0 9-18 * * 1-5', (_) => {
	transporter.sendMail(
		{
			from: process.env.EMAIL,
			to: 'recipient@example.com',
			subject: 'Subject goes here',
			html: body.toString(),
		},
		(err, info) => {
			if (err) {
				console.log(err.message)
				console.log(err.stack)
			} else {
				console.log(info.response)
			}
		}
	)
}, {
	timezone: 'Asia/Karachi'
})
