import request from 'supertest' // allows fake request to express application
import { app } from '../../app'
import { response } from 'express';


it('returns a 201 on successful sign up', async () => {

  const response = await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined()

})

it('return a 400 on invalid email', async () => {

  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'testtest.com',
    password: 'password'
  })
  .expect(400)


})
it('return a 400 on invalid password', async () => {

  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'p'
  })
  .expect(400)


})
it('return a 400 on with no email and password', async () => {

  await request(app)  // run first test, then await and run the second test
  .post('/api/users/signup')
  .send({
    email: "test@test.com"

  })
  .expect(400)

  await request(app)
  .post('/api/users/signup')
  .send({
    password: "passwordooo"

  })
  .expect(400)


})