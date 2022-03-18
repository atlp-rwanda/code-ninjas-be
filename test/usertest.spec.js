import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

chai.should();

chai.use(chaiHttp);

describe('GET test', () => {
    describe('GET /api/v2/users', () => {
        it('It Should reach to this route', (done) => {
            chai
                .request(app)
                .get('/api/v2/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
                .timeout(100000);
        });
    });
});
