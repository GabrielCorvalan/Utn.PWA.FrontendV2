import { ICompanyTutor } from './ICompanyTutor';
import { IBase } from './IBase';
import { IStudent } from './IStudent';
import { ICompany } from './ICompany';

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
    userCreated: string;
    lastModified?: Date;
    userLasModified?: string;
    cancellationDate?: Date;
    userCancelattion?: string;
    cancellationDescription?: string;
    renovationDate?: Date;
    userRenovation?: string;
    confirmationState: string;
    observations?: string;
}
