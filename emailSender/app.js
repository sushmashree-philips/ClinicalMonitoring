const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

var app = express(); 
app.use(cors({ origin: "*" }));
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3200, () => {
  console.log("The server started on port 3200 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Welcome to a sample app to send email <br><br>trigger /sendmail endpoint to send email</h1>"
  );
});

var patientDetails = "test"

app.post("/sendmail", (req,res) => {
  console.log(req.body);
  this.patientDetails = req.body; 
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
    Text : "kjsdfsjbds",
    html: `<h3 style="color: green;">We are with you, please access below url to get instant update about the procedure</h1><br>
    <h3>http://localhost:4200/procedure-progress</h3>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

// main().catch(console.error);
