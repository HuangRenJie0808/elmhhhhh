<template>
  <div class="switch">
    <div :class="flag == false?'a':'b'">
      abc...
      <p @click="ad"></p>
    </div>
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
      flag: false
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    ad() {
      this.flag = !this.flag;
      this.$emit('add',this.flag)
      if(this.flag == true){
          event.target.style.left = 24 +'px'
      }else{
           event.target.style.left = -6  +'px'
      }
    }
  },
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  mounted() {}
};
</script> 

<style scoped lang="scss">
.switch {
  div {
    width: 46px;
    height: 16px;
    position: relative;
    border-radius: 20px;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #fff;
    p {
      width: 28px;
      height: 28px;
      background-color: #f1f1f1;
      border-radius: 50%;
      position: absolute;
      top: -6px;
      left: -6px;
      transition: all 1s;
    }
  }
  .a {
    background-color: #ccc;
  }
  .b {
    background-color: #4cd964;
  }
}
</style>
