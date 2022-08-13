import { UserProperties } from "../../../../domain/user";

interface UserDTO {
    name: string;
    lastname: string;
    email: string;
    guid: string;
}

export type UserListDTO = UserDTO[]

export class UserListMapping {
    execute(data: UserProperties[]): UserListDTO{
        return data.map((user: UserProperties) => {
            return {
                name: user.name,
                lastname: user.lastname,
                email: user.email.value,
                guid: user.guid,
            }
        })
    }
}
