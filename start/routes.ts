/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('potato/:id', 'PotatoesController.default');
  Route.resource('students', 'StudentsController').apiOnly()
  Route.resource('teachers', 'TeachersController').apiOnly()
  Route.resource('rooms', 'RoomsController').apiOnly().except(["store"])
  Route.post('rooms/:id', 'RoomsController.store')
  Route.get('/rooms/teachers/:id', 'RoomsController.findByTeacher')
  Route.get('/rooms/:id/students', 'EnrollmentsController.listStudentsByRoom');
  Route.post('/enrollments/:id', 'EnrollmentsController.store')
  Route.get('/enrollments', 'EnrollmentsController.index')
  Route.delete('/enrollments/:id', 'EnrollmentsController.destroy')
  Route.get('/enrollments/rooms/students/:id', 'EnrollmentsController.listRoomsByStudent')
  Route.get('/enrollments/rooms/teachers/:id', 'EnrollmentsController.listRoomsByTeacher')
})
