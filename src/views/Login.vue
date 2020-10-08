<template>
  <div class="login">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ pattern: /^1[3|4|5|7|8][0-9]{9}$/, required: true, message: '请填写用户名' }]"
      />
      <div class="mi">
        <van-field
          v-model="password"
          :type="type"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ pattern: /^\d{6,12}$/, required: true, message: '请填写密码' }]"
        />
        <div class="Switchss">
          <Switchss @add="add"></Switchss>
        </div>
      </div>

      <div class="yan">
        <van-field
          v-model.trim="captcha_code"
          name="验证码"
          label="验证码"
          placeholder="验证码"
          :rules="[{  required: true, message: '请填写验证码' }]"
        />
        <img @click="gai" :src="imgUrl" alt />
      </div>

      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          :disabled="username==''|| password==''"
          native-type="submit"
        >登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import axios from "axios"; // 全局引用axios
axios.defaults.withCredentials = true; // 检查跨站点访问控制
import Switchss from "./Switch";
export default {
  // 组件名称
  name: "",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: { Switchss }, // 滑块组件
  // 组件状态值
  data() {
    return {
      username: "18843108067", // 账户名
      password: "123456", // 密码
      imgUrl: "", // 验证图片
      captcha_code: "", // 验证码
      type: "password" // 明暗文切换 默认password
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    // 登录
    onSubmit(values) {
      this.setCookie("cap", this.captcha_code, 2); // 验证码
      this.setCookie("SID", 100, 2); // 
      axios
        .post("http://elm.cangdu.org/v2/login", { // 跨域地址
          username: this.username, // 账号参数
          password: this.password, // 密码参数
          captcha_code: this.captcha_code // 验证码参数
        })
        .then(res => {
          console.log(res);
          if (res.data.id != 0) { // 验证跳转\
          localStorage.setItem('user_id',res.data.id)
            this.$router.push("/?id="+res.data.id); // 跳转到首页home
          }
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    setCookie(key, value, t) {
      var oDate = new Date();
      oDate.setDate(oDate.getDate() + t);
      document.cookie = key + "=" + value + "; expires=" + oDate.toDateString();
    },
    gai() {
      axios.post("http://elm.cangdu.org/v1/captchas").then(res => {
        this.imgUrl = res.data.code;
      });
    },
    add(data) {
      data ? (this.type = "text") : (this.type = "password");
    }
  },
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  mounted() {
    this.gai();
  }
};
</script> 

<style scoped lang="scss">
.yan {
  width: 100%;
  position: relative;
  img {
    position: absolute;
    top: 5px;
    right: 60px;
  }
}
.mi {
  width: 100%;
  height: 46px;
  position: relative;
  .Switchss {
    position: absolute;
    top: 14px;
    right: 20px;
  }
}
</style>
