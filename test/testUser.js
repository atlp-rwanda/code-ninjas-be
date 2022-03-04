import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/app.js";

//Assertion style
chai.should();

chai.use(chaiHttp);

describe("GET api/user", () => {
    //get all users
  
    describe("Get all users", () => {
      it("It Should get all users", async function() {
        chai
          .request(server)
          .get("/api/user")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            
          })
          .timeout(10000); 
      });
    });

});