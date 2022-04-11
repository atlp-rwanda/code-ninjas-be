import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { User } from '../src/database/models';
import app from '../src/app';
import { credentials } from './mocks/index';

const { it, describe, after } = mocha;

chai.expect();
chai.use(chaiHttp);

describe('Testing authentication routes', () => {
  before(async () => {
    const Dummy = await chai
      .request(app)
      .post('/api/auth/register')
      .send(credentials);
  });
  it('should validate login with empty email', async () => {
    const { Password: password } = credentials;
    const res = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ password });
    expect(res.status).to.be.equal(400);
    expect(res.body).to.have.property(
      'message',
      'ValidationError: "email" is required'
    );
  });
  it('should validate login with empty password', async () => {
    const { Email: email } = credentials;
    const res = await chai.request(app).post('/api/auth/login').send({ email });
    expect(res.status).to.be.equal(400);
    expect(res.body).to.have.property(
      'message',
      'Error: Please fill all fields'
    );
  });
  it('should validate login with invalid email', async () => {
    const res = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'test@gmail.com', password: 'unkown' });
    expect(res.status).to.be.equal(404);
    expect(res.body).to.have.property('message', 'Invalid credentials');
  });
  it('should validate login with invalid password', async () => {
    const Dummy = await chai
      .request(app)
      .post('/api/auth/register')
      .send(credentials);
    const { Email: email } = credentials;
    const res = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email, password: 'unkown' });
    expect(res.status).to.be.equal(401);
    expect(res.body).to.have.property('message', 'Invalid credentials');
  });
  it('should login a user.', async () => {
    const Dummy = await chai
      .request(app)
      .post('/api/auth/register')
      .send(credentials);
    const { Email: email, Password: password } = credentials;
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
    expect(res.body).to.have.property('message', 'Please login first!');
  });
  it('should logout a user.', async () => {
    const Dummy = await chai
      .request(app)
      .post('/api/auth/register')
      .send(credentials);
    const { Email: email, Password: password } = credentials;
    const user = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email, password });
    const { accessToken } = user.body.data;
    const res = await chai
      .request(app)
      .get('/api/auth/logout')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'User logout successfully');
  });
  after(async () => {
    await User.destroy({ where: {}, truncate: true });
  });
});
