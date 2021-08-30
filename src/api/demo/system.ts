import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
  DeptRequestModel,
  AccountRequestModel,
  RoleRequestModel,
  MenuRequestModel,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  //AccountList = '/system/getAccountList',
  AccountList = '/admin/getAccountList',
  AccountAdd = '/admin/add',
  AccountEdit = '/admin/edit',
  AccountDelete = '/admin/delete',
  IsAccountExist = '/system/accountExist',
  //DeptList = '/system/getDeptList',
  DeptList = '/department/getDepartmentTree',
  DeptAdd = '/department/add',
  DeptEdit = '/department/edit',
  DeptDelete = '/department/delete',
  //setRoleStatus = '/system/setRoleStatus',
  setRoleStatus = '/role/setStatus',
  MenuList = '/permission/getMenuTree',
  MenuAdd = '/permission/add',
  MenuEdit = '/permission/edit',
  MenuDelete = '/permission/delete',
  //RolePageList = '/system/getRoleListByPage',
  RolePageList = '/role/getRoleList',
  //GetAllRoleList = '/system/getAllRoleList',
  GetAllRoleList = '/role/getAllRoleList',
  RoleAdd = '/role/add',
  RoleEdit = '/role/edit',
  RoleDelete = '/role/delete',
}

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const AccountAdd = (params: AccountRequestModel) =>
  defHttp.post({ url: Api.AccountAdd, params });

export const AccountEdit = (params: AccountRequestModel) =>
  defHttp.post({ url: Api.AccountEdit, params });

export const AccountDelete = (id: number) => defHttp.delete({ url: Api.AccountDelete + '/' + id });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const DeptAdd = (params: DeptRequestModel) =>
  defHttp.post({ url: Api.DeptAdd, params });

export const DeptEdit = (params: DeptRequestModel) =>
  defHttp.post({ url: Api.DeptEdit, params });

export const DeptDelete = (id: number) => defHttp.delete({ url: Api.DeptDelete + '/' + id });

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });

export const MenuAdd = (params: MenuRequestModel) =>
  defHttp.post({ url: Api.MenuAdd, params });

export const MenuEdit = (params: MenuRequestModel) =>
  defHttp.post({ url: Api.MenuEdit, params });

export const MenuDelete = (id: number) => defHttp.delete({ url: Api.MenuDelete + '/' + id });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const RoleAdd = (params: RoleRequestModel) =>
  defHttp.post({ url: Api.RoleAdd, params });

export const RoleEdit = (params: RoleRequestModel) =>
  defHttp.post({ url: Api.RoleEdit, params });

export const RoleDelete = (id: number) => defHttp.delete({ url: Api.RoleDelete + '/' + id });

export const setRoleStatus = (id: number, status: number) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } });
