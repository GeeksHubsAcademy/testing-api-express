const app = require('../app.js');
const request = require('supertest');
const mongoose = require('mongoose');

jest.setTimeout(10000);


async function cleanDB() {
  //  clean test db
  if (mongoose.connection.name === 'movies-avantio-test') {
    for (let conn in mongoose.connection.collections) {
      await mongoose.connection.collections[conn].deleteMany({});
    }
  }
}

describe('api works', () => {
  test('404', done => {
    request(app)
      .get('/rutaInexistente')
      .expect(404)
      .end(done);
  });
});



describe('auth', () => {


  describe('register', () => {
    beforeAll(cleanDB);
    afterAll(cleanDB);
     test('body must have password and email', () => {
       return request(app)
         .post('/auth/register')
         .expect(400);
     });

      test('body must have password and email', () => {
        return request(app)
          .post('/auth/register')
          .send({ password: '12345678' })
          .expect(400);
      });
       test('body must have password and email', () => {
         return request(app)
           .post('/auth/register')
           .send({ email: 'juan@geekshubs.com' })
           .expect(400);
       });
        test('body must have a valid password', () => {
          return request(app)
            .post('/auth/register')
            .send({ email: 'juan@geekshubs.com', password:'123' })
            .expect(400);
        }, 10000);
        test('body must have a valid password', () => {
          return request(app)
            .post('/auth/register')
            .send({ email: 'juangeekshubs.com', password: '12345678' })
            .expect(400);
        }, 10000);

         test('it can register a valid body', () => {
           return request(app)
             .post('/auth/register')
             .send({
               password: '12345678',
               email: 'juan@geekshubs.com',
             })
             .expect(200);
         });
          test('it can not register the same email twice', () => {
            return request(app)
              .post('/auth/register')
              .send({
                password: '12345678',
                email: 'juan@geekshubs.com',
              })
              .expect(400);
          });
  })

  describe('login', () => {
    beforeAll(cleanDB);
    beforeAll(() => {
        return request(app)
          .post('/auth/register')
          .send({
            password: '12345678',
            email: 'juan@geekshubs.com',
          });
    })
    afterAll(cleanDB);
      test('body must have password and email', () => {
        return request(app)
          .post('/auth/login')
          .expect(400);
      });
      test('can not be logged if not not valid password', () => {
        return request(app)
          .post('/auth/login')
          .send({
            password: '123456789',
            email: 'juan@geekshubs.com',
          })
          .expect(401);
      });
       test('can not be logged if not not valid email', () => {
         return request(app)
           .post('/auth/login')
           .send({
             password: '12345678',
             email: 'geeksubs.com',
           })
           .expect(401);
       });
        test('can log in', () => {
          return request(app)
            .post('/auth/login')
            .send({
              password: '12345678',
              email: 'juan@geekshubs.com',
            })
            .expect(200);
        });
        test('should respond with a token', () => {
          return request(app)
            .post('/auth/login')
            .send({
              password: '12345678',
              email: 'juan@geekshubs.com',
            })
            .expect( (response) => {
              expect(response.body.user.token).toBeTruthy()
            });
        });
  })

  describe('logout',() => {
    let jwt;
     beforeAll(cleanDB);
     beforeAll(() => {
       return request(app)
         .post('/auth/register')
         .send({
           password: '12345678',
           email: 'juan@geekshubs.com',
         });
     });
    beforeAll(() => {
      return request(app)
        .post('/auth/login')
        .send({
          password: '12345678',
          email: 'juan@geekshubs.com',
        })
        .expect(response => {
          jwt = response.body.user.token;
        });
    })
     afterAll(cleanDB);

    test('should not log out without token', () => {
      return request(app)
        .get('/auth/logout')
        .expect(401);
    })
    test('should not log out and invalid token', () => {
      return request(app)
        .get('/auth/logout')
        .set('Authorization', 'Bearer invalidTOASKDNHASKHDSAIY')
        .expect(401);
    });
     test('should log out with token', () => {

       return request(app)
         .get('/auth/logout')
         .set('Authorization', 'Bearer ' + jwt)
         .expect(200);
     });
      test('should not log out with the same token', () => {
        return request(app)
          .get('/auth/logout')
          .set('Authorization', 'Bearer ' + jwt)
          .expect(401);
      });
  })


});



describe('movies', () => {
  let jwt;
  beforeAll(cleanDB);
  beforeAll(() => {
    return request(app)
      .post('/auth/register')
      .send({
        password: '12345678',
        email: 'juan@geekshubs.com',
      });
  });
  beforeAll(() => {
    return request(app)
      .post('/auth/login')
      .send({
        password: '12345678',
        email: 'juan@geekshubs.com',
      })
      .expect(response => {
        jwt = response.body.user.token;
      });
  });
  afterAll(cleanDB);

  test('should get movies publicly', () => {
    return request(app)
      .get('/movies')
      .expect(200);
  });
  test('should not post movies publicly', () => {
    return request(app)
      .post('/movies')
      .expect(401);
  });
   test('should  post movies with a valid jwt', () => {
     return request(app)
       .post('/movies')
       .set('Authorization', 'Bearer ' + jwt)
       .expect(200);
   });

});


describe('fizzbuzz', () => {
  test('should send a valid max param', () => {
    return request(app)
    .get('/fizzbuzz/max')
    .expect(400)
  })
  test('should send a valid max param', () => {
    return request(app)
      .get('/fizzbuzz/1')
      .expect(200);
  });
  test('should send a valid max param', () => {
    return request(app)
      .get('/fizzbuzz/5')
      .expect(res => {
        expect(res.body).toEqual(['1','2','fizz','4','buzz'])
      });
  });
})