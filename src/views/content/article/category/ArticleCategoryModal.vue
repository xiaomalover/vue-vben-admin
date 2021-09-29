<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './category.data';
  import { CategoryAdd, CategoryEdit, getCategoryList } from '/@/api/content/article';
  import { CategoryRequestModel } from '/@/api/content/model/articleModel';

  export default defineComponent({
    name: 'ArticleCategoryModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref(0);

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        await resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          //避免出现选中项显示为0
          if (data.record.parentCategory == 0) {
            data.record.parentCategory = null;
          }
          rowId.value = data.record.id;
          await setFieldsValue({
            ...data.record,
          });
        }
        const treeData = await getCategoryList();
        await updateSchema({
          field: 'parentCategory',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增部门' : '编辑部门'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });

          let parentId = '0';
          if (values.parentCategory) {
            values.parentCategory = values.parentCategory + '';
            parentId = values.parentCategory.substring(values.parentCategory.lastIndexOf('-') + 1);
          }
          values.parentCategory = parentId;

          let params: CategoryRequestModel = values;

          if (unref(isUpdate)) {
            params.id = rowId.value;
            let result = await CategoryEdit(params);
            if (result) {
              closeModal();
              emit('success');
            }
          } else {
            let result = await CategoryAdd(params);
            if (result) {
              closeModal();
              emit('success');
            }
          }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
