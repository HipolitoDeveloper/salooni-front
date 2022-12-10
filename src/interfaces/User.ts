import {User} from "../schema";

export type TUser = Omit<User, 'createdAt' | 'ACL' | 'id' | 'updatedAt'>
