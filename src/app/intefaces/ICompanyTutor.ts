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
    // DTO'S
    company: ICompany;
}
