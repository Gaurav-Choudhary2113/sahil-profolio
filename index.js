const express = require("express");
const bodyParser = require("body-parser");
const postmark = require("postmark");

const serverToken = "a9039ae9-bf9f-4d89-9126-79523b5af809"; // Replace with your actual Postmark server token
const client = new postmark.ServerClient(serverToken);

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

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

app.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  const emailBody = {
    From: "gaurav.choudhary2022@vitstudent.ac.in", // Replace with your email address
    To: "gaurav.choudhary2022@vitstudent.ac.in", // Replace with the recipient's email address
    Subject: subject,
    TextBody: `From: ${name} (${email})\n\n${message}`,
  };

  client
    .sendEmail(emailBody)
    .then((response) => {
      console.log("Email sent:", response);
      res.send("Email sent successfully!");
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
