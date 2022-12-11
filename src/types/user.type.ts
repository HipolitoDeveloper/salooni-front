import {User} from "../schema";

export enum EUserAccType {
    'OWN' = 'OWN',
    'EMP' = 'EMP'
}

export type TUser = Omit<User, 'createdAt' | 'ACL' | 'id' | 'updatedAt'>
