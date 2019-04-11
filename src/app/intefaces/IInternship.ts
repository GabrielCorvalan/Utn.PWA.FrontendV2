import { ICompanyTutor } from './ICompanyTutor';
import { IBase } from './IBase';
import { IStudent } from './IStudent';
import { ICompany } from './ICompany';
import { IUser } from './IUser';

export interface IInternship extends IBase {
    startDate: Date;
    endDate: Date;
    salaryWorkAssignment: number;
    workAgreement: string;
    companySignatory: string;
    dailyHours: number;
    taskDescription: string;
    state: string;
    company: ICompany;
    companyTutor: ICompanyTutor;
    student: IStudent;
    studentId: number;
    companyId: number;
    companyMentorId: number;
    createdDate: Date;
    userCreated: IUser;
    lastModified?: Date;
    userLasModified?: IUser;
    cancellationDate?: Date;
    userCancelattion?: IUser;
    cancellationDescription?: string;
    renovationDate?: Date;
    userRenovation?: IUser;
    confirmationState: string;
    observations?: string;
}
