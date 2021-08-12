<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './dept.data';

  import { DeptAdd, DeptEdit, getDeptList } from '/@/api/demo/system';
  export default defineComponent({
    name: 'DeptModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);

      let id = 0;

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
          id = data.record.id;
          await setFieldsValue({
            ...data.record,
          });
        }
        const treeData = await getDeptList();
        await updateSchema({
          field: 'parentDept',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增部门' : '编辑部门'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });

          let parentId = '0';
          if (values.parentDept) {
            values.parentDept = values.parentDept + '';
            parentId = values.parentDept.substring(values.parentDept.lastIndexOf('-') + 1);
          }

          // TODO custom api
          if (unref(isUpdate)) {
            let result = await DeptEdit({
              id: id,
              deptName: values.deptName,
              description: values.remark,
              status: values.status,
              parentId: parentId,
              sortOrder: values.orderNo,
            });
            if (result) {
              closeModal();
              emit('success');
            }
          } else {
            let result = await DeptAdd({
              deptName: values.deptName,
              description: values.remark,
              status: values.status,
              parentId: parentId,
              sortOrder: values.orderNo,
            });
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
