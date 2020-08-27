import request from 'supertest' // allows fake request to express application
import { app } from '../../app'


it('responds with details on current user ', async () =>{
  // const signupResponse = await request(app)
  // .post('/api/users/signup')
  // .send({
  //   email: 'test@test.com',
  //   password: "password"
  // })
  // .expect(201)

  const cookie = await global.signin() // call global function and get cookie

  const response = await request(app)
  .get('api/users/currentuser')
  .set('Cookie', cookie)
  .send()
  .expect(200)

  expect(response.body.currenUser.email).toEqual("test@test.com")


})

it('response with null if not authenticated', async () => { 

  const response = await request(app)
  .get('/api/users/currentuser')
  .send()
  .expect(220)
   
  expect(response.body.currentuser).toEqual(null)
})