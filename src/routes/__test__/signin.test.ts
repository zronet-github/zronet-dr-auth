import request from 'supertest' // allows fake request to express application
import { app } from '../../app'


it('returns 200 when user signs in', async ()=>{

  await request(app)
  .post('/api/users/signup')
  .send({
    email: "test@test.com",
    password: "password"
  })
  .expect(201)

  await request(app)
  .post('/api/users/signin')
  .send({
    email: "test@test.com",
    password: "password"
  })
  .expect(200)
})

it('returns 400 when wrong password entered', async () => {
  await request(app)
  .post('/api/users/signup')
  .send({
    email: "test@test.com",
    password: "password"
  })
  .expect(201)

  await request(app)
  .post('/api/users/signin')
  .send({
    email: "test@test.com",
    password: "pword"
  })
  .expect(400)
})


it('returns 400 when wrong email is entered', async () => {

  await request(app)
  .post('/api/users/signup')
  .send({
    email: "test@test.com",
    password: "password"
  })
  .expect(201)


  await request(app)
  .post('/api/users/signin')
  .send({
    email: "test2@zronet.com",
    password: "password"
  })
  .expect(400)
})

it('set cookie when signed in ', async () => {

  await request(app)
  .post('/api/users/signup')
  .send({
    email: "test@test.com",
    password: "password"
  })
  .expect(201)


  const response = await request(app)
  .post('/api/users/signin')
  .send({
    email: "test@test.com",
    password: "password"
  })
  .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
})