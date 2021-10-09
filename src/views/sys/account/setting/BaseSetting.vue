<template>
  <CollapseContainer title="基本设置" :canExpan="false">
    <a-row :gutter="24">
      <a-col :span="14">
        <BasicForm @register="register" />
      </a-col>
      <a-col :span="10">
        <div class="change-avatar">
          <div class="mb-2">头像</div>
          <CropperAvatar
            :uploadApi="avatarUploadApi"
            :value="avatar"
            btnText="更换头像"
            :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
            @change="updateAvatar"
            width="150"
          />
        </div>
      </a-col>
    </a-row>
    <Button v-auth="'setting:btn:basic'" type="primary" @click="handleSubmit">
      更新基本信息
    </Button>
  </CollapseContainer>
</template>
<script lang="ts">
  import { Button, Row, Col } from 'ant-design-vue';
  import { computed, defineComponent, onMounted, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { CollapseContainer } from '/@/components/Container';
  import { CropperAvatar } from '/@/components/Cropper';

  import { useMessage } from '/@/hooks/web/useMessage';

  import headerImg from '/@/assets/images/header.jpg';
  import { accountEdit, accountInfoApi } from '/@/api/sys/rbac/account';
  import { baseSetschemas } from './data';
  import { useUserStore } from '/@/store/modules/user';
  import { uploadApi } from '/@/api/sys/common/upload';
  import { GetAccountInfoModel } from '/@/api/sys/rbac/model/accountModel';

  export default defineComponent({
    components: {
      BasicForm,
      CollapseContainer,
      Button,
      ARow: Row,
      ACol: Col,
      CropperAvatar,
    },
    setup() {
      const { createMessage } = useMessage();
      const userStore = useUserStore();

      const avatarUrl = ref('');

      const [register, { setFieldsValue, validate }] = useForm({
        labelWidth: 120,
        schemas: baseSetschemas,
        showActionButtonGroup: false,
      });

      onMounted(async () => {
        const data = await accountInfoApi();
        await setFieldsValue(data);
      });

      const avatar = computed(() => {
        const { avatar } = userStore.getUserInfo;
        return avatar || headerImg;
      });

      async function avatarUploadApi(params) {
        params.folder = 'admin-avatar';
        return uploadApi(params, function () {});
      }

      async function updateAvatar({ source, data }) {
        //先存入缓存
        const userInfo = userStore.getUserInfo;
        userInfo.avatar = source;
        userStore.setUserInfo(userInfo);

        //路径提交后台保存
        avatarUrl.value = data.result.url; //这里是上传返回的数据
      }

      async function handleSubmit() {
        try {
          let params: GetAccountInfoModel = await validate();
          params.avatar = avatarUrl.value;
          await accountEdit(params);
          createMessage.success('更新成功！');
        } finally {
        }
      }

      return {
        avatar,
        register,
        avatarUrl,
        uploadApi: uploadApi as any,
        updateAvatar,
        avatarUploadApi,
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
