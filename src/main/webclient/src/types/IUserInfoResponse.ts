export interface IUserInfoResponse {
  email: string;
  userType: userType;
}

export type userType = "EXTERNAL" | "READ_ONLY" | "ADMIN" | "SUPER_ADMIN";

export const getDeniedUserInfoResponse = (email?: string) => {
  const deniedUser: IUserInfoResponse = {
    email: "",
    userType: "EXTERNAL",
  };
  if (email) {
    deniedUser.email = email;
  }
  return deniedUser;
};
