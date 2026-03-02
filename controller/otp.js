const Otp = require("../models/otp");
const transporter = require("../controller/email");
const jwt = require("jsonwebtoken");

module.exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(Math.random() * 1000000) + 1;

  try {
    const info = await transporter.sendMail({
      from: "niteshjangir426@gmail.com",
      to: email,
      subject: "Your OTP Code",
      html: `<h3>Your OTP is: <b>${otp}</b></h3>`
    });
    await Otp.findOneAndUpdate({ email }, { otp, expiresAt: new Date(Date.now() + 5 * 60 * 1000) }, { upsert: true });

    res.json({ message: "OTP send successfully", success: true })
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.log(error);
    res.json({ message: error, success: false })
  }

}


module.exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {

    const newOtp = await Otp.findOne({ email });
    if (!newOtp) {
      return res.status(400).json({ message: "OTP not found!" })
    }
    if (Date.now() > newOtp.expiresAt) {

      await Otp.deleteOne({ email })
      return res.status(400).json({ message: "OTP expired!" });
    }

    if (newOtp.otp !== otp) {
      return res.status(400).json({ message: "invalid OTP" });
    }

    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "10m" })
    await Otp.deleteOne({ email });

    res.json({ message: "OTP verified successfully!", success: true, resetToken });
  }
  catch (e) {
    res.status(500).json({ message: "Server error", success: false })
  }

}