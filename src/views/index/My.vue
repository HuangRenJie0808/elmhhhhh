<template>
  <div class="my">
    <ul class="top">
      <li @click="$router.go(-1)">
        <van-icon name="arrow-left" />
      </li>
      <li>
        <h4>我的</h4>
      </li>
      <li></li>
    </ul>
    <ul class="wo">
      <li>
        <van-image round width="4rem" height="4rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </li>
      <li>
        <h4>{{ arr.username }}</h4>
        <p>
          <van-icon name="orders-o" />暂无绑定手机号
        </p>
      </li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li>
        <van-icon name="arrow" />
      </li>
    </ul>
    <van-grid :border="false" :column-num="3">
      <van-grid-item>
        <div>
          <h3 class="h31">
            {{ arr.balance }}.00
            <span class="span1">元</span>
          </h3>
          <p>我的余额</p>
        </div>
      </van-grid-item>
      <van-grid-item>
        <div>
          <h3 class="h32">
            {{ arr.gift_amount }}
            <span class="span1">个</span>
          </h3>
          <p>我的优惠</p>
        </div>
      </van-grid-item>
      <van-grid-item>
        <div>
          <h3>
            {{ arr.point }}
            <span class="span1">分</span>
          </h3>
          <p>我的积分</p>
        </div>
      </van-grid-item>
    </van-grid>
    <div class="list">
      <van-notice-bar background="#fff" color="#000" left-icon="friends" text="我的订单" />
      <van-notice-bar background="#fff" color="#000" left-icon="shopping-cart" text="积分商城" />
      <van-notice-bar background="#fff" color="#000" left-icon="balance-list" text="饿了么会员卡" />
      <van-notice-bar
        style="margin-top: 10px"
        background="#fff"
        color="#000"
        left-icon="phone-circle"
        text="服务中心"
      />
      <van-notice-bar background="#fff" color="#000" left-icon="down" text="下载饿了么" />
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
      arr: []
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
    //?user_id=55470
    axios
      .get("http://elm.cangdu.org/v1/user?user_id=" + this.$route.query.id)
      .then(res => {
        console.log(res);
        this.arr = res.data;
      });
  }
};
</script> 

<style scoped lang="scss">
.top {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  line-height: 45px;
  background-color: #3190e8;
  li {
    color: #fff;
  }
}
.wo {
  width: 100%;
  display: flex;
  height: 80px;
  box-sizing: border-box;
  padding: 15px;
  align-items: center;
  justify-content: space-between;
  background: #3190e8;
  li {
    color: #fff;
  }
  //   li:nth-of-type(2){
  //      margin-left: 20px;
  //   }
  //   li:nth-of-type(3){
  //       margin-left: 100px;
  //   }
}

.van-grid-item {
  div {
    h3 {
      font-size: 24px;
      color: #f90;
      .span1 {
        font-size: 12px;
        font-weight: normal;
        color: #333;
      }
    }
    .h31 {
      color: #ff5f3e;
    }
    .h32 {
      color: #6ac20b;
    }
    p {
      color: #333;
      font-size: 14px;
    }
  }
}
.list {
  margin-top: 20px;
}
</style>
