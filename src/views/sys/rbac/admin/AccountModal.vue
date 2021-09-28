<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { accountFormSchema } from './account.data';
  import { AccountAdd, AccountEdit, getDeptList } from '/@/api/sys/rbac/system';
  import { AccountRequestModel } from '/@/api/sys/rbac/model/systemModel';

  export default defineComponent({
    name: 'AccountModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref(0);

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: accountFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        await resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          await setFieldsValue({
            ...data.record,
          });
        }

        const treeData = await getDeptList();
        await updateSchema([
          {
            field: 'pwd',
            required: !unref(isUpdate),
            //show: !unref(isUpdate),
          },
          {
            field: 'dept',
            componentProps: { treeData },
          },
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });

          let params: AccountRequestModel = values;

          let isUpdateBool = unref(isUpdate);
          if (isUpdateBool) {
            params.id = rowId.value;
            let result = await AccountEdit(params);
            if (result) {
              closeModal();
            }
          } else {
            let result = await AccountAdd(params);
            if (result) {
              closeModal();
            }
          }
          let myValues = { ...values, id: rowId.value };
          //TODO 由于部门觉色比较特殊，不在更新的字段之内所以处理一下才给展示, 结合提交的id，加上后台获取的list
          //得到值
          emit('success', { isUpdate: isUpdateBool, values: myValues });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
