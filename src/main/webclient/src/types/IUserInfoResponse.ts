export interface IUserInfoResponse {
  email: string;
  userType: userType;
}

export type userType = "external" | "readOnly" |"admin" | "superAdmin";