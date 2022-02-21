var assert = require("assert");
const {
    query
} = require("../serverl");

describe("MOCHA // CRUD // articles", () => {
    let article = {};
    let id = 0;

    // Loop for create Customer before 'it'
    beforeEach(async () => {
        let values = ["mon image","BRUNO", "test bruno","test bruno","0"];
        let sql = `INSERT INTO articles (imgarticle,title,description,contenu,user_id) values("mon image","BRUNO","test bruno","test bruno",0);`;
        const Articles = await db.query(sql, [values]);

        // console.log("Before EACH: ", user);
        assert.ok(Articles.insertId);

        const ArticlesID = await db.query(`SELECT * FROM articles where id = ${ Articles.insertId }`)
        article = ArticlesID[0]
        assert.strictEqual(ArticlesID[0].imgarticle, "mon image");
        assert.strictEqual(ArticlesID[0].title, "BRUNO");
        assert.strictEqual(ArticlesID[0].description, "test bruno");
        assert.strictEqual(ArticlesID[0].contenu, "test bruno");
        assert.strictEqual(ArticlesID[0].user_id, 0);

    });
    // Test
  it("TEST // Articles", (done) => {
     console.log("TEST: ", id)
    done();
  });
 // Create Customer
 it("POST // articles", async () => {
    let values = ["mon image","john", "test john","test john","0"];
    let sql = `INSERT INTO articles (imgarticle,title,description,contenu,user_id) values("mon image","john","test john","test john",1);`;
    const Articles = await db.query(sql, [values]);

     console.log("POST: ", Articles.insertId)

    assert.ok(Articles);

    const ArticlesID = await db.query(
      `SELECT * FROM articles where id = ${Articles.insertId}`
    );
    assert.strictEqual(ArticlesID[0].imgarticle, "mon image");
        assert.strictEqual(ArticlesID[0].title, "john");
        assert.strictEqual(ArticlesID[0].description, "test john");
        assert.strictEqual(ArticlesID[0].contenu, "test john");
        assert.strictEqual(ArticlesID[0].user_id, 1);
  });

  // Get ALL Customer
  it("GET ALL // articles", async () => {
    let sql = `SELECT * FROM articles`;
    const listArticles = await db.query(sql);

     console.log('GET ALL: ', listArticles)

    assert.ok(listArticles);

    const Articles = await db.query(`SELECT * FROM articles`);
    assert.strictEqual(Articles.length > 0, true);
  });

});