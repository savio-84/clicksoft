// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PotatoesController {
  public async default({ params }) {
    const value = params;
    console.log(value);
  }
}
