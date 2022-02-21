// Config Chai
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = require("chai").should();
const expect = chai.expect;
const {
    app,
    query
} = require("../serverl"); // import to server.js
const path = require("path");

chai.use(chaiHttp);

describe("CHAI // CONTROLLER // ARTICLE", () => {
    let article = {};
    beforeEach(async () => {
        let values = ["mon image", "BRUNO", "test bruno", "test bruno", "0"];
        let sql = `INSERT INTO articles (imgarticle,title,description,contenu,user_id) values("mon image","BRUNO","test bruno","test bruno",0);`;
        const Articles = await db.query(sql, [values]);

        const ArticlesID = await db.query(`SELECT * FROM articles where id = ${ Articles.insertId }`)
        article = ArticlesID[0]
        ArticlesID[0].imgarticle.should.be.a("string");
        ArticlesID[0].title.should.be.a("string");
        ArticlesID[0].description.should.be.a("string");
        ArticlesID[0].contenu.should.be.a("string");
        ArticlesID[0].user_id.should.be.a("Number");

    });
    // Test
    it("Exemple", (done) => {
        done();
    });

    // Test get /fev
    it(" ChaiRouter // Get Article", (done) => {
        // test route Get
        chai
            .request(app)
            .get("/back/v1/admin")
            .set("Accept", "application/json")
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.dbarticles.should.be.a("array");
                res.body.dbarticles[0].should.be.a("object");
                done();
            });
    });
});