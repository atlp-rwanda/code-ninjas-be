import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import {
  userOne,
  setupDatabase,
  clearDatabase,
  accommodationOne,
} from './fixtures/db';

chai.use(chaiHttp);

describe('Liking an accommodation routes', () => {
  before(setupDatabase);

  after(clearDatabase);

  it('Should add a like to an accommodation', async () => {
    const res = await chai
      .request(app)
      .get(`/api/accommodations/${accommodationOne.id}/react`)
      .set('Authorization', `Bearer ${userOne.token}`)
      .send();

    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'Like added');
  });

  it('Should remove a like to an accommodation', async () => {
    const res = await chai
      .request(app)
      .get(`/api/accommodations/${accommodationOne.id}/react`)
      .set('Authorization', `Bearer ${userOne.token}`)
      .send();

    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'Like removed');
  });

  it('Should get all likes of an accommodation', async () => {
    await chai
      .request(app)
      .get(`/api/accommodations/${accommodationOne.id}/react`)
      .set('Authorization', `Bearer ${userOne.token}`)
      .send();

    const res = await chai
      .request(app)
      .get(`/api/accommodations/${accommodationOne.id}/likes`)
      .send();

    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('likes', '1');
  });

  it('Should not react to a non-available accommodation', async () => {
    const res = await chai
      .request(app)
      .get(`/api/accommodations/0/react`)
      .set('Authorization', `Bearer ${userOne.token}`)
      .send();

    expect(res.status).to.be.equal(404);
    expect(res.body).to.have.property('error', 'Accommodation not found');
  });
});
