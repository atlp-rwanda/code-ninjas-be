import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { TripRequest } from '../src/database/models';
import getDate from '../src/utils/date';
import {
  userOne,
  setupDatabase,
  clearDatabase,
  accommodationOne,
  tripOne,
  admin,
} from './fixtures/db';

chai.use(chaiHttp);

describe('Rating an accommodation routes', () => {
  before(setupDatabase);

  after(clearDatabase);

  it('Should add a rate to an accommodation for a requester', async () => {
    await TripRequest.update(
      { departureDate: getDate(Date.now() - 60 * 60 * 24 * 1000) },
      { where: { id: tripOne.id } }
    );
    const res = await chai
      .request(app)
      .post(`/api/accommodations/${accommodationOne.id}/rates`)
      .set('Authorization', `Bearer ${userOne.token}`)
      .send({ rating: 4.5 });

    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'Rate added');
  });

  it('Should get the average rating of an accommodation', async () => {
    const res = await chai
      .request(app)
      .get(`/api/accommodations/${accommodationOne.id}/rates`)
      .send();

    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('rating', '4.5');
  });

  it('Should not rate an accommodation for a non-requester', async () => {
    const res = await chai
      .request(app)
      .post(`/api/accommodations/${accommodationOne.id}/rates`)
      .set('Authorization', `Bearer ${admin.token}`)
      .send({ rating: 4.5 });

    expect(res.status).to.be.equal(403);
    expect(res.body).to.have.property('error', 'Unauthorized access');
  });

  it('Should validate the rate to be a number in the 0-5 range', async () => {
    const res = await chai
      .request(app)
      .post(`/api/accommodations/${accommodationOne.id}/rates`)
      .set('Authorization', `Bearer ${userOne.token}`)
      .send({ rating: 10 });

    expect(res.status).to.be.equal(422);
    expect(res.body).to.have.property(
      'error',
      'value must be less than or equal to 5'
    );
  });

  it('Should validate the rate to either be an integer or a half rate', async () => {
    const res = await chai
      .request(app)
      .post(`/api/accommodations/${accommodationOne.id}/rates`)
      .set('Authorization', `Bearer ${userOne.token}`)
      .send({ rating: 4.8 });

    expect(res.status).to.be.equal(422);
    expect(res.body).to.have.property(
      'error',
      'Enter either a full rate or half a rate'
    );
  });

  it('Should validate that the requester has stayed at least one day', async () => {
    await TripRequest.update(
      { departureDate: getDate(Date.now()) },
      { where: { id: tripOne.id } }
    );
    const res = await chai
      .request(app)
      .post(`/api/accommodations/${accommodationOne.id}/rates`)
      .set('Authorization', `Bearer ${userOne.token}`)
      .send({ rating: 4 });

    expect(res.status).to.be.equal(422);
    expect(res.body).to.have.property(
      'error',
      'You need to have stayed at least one day in an accommodation to rate it'
    );
  });
});
