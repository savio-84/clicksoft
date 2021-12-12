// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { v4 as uuidv4 } from "uuid";
import Enrollment from "App/Models/Enrollment";
import Room from "App/Models/Room";
import Teacher from "App/Models/Teacher";
import Database from "@ioc:Adonis/Lucid/Database";
import { HttpContext } from "@adonisjs/core/build/standalone";
import Student from "App/Models/Student";

export default class EnrollmentsController {
  public async store({ request }) {
    const { id } = request.params();
    const { studentId, roomId } = request.body()

    const teacher = await Teacher.findByOrFail('id', id)
    const room = await Room.findByOrFail('id', roomId)
    const student = await Student.findByOrFail('id', studentId)

    if (teacher.id !== room.owner_id) {
      throw new Error('Teacher not allowed')
    }

    if (!student) {
      throw new Error('Student not found')
    }

    const enrollmentAlreadyExists = await Database.from('enrollments').select('*').where('enrollments.student_id', '=', studentId).andWhere('enrollments.room_id', '=', roomId);

    if (enrollmentAlreadyExists.length > 0) {
      throw new Error('Student already is in this class')
    }

    const students = await Database.from('enrollments').join('students', (query) => {
      query.on('enrollments.student_id', 'students.id')
    }).select("students.*").where('enrollments.room_id', '=', room.id)

    if (students.length < room.capacity) {

      const enrollment = await Enrollment.create({
        id: uuidv4(),
        room_id: room.id,
        student_id: student.id
      })

      return enrollment
    } else {
      throw new Error('Exceeds the room capacity limit')
    }
  }

  public async destroy({ request }) {
    const { id } = request.params()
    const { studentId, roomId } = request.body()

    const teacher = await Teacher.findByOrFail('id', id)
    const room = await Room.findByOrFail('id', roomId);

    if (room.owner_id !== teacher.id) {
      throw new Error('Teacher is not allowed')
    }

    await Database.from('enrollments').delete().where('enrollments.student_id', '=', studentId).andWhere('enrollments.room_id', '=', roomId);
  }

  public async index() {
    const enrollments = await Enrollment.all()

    return enrollments
  }

  public async listRoomsByStudent({ request }: HttpContext) {
    const { id } = request.params()

    const rooms = await Database.from('enrollments').join('rooms', (query) => {
      query.on('rooms.id', 'enrollments.room_id')
    }).select('rooms.*').where('enrollments.student_id', '=', id);

    return rooms
  }

  public async listStudentsByRoom({ request }: HttpContext) {
    const { id } = request.params()

    const students = await Database.from('enrollments').join('students', (query) => {
      query.on('enrollments.student_id', 'students.id')
    }).select("students.*").where('enrollments.room_id', '=', id)

    return students
  }
}
