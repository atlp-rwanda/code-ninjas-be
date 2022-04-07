import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { before, describe, it } from 'mocha';
import app from '../src/app';
import models from '../src/database/models';
import UserService from '../src/services/user.service';
import { generateToken } from '../src/helpers/token';
import {
  invalidPasswordUser,
  invalidUsernameUser,
  invalidEmailUser,
  invalidFirstNameUser,
  invalidLastNameUser,
  dbInitUser,
  dummyEmailUser,
  realUser,
  realUserWithId,
  modelData,
} from './mocks/index';

chai.should();

chai.use(chaiHttp);

describe('POST REGISTER', () => {
  describe('POST /api/auth/register', () => {
    before(async () => {
      await UserService.createUser(dbInitUser);
    });

    it('Vaidate the Check Email Service', async () => {
      expect(UserService.checkUser(dbInitUser.email)).to.be.a('promise');
    });

    it('Validate Token Service', async () => {
      // create and Assign a token
      const params = {
        user: {
          id: realUserWithId.userId,
          username: realUserWithId.userName,
          email: realUserWithId.email,
        },
      };

      const secret = process.env.TOKEN_SECRET;

      const duration = process.env.TOKEN_EXPIRE;

      expect(generateToken(params, secret, duration)).to.be.a('string');
    });

    it('Validate Create User Service', async () => {
      expect(UserService.createUser(modelData)).to.be.a('promise');
    });

    it('It Give an error on Validation of Password', async () => {
      const res = await chai
        .request(app)
        .post('/api/auth/register')
        .send(invalidPasswordUser);

      expect(res).to.have.status(422);
      expect(res.body).to.be.a('object');
      expect(res.body)
        .to.have.property('error')
        .eql(
          'password must contain at least a number, a special character, an upper-case letter and longer than 8 characters'
        );
    });

    it('It Give an error on Validation of UserName', async () => {
      const res = await chai
        .request(app)
        .post('/api/auth/register')
        .send(invalidUsernameUser);

      expect(res).to.have.status(422);
      expect(res.body).to.be.a('object');
      expect(res.body)
        .to.have.property('error')
        .eql('userName length must be at least 4 characters long');
    });

    it('It Give an error on Validation of Email', async () => {
      const res = await chai
        .request(app)
        .post('/api/auth/register')
        .send(invalidEmailUser);

      expect(res).to.have.status(422);
      expect(res.body).to.be.a('object');
      expect(res.body)
        .to.have.property('error')
        .eql(`email must be a valid email`);
    });

    it('It Give an error on Validation of FirstName', async () => {
      const res = await chai
        .request(app)
        .post('/api/auth/register')
        .send(invalidFirstNameUser);

      expect(res).to.have.status(422);
      expect(res.body).to.be.a('object');
      expect(res.body)
        .to.have.property('error')
        .eql('firstName length must be at least 3 characters long');
    });

    it('It Give an error on Validation of LastName', async () => {
      const res = await chai
        .request(app)
        .post('/api/auth/register')
        .send(invalidLastNameUser);

      expect(res).to.have.status(422);
      expect(res.body).to.be.a('object');
      expect(res.body)
        .to.have.property('error')
        .eql('lastName length must be at least 3 characters long');
    });

    it('It Should Register a User Successfully', async () => {
      const res = await chai
        .request(app)
        .post('/api/auth/register')
        .send(realUser);
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body)
        .to.have.property('message')
        .eql('User created successfully');
    });

    it('It Should Give an Error when user exists', async () => {
      const res = await chai
        .request(app)
        .post('/api/auth/register')
        .send(dbInitUser);

      expect(res).to.have.status(409);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('error').eql('email already exists');
    });
    after(async () => {
      await models.User.destroy({ where: {} });
    });
  });
});
