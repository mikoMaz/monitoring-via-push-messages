export interface IUserInfoResponse {
  email: string;
  userType: userType;
}

export const userTypesArray = [
  "EXTERNAL",
  "READ_ONLY",
  "ADMIN",
  "SUPER_ADMIN",
] as const;

export type userType = (typeof userTypesArray)[number];

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
