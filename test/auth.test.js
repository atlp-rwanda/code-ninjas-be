import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

const { it, describe } = mocha;

const credentials = { email: 'john.doe@andela.com', password: 'Password@2022' };

chai.expect();
chai.use(chaiHttp);

describe('Testing authentication routes', () => {
  it('should login a user.', async () => {
    const { email, password } = credentials;
    const res = await chai
      .request(app)
      .post('/api/v2/auth/login')
      .send({ email, password });
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'User login successful :)');
  });
});
