import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { before, describe, it } from 'mocha';
import app from '../src/app';
import models from '../src/database/models';
import checkUser from '../src/services/CheckUser';
import generateToken from '../src/services/TokenService';
import createUserService from '../src/services/UserServices';
import {
  user,
  user4,
  user5,
  user6,
  user7,
  user2,
  user3,
  realUser,
  realUser2,
  modelData,
} from './mocks/index';

chai.should();

chai.use(chaiHttp);

describe('POST REGISTER', () => {
  describe('POST /api/auth/register', () => {
    before((done) => {
      models.User.create({
        firstName: user2.FirstName,
        lastName: user2.LastName,
        email: user2.Email,
        userName: user2.UserName,
        password: user2.Password,
      }).then(() => {
        done();
      });
    });

    it('Vaidate the Check Email Service', (done) => {
      expect(checkUser(user2.Email)).to.be.a('promise');
      done();
    });

    it('Validate Token Service', (done) => {
      // create and Assign a token
      const params = {
        user: {
          id: realUser2.userId,
          username: realUser2.UserName,
          email: realUser2.Email,
        },
      };

      const secret = process.env.TOKEN_SECRET;

      const duration = {
        expiresIn: process.env.TOKEN_EXPIRE,
      };

      expect(generateToken(params, secret, duration)).to.be.a('string');
      done();
    });

    it('Validate Create User Service', (done) => {
      expect(createUserService(modelData)).to.be.a('promise');
      done();
    });

    it('It Give an error on Validation of Password', (done) => {
      chai
        .request(app)
        .post('/api/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql(
              'Password must contain atleast a number, a special character, an upper-case letter and longer than 8 characters'
            );
          done();
        })
        .timeout(100000);
    });

    it('It Give an error on Validation of UserName', (done) => {
      chai
        .request(app)
        .post('/api/auth/register')
        .send(user4)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('UserName length must be at least 4 characters long');
          done();
        })
        .timeout(100000);
    });

    it('It Give an error on Validation of Email', (done) => {
      chai
        .request(app)
        .post('/api/auth/register')
        .send(user5)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql(`${user.Email} is not a valid Email`);
          done();
        })
        .timeout(100000);
    });
    it('It Give an error on Validation of FirstName', (done) => {
      chai
        .request(app)
        .post('/api/auth/register')
        .send(user6)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('FirstName length must be at least 4 characters long');
          done();
        })
        .timeout(100000);
    });

    it('It Give an error on Validation of LastName', (done) => {
      chai
        .request(app)
        .post('/api/auth/register')
        .send(user7)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('LastName length must be at least 4 characters long');
          done();
        })
        .timeout(100000);
    });

    it('It Should Register a User Successfully', (done) => {
      chai
        .request(app)
        .post('/api/auth/register')
        .send(realUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('User created successfully');

          done();
        })
        .timeout(100000);
    });

    it('It Should Give an Error when user exists', (done) => {
      chai
        .request(app)
        .post('/api/auth/register')
        .send(user2)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Email already Exists');
          done();
        })
        .timeout(100000);
    });

    it('It Should Give an Error when an Email is Dummy', (done) => {
      chai
        .request(app)
        .post('/api/auth/register')
        .send(user3)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql(`${user3.Email} is not a valid Email`);
          done();
        })
        .timeout(100000);
    });
    after((done) => {
      models.User.destroy({ where: {}, truncate: true }).then(() => {
        done();
      });
    });
  });
});
