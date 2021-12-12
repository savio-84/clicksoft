import { HttpContext } from '@adonisjs/core/build/standalone'
import { v4 as uuidv4 } from 'uuid'
import Teacher from 'App/Models/Teacher'
import Room from 'App/Models/Room'
import Database from '@ioc:Adonis/Lucid/Database'
export default class RoomsController {

  public async store({ request }: HttpContext) {

    const { id } = request.params()
    const { number, capacity, availability } = request.body()
    const teacher = await Teacher.findByOrFail('id', id)

    const room = new Room()
    room.id = uuidv4()
    room.number = number
    room.capacity = capacity
    room.availability = availability
    room.owner_id = teacher.id
    await room.save()

    return room
  }

  public async index() {
    const rooms = Room.all();
    return rooms
  }

  public async update({ request }: HttpContext) {
    const { number, capacity, availability, teacherId } = request.body()
    const { id } = request.params()
    const room = await Room.findByOrFail('id', id)
    const teacher = await Teacher.findByOrFail('id', teacherId)

    if (room.owner_id !== teacher.id) {
      throw new Error('Teacher not allowed')
    }

    room.number = number
    room.capacity = capacity
    room.availability = availability
    await room.save()

    return room
  }

  public async destroy({ request }: HttpContext) {
    const { id } = request.params()
    const student = await Room.findByOrFail('id', id)

    student.delete()
  }

  public async show({ request }) {
    const { id } = request.params();

    const room = await Room.findByOrFail('id', id)

    return room
  }

  public async findByTeacher({ request }: HttpContext) {
    const { id } = request.params()
    const rooms = await Database.from('rooms').select('rooms.*').where('rooms.owner_id', id);
    if (!rooms) {
      throw new Error('Rooms not found')
    }

    return rooms
  }


}
