export interface IUserInfoResponse {
  email: string;
  userType: userType;
}

export type userType = "EXTERNAL" | "READ_ONLY" |"ADMIN" | "SUPER_ADMIN";