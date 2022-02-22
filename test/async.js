let assert = require("assert");
const {
  query
} = require("../serverl");

describe("MOCHA // CRUD // articles", () => {
  let customer = {};
  let id = 0;

  // Loop for create Customer before 'it'
  beforeEach(async () => {
    let values = ["mon image", "BRUNO", "test bruno", "test bruno", "0"];
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
    let values = ["mon image", "john", "test john", "test john", "0"];
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

  // Edit Customers
  it("PUT ID // Articles", async () => {
    let sql = `UPDATE articles
               SET imgarticle  = 'mon image',
               title = "test edit",
               description = "test edit",
               contenu = "test edit",
               user_id = 2
               WHERE  id  =${customer.id};`;

    const Articles = await db.query(sql);
    const ArticlesID = await db.query(
      `SELECT * FROM articles WHERE id =${customer.id}`
    );

  console.log('PUT: ', ArticlesID)   
    assert.ok(ArticlesID);

    assert.strictEqual(ArticlesID[0].imgarticle, "mon image");
    assert.strictEqual(ArticlesID[0].title, "test edit");
    assert.strictEqual(ArticlesID[0].description, "test edit");
    assert.strictEqual(ArticlesID[0].contenu, "test edit");
    assert.strictEqual(ArticlesID[0].user_id, 2);
  });

  // Delete ID
  it("DELETE ID // Articles", async () => {
    let sql = `DELETE FROM articles WHERE id = ${customer.id}`;
    await db.query(sql);

    const ArticlesID = await db.query(
      `SELECT * FROM articles where id = ${customer.id}`
    );
    assert.ok(ArticlesID);
    assert.strictEqual(ArticlesID.length, 0);
  });

  // à décommenter pour tout supprimer
  // Delete ALL
  it("DELETE ALL // Articles", async () => {
    let sql = `DELETE FROM articles`;
    const Articles = await db.query(sql);

    const listArticles = await db.query("SELECT * FROM articles");
    assert.strictEqual(listArticles.length, 0);
  });

});