<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <CategoryTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button v-auth="'article:btn:add'" type="primary" @click="handleCreate"
          >添加文章</a-button
        >
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:info-standard-line',
              tooltip: '查看文章详情',
              onClick: handleView.bind(null, record),
              auth: ['article:btn:detail'],
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑',
              onClick: handleEdit.bind(null, record),
              auth: ['article:btn:edit'],
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除',
              auth: ['article:btn:delete'],
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
      <template #img="{ text }">
        <TableImg :size="60" :simpleShow="true" :imgList="text" />
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';

  import { BasicTable, useTable, TableAction, TableImg } from '/@/components/Table';
  import { ArticleDelete, getArticleList } from '/@/api/content/article';
  import { PageWrapper } from '/@/components/Page';
  import CategoryTree from './CategoryTree.vue';
  import { useRouter } from 'vue-router';

  import { columns, searchFormSchema } from './article.data';
  import { useGo } from '/@/hooks/web/usePage';

  export default defineComponent({
    name: 'AccountManagement',
    components: { BasicTable, PageWrapper, CategoryTree, TableAction, TableImg },
    setup() {
      const go = useGo();
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload, updateTableDataRecord }] = useTable({
        title: '账号列表',
        api: getArticleList,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        handleSearchInfoFn(info) {
          //console.log('handleSearchInfoFn', info);
          return info;
        },
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      const router = useRouter();

      function handleCreate() {
        go('/content/article/article_add');
      }

      function handleEdit(record: Recordable) {
        router.push({ path: '/content/article/article_edit', query: { id: record.id } });
      }

      async function handleDelete(record: Recordable) {
        let result = await ArticleDelete(record.id);
        if (result) {
          await reload();
        }
      }

      function handleSuccess({ isUpdate, values }) {
        if (isUpdate) {
          // 演示不刷新表格直接更新内部数据。
          // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
          /*const result = */ updateTableDataRecord(values.id, values);
          //console.log(result);
        } else {
          reload();
        }
      }

      function handleSelect(categoryId = '') {
        searchInfo.categoryId = categoryId;
        reload();
      }

      function handleView(record: Recordable) {
        go('/content/article/article_detail/' + record.id);
      }

      return {
        registerTable,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
        handleView,
        searchInfo,
      };
    },
  });
</script>
