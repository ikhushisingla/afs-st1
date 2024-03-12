const mongoose = require("mongoose");
const mailSender = require("../utils/email");
const emailTemplate = require("../mail/emailVerificatioin");
const otpSchema = new mongoose.Schema({
	email:{
		type:String,
		required:true,
		unique:true,
	},
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

async function sendVerificationEmail(email, otp) {
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
		console.log("Email sent successfully: ", mailResponse);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

// Define a post-save hook to send email after the document has been saved
otpSchema.pre("save", async function (next) {
	console.log("New document saved to database");
	await sendVerificationEmail(this.email, this.token);
	next();
});

module.exports= mongoose.model("Otp", otpSchema);