import User, { UserProperties } from "../domain/user";
import UserFactory from "../domain/user-factory";
import { UserRepository } from "../domain/user.repository";
import { EmailVO } from "../domain/value-objects/email.vo";

// const users: User[] = [
//   new UserFactory().create("John","Dick",EmailVO.create("johndick@correo.com"),"123"),
//   new UserFactory().create("Jose","Martinez",EmailVO.create("Jose@correo.com"),"1234")
// ];

let users: User[] = [];

const promisesUsers = [ 
  new UserFactory().create("John","Dick",EmailVO.create("johndick@correo.com"),"123"),
  new UserFactory().create("Jose","Martinez",EmailVO.create("Jose@correo.com"),"1234")
]

Promise.all(promisesUsers).then((result) => (users = result));

export default class UserInfrastructure implements UserRepository {
  list(): UserProperties[] {
    return users
    .filter((el:User) => el.properties().active===true)
    .map((el: User) => el.properties())
  }

  listOne(guid: string): User { 
     return users
     .filter((el:User) => el.properties().active===true)
     .find((el: User) => el.properties().guid === guid)
  }
  
  insert(user: User): UserProperties {
    users.push(user)
    return user.properties()
  }

  update(user: User): any{
      const {guid} = user.properties()
      const userIndex: number= users.findIndex((el: User) => el.properties().guid === guid)
      users[userIndex] = user
      return user
    }
  }