// Config Chai
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = require("chai").should();
const {
    app,
    query
} = require("../serverl"); // import to server.js
const path = require("path");

chai.use(chaiHttp);

describe("CHAI // CONTROLLER // ARTICLE", () => {
    let customer = {};
    beforeEach(async() => {
        let values = ["mon image", "BRUNO", "test bruno", "test bruno", "0"];
        let sql = `INSERT INTO articles (imgarticle,title,description,contenu,user_id) values("mon image","BRUNO","test bruno","test bruno",0);`;
        const Articles = await db.query(sql, [values]);
        const ArticlesID = await db.query(`SELECT * FROM articles where id = ${ Articles.insertId }`);

        customer = ArticlesID[0];
        ArticlesID[0].imgarticle.should.be.a("string");
        ArticlesID[0].title.should.be.a("string");
        ArticlesID[0].description.should.be.a("string");
        ArticlesID[0].contenu.should.be.a("string");
        ArticlesID[0].user_id.should.be.a("number");

    });
    // Test
    it("Exemple", (done) => {
        done();
    });

    // Test get 
    it(" ChaiRouter // Get Article", (done) => {
        // test route Get
        chai
            .request(app)
            .get("/back/v1/admin/blog")
            .set("Accept", "application/json")
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.dbarticles.should.be.a("array");
                res.body.dbarticles[0].should.be.a("object");
                done();
            });
    });

    // Test get 
    it(" ChaiRouter // Get ID Article", (done) => {

        // test route Get
        chai
            .request(app)
            .get(`/back/v1/admin/blog/${customer.id}`)
            .set("Accept", "application/json")
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.dbarticles.should.be.a("array");
                res.body.dbarticles[0].should.be.a("object");
                done()
            });
    });

    // Test Post
    // (name,email,mobile)
    it(" ChaiRouter // Post Article", (done) => {

        const body = {
            imgarticle: "mon image",
            title: "test post john",
            description: "test post john",
            contenu: "test post john",
            user_id: 2,
        };

        chai
            .request(app)
            .post("/back/v1/admin/blog")
            .set("Accept", "application/json")
            .send(body)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.dbarticles.should.be.a("array");
                res.body.dbarticles[0].should.be.a("object");
                done()
            });
    });

    // Test Put /path:id
    it(" ChaiRouter // Put Article", (done) => {

        const body = {
            imgarticle: "mon image",
            title: "test edit nina",
            description: "test edit nina",
            contenu: "test edit nina",
            user_id: 12,
        };

        // Test route Put
        chai
            .request(app)
            .put(`/back/v1/admin/blog/:${customer.id}`)
            .set("Accept", "application/json")
            .send(body)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.dbarticles.should.be.a("array");
                res.body.dbarticles[0].should.be.a("object");
                done()
            });
    });

    // Delete ID
    it(" ChaiRouter // Delete ID Article", (done) => {

        // Test route Delete
        chai
            .request(app)
            .delete(`/back/v1/admin/blog/:${customer.id}`)
            .set("Accept", "application/json")
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.dbarticles.should.be.a("array");
                res.body.dbarticles[0].should.be.a("object");
                done()
            });
    });

    // Delete All
    it(" ChaiRouter // Delete Article", (done) => {

        // Test route Delete
        chai
            .request(app)
            .delete("/back/v1/admin/blog")
            .set("Accept", "application/json")
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.dbarticles.should.be.a("array");
                done()
            });
    });
});