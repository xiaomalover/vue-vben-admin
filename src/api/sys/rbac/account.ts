import { defHttp } from '/@/utils/http/axios';
import { GetAccountInfoModel, PasswordRequestModel } from './model/accountModel';

enum Api {
  ACCOUNT_INFO = '/account/info',
  SESSION_TIMEOUT = '/user/sessionTimeout',
  TOKEN_EXPIRED = '/user/tokenExpired',
  CHANGE_PASSWORD = '/account/changePassword',
  ACCOUNT_EDIT = '/account/edit',
}

// Get personal center-basic settings

export const accountInfoApi = () => defHttp.get<GetAccountInfoModel>({ url: Api.ACCOUNT_INFO });

export const sessionTimeoutApi = () => defHttp.post<void>({ url: Api.SESSION_TIMEOUT });

export const tokenExpiredApi = () => defHttp.post<void>({ url: Api.TOKEN_EXPIRED });

export const changePasswordApi = (params: PasswordRequestModel) =>
  defHttp.post({ url: Api.CHANGE_PASSWORD, params });

export const accountEdit = (params: GetAccountInfoModel) =>
  defHttp.post({ url: Api.ACCOUNT_EDIT, params });
