import { userType } from "./IUserInfoResponse";

export interface ICompanyUser {
    id: number,
    name: string,
    surname: string,
    companyId: number,
    role: userType,
}