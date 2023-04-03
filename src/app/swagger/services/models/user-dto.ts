/* tslint:disable */
/* eslint-disable */
import { Adresse } from './adresse';
import { Role } from './role';
export interface UserDto {
  active?: boolean;
  adresse?: Array<Adresse>;
  email: string;
  firstName: string;
  id?: number;
  lastName: string;
  password: string;
  roles?: Role;
}
