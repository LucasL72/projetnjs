// Config Chai
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = require("chai").should();
const expect = chai.expect;
const { app, query } = require("../server"); // import to server.js
const path = require("path");

chai.use(chaiHttp);

describe("CHAI // CONTROLLER // ARTICLE", () => {