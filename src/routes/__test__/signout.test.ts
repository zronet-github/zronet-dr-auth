import request from 'supertest' // allows fake request to express application
import { app } from '../../app'


it('return an empty object on signout ', async () => {
  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(201);

  // await request(app)
  // .post('/api/users/signin')
  // .send({
  //   email: 'test@test.com',
  //   password: 'password'
  // })
  // .expect(200);

  const response = await request(app)
  .post('/api/users/signout')
  .send({})
  .expect(200)

  expect(response.get('Set-Cookie')).toBeUndefined()


})

