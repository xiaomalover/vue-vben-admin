import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { Tinymce } from '/@/components/Tinymce';
import { h } from 'vue';
import { uploadApi } from '/@/api/sys/common/upload';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '缩略图',
    dataIndex: 'thumb',
    width: 100,
    slots: { customRender: 'img' },
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: 120,
  },
  {
    title: '分类',
    dataIndex: 'categoryName',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
    colProps: { span: 8 },
  },
];

export const articleFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '文章标题',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入文章标题',
      },
    ],
  },
  {
    field: 'categoryId',
    label: '所属分类',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        title: 'categoryName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },

  {
    field: 'thumb',
    component: 'Upload',
    label: '缩略图',
    colProps: {
      span: 8,
    },
    rules: [{ required: true, message: '请选择上传文件' }],
    componentProps: {
      api: uploadApi,
      multiple: false,
      maxNumber: 1,
      maxSize: 10,
      uploadParams: { folder: 'article-thumb' },
      accept: ['jpg', 'jpeg', 'gif', 'png', 'webp'],
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
    required: true,
  },
  {
    field: 'summary',
    label: '文章简介',
    component: 'InputTextArea',
    required: true,
  },
  {
    field: 'content',
    component: 'Input',
    label: '文章内容',
    rules: [{ required: true }],
    render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
];
