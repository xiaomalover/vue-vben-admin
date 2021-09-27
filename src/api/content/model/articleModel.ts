import { BasicFetchResult } from '/@/api/model/baseModel';

export interface CategoryListItem {
  id: string;
  orderNo: string;
  createTime: string;
  remark: string;
  status: number;
}

export interface CategorySearchModel {
  categoryName?: string;
  status?: number;
}

export interface ArticleInfoModel {
  id: number;
  title: string;
  categoryId: number;
  thumb: string[];
  remark: string;
  status: number;
}

export interface CategoryRequestModel {
  id?: number;
  categoryName: string;
  orderNo: string;
  parentCategory: string;
  remark: string;
  status: number;
}

/**
 * @description: Request list return value
 */

export type CategoryListGetResultModel = BasicFetchResult<CategoryListItem>;

export type ArticleListGetResultModel = BasicFetchResult<ArticleInfoModel>;
