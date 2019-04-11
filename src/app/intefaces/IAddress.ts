import { IBase } from './IBase';
export interface IAddress extends IBase {
  streetAddress: string;
  state: string;
  city: string;
  zipCode: number;
  country: string;
}
