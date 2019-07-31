// beforeAll(() => console.log('1 - beforeAll'));

// afterAll(() => console.log('1 - afterAll'));
// beforeEach(() => console.log('1 - beforeEach'));
// afterEach(() => console.log('1 - afterEach'));
// test('1', () => console.log('1 - test'));
// describe('Scoped / Nested block', () => {
//   beforeAll(() => console.log('2 - beforeAll'));
//   afterAll(() => console.log('2 - afterAll'));
//   beforeEach(() => console.log('2 - beforeEach'));
//   afterEach(() => console.log('2 - afterEach'));
//   test('2', () => console.log('2 - test'));
// });

// describe('prueba', () => {
//   test('hola?', () => {
//     expect(10).toBe(10);
//   });
// });



const app = require('../app.js');
const request = require('supertest');

describe.skip('api works', () => {
  test('404', done => {
    request(app)
      .get('/rutaInexistente')
      .expect(404)
      .end((a,res) => {
        console.log(res);
        done()
      });
  });
});


// describe('Register should work', () => {
//   test('body mal formed', done => {
//     request(app)
//       .post('/auth/register')
//       .expect(400)
//       .end(done);
//   });
//    test('body mal formed', done => {
//      request(app)
//        .post('/auth/register')
//        .send({
//          password:'123456',
//          code: '@#',
//          number: 'nothing',
//        })
//        .expect(400)
//        .end(done);
//    });
//    test('User exists', done => {
//      request(app)
//        .post('/auth/register')
//        .send({
//          email: 'juan+3@geekshubs.com',
//          password: '12345678',
//        })
//        .expect(401)
//        .end(done);
//    });
// });
