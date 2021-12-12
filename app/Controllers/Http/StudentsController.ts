// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from '../../Models/Student'
import { v4 as uuidv4 } from 'uuid'
import { HttpContext } from '@adonisjs/core/build/standalone'

export default class StudentsController {
  public async index() {
    const students = await Student.all()

    return students
  }

  public async store({ request }: HttpContext) {
    const { name, email, born, registration } = request.body()

    const student = new Student()
    student.id = uuidv4()
    student.name = name
    student.email = email
    student.born = born
    student.registration = registration
    await student.save()

    return student
  }

  public async show({ request }: HttpContext) {
    const { id } = request.params()
    const student = await Student.findByOrFail('id', id)

    return student
  }

  public async update({ request }: HttpContext) {
    const { name, email, born } = request.body()
    const { id } = request.params()
    const student = await Student.findByOrFail('id', id)

    student.name = name
    student.email = email
    student.born = born

    await student.save()

    return student
  }

  public async destroy({ request }: HttpContext) {
    const { id } = request.params()
    const student = await Student.findByOrFail('id', id)

    student.delete()
  }
}
