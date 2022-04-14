import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { User } from '../src/database/models';
import app from '../src/app';
import encryption from '../src/helpers/encryption';
import { credentials } from './mocks/index';

const { verifyToken } = encryption;
const { it, describe, after } = mocha;

chai.expect();
chai.use(chaiHttp);

describe('Testing user profile routes', () => {
  before(async () => {
    await chai.request(app).post('/api/auth/register').send(credentials);
  });

  it('should retrieve user profile', async () => {
    const { email, password } = credentials;

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
      .get(`/api/users/profile`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('success', true);
  });

  it('should complete user profile', async () => {
    const { email, password } = credentials;

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
      .post(`/api/users/profile`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        age: 21,
        gender: 'male',
        dob: '2012-04-23T18:25:43.511Z',
        nationality: 'rwandan',
        department: 'Engineering',
        preferredLanguage: 'English',
        preferredCurrency: 'USD',
        address: 'Kigali - Rwanda',
        lineManager: 'None',
        phoneNumber: '+250788888888',
        maritalStatus: 'Single',
      });
    console.log(res.error.message);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property('success', true);
  });

  it('should update user profile', async () => {
    const { email, password } = credentials;

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
      .patch(`/api/users/profile`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        age: 22,
      });
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('success', true);
  });

  after(async () => {
    await User.destroy({ where: {}, truncate: true });
  });
});
