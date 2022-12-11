import {Salon} from "../schema";

export type TSalon = Omit<Salon, 'createdAt' | 'ACL' | 'id' | 'updatedAt'>
