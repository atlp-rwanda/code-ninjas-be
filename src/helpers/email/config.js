import { google } from 'googleapis';

const setAuthCredentials = (
  clientId,
  clientSecret,
  redirectUri,
  refresh_token
) => {
  const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );
  oAuth2Client.setCredentials({ refresh_token });
  return oAuth2Client;
};

const mailOptions = (from, to, subject, html) => {
  return {
    from,
    to,
    subject,
    html,
  };
};

const getTemplate = (typeOfTemplate) => {
  return typeOfTemplate;
};

export { setAuthCredentials, mailOptions, getTemplate };
