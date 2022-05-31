import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import {
  userOne,
  userOnePassword as password,
  setupDatabase,
  clearDatabase,
} from './fixtures/db';

const { it, describe } = mocha;

chai.expect();
chai.use(chaiHttp);

describe('Testing authentication routes', () => {
  before(setupDatabase);

  after(clearDatabase);

  it('should not validate login with empty email', async () => {
    const res = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ password });
    expect(res.status).to.be.equal(422);
    expect(res.body).to.have.property('error', 'Please fill all fields');
  });

  it('should not validate login with empty password', async () => {
    const { email } = userOne;
    const res = await chai.request(app).post('/api/auth/login').send({ email });
    expect(res.status).to.be.equal(422);
    expect(res.body).to.have.property('error', 'Please fill all fields');
  });

  it('should not validate login with invalid email', async () => {
    const res = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'test@gmail.com', password: 'unkown' });
    expect(res.status).to.be.equal(404);
    expect(res.body).to.have.property('error', 'Invalid credentials');
  });

  it('should not validate login with invalid password', async () => {
    const { email } = userOne;
    const res = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email, password: 'unkown' });
    expect(res.status).to.be.equal(404);
    expect(res.body).to.have.property('error', 'Invalid credentials');
  });

  it('Should not login a user with an unverified email', async () => {
    const { email } = userOne;
    const res = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email, password });
    expect(res.status).to.be.equal(403);
    expect(res.body).to.have.property('error', 'Unverified account');
  });

  it('should login a user.', async () => {
    const { email } = userOne;

    // verify account before login
    const { body } = await chai
      .request(app)
      .get(`/api/users/send/confirm/${email}`)
      .send();
    await chai.request(app).get(`/api/users/verify/${body.token}`).send();

    // login
    const res = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email, password });
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'User login successful :)');
  });
  it('should check if a user is signed in.', async () => {
    const res = await chai
      .request(app)
      .get('/api/auth/logout')
      .set('Authorization', ' ');
    expect(res.status).to.be.equal(401);
    expect(res.body).to.have.property('error', 'Access denied');
  });
  it('should logout a user.', async () => {
    const { email } = userOne;
    const user = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email, password });
    const { accessToken } = user.body.body;
    const res = await chai
      .request(app)
      .get('/api/auth/logout')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'User logout successful');
  });
});
