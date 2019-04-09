import { IBase } from './IBase';

export interface ICompany extends IBase {
    name: string;
    cuit: string;
    email: string;
    address: string;
}
