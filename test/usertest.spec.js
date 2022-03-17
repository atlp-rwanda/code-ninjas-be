import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

chai.should();

chai.use(chaiHttp);

describe('prime test', () => {
  it('Should fetch data from the database', async () => {
    const res = await chai.request(app).get('/api/v2/test').send();
    expect(res).to.have.status(200);
  });
});
