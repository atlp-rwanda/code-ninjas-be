import path from 'path';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { userOne, admin, setupDatabase, clearDatabase } from './fixtures/db';
import { Location, Accommodation } from '../src/database/models';

chai.use(chaiHttp);

describe('Accommodations CRUD', () => {
  before(setupDatabase);

  after(clearDatabase);

  describe('Locations setup', () => {
    it('Should add a country', async () => {
      const res = await chai
        .request(app)
        .post('/api/countries')
        .set('Authorization', `Bearer ${admin.token}`)
        .send({ name: 'Kenya' });

      expect(res.status).to.be.equal(200);
      expect(res.body).to.have.property('message', 'Country added');
    });

    it('Should not add a country for a non-admin user', async () => {
      const res = await chai
        .request(app)
        .post('/api/countries')
        .set('Authorization', `Bearer ${userOne.token}`)
        .send({ name: 'Rwanda' });

      expect(res.status).to.be.equal(403);
      expect(res.body).to.have.property('error', 'Unauthorized access');
    });

    it('Should not add a country twice', async () => {
      const res = await chai
        .request(app)
        .post('/api/countries')
        .set('Authorization', `Bearer ${admin.token}`)
        .send({ name: 'Rwanda' });
      expect(res.status).to.be.equal(500);
      expect(res.body).to.have.property('error', 'Validation error');
    });

    it('Should add a location to a country', async () => {
      const res = await chai
        .request(app)
        .post('/api/locations')
        .set('Authorization', `Bearer ${admin.token}`)
        .send({ city: 'Nairobi', country: 'Kenya' });

      expect(res.status).to.be.equal(201);
      expect(res.body).to.have.property(
        'message',
        'Location added successfully'
      );
    });

    it('Should not add a location to a non-available country', async () => {
      const res = await chai
        .request(app)
        .post('/api/locations')
        .set('Authorization', `Bearer ${admin.token}`)
        .send({ city: 'Kampala', country: 'Uganda' });

      expect(res.status).to.be.equal(404);
      expect(res.body).to.have.property('error', 'Country not available');
    });
  });

  describe('Accommodations CRUD', () => {
    it('Should add an accommodation in a location', async () => {
      const location = await Location.findOne({ where: { city: 'Nairobi' } });
      const imagePath = path.resolve('./test/mocks/assets/marriott-hotel.jpg');
      const res = await chai
        .request(app)
        .post('/api/accommodations')
        .set({ Authorization: `Bearer ${admin.token}` })
        .field({
          name: 'Hilton Hotel',
          type: 'Hotel',
          description: 'Best 4 star experience',
          amenities: 'Lobby reception,Swimming pool,Restaurant',
          images: imagePath,
          address: 'Mama Ngina St',
          geoCoordinates: JSON.stringify({ longitude: 36.15, latitude: -1.54 }),
          locationId: location.id.toString(),
        });

      expect(res.status).to.be.equal(201);
      expect(res.body).to.have.property(
        'message',
        'Accommodation added successfully'
      );
    });

    it('Should add a room to an accommodation', async () => {
      const accommodation = await Accommodation.findOne({
        where: { name: 'Hilton Hotel' },
      });

      const res = await chai
        .request(app)
        .post('/api/rooms')
        .set({ Authorization: `Bearer ${admin.token}` })
        .send({
          type: 'Double',
          number: '404',
          price: 120,
          currency: 'USD',
          isAvailable: true,
          accommodationId: accommodation.id,
        });

      expect(res.status).to.be.equal(201);
      expect(res.body).to.have.property('message', 'Room added successfully');
    });

    it('Should not add a room number twice in the same accommodation', async () => {
      const accommodation = await Accommodation.findOne({
        where: { name: 'Hilton Hotel' },
      });

      const res = await chai
        .request(app)
        .post('/api/rooms')
        .set({ Authorization: `Bearer ${admin.token}` })
        .send({
          type: 'Double',
          number: '404',
          price: 120,
          currency: 'USD',
          isAvailable: true,
          accommodationId: accommodation.id,
        });

      expect(res.status).to.be.equal(409);
      expect(res.body).to.have.property(
        'error',
        'Room already in this accommodation'
      );
    });
  });
});
