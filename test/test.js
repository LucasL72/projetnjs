var assert = require("assert");
const {
    query
} = require("../serverl");

describe("MOCHA // CRUD // user", () => {
    let customer = {};
    let id = 0;

    // Loop for create Customer before 'it'
    beforeEach(async () => {
        let values = ["BRUNO", "Bru@nu.fr", "0606060606"];
        let sql = `INSERT INTO customers (name,email,mobile) values(?)`;
        const user = await query(sql, [values]);

        // console.log("Before EACH: ", user);
        assert.ok(user.insertId);

        const userID = await query(`SELECT * FROM customers where id = ${ user.insertId }`)
        customer = userID[0]
        assert.strictEqual(userID[0].name, "BRUNO");
        assert.strictEqual(userID[0].email, "Bru@nu.fr");

    });

});