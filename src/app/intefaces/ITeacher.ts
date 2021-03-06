import { IBase } from './IBase';
import { ICareer } from './ICareer';

export interface ITeacher extends IBase {
    names: string;
    surnames: string;
    dni: string;
    cuil: string;
    file: string;
    careerId: number;
    mentorId: number;
    sex: string;
    address: string;
    birthdate: Date;
    email: string;

    career: ICareer;
    // Mentor: ITeacher;
    // Interships: IIntership;
}
