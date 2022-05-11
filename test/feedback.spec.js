import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { before, describe, it } from 'mocha';
import { TripRequest } from '../src/database/models';
import getDate from '../src/utils/date';
import app from '../src/app';
import {
  userOne,
  tripOne,
  setupDatabase,
  clearDatabase,
  accommodationOne,
} from './fixtures/db';

chai.should();
chai.use(chaiHttp);

const Feedback = {
  feedback: 'I love this hotel',
};

describe('Testing feedback routes', () => {
  before(setupDatabase);

  after(clearDatabase);

  it('It should create a feedback ', async () => {
    await TripRequest.update(
      { departureDate: getDate(Date.now() - 60 * 60 * 24 * 1000) },
      { where: { id: tripOne.id } }
    );
    const res = await chai
      .request(app)
      .post(`/api/accommodations/${accommodationOne.id}/createFeedback`)
      .set('Authorization', `Bearer ${userOne.token}`)
      .send(Feedback);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message', 'Feedback added successfully');
  });

  it('It Should get all feedbacks of an accommodation', async () => {
    const res = await chai
      .request(app)
      .get(`/api/accommodations/${accommodationOne.id}/GetAllFeedbacks`)
      .set('Authorization', `Bearer ${userOne.token}`)
      .send();
    expect(res).to.have.status(200);
    expect(res.body).to.have.property(
      'message',
      'These are all feedbacks of this accommodation'
    );
  });

  it('It should update a feedback ', async () => {
    const res = await chai
      .request(app)
      .patch(`/api/accommodations/${accommodationOne.id}/UpdateFeedback`)
      .set('Authorization', `Bearer ${userOne.token}`)
      .send(Feedback);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property(
      'message',
      'Feedback updated successfully'
    );
  });

  it('It should delete feedbacks of an accommodation', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/accommodations/${accommodationOne.id}/DeleteFeedback`)
      .set('Authorization', `Bearer ${userOne.token}`)
      .send();
    expect(res).to.have.status(200);
    expect(res.body).to.have.property(
      'message',
      'Feedback deleted successfully'
    );
  });
});
