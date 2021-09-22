export interface GetAccountInfoModel {
  email: string;
  nickname: string;
  description: string;
  mobile: string;
}

export interface PasswordRequestModel {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
