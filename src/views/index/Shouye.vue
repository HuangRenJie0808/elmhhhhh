<template>
  <div>
    <!-- 头部 -->
    <van-sticky>
      <header>
        <p>
          <van-icon name="search" />
        </p>
        <p style="width:240px">{{ top.address }}</p>
        <p>
          <van-icon name="contact" />
        </p>
      </header>
    </van-sticky>
    <!-- 轮播九宫格 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="red">
      <van-swipe-item>
        <van-grid :column-num="4">
          <van-grid-item
            v-for="(item,index) in jiu"
            :key="index"
            :text="item.title"
            v-show="index < 8"
          >
            <template #icon>
              <van-image
                width="50"
                height="50"
                :src="'https://fuss10.elemecdn.com/'+item.image_url"
              />
            </template>
          </van-grid-item>
        </van-grid>
      </van-swipe-item>
      <van-swipe-item>
        <van-grid :column-num="4">
          <van-grid-item
            v-for="(item,index) in jiu"
            :key="index"
            :text="item.title"
            v-show="index > 7"
          >
            <template #icon>
              <van-image
                width="50"
                height="50"
                :src="'https://fuss10.elemecdn.com/'+item.image_url"
              />
            </template>
          </van-grid-item>
        </van-grid>
      </van-swipe-item>
    </van-swipe>
    <!-- 渲染商品 -->
    <van-card
      v-for="(item,index) in shop"
      :key="index"
      :thumb="`http://elm.cangdu.org/img/${item.image_path}`"
    >
      <template #title>
        <!-- 头 -->
        <div class="tou">
          <h4>{{item.name}}</h4>
          <p>
            <span v-for="(i,k) in item.supports" :key="k">{{i.icon_name}}</span>
          </p>
        </div>
        <!-- 中 -->
        <div class="zhong">
          <h4>
            <van-rate
              v-model="item.rating"
              allow-half
              void-icon="star"
              void-color="#eee"
              size="10px"
            />
            <span>{{item.rating}} 月销{{ item.recent_order_num}}单</span>
          </h4>
          <p>
            <span>{{item.delivery_mode.text }}</span> |
            <span>准时达</span>
          </p>
        </div>
        <!-- 尾 -->
        <div class="wei">
          <h4>{{`￥${item.float_minimum_order_amount}起送/${item.piecewise_agent_fee.tips }`}}</h4>
          <p>{{`${item.distance}/${item.order_lead_time}`}}</p>
        </div>
      </template>
    </van-card>
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
      top: JSON.parse(localStorage.getItem("val")),
      jiu: [],
      shop:  [],
      value: 0
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
  mounted() {
    axios
      .get("http://elm.cangdu.org/v2/pois/" + this.$route.query.geohash)
      .then(res => {
        console.log(res);
        // this.top = res.data;
      });
    axios.get("http://elm.cangdu.org/v2/index_entry").then(res => {
      console.log(res);
      this.jiu = res.data;
    });
    axios
      .get(
        "http://elm.cangdu.org/shopping/restaurants?latitude=39.151217&longitude=117.089427&offset=0&limit=20&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]="
      )
      .then(res => {
        console.log(res);
        this.shop = res.data;
      });
  }
};
</script> 

<style scoped lang="scss">
// 头部布局
header {
    
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  box-sizing: border-box;
  background-color: #3190e8;
  p {
      overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #fff;
    font-size: 20px;
  }
}
// 轮播图
.my-swipe .van-swipe-item {
  width: 100%;
  //   height: 180px;
  color: #fff;
  text-align: center;
  background-color: #fff;
}
.tou,
.zhong,
.wei {
  display: flex;
  justify-content: space-between;
}
.tou {
  margin-top: 5px;
  h4 {
    font-weight: normal;
    font-size: 16px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 180px;
  }
  p {
    font-size: 10px;
    color: #ccc;
    span {
      margin-left: 3px;
      font-size: 8px;
    }
  }
}
.zhong {
  margin-top: 14px;
  h4 {
    font-weight: normal;
    font-size: 10px;
    color: #aaa;
  }
  p {
    span {
      font-size: 8px;
    }
  }
}
.wei {
  margin-top: 15px;

  h4 {
    font-weight: normal;
    font-size: 10px;
  }
  p {
    font-size: 8px;
  }
}
</style>
