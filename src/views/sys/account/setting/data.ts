import { FormSchema } from '/@/components/Form';

export interface ListItem {
  key: string;
  title: string;
  description: string;
  extra?: string;
  avatar?: string;
  color?: string;
}

// tab的list
export const settingList = [
  {
    key: '1',
    name: '基本设置',
    component: 'BaseSetting',
  },
  {
    key: '2',
    name: '修改密码',
    component: 'SecureSetting',
  },
];

// 基础设置 form
export const baseSetschemas: FormSchema[] = [
  {
    field: 'username',
    component: 'Input',
    componentProps: { readonly: true },
    label: '用户名',
    colProps: { span: 18 },
  },
  {
    field: 'mobile',
    component: 'Input',
    label: '手机号',
    colProps: { span: 18 },
  },
  {
    field: 'email',
    component: 'Input',
    label: '邮箱',
    colProps: { span: 18 },
  },
  {
    field: 'nickname',
    component: 'Input',
    label: '昵称',
    colProps: { span: 18 },
  },
  {
    field: 'description',
    component: 'InputTextArea',
    label: '个人简介',
    colProps: { span: 18 },
  },
];

// 修改密码 form
export const passwordSetSchemas: FormSchema[] = [
  {
    field: 'oldPassword',
    label: '当前密码',
    component: 'InputPassword',
    required: true,
  },
  {
    field: 'password',
    label: '新密码',
    component: 'InputPassword',
    required: true,
  },
  {
    field: 'confirmPassword',
    label: '确认密码',
    component: 'InputPassword',

    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('确认密码不能为空');
            }
            if (value !== values.password) {
              return Promise.reject('两次输入的密码不一致!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
];
