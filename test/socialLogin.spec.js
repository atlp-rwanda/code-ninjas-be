import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

chai.should();

chai.use(chaiHttp);

describe('it should hit social aouth end points', () => {
  it('it should hit google end point', async () => {
    const res = await chai.request(app).get('/api/auth/google').send();
    expect(res).to.have.status(200);
  });
  it('it should hit facebook end point', async () => {
    const res = await chai.request(app).get('/api/auth/facebook').send();
    expect(res).to.have.status(200);
  });
  it('it should hit facebook callback route', async () => {
    const res = await chai
      .request(app)
      .get('/api/auth/auth/facebook/barefoot')
      .send();
    expect(res).to.have.status(200);
  });
  it('it should hit google callback route', async () => {
    const res = await chai
      .request(app)
      .get('/api/auth/auth/google/callback')
      .send();
    expect(res).to.have.status(200);
  });
});
