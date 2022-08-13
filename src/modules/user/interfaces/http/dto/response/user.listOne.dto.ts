import { UserProperties } from "../../../../domain/user";

interface UserOneDTO {
    name: string;
    lastname: string;
    email: string;
    guid: string;
}

export type UserListOneDTO = UserOneDTO

export class UserListOneMapping {
    execute(data: UserProperties): UserListOneDTO{
            return {
                name: data.name,
                lastname: data.lastname,
                email: data.email.value,
                guid: data.guid,
            }
    }
}
