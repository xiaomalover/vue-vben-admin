<template>
  <CollapseContainer title="修改密码" :canExpan="false">
    <a-row :gutter="24">
      <a-col>
        <BasicForm @register="register" />
      </a-col>
    </a-row>
    <Button v-auth="'setting:btn:password'" type="primary" @click="handleSubmit"> 修改密码 </Button>
  </CollapseContainer>
</template>
<script lang="ts">
  import { Button, Row, Col } from 'ant-design-vue';
  import { defineComponent } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { passwordSetSchemas } from './data';
  import { PasswordRequestModel } from '/@/api/sys/rbac/model/accountModel';
  import { changePasswordApi } from '/@/api/sys/rbac/account';

  export default defineComponent({
    components: {
      BasicForm,
      CollapseContainer,
      Button,
      ARow: Row,
      ACol: Col,
    },
    setup() {
      const { createMessage } = useMessage();

      const [register, { validate, resetFields }] = useForm({
        labelWidth: 120,
        schemas: passwordSetSchemas,
        showActionButtonGroup: false,
      });

      async function handleSubmit() {
        try {
          let params: PasswordRequestModel = await validate();
          await changePasswordApi(params);
          createMessage.success('更新成功！');
          await resetFields();
        } finally {
        }
      }

      return {
        register,
        handleSubmit,
      };
    },
  });
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
