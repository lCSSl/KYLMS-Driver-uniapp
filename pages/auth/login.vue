<template>
  <view class="wrap">
    <u-top-tips ref="uTips"></u-top-tips>
    <view class="top">
    </view>
    <view class="content">
      <view class="title">欢迎</view>
      <view v-if="formType.type" class="form">
        <input v-model="form.phonenumber" class="u-border-bottom" placeholder="请输入手机号" type="number"/>
        <view class="tips">未注册的手机号验证后自动创建账号</view>
      </view>
      <view v-else class="form">
        <u-input v-model="form.username" placeholder="请输入用户名" type="text"/>
        <u-input v-model="form.password" placeholder="请输入密码" type="password"/>
      </view>
      <button :style="[inputStyle]" class="getCaptcha" @tap="submit">{{formType.btnText}}</button>
      <view class="alternative">
        <view class="password" @tap="changeFormType">{{formType.text}}</view>
        <view class="issue">遇到问题</view>
      </view>
    </view>
    <view class="buttom">
      <view class="loginType">
        <view class="wechat item">
          <view class="icon">
            <u-icon color="rgb(129,129,129)" name="weixin-fill" size="70"></u-icon>
          </view>
          微信
        </view>
        <view class="QQ item">
          <view class="icon">
            <u-icon color="rgb(129,129,129)" name="qq-fill" size="70"></u-icon>
          </view>
          QQ
        </view>
      </view>
      <view class="hint">
        登录代表同意
        <text class="link">美团点评用户协议、隐私政策，</text>
        并授权使用您的美团点评账号信息（如昵称、头像、收获地址）以便您统一管理
      </view>
    </view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: 'Hamster',
        password: '123456',
        phonenumber: '13926096022',
      },
      formType: {
        type: false,
        text: '手机号登录',
        btnText: '登录',
      },
      tips: {
        duration: 1000,
        title: '',
        type: 'primary'
      },
      navigateType: 0,
    }
  },
  onLoad( options ) {
    const { navigateType } = options
    this.$u.vuex( 'vuex_access_token', '' )
    this.$u.vuex( 'vuex_expires_in', '' )
    this.$u.vuex( 'vuex_user', {} )
    if ( navigateType ) {
      this.navigateType = +navigateType

      switch ( this.navigateType ) {
        case 1:
          this.tips.duration = 1500
          this.tips.title = '登录状态已过期'
          this.tips.type = 'warning'
          break
        case 2:
          this.tips.duration = 1000
          this.tips.title = '登录状态已过期'
          this.tips.type = 'error'
          break
        case 3:
          this.tips.duration = 3000
          this.tips.title = '当前用户无司机身份'
          this.tips.type = 'error'
          break
      }
      this.showTips()
    }
  },
  computed: {
    inputStyle() {
      let style = {}
      if ( this.form.phonenumber ) {
        style.color = '#fff'
        style.backgroundColor = this.$u.color['warning']
      }
      return style
    }
  },
  methods: {
    showTips() {
      this.$refs.uTips.show( this.tips )
    },
    changeFormType() {
      this.formType.type = !this.formType.type
      if ( this.formType.type ) {
        this.formType.text = '密码登录'
        this.formType.btnText = '获取短信验证码'
      } else {
        this.formType.text = '手机号登录'
        this.formType.btnText = '登录'
      }
    },
    submit() {
      if ( this.formType.type ) {
        if ( this.$u.test.mobile( this.form.phonenumber ) ) {
          this.$u.route( {
            url: `pages/auth/code?phonenumber=${this.form.phonenumber}`
          } )
        }
      } else {
        console.log( this.form )
        this.$u.post( '/auth/login', this.form ).then( res => {
          const { access_token, expires_in } = res
          if ( this.$u.test.isEmpty( access_token ) ) {
            uni.showToast( {
              title: '系统繁忙',
              icon: 'none',
              duration: 2000,
              position: 'top',
            } )
          } else {
            this.$u.vuex( 'vuex_access_token', access_token )
            this.$u.vuex( 'vuex_expires_in', expires_in )
            if ( this.navigateType === 0 ) {
              uni.redirectTo( { url:'/pages/workbench/index?auth=true' } )
            } else {
              // uni.navigateBack()
              const pages = getCurrentPages()
              const prePage = pages[pages.length - 2] //获取上一页
              uni.reLaunch({url:prePage.$page.fullPath})
            }
          }
        } )
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  font-size: 28rpx;
  .content {
    width: 600rpx;
    margin: 80rpx auto 0;

    .title {
      text-align: left;
      font-size: 60rpx;
      font-weight: 500;
      margin-bottom: 100rpx;
    }
    input {
      text-align: left;
      margin-bottom: 10rpx;
      padding-bottom: 6rpx;
    }
    .tips {
      color: $u-type-info;
      margin-bottom: 60rpx;
      margin-top: 8rpx;
    }
    .getCaptcha {
      background-color: rgb(253, 243, 208);
      color: $u-tips-color;
      border: none;
      font-size: 30rpx;
      padding: 12rpx 0;

      &::after {
        border: none;
      }
    }
    .alternative {
      color: $u-tips-color;
      display: flex;
      justify-content: space-between;
      margin-top: 30rpx;
    }
  }
  .buttom {
    .loginType {
      display: flex;
      padding: 350rpx 150rpx 150rpx 150rpx;
      justify-content:space-between;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: $u-content-color;
        font-size: 28rpx;
      }
    }

    .hint {
      padding: 20rpx 40rpx;
      font-size: 20rpx;
      color: $u-tips-color;

      .link {
        color: $u-type-warning;
      }
    }
  }
}

</style>

