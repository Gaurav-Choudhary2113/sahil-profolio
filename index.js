const express = require("express");
const bodyParser = require("body-parser");

const nodemailer = require("nodemailer");
require("dotenv").config();

// const postmark = require("postmark");
// const serverToken = "a9039ae9-bf9f-4d89-9126-79523b5af809";
// const client = new postmark.ServerClient(serverToken);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
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

app.use(express.urlencoded({ extended: true }));

app.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "a123rora111@gmail.com",
      pass: "ftie tffu bmwl dekd",
    },
  });

  const mailOptions = {
    from: "a123rora111@gmail.com",
    to: "a123rora111@gmail.com",
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent: " + info.response);
    res.sendFile("public/contact.html", { root: __dirname });
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
