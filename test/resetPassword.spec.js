import { assert } from '@sinonjs/referee';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import Protection from '../src/helpers/encryption';
import UserService from '../src/services/user.service';
import {
  setupDatabase,
  clearDatabase,
  userOne,
  userOnePassword,
} from './fixtures/db';

chai.use(chaiHttp);

describe('Reset Password', () => {
  before(setupDatabase);

  after(clearDatabase);

  it('Should send a reset password email', async () => {
    const res = await chai
      .request(app)
      .post(`/api/users/send/forgot-password`)
      .send({ email: userOne.email });
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'Reset password email');
    expect(res.body).to.have.property('token');
  });

  it('Should not send a reset password for an invalid email', async () => {
    const invalidEmail = 'invalid@email';
    const res = await chai
      .request(app)
      .post(`/api/users/send/forgot-password`)
      .send({ email: invalidEmail });
    expect(res.status).to.be.equal(422);
    expect(res.body).to.have.property('error', 'value must be a valid email');
  });

  it('Should not send a reset password email to a non-existent user', async () => {
    const res = await chai
      .request(app)
      .post(`/api/users/send/forgot-password`)
      .send({ email: process.env.TEST_REAL_EMAIL });
    expect(res.status).to.be.equal(404);
    expect(res.body).to.have.property('error', 'User not found');
  });

  it('Should validate the reset password link', async () => {
    const user = await UserService.findUser({ email: userOne.email });
    const { body } = await chai
      .request(app)
      .post(`/api/users/send/forgot-password`)
      .send({ email: userOne.email });
    const res = await chai
      .request(app)
      .get(`/api/users/reset-password/${body.token}`)
      .send();
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property(
      'message',
      'Ready for new password input'
    );
  });

  it('Should reset password', async () => {
    const user = await UserService.findUser({ email: userOne.email });
    const newPassword = '82@Z_GHhxQEm6iA';
    const { body } = await chai
      .request(app)
      .post(`/api/users/send/forgot-password`)
      .send({ email: userOne.email });
    const res = await chai
      .request(app)
      .post(`/api/users/reset-password/${body.token}`)
      .send({
        password: newPassword,
        confirmPassword: newPassword,
      });
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property(
      'message',
      'Password modified successfully!'
    );
    const { password } = await UserService.findUser({ email: userOne.email });
    assert(Protection.checkPassword(newPassword, password));
  });

  it('Should not use the same link to reset password more than once', async () => {
    const { body } = await chai
      .request(app)
      .post(`/api/users/send/forgot-password`)
      .send({ email: userOne.email });
    const newPassword = 'P@ssw0rd_';
    const firstResetResponse = await chai
      .request(app)
      .post(`/api/users/reset-password/${body.token}`)
      .send({
        password: newPassword,
        confirmPassword: newPassword,
      });
    expect(firstResetResponse.status).to.be.equal(200);

    const getResetSecondResponse = await chai
      .request(app)
      .get(`/api/users/reset-password/${body.token}`)
      .send();
    expect(getResetSecondResponse.status).to.be.equal(401);
    expect(getResetSecondResponse.body).to.have.property(
      'error',
      'Unauthorized'
    );

    const anotherPassword = 'NewPassword@2022';
    const postResetSecondResponse = await chai
      .request(app)
      .post(`/api/users/reset-password/${body.token}`)
      .send({ password: anotherPassword, confirmPassword: anotherPassword });
    expect(postResetSecondResponse.status).to.be.equal(401);
    expect(postResetSecondResponse.body).to.have.property(
      'error',
      'Unauthorized'
    );
  });

  it('Should not reset the password with an invalid password', async () => {
    const newPassword = 'invalidPassword';
    const { body } = await chai
      .request(app)
      .post(`/api/users/send/forgot-password`)
      .send({ email: userOne.email });
    const res = await chai
      .request(app)
      .post(`/api/users/reset-password/${body.token}`)
      .send({
        password: newPassword,
        confirmPassword: newPassword,
      });
    expect(res.status).to.be.equal(422);
    expect(res.body).to.have.property(
      'error',
      'password must contain at least a number, a special character, an upper-case letter and longer than 8 characters'
    );
  });

  it('Should not reset the password if the password was not repeated', async () => {
    const { body } = await chai
      .request(app)
      .post(`/api/users/send/forgot-password`)
      .send({ email: userOne.email });
    const res = await chai
      .request(app)
      .post(`/api/users/reset-password/${body.token}`)
      .send({
        password: 'NewP@ssw0rd',
        confirmPassword: 'NewP@ssw0rd__',
      });
    expect(res.status).to.be.equal(422);
    expect(res.body).to.have.property('error', 'Enter the same password');
  });

  it('Should not accept current password', async () => {
    const { body } = await chai
      .request(app)
      .post(`/api/users/send/forgot-password`)
      .send({ email: userOne.email });
    const res = await chai
      .request(app)
      .post(`/api/users/reset-password/${body.token}`)
      .send({
        password: 'P@ssw0rd_',
        confirmPassword: 'P@ssw0rd_',
      });
    expect(res.status).to.be.equal(422);
    expect(res.body).to.have.property(
      'error',
      'New password can not be the same as current password'
    );
  });
});
