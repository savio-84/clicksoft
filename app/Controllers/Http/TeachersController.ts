// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContext } from '@adonisjs/core/build/standalone'
import Teacher from 'App/Models/Teacher'
import { v4 as uuidv4 } from 'uuid'

export default class TeachersController {
  public async store({ request }: HttpContext) {
    const { name, email, born, registration } = request.body()

    const teacher = await Teacher.create({
      id: uuidv4(),
      name,
      email,
      born,
      registration: registration
    })

    return teacher
  }

  public async index() {
    const teachers = await Teacher.all()

    return teachers
  }

  public async show({ request }: HttpContext) {
    const { id } = request.params()

    const teacher = await Teacher.findByOrFail('id', id)

    return teacher
  }

  public async update({ request }: HttpContext) {
    const { id } = request.params()
    const { name, email, born, registration } = request.body()

    const teacher = await Teacher.findByOrFail('id', id)

    teacher.name = name
    teacher.email = email
    teacher.born = born
    teacher.registration = registration

    teacher.save()

    return teacher
  }

  public async destroy({ request }: HttpContext) {
    const { id } = request.params()

    const teacher = await Teacher.findByOrFail('id', id)

    teacher.delete()
  }
}
