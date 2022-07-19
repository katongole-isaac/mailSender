//This is for educational purpose.
// !!! Its not recommended to store secrets in the source code.
// !!! You should make use of environment variables.
// Read all your secrets from environment variables.

const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENTID =  "your_client_id";
const CLIENT_SECRET = "your_client_secret";
const REDIRECT_URL = "https://redirect_url";
const REFRESH_TOKEN =  "your_refresh_token";

//creating oAuth2client to be used on our behalf
const oauth2Client = new google.auth.OAuth2(CLIENTID, CLIENT_SECRET, REDIRECT_URL);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

//mail sender
async function sender() {
  const access_token = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "oauth2",
      user: "example@domain.org",
      clientId: CLIENTID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: access_token,
    },
  });

  let options = {
    from: "username <example@domain.org>",
    to: "receiver@domain.co",
    subject: "Nodemailer and Google OAuth2",
    text: "It finally works with Nodemailer and GoogleAPI",
    html: "<h1>Nodemailer and GoogleAPI OAuth2 </h1>",
  };
  try {
    const mail = await transporter.sendMail(options);
    return mail;
  } catch (err) {
    return err.message;
  }
}

sender()
.then(response => console.log('Email sent: ' + response))
.catch(ex => console.log(ex));

