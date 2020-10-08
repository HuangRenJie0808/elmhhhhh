<template>
  <div class="index">
    <div class="box">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="music-o" to="/index/shouye">外卖</van-tabbar-item>
      <van-tabbar-item icon="search">搜索</van-tabbar-item>
      <van-tabbar-item icon="apps-o">订单</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/index/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      active: 0
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  mounted() {}
};
</script> 

<style scoped lang="scss">
</style>
