let assert = require("assert");
const {
    query
} = require("../serverl");


describe("test // CRUD // articles", () => {
    let article = {};
    let id = 0;
    beforeEach(async () => {
        let values = ["mon image", "BRUNO", "test bruno", "test bruno", "0"];
        let sql = `INSERT INTO articles (imgarticle,title,description,contenu,user_id) values("mon image","BRUNO","test bruno","test bruno",0);`;
        const Articles = await db.query(sql, [values]);

        assert.ok(Articles.insertId);

        const ArticlesID = await db.query(`SELECT * FROM articles where id = ${ Articles.insertId }`)
        article = ArticlesID[0]
        assert.strictEqual(ArticlesID[0].imgarticle, "mon image");
        assert.strictEqual(ArticlesID[0].title, "BRUNO");
        assert.strictEqual(ArticlesID[0].description, "test bruno");
        assert.strictEqual(ArticlesID[0].contenu, "test bruno");
        assert.strictEqual(ArticlesID[0].user_id, 0);
    });

    it("test // articles", async () => {
        let title = "test edit"
        let image = "mon image"
        let description = "test edit"
        let contenu = "test edit"
        const ArticlesID = await db.query(`SELECT * FROM articles WHERE id =${article.id}`)

        if (title) {
            await db.query(`UPDATE articles SET title ="test edit" WHERE id =${article.id}`)
        }
        if (image) {
            await db.query(`UPDATE articles SET imgarticle = 'mon image' WHERE id =${article.id}`)
        }
        if (description) {
            await db.query(`UPDATE articles SET description = "test edit" WHERE id =${article.id}`)
        }
        if (contenu) {
            await db.query(`UPDATE articles SET contenu = "test edit" WHERE id =${article.id}`)
        }
        assert.ok(ArticlesID);
        assert.strictEqual(ArticlesID[0].imgarticle, "mon image");
        assert.strictEqual(ArticlesID[0].title, "test edit");
        assert.strictEqual(ArticlesID[0].description, "test edit");
        assert.strictEqual(ArticlesID[0].contenu, "test edit");
        assert.strictEqual(ArticlesID[0].user_id, 2);
    })
});