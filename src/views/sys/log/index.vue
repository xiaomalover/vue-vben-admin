<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-auth="'log:btn:clear'" type="primary" @click="handleClear"> 清空日志 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              auth: ['log:btn:delete'],
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, h } from 'vue';

  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { getLogListByPage, LogClear, LogDelete } from '/@/api/sys/rbac/system';

  import { columns, searchFormSchema } from './log.data';
  import { useMessage } from "/@/hooks/web/useMessage";

  export default defineComponent({
    name: 'LogManagement',
    components: { BasicTable, TableAction },
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '系统日志列表',
        api: getLogListByPage,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      async function handleDelete(record: Recordable) {
        let result = await LogDelete(record.id);
        if (result) {
          handleSuccess();
        }
      }

      async function handleClear() {
        const { createConfirm } = useMessage();
        createConfirm({
          iconType: 'warning',
          title: () => h('span', "清空日志"),
          content: () => h('span', "即将删除所有日志记录，是否确定？"),
          onOk: async () => {
            let result = await LogClear();
            if (result) {
              handleSuccess();
            }
          },
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        handleDelete,
        handleClear,
        handleSuccess,
      };
    },
  });
</script>
