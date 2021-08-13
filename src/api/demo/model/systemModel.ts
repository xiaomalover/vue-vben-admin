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

export type MenuParams = {
  menuName?: string;
  status?: string;
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

export interface AccountAddModel {
  account: string;
  nickname: string;
  password: string;
  email: string;
  dept: number;
  role: number;
  status: number;
  remark: string;
}

export interface AccountEditModel {
  id: number;
  account: string;
  nickname: string;
  password: string;
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

export interface DeptAddModel {
  deptName: string;
  sortOrder: string;
  parentId: string;
  description: string;
  status: number;
}

export interface DeptEditModel {
  id: number;
  deptName: string;
  sortOrder: string;
  parentId: string;
  description: string;
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

export interface RoleAddModel {
  roleName: string;
  roleValue: string;
  menu: number[];
  status: number;
  remark: string;
}

export interface RoleEditModel {
  id: number;
  roleName: string;
  roleValue: string;
  menu: number[];
  status: number;
  remark: string;
}

/**
 * @description: Request list return value
 */
export type AccountListGetResultModel = BasicFetchResult<AccountListItem>;

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];
