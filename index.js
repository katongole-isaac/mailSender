//This is for educational purpose.
// !!! Its not recommended to store secrets in the source code.
// !!! You should make use of environment variables.

const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENTID =
  "164694962957-dhgarrgeedns0oai6bvfhlsbofuhr8iv.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04XpIfsnrvP_wCgYIARAAGAQSNwF-L9Ir-hWJVebxhdNp5HrUoppqYUGo_gXU109adNPeOF2L5x6JMlsimmgnxNhpTRCrH8ghH0I";

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
      user: "errortor40@gmail.com",
      clientId: CLIENTID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: access_token,
    },
  });

  let options = {
    from: "errortor <errortor40@gmail.com>",
    to: "katongolelsaac78@gmail.com",
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

