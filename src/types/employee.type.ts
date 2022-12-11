import {Employee} from "../schema";

export type TEmployee = Omit<Employee, 'createdAt' | 'ACL' | 'id' | 'updatedAt'>
