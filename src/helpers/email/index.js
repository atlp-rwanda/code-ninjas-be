import nodemailer from 'nodemailer';
import { setAuthCredentials, mailOptions, getTemplate } from './config';

class EmailHelper {
  static sendEmail = async (authClient, receiver, template) => {
    const {
      clientId,
      clientSecret,
      redirectUri,
      refreshToken,
      email: sender,
    } = authClient;

    const oAuth2Client = setAuthCredentials(
      clientId,
      clientSecret,
      redirectUri,
      refreshToken
    );

    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: sender,
        clientId,
        clientSecret,
        refreshToken,
        accessToken,
      },
    });

    const { subject, html } = getTemplate(template);

    const options = mailOptions(sender, receiver, subject, html);

    const result = await transport.sendMail(options);
    if (!result.envelope) {
      throw new Error('Unable to send email');
    }
    return result;
  };
}

export default EmailHelper;
