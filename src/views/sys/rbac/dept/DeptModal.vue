<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './dept.data';
  import { DeptAdd, DeptEdit, getDeptList } from '/@/api/sys/rbac/system';
  import { DeptRequestModel } from '/@/api/sys/rbac/model/systemModel';

  export default defineComponent({
    name: 'DeptModal',
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
          if (data.record.parentDept == 0) {
            data.record.parentDept = null;
          }
          rowId.value = data.record.id;
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
          values.parentDept = parentId;

          let params: DeptRequestModel = values;

          if (unref(isUpdate)) {
            params.id = rowId.value;
            let result = await DeptEdit(params);
            if (result) {
              closeModal();
              emit('success');
            }
          } else {
            let result = await DeptAdd(params);
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
