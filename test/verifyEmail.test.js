import chai, { expect } from 'chai';
import sinon from 'sinon';
import { assert } from '@sinonjs/referee';
import EmailController from '../src/controllers/email';
import app from '../src/app';
import UserService from '../src/services/user.service';
import { generateToken } from '../src/helpers/token';
import { realUser } from './mocks/index';
import { userOne, setupDatabase, clearDatabase } from './fixtures/db';

describe('Verify email', () => {
  const sandbox = sinon.createSandbox();

  beforeEach(async () => {
    await setupDatabase();
    sandbox.spy(EmailController, 'sendConfirmationEmail');
  });

  afterEach(async () => {
    await clearDatabase();
    sandbox.restore();
  });

  it('Should send a verification email to a user', async () => {
    const res = await chai
      .request(app)
      .get(`/api/users/send/confirm/${userOne.email}`)
      .send();
    expect(res).to.have.status(200);
    assert(EmailController.sendConfirmationEmail.calledOnce);
    assert.equals(userOne.email, res.body.envelope.to[0]);
  });

  it('Should not send a verification email to a non-existent user', async () => {
    const res = await chai
      .request(app)
      .get(`/api/users/send/confirm/${realUser.email}`)
      .send();

    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error').equal('User not found');
  });

  it('Should update the user as verified', async () => {
    const { body } = await chai
      .request(app)
      .get(`/api/users/send/confirm/${userOne.email}`)
      .send();

    const res = await chai
      .request(app)
      .get(`/api/users/verify/${body.token}`)
      .send();

    expect(res).to.have.status(200);

    const user = await UserService.findUser({ email: userOne.email });
    expect(user).to.have.property('isVerified', true);
  });

  it('Should reject a verification request if token already used', async () => {
    // sending email to user and creating token
    const { body } = await chai
      .request(app)
      .get(`/api/users/send/confirm/${userOne.email}`)
      .send();

    // first use of verification request
    const firstRes = await chai
      .request(app)
      .get(`/api/users/verify/${body.token}`)
      .send();

    expect(firstRes).to.have.status(200);
    expect(firstRes.body).to.have.property('message', 'Email verified!');

    // second use of verification request
    const secondRes = await chai
      .request(app)
      .get(`/api/users/verify/${body.token}`)
      .send();

    expect(secondRes).to.have.status(401);
    expect(secondRes.body).to.have.property('error', 'Unauthorized');

    const user = await UserService.findUser({ email: userOne.email });
    expect(user).to.have.property('isVerified', true);
  });

  it('Should not verify for an invalid token', async () => {
    const params = {
      user: {
        id: realUser.userId,
      },
    };

    const secret = process.env.TOKEN_SECRET;

    const duration = process.env.TOKEN_EXPIRE;
    const token = generateToken(params, secret, duration);
    const res = await chai
      .request(app)
      .get(`/api/users/verify/${token}`)
      .send();
    expect(res).to.have.status(401);
  });
});
