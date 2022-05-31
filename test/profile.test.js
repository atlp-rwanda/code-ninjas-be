import mocha from 'mocha';
import chai, { expect } from 'chai';
import Sinon from 'sinon';
import chaiHttp from 'chai-http';
import path from 'path';
import UserService from '../src/services/user.service';
import app from '../src/app';
import cloudinary from '../src/config/cloudinary.config';
import {
  userOne,
  userOnePassword as password,
  setupDatabase,
  clearDatabase,
} from './fixtures/db';

const { it, describe, after } = mocha;

const { email } = userOne;

chai.expect();
chai.use(chaiHttp);

describe('Testing user profile routes', () => {
  const sandbox = Sinon.createSandbox();
  before(async () => {
    sandbox.stub(cloudinary, 'upload').resolves({
      url: 'testtttt',
    });
  });
  before(setupDatabase);
  after(clearDatabase);

  // verify account before login
  it('should retrieve user profile', async () => {
    const { body } = await chai
      .request(app)
      .get(`/api/users/send/confirm/${email}`)
      .send();
    await chai.request(app).get(`/api/users/verify/${body.token}`).send();

    // login
    const dummy = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email, password });
    const { accessToken } = dummy.body.body;
    const res = await chai
      .request(app)
      .get(`/api/users/profile`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property(
      'message',
      'Successfully retrieved profile'
    );
  });

  it('should complete user profile', async () => {
    // verify account before login
    const { body } = await chai
      .request(app)
      .get(`/api/users/send/confirm/${email}`)
      .send();
    await chai.request(app).get(`/api/users/verify/${body.token}`).send();
    // login
    const dummy = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email, password });
    const { accessToken } = dummy.body.body;
    const res = await chai
      .request(app)
      .put(`/api/users/profile/complete`)
      .set('Authorization', `Bearer ${accessToken}`)
      .field('gender', 'male')
      .field('dob', '2010-04-23')
      .field('nationality', 'rwandan')
      .field('department', 'Engineering')
      .field('preferredLanguage', 'English')
      .field('preferredCurrency', 'USD')
      .field('address', 'Kigali - Rwanda')
      .field('lineManager', 'HR')
      .field('phoneNumber', '250788888888')
      .field('maritalStatus', 'Single')
      .attach('image', path.resolve(__dirname, './mocks/image/test.jpeg'));
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property(
      'message',
      'User profile completed successfully'
    );
  });

  it('should update user profile', async () => {
    // verify account before login
    const { body } = await chai
      .request(app)
      .get(`/api/users/send/confirm/${email}`)
      .send();
    await chai.request(app).get(`/api/users/verify/${body.token}`).send();

    // login
    const dummy = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email, password });
    const { accessToken } = dummy.body.body;
    const res = await chai
      .request(app)
      .patch(`/api/users/profile/update`)
      .set('Authorization', `Bearer ${accessToken}`)
      .field('dob', '2000-04-23');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property(
      'message',
      'User profile updated successfully'
    );
  });
});
