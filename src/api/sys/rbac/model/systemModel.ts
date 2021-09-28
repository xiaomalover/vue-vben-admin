import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type AccountParams = BasicPageParams & {
  account?: string;
  nickname?: string;
};

export type RoleParams = {
  roleName?: string;
  status?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;

export type LogParams = {
  key?: string;
};

export type LogPageParams = BasicPageParams & LogParams;

export type LogItem = {
  costTime: number;
  ip: string;
  ip_info: string;
  name: string;
  requestParam: string;
  requestType: string;
  requestUrl: string;
  username: string;
  createdAt: string;
};

export type MenuParams = {
  menuName?: string;
  status?: string;
  show?: string;
};

export interface AccountListItem {
  id: string;
  account: string;
  email: string;
  nickname: string;
  role: number;
  createTime: string;
  remark: string;
  status: number;
}

export interface AccountRequestModel {
  id?: number;
  account: string;
  nickname: string;
  pwd: string;
  email: string;
  dept: number;
  role: number;
  status: number;
  remark: string;
}

export interface DeptListItem {
  id: string;
  orderNo: string;
  createTime: string;
  remark: string;
  status: number;
}

export interface DeptRequestModel {
  id?: number;
  deptName: string;
  orderNo: string;
  parentDept: string;
  remark: string;
  status: number;
}

export interface MenuListItem {
  id: string;
  orderNo: string;
  createTime: string;
  status: number;
  icon: string;
  component: string;
  permission: string;
}

export interface RoleListItem {
  id: string;
  roleName: string;
  roleValue: string;
  status: number;
  orderNo: string;
  createTime: string;
}

export interface RoleRequestModel {
  id?: number;
  roleName: string;
  roleValue: string;
  menu: number[];
  status: number;
  remark: string;
}

export interface MenuRequestModel {
  id?: number;
  icon?: string;
  isExt?: number;
  menuName: string;
  orderNo: number;
  parentMenu: number;
  routePath?: string;
  show?: number;
  type: number;
  component?: string;
  keepalive?: number;
  status: number;
  permission?: string;
}

/**
 * @description: Request list return value
 */
export type AccountListGetResultModel = BasicFetchResult<AccountListItem>;

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];

export type LogPageListGetResultModel = BasicFetchResult<LogItem>;
