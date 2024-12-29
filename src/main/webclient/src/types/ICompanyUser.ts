import { userType } from "./IUserInfoResponse";

export interface ICompanyUser {
    company: string,
    name: string,
    role: userType,
}