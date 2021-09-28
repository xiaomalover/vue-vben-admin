import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import moment from 'moment'
import { h } from "vue";

export const columns: BasicColumn[] = [
  {
    title: '操作内容',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '操作人',
    dataIndex: 'username',
    width: 100,
  },
  {
    title: '操作IP',
    dataIndex: 'ip',
    width: 100,
  },
  {
    title: '请求地址',
    dataIndex: 'requestUrl',
    width: 100,
  },
  {
    title: '请求方法',
    dataIndex: 'requestType',
    width: 50,
  },
  {
    title: '请求参数',
    dataIndex: 'requestParam',
    width: 300,
  },
  {
    title: '请求耗时(毫秒)',
    dataIndex: 'costTime',
    width: 80,
  },
  {
    title: '操作时间',
    dataIndex: 'createdAt',
    width: 100,
    customRender: ({ record }) => {
      return h(() => moment(record.createdAt * 1000).format('YYYY-MM-DD HH:mm:ss'));
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'key',
    label: '关键字',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'startDate',
    label: '开始时间',
    component: 'DatePicker',
    colProps: { span: 4 },
  },
  {
    field: 'endDate',
    label: '结束时间',
    component: 'DatePicker',
    colProps: { span: 4 },
  },
];
