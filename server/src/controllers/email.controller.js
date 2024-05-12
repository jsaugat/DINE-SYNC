import nodemailer from "nodemailer";

export const sendEmail = (req, res, next) => {
  const { email } = req.body;
  console.log(email);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "joshsaugat58@gmail.com",
        pass: "44X69$Gv",
      },
    });

    const mailOptions = {
      from: "joshsaugat58@gmail.com",
      to: email,
      subject: "Sending Email using Node.js",
      text: "That was easy!",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).send("Done");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Internal Server Error");
  }
};
