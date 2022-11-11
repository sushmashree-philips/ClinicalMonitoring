const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3200, () => {
  console.log("The server started on port 3200 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Welcome to a sample app to send email <br><br>trigger /sendmail endpoint to send email</h1>"
  );
});

app.post("/sendmail", (req,res) => {
  console.log("request came");
  let user = "prometheusalert01@gmail.com";
  let info = "testmsg";
  sendMail((info) => {
    console.log(`The mail has beed send :)`);
    res.send("success 200!! ok");
  });
});

async function sendMail(callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "prometheusalert01@gmail.com",
      pass: "bgfbxjxrnjgurqnm"
    }
  });

  let mailOptions = {
    from: 'prometheusalert01@gmail.com', // sender address
    to: "prometheusalert01@gmail.com", // list of receivers
    subject: "Welcome to a sample app to send email", // Subject line
    html: `<h1>Hi I am here</h1><br>
    <h4>Thanks for testing us</h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

// main().catch(console.error);
