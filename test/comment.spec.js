import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { before, describe, it } from 'mocha';
import app from '../src/app';
import { userOne, tripOne, setupDatabase, clearDatabase } from './fixtures/db';

chai.should();
chai.use(chaiHttp);

const Comment = {
  comment: 'I hated the weather',
};

describe('Testing comment routes', () => {
  before(setupDatabase);

  after(clearDatabase);

  it('It should create a comment ', async () => {
    const res = await chai
      .request(app)
      .post(`/api/trip/${tripOne.id}/Comment`)
      .set('Authorization', `Bearer ${userOne.token}`)
      .send(Comment);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message', 'Comment added successfully');
  });

  it('It Should get all comments of a trip request', async () => {
    const res = await chai
      .request(app)
      .get(`/api/trip/${tripOne.id}/GetAllComments`)
      .set('Authorization', `Bearer ${userOne.token}`)
      .send();
    expect(res).to.have.status(200);
    expect(res.body).to.have.property(
      'message',
      'These are all comments of this trip request'
    );
  });

  it('It should update a comment ', async () => {
    const res = await chai
      .request(app)
      .patch(`/api/trip/${tripOne.id}/UpdateComment`)
      .set('Authorization', `Bearer ${userOne.token}`)
      .send(Comment);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property(
      'message',
      'Comment updated successfully'
    );
  });

  it('It should delete comments of a trip request', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/trip/${tripOne.id}/DeleteComment`)
      .set('Authorization', `Bearer ${userOne.token}`)
      .send();
    expect(res).to.have.status(200);
    expect(res.body).to.have.property(
      'message',
      'Comment deleted successfully'
    );
  });
});
