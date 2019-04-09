import { IBase } from './IBase';
import { IRol } from './IRol';
export interface IUser extends IBase {
rolId: number;
names: string;
surnames: string;
dni: string;
cuil: string;
email: string;
address: string;
sex: string;
universityPosition: string;
birthdate: Date;
password: string;
token?: string;
rol: IRol;
}
