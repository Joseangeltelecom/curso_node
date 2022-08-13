import { Request, Response } from "express";
import UserApplication from "../../application/user.application";
import User from "../../domain/user";
import UserFactory from "../../domain/user-factory";
import { EmailVO } from "../../domain/value-objects/email.vo";
import { UserListDTO, UserListMapping } from "./dto/response/user.list.dto";
import { UserListOneDTO, UserListOneMapping } from "./dto/response/user.listOne.dto";

export default class {
  constructor(private application: UserApplication) {
    this.list = this.list.bind(this);
    this.listOne = this.listOne.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  list(req: Request, res: Response) {
    const list = this.application.list();
    const dto: UserListDTO = new UserListMapping().execute(list)
    res.json(dto);
  }

  listOne(req: Request, res: Response) {
    const {guid} = req.params;
    const data = this.application.listOne(guid).properties();
    const dto: UserListOneDTO = new UserListOneMapping().execute(data)
    res.json(dto);
  }

  async insert(req: Request, res: Response) {
    const {name, lastname, email, password} = req.body;

    const user: User = await new UserFactory().create(name, lastname, EmailVO.create(email), password);
    const result = this.application.insert(user)
    res.json(result)
  }

  update(req: Request, res: Response) {
    const {guid} = req.params
    console.log(guid)
    const {name, lastname, email, password} = req.body

    const user = this.application.listOne(guid) // lo buscamos
    user.update({name, lastname, email:EmailVO.create(email), password}) // lo actializamos

    const result = this.application.update(user) // y generamos la actualizacio en la aplicacion.
    res.json(result)
  }

  delete(req: Request, res: Response) {
    const {guid} = req.params
    const user = this.application.listOne(guid) // lo buscamos
    user.delete()

    const result = this.application.update(user) // y generamos la actualizacio en la aplicacion.
    res.json(result)
   
  }

  /*  description(req: Request, res: Response) {
    res.send("<h2>User: Sergio</h2>");
  }

  list(req: Request, res: Response) {
    res.json([
      { username: "shidalgo", active: true },
      { username: "pneira", active: true },
    ]);
  }

  detail(req: Request, res: Response) {
    res.json({ username: "shidalgo", active: false });
  }

  delete(req: Request, res: Response) {
    res.send("User deleted successfully");
  } */
}
