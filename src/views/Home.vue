<template>
  <div class="home">
    <!-- 头部吸顶 -->
    <van-sticky>
      <div class="top" v-show="!flag">
        <p>ele.me</p>
        <p v-show="id==0">
          <router-link tag="span" to="/login">登录</router-link>|
          <router-link tag="span" to="/">注册</router-link>
        </p>
        <p v-show="id!=0"><van-icon name="manager-o" /></p>
      </div>
      <div class="top" @click="topTo" v-show="flag">点击回到顶部</div>
    </van-sticky>

    <!-- 当前位置 -->
    <p class="guess_city">{{guessCity}}</p>
    <!-- 热门城市 -->
    <p class="city_title">热门城市</p>
    <van-grid :border="true" :column-num="4">
      <van-grid-item
        v-for="(item,index) in hots"
        :text="item.name"
        :key="index"
        @click="$router.push('/detail?id='+item.id)"
      />
    </van-grid>
    <!-- 列表 -->
    <van-index-bar :index-list="list">
      <van-index-anchor v-for="(item,key,index) in lists" :key="index" :index="key">
        {{ key }}{{item.id}}
        <!-- <van-cell v-for="(i,k) in item" :key="k" :title="i.name" /> -->
        <van-grid :border="true" :column-num="3">
          <van-grid-item
            v-for="(i,k) in item"
            :key="k"
            :text="i.name"
            @click="$router.push('/detail?id='+i.id)"
          />
        </van-grid>
      </van-index-anchor>
    </van-index-bar>
  </div>
</template>

<script>
import { citys } from "@/utils/_axios";
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
      indexList: [],
      list: [],
      hots: [],
      guessCity: [],
      lists: [],
      flag: false,id:0
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    // 滑动大于600px时 显示返回顶部 小于600px时隐藏
    isScroll() {
      let scrollY = document.documentElement.scrollTop;
      if (scrollY > 600) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    // 点击返回顶部
    topTo() {
      document.documentElement.scrollTop = 0;
    },
    async cityCode() {
      // 列表
      let res = await citys("group");
      this.lists = res.data;
      this.list = Object.keys(this.lists);
      // 热门城市
      let hot = await citys("hot");
      this.hots = hot.data;
      // 当前位置
      let city = await citys("guess");
      this.guessCity = city.data.name;
      //  排序对象
      function objKeySort(obj) {
        //排序的函数
        var newkey = Object.keys(obj).sort(); //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
        var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
        for (var i = 0; i < newkey.length; i++) {
          //遍历newkey数组
          newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
        }
        return newObj; //返回排好序的新对象
      }
      this.lists = objKeySort(this.lists); //函数执行
      // 排序数组
      this.list.sort();
    }
  },

  created() {
    // 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
  },
  mounted() {
    this.id=this.$route.query.id
    console.log(this.id);
    // 请求接口
    this.cityCode();
    // 监听scroll事件
    window.addEventListener("scroll", this.isScroll);
  }
};
</script> 

<style scoped lang="scss">
.top {
  width: 100%;
  height: 46px;
  line-height: 46px;
  background-color: #3190e8;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
  color: #fff;
}
.van-nav-bar {
  .van-nav-bar__text {
    color: #fff;
  }
}
.city_title {
  color: #666;
  font-weight: 400;
  text-indent: 0.45rem;
  border-top: 2px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  font: 0.55rem/1.45rem Helvetica Neue;
}
.guess_city {
  border-top: 1px solid #e4e4e4;
  border-bottom: 2px solid #e4e4e4;
  line-height: 42px;
  font-size: 18px;
  text-indent: 10px;
}
.van-index-anchor {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .van-cell {
    flex: 1;
  }
}
</style>

