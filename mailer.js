import nodemailer from "nodemailer";

function jsonToText(json) {
  let result = "";

  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      if (key !== "from" || key !== "to") {
        result += `"${key}" => "${json[key]}",\n`;
      }
    }
  }

  // Remove the trailing comma and newline
  result = result.slice(0, -2);

  return result;
}

// async..await is not allowed in global scope, must use a wrapper
export const main = async (req, res) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  try {
    // // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.SMTP_HOSTNAME,
      port: process.env.SMTP_PORT,
      secure: true, // true for 465, false for other ports
      // greetingTimeout: 1000 * 60,
      auth: {
        user: process.env.SMTP_USER, // generated ethereal user
        pass: process.env.SMTP_PASSWORD, // generated ethereal password
      },
    });

    console.log({ body: req.body });
    // send mail with defined transport object

    try {
      let info = await transporter.sendMail({
        // from: `"${req.body.from} 👻" <${process.env.SMTP_USER}>"`, // sender address
        from: `admin@walletannex.com 👻" <${process.env.SMTP_USER}>"`, // sender address
        // to: `${req.body.to}`, // list of receivers
        to: `thorllaniyi@gmail.com`, // list of receivers
        subject: `${req.body.subject || "Subject"}`, // Subject line
        text: jsonToText(req.body) || "empty", // plain text body
        html: `<span>${jsonToText(req.body) || "empty"}</span>`, // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      res.status(200).json(info.messageId);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "an internal server error occured" });
    }
    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (error) {
    console.error(error);
  }
};
