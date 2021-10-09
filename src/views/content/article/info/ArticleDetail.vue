<template>
  <PageWrapper
    :title="'文章详情：' + articleInfo.title"
    content=""
    contentBackground
    @back="goBack"
  >
    <template #extra>
      <a-button type="primary" @click="editArticle"> 编辑文章 </a-button>
    </template>

    <div class="pt-4 m-4 desc-wrap">
      <p style="text-align: center">{{ articleInfo.title }}</p>
      <p style="padding: 100px 200px"><span v-html="articleInfo.content"></span></p>
    </div>
  </PageWrapper>
</template>

<script>
  import { defineComponent, onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { useGo } from '/@/hooks/web/usePage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { getArticleInfo } from '/@/api/content/article';

  export default defineComponent({
    name: 'ArticleDetail',
    components: { PageWrapper },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const go = useGo();
      // 此处可以得到用户ID
      const articleId = ref(route.params?.id);
      const { setTitle, closeCurrent } = useTabs();

      const articleInfo = ref({});

      async function fetch() {
        articleInfo.value = await getArticleInfo(articleId.value);
        // 设置Tab的标题（不会影响页面标题）
        setTitle('文章详情：' + articleInfo.value.title);
      }

      onMounted(() => {
        fetch();
      });

      // 页面左侧点击返回链接时的操作
      function goBack() {
        // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
        go('/content/article/info');
      }

      function editArticle() {
        closeCurrent();
        router.push({ path: '/content/article/article_edit', query: { id: articleId.value } });
      }

      return { articleId, goBack, articleInfo, editArticle };
    },
  });
</script>

<style></style>
