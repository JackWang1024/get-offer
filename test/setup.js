var supertest = require('supertest');
// module.exports = supertest(require('../server'));
module.exports = supertest('http://localhost:3000');