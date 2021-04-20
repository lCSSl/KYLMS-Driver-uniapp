<template>
  <view class="nav-wrap">
    <view class="nav-title">
      <u-avatar :src="user.avatar" size="160"></u-avatar>
      <!--			<image class="logo" :src="vuex_user.avatar" mode="widthFix"></image>-->
      <!--			<image class="logo" src="https://cdn.uviewui.com/uview/common/logo.png" mode="widthFix"></image>-->
      <view class="nav-info">
        <view class="nav-title__text">
          <!--					{{$t( 'common.title' )}}-->
          司机 {{user.nickName}}，你好
        </view>
        <view class="nav-slogan">
          {{$t( 'common.intro' )}}
        </view>
      </view>
    </view>
    <view class="nav-desc">
      {{desc}}
    </view>
    <view class="lang" @tap="switchLang">
      <u-icon :name="lang" color="warning" size="46"></u-icon>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    desc: String,
    title: String,
  },
  computed: {
    lang() {
      return this.$i18n.locale == 'zh' ? 'zh' : 'en'
    },
    user() {
      return {
        nickName: this.vuex_user.nickName ? this.vuex_user.nickName : '',
        avatar: this.vuex_user.avatar ? this.vuex_user.avatar : 'http://server.kaiyu.work:9000/test/logo.png'
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    switchLang() {
      this.$i18n.locale = this.$i18n.locale == 'en' ? 'zh' : 'en'
      this.vuex_tabbar[0].text = this.$t( 'nav.workbench' )
      this.vuex_tabbar[1].text = this.$t( 'nav.userCenter' )
      this.vuex_tabbar[2].text = this.$t( 'nav.components' )
      this.vuex_tabbar[3].text = this.$t( 'nav.js' )
      this.vuex_tabbar[4].text = this.$t( 'nav.template' )
      uni.setNavigationBarTitle( {
        title: this.$t( this.title )
      } )
    }
  },
  mounted() {
    const user = this.vuex_user
    this.$u.get( '/system/user/getDriverInfo' ).then( res => {
      this.$u.vuex( 'vuex_user', res );
      if ( user && user.userId ) {

      } else {
        uni.redirectTo({url:'/pages/workbench/index'})
      }
    } )

  }
}
</script>

<style lang="scss" scoped>
.nav-wrap {
  padding: 15px;
  position: relative;
}

.lang {
  position: absolute;
  top: 15px;
  right: 15px;
}

.nav-title {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
}

.nav-info {
  margin-left: 15px;
}

.nav-title__text {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  color: $u-main-color;
  font-size: 25px;
  font-weight: bold;
}

.logo {
  width: 70px;
  /* #ifndef APP-NVUE */
  height: auto;
  /* #endif */
}

.nav-slogan {
  color: $u-tips-color;
  font-size: 14px;
}

.nav-desc {
  margin-top: 10px;
  font-size: 14px;
  color: $u-content-color;
}
</style>
