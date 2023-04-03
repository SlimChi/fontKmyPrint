/* tslint:disable */
/* eslint-disable */
import { Adresse } from './adresse';
import { GrantedAuthority } from './granted-authority';
import { Role } from './role';
export interface User {
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  active?: boolean;
  adresse?: Array<Adresse>;
  authorities?: Array<GrantedAuthority>;
  credentialsNonExpired?: boolean;
  email?: string;
  enabled?: boolean;
  firstName?: string;
  id?: number;
  lastName?: string;
  password?: string;
  role?: Role;
  username?: string;
}
