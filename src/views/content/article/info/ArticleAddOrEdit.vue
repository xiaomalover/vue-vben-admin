<template>
  <div style="padding: 50px">
    <BasicForm @register="registerForm" @submit="handleSubmit" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { articleFormSchema } from './article.data';
  import { ArticleAdd, ArticleEdit, getCategoryList, getArticleInfo } from '/@/api/content/article';
  import { useRoute, useRouter } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';

  export default defineComponent({
    name: 'DeptModal',
    components: { BasicForm },
    emits: ['success', 'register'],
    setup() {
      const [registerForm, { updateSchema, validate, setFieldsValue, resetFields }] = useForm({
        labelWidth: 100,
        schemas: articleFormSchema,
        showSubmitButton: true,
        submitButtonOptions: { text: '提交' },
      });

      const route = useRoute();
      const router = useRouter();
      const id = route.query?.id;
      const { closeCurrent } = useTabs();

      onMounted(async () => {
        //将分类数据动态写入表单项
        const treeData = await getCategoryList({ status: 1 });
        await updateSchema({
          field: 'categoryId',
          componentProps: { treeData },
        });

        //初始化表单
        await resetFields();
        //更新存入数据
        if (id) {
          const data = await getArticleInfo(Number(id));
          await setFieldsValue(data);
        }
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          if (id) {
            values.id = id;
            let result = await ArticleEdit(values);
            if (result) {
              await closeCurrent();
              await router.push({ path: '/content/article/info' });
            }
          } else {
            let result = await ArticleAdd(values);
            if (result) {
              await closeCurrent();
              await router.push({ path: '/content/article/info' });
            }
          }
        } finally {
        }
      }

      return { registerForm, handleSubmit };
    },
  });
</script>
