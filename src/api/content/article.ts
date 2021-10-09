import {
  CategoryListGetResultModel,
  CategorySearchModel,
  CategoryRequestModel,
  ArticleListGetResultModel,
  ArticleInfoModel,
} from './model/articleModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  CategoryList = '/article/category/getCategoryTree',
  CategoryAdd = '/article/category/add',
  CategoryEdit = '/article/category/edit',
  CategoryDelete = '/article/category/delete',
  ArticleList = '/article/getByCondition',
  ArticleInfo = '/article/detail',
  ArticleAdd = '/article/add',
  ArticleEdit = '/article/edit',
  ArticleDelete = '/article/delete',
}

export const getCategoryList = (params?: CategorySearchModel) =>
  defHttp.get<CategoryListGetResultModel>({ url: Api.CategoryList, params });

export const CategoryAdd = (params: CategoryRequestModel) =>
  defHttp.post({ url: Api.CategoryAdd, params });

export const CategoryEdit = (params: CategoryRequestModel) =>
  defHttp.post({ url: Api.CategoryEdit, params });

export const CategoryDelete = (id: number) =>
  defHttp.delete({ url: Api.CategoryDelete + '/' + id });

export const getArticleList = (params?: ArticleInfoModel) =>
  defHttp.get<ArticleListGetResultModel>({ url: Api.ArticleList, params });

export const getArticleInfo = (id: number) => defHttp.get({ url: Api.ArticleInfo + '/' + id });

export const ArticleAdd = (params: CategoryRequestModel) =>
  defHttp.post({ url: Api.ArticleAdd, params });

export const ArticleEdit = (params: CategoryRequestModel) =>
  defHttp.post({ url: Api.ArticleEdit, params });

export const ArticleDelete = (id: number) => defHttp.delete({ url: Api.ArticleDelete + '/' + id });
