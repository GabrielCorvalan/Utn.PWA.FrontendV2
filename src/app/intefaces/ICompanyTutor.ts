import { IAddress } from './IAddress';
import { IBase } from './IBase';
import { ICompany } from './ICompany';

export interface ICompanyTutor extends IBase {
    names: string;
    surnames: string;
    dni: string;
    cuil: string;
    email: string;
    sex: string;
    birthdate: Date;
    companyId: number;
    address: IAddress;
    // DTO'S
    company: ICompany;
}
