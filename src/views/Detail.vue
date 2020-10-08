<template>
  <div>
    <van-sticky>
      <van-nav-bar
        :title="list.name"
        left-text="返回"
        right-text="切换城市"
        left-arrow
        @click-left="$router.go(-1)"
        @click-right="$router.go(-1)"
      />
      <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" />
      <van-button type="primary" color="#1989fa" @click="search" block>搜索</van-button>
    </van-sticky>
    <!-- 搜索显示 -->
    <ul>
      <li
        v-for="(item,index) in detail"
        :key="index"
        @click="history(item)"
        v-show="detail.length!=0"
      >
        <p class="p1">{{ item.name }}</p>
        <p class="p2">{{ item.address }}</p>
      </li>
    </ul>
    <!-- 历史记录 -->
    <h4>历史记录</h4>
    <ul>
      <li v-for="(item,index) in arr" :key="index" v-show="detail.length==0">
        <p class="p1">{{ item.name }}</p>
        <p class="p2">{{ item.address }}</p>
      </li>
    </ul>
    <!-- 全部清空 -->
    <h4 @click="arr=[]">全部清空</h4>
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
      list: "",
      value: "",
      detail: [],
      arr: JSON.parse(localStorage.getItem("arr")) || [],
      flag: false
    };
  },
  // 计算属性
  computed: {},
  // 侦听器,
  watch: {
    arr(newValue, oldValue) {
      localStorage.setItem("arr",JSON.stringify(newValue))
    }
  },
  // 组件方法
  methods: {
    async search(index) {
      let keyValue = await axios.get(
        "http://elm.cangdu.org/v1/pois?type=serach&city_id=" +
          this.list.id +
          "&keyword=" +
          this.value
      );
      this.detail = keyValue.data;
    },
    history(val) {
      let newArr = this.arr.some(item => {
        return item.name.includes(val.name);
      });

      if (!newArr) {
        if (this.arr.length >= 5) {
            this.arr.splice(4,1);
            } 
          this.arr.unshift(val);
        
      }
      console.log(val)
      this.$router.push("/index/shouye?geohash="+val.geohash)
    }
  },
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  async mounted() {
    let url = "http://elm.cangdu.org/v1/cities/" + this.$route.query.id;
    let hot = await axios.get(url);
    // console.log(hot);
    this.list = hot.data;
    
  }
};
</script> 

<style scoped lang="scss">
li {
  padding-top: 15px;
  border-top: 2px solid #cccccc;
}
.p1 {
  margin: 0 18px 8px 18px;
  font-size: 14px;
  color: #333;
}
.p2 {
  margin: 0 18px 12px 18px;
  font-size: 12px;
  color: #ccc;
}
</style>
