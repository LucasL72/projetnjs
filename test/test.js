var assert = require("assert");
const {
    query
} = require("../serverl");

describe("MOCHA // CRUD // user", () => {
    let user = {};
    let id = 0;

    // Loop for create Customer before 'it'
    beforeEach(async () => {
        let values = ["BRUNO", "Bru@nu.fr"];
        let sql = `INSERT INTO user (name,email) values(?)`;
        const user = await query(sql, [values]);

        // console.log("Before EACH: ", user);
        assert.ok(user.insertId);

        const userID = await query(`SELECT * FROM user where id = ${ user.insertId }`)
        user = userID[0]
        assert.strictEqual(userID[0].name, "BRUNO");
        assert.strictEqual(userID[0].email, "Bru@nu.fr");

    });
    // Test
  it("TEST // user", (done) => {
    // console.log("TEST: ", id)
    done();
  });

});