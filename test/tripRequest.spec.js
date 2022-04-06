import path from 'path';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import {
    userOne,
    admin,
    manager,
    setupDatabase,
    clearDatabase,
} from './fixtures/db';
import { TripRequest, Location, Accommodation } from '../src/database/models';

chai.use(chaiHttp);

describe('Trip Request CRUD', () => {
    before(setupDatabase);

    after(clearDatabase);

    describe('Locations setup', () => {
        it('Should add a location to a country', async() => {
            const res = await chai
                .request(app)
                .post('/api/locations')
                .set('Authorization', `Bearer ${admin.token}`)
                .send({ city: 'Kigali', country: 'Rwanda' });

            expect(res.status).to.be.equal(201);
            expect(res.body).to.have.property(
                'message',
                'Location added successfully'
            );
        });

        it('Should add a location2 to a country', async() => {
            const res = await chai
                .request(app)
                .post('/api/locations')
                .set('Authorization', `Bearer ${admin.token}`)
                .send({ city: 'Butare', country: 'Rwanda' });
            expect(res.status).to.be.equal(201);
            expect(res.body).to.have.property(
                'message',
                'Location added successfully'
            );
        });
    });

    describe('add accomodation', () => {
        it('Should add an accommodation in a location', async() => {
            const location = await Location.findOne({ where: { city: 'Kigali' } });
            const imagePath = path.resolve('./test/mocks/assets/marriott-hotel.jpg');
            const res = await chai
                .request(app)
                .post('/api/accommodations')
                .set({
                    connection: 'keep-alive',
                    Authorization: `Bearer ${admin.token}`,
                })
                .field({
                    name: 'Marriott Hotel',
                    type: 'Hotel',
                    description: '5 star experience',
                    amenities: 'Lobby reception,Swimming pool,Restaurant',
                    images: imagePath,
                    address: 'KN 3 Av',
                    geoCoordinates: JSON.stringify({ longitude: 30.15, latitude: 1.54 }),
                    locationId: location.id.toString(),
                });
            expect(res.status).to.be.equal(201);
            expect(res.body).to.have.property(
                'message',
                'Accommodation added successfully'
            );
        });
        describe('Trip Request CRUD', () => {
            it('Should add a trip request', async() => {
                const accommodation = await Accommodation.findOne({
                    where: { name: 'Marriott Hotel' },
                });
                const location = await Location.findOne({ where: { city: 'Kigali' } });
                const location2 = await Location.findOne({ where: { city: 'Butare' } });
                const res = await chai
                    .request(app)
                    .post('/api/trip/request')
                    .set({
                        connection: 'keep-alive',
                        Authorization: `Bearer ${admin.token}`,
                    })
                    .send({
                        managerId: manager.id,
                        departure_place: location2.id,
                        destination: location.id,
                        departureDate: '2029-5-18',
                        returnDate: '2029-5-20',
                        travel_reason: 'visit mon',
                        accomodationId: accommodation.id,
                    });

                expect(res.status).to.be.equal(201);
                expect(res.body).to.have.property(
                    'response',
                    'trip request created successfully'
                );
            });

            it('Should get all trip requests', async() => {
                const res = await chai
                    .request(app)
                    .get('/api/trip/request/list')
                    .set({ Authorization: `Bearer ${admin.token}` });
                expect(res.status).to.be.equal(200);
            });

            it('Should get a trip request', async() => {
                const tripId = await TripRequest.findOne({
                    where: { travel_reason: 'visit mon' },
                });
                const res = await chai
                    .request(app)
                    .get(`/api/trip/request/${tripId.id}`)
                    .set({ Authorization: `Bearer ${admin.token}` });
                expect(res.status).to.be.equal(200);
            });

            it('Should delete a trip request', async() => {
                const tripId = await TripRequest.findOne({
                    where: { travel_reason: 'visit mon' },
                });
                const res = await chai
                    .request(app)
                    .delete(`/api/trip/request/${tripId.id}/delete`)
                    .set({ Authorization: `Bearer ${admin.token}` });
                expect(res.status).to.be.equal(200);
            });
        });
    });
});