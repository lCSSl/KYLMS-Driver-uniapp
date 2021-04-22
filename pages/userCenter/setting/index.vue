<template>
  <view>
    <u-navbar :border-bottom="false" :is-back="false" title="　">
    </u-navbar>
    <!--
    <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item icon="rmb-circle" title="支付"></u-cell-item>
      </u-cell-group>
    </view>
    <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item icon="star" title="收藏"></u-cell-item>
        <u-cell-item icon="photo" title="相册"></u-cell-item>
        <u-cell-item icon="coupon" title="卡券"></u-cell-item>
        <u-cell-item icon="heart" title="关注"></u-cell-item>
      </u-cell-group>
    </view>
    -->
    <view class="u-m-t-20">
      <u-cell-group v-for="(group, groupIndex) in list" :key="groupIndex"
                    :title="getGroupTitle(group)" title-bg-color="rgb(243, 244, 246)">
        <u-cell-item v-for="(item, index) in group.list" :key="index" :icon="item.icon"
                     :title="getFieldTitle(item)" :titleStyle="{fontWeight: 500}" @click="openPage(item.path)">
        </u-cell-item>
      </u-cell-group>
    </view>
    <view v-show="false">
    </view>
  </view>
</template>
<script>
import list from './setting.config'
export default {
  data() {
    return {
      list: list,
      siteList: [],
      avatarPath:null,
    }
  },
  onLoad() {
  },
  methods: {
    openPage( path ) {
      switch ( path ){
        case 0:
          this.chooseAvatar()
          break
        case 1:

          break;
        default:;
      }
    },
    chooseAvatar() {
      // 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
      this.$u.route( {
        // 关于此路径，请见下方"注意事项"
        url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
        // 内部已设置以下默认参数值，可不传这些参数
        params: {
          // 输出图片宽度，高等于宽，单位px
          destWidth: 300,
          // 裁剪框宽度，高等于宽，单位px
          rectWidth: 200,
          // 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
          fileType: 'jpg',
        }
      } )
    },

    getGroupTitle( item ) {
      return this.$i18n.locale == 'zh' ? item.groupName : item.groupName_en
    },
    getFieldTitle( item ) {
      return this.$i18n.locale == 'zh' ? item.title : item.title_en
    }
  },
  created() {
    uni.$on( 'uAvatarCropper', path => {
      uni.uploadFile({
        url:'http://tunnel.kaiyu.work:55938/system/user/profile/avatar',
      	filePath: path,
        header:{
          'Authorization': `Bearer ${this.vuex_access_token}`
        },
      	name: 'avatarfile',
      	complete: ( res) => {
          const result = JSON.parse(res.data);
          const {code}=result;
          if ( code===200 ){
            uni.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000,
              position: 'top',
            });
          }else {
            uni.showToast({
              title: '系统繁忙',
              icon: 'none',
              duration: 1000,
              position: 'top',
            })
          }
        }
      });
    } )
  },

}
</script>

<style lang="scss" scoped>
.item {
  padding: 40 rpx 20 rpx;

  .top {
    display: flex;
    font-weight: bold;
    font-size: 34 rpx;

    .phone {
      margin-left: 60 rpx;
    }

    .tag {
      display: flex;
      font-weight: normal;
      align-items: center;

      text {
        display: block;
        width: 60 rpx;
        height: 34 rpx;
        line-height: 34 rpx;
        color: #ffffff;
        font-size: 20 rpx;
        border-radius: 6 rpx;
        text-align: center;
        margin-left: 30 rpx;
        background-color: rgb(49, 145, 253);
      }

      .red {
        background-color: red
      }
    }
  }

  .bottom {
    display: flex;
    margin-top: 20 rpx;
    font-size: 28 rpx;
    justify-content: space-between;
    color: #999999;
  }
}

.addSite {
  display: flex;
  justify-content: space-around;
  width: 600 rpx;
  line-height: 100 rpx;
  position: absolute;
  bottom: 30 rpx;
  left: 80 rpx;
  background-color: red;
  border-radius: 60 rpx;
  font-size: 30 rpx;

  .add {
    display: flex;
    align-items: center;
    color: #ffffff;

    .icon {
      margin-right: 10 rpx;
    }
  }
}
</style>
