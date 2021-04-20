<template>
  <view>
    <u-navbar :border-bottom="false" :is-back="false" title="　">
      <view class="u-flex u-row-right" style="width: 100%;">
        <view class="camera u-flex u-row-center">
          <u-icon color="#000000" name="camera-fill" size="48"></u-icon>
        </view>
      </view>
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
  </view>
</template>

<script>
import list from './userCenter.config'

export default {
  data() {
    return {
      pic: 'https://uviewui.com/common/logo.png',
      show: true,
      list: list,
    }
  },
  onLoad() {

  },
  methods: {
    openPage( path ) {
      this.$u.route( {
        url: path
      } )
    },
    getGroupTitle( item ) {
      return this.$i18n.locale == 'zh' ? item.groupName : item.groupName_en
    },
    getFieldTitle( item ) {
      return this.$i18n.locale == 'zh' ? item.title : item.title_en
    }
  }
}
</script>

<style lang="scss">
page {
  //background-color: #ededed;
}

.camera {
  width: 54px;
  height: 44px;

  &:active {
    //background-color: #ededed;
  }
}

.user-box {
  background-color: #fff;
}
</style>
