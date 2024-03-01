exports.sendError = (res, error, statusCode = 401) => {
    res.status(statusCode).json({ error });
  };

exports.generateOTP = (otp_length = 6) => {
    let OTP = ''
    for (let i = 1; i <= otp_length; i++) {
      const randomVal = Math.round(Math.random() * 9)
      OTP += randomVal
    }
  
    return OTP
  }
  