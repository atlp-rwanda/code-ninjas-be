// // import { stub, assert } from 'sinon';
// import chai, { request, expect } from 'chai';
// import chaiHttp from 'chai-http';
// import { config } from 'dotenv';
// import app from '../src/app';
// import { saveUser } from './mocks/index';
// import { findIdUser } from '../src/services/RolesServices';
// import adminScript from '../src/config/init';

// config();

// chai.use(chaiHttp);

// let superToken;

// let id;

// describe('ROLE END-POINT TEST', () => {
//   describe('ASSIGNROLE USER TEST', () => {
//     before(async () => {
//       await request(app).post('/api/auth/register').send(saveUser);

//       const User = await findIdUser(saveUser.email);
//       id = User.dataValues.id;

//       const res = await request(app).post('/api/auth/login').send({
//         email: saveUser.email,
//         password: saveUser.password,
//       });
//       superToken = res.body.accessToken;
//     });
//   });

//   it('should not assign a role a user if not SUPER_ADMIN', async () => {
//     await adminScript();
//     const res = await request(app)
//       .post(`/api/roles/assign/${id}`)
//       .set('Authorization', `Bearer ${superToken}`)
//       .send({
//         RoleId: '2',
//       });
//     expect(res.status).to.equal(401);
//   });

//   it('should Get All Users', async () => {
//     const response = await request(app).post('/api/auth/login').send({
//       email: process.env.ADMIN_ACCOUNT_EMAIL,
//       password: process.env.ADMIN_ACCOUNT_PASSWORD,
//     });

//     const Token = response.body.accessToken;
//     const res = await request(app)
//       .get(`/api/users`)
//       .set('Authorization', `Bearer ${Token}`);
//     expect(res.status).to.equal(200);
//   });

//   it('should assign a role a user', async () => {
//     const user = await request(app).post('/api/auth/register').send(saveUser);
//     const User = await findIdUser(saveUser.email);
//     const userId = User.id;

//     const response = await request(app).post('/api/auth/login').send({
//       email: process.env.ADMIN_ACCOUNT_EMAIL,
//       password: process.env.ADMIN_ACCOUNT_PASSWORD,
//     });

//     const Token = response.body.accessToken;

//     const res = await request(app)
//       .post(`/api/roles/assign/${userId}`)
//       .set('Authorization', `Bearer ${Token}`)
//       .send({
//         RoleId: '2',
//       });
//     expect(res.status).to.equal(200);
//   });
// });
