export interface GetAccountInfoModel {
  email: string;
  nickname: string;
  description: string;
  mobile: string;
  avatar: string;
}

export interface PasswordRequestModel {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
