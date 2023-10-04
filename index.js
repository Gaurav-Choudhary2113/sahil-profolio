const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const app = express();

// Serve static files from the "public" directory
app.use(express.static("public"));

// Set up routes
app.get("/", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("public/about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  res.sendFile("public/contact.html", { root: __dirname });
});

app.get("/resume", (req, res) => {
  res.sendFile("public/resume.html", { root: __dirname });
});

app.get("/service", (req, res) => {
  res.sendFile("public/service.html", { root: __dirname });
});

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,

    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    tls: {
      rejectUnauthorized: false,
    },
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Email form submission Template

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/send-email", (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: "youremail@gmail.com", // replace with your email
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
