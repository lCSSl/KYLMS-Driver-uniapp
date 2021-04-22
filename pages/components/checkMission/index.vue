<template>
  <view>
    <view class="wrap">
      <view class="u-tabs-box">
        <u-tabs-swiper ref="tabs" :current="current" :is-scroll="false" :list="tabList" activeColor="#016B09"
                       swiperWidth="750" @change="change"></u-tabs-swiper>
      </view>
      <swiper :current="swiperCurrent" class="swiper-box" @animationfinish="animationfinish" @transition="transition">
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
            <view v-if="missionList[0].length>0" class="page-box">
              <view v-for="(res, index) in missionList[0]" :key="index" class="order">
                <view class="top">
                  <view class="left">
                    <u-icon :size="30" color="rgb(94,94,94)" name="home"></u-icon>
                    <view class="store">
                      {{ res.departureAddress.province.substr(0, res.departureAddress.province.length - 1)}}
                      {{'-'+res.departureAddress.city.substr(0, res.departureAddress.city.length - 1) }}
                      往
                      {{ res.destinationAddress.province.substr(0, res.destinationAddress.province.length - 1)}}
                      {{'-'+res.destinationAddress.city.substr(0, res.destinationAddress.city.length - 1) }}
                    </view>
                    <u-icon :size="26" color="rgb(203,203,203)" name="arrow-right"></u-icon>
                  </view>
                  <view class="content">
                  </view>
                  <view class="right">
                    <u-tag :text="stowageStatusFormat(res.stowageStatus)"
                           :type="stowageStatusTagFormat(res.stowageStatus)"
                           border-color="#ffffff"/>
                  </view>
                </view>
                <view class="item">
                  <view class="content">
                    <view class="type">{{ res.departureName }}</view>
                    <view class="type">{{ res.destinationName }}</view>
                  </view>
                </view>
                <view class="total">
                  {{res.routeCount>0?'共'+res.routeCount+'站':''}}
                </view>
                <view class="bottom">
                  <view class="bottom-left">
                    <u-icon color="rgb(203,203,203)" name="more-dot-fill"></u-icon>
                  </view>
                  <view class="bottom-right">
                    <view class="btn">
                      <u-button type="info" :custom-style="customBtnStyle"
                                size="mini" shape="circle"
                                :hair-line="false" ripple plain
                                @click="jumpRoutePage(res.stowageId)">
                        查看
                      </u-button>
                    </view>
                    <view v-if="res.stowageStatus==='2'" class="btn" >
                      <u-button type="primary" hair-line size="mini"
                                :custom-style="customBtnStyle" shape="circle"
                                ripple plain @click="confirmMission(res.stowageId)">确认</u-button>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view v-else class="u-demo-area">
              <u-empty mode="data"></u-empty>
            </view>
          </scroll-view>
        </swiper-item>
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
            <scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
              <view v-if="missionList[1].length>0" class="page-box">
                <view v-for="(res ,index) in missionList[1]" :key="index" class="order">
                  <view class="top">
                    <view class="left">
                      <u-icon :size="30" color="rgb(94,94,94)" name="home"></u-icon>
                      <view class="store">
                        {{ res.departureAddress.province.substr(0, res.departureAddress.province.length - 1)}}
                        {{'-'+res.departureAddress.city.substr(0, res.departureAddress.city.length - 1) }}
                        往
                        {{ res.destinationAddress.province.substr(0, res.destinationAddress.province.length - 1)}}
                        {{'-'+res.destinationAddress.city.substr(0, res.destinationAddress.city.length - 1) }}
                      </view>
                      <u-icon :size="26" color="rgb(203,203,203)" name="arrow-right"></u-icon>
                    </view>
                    <view class="content">
                    </view>
                    <view class="right">
                      <u-tag :text="stowageStatusFormat(res.stowageStatus)"
                             :type="stowageStatusTagFormat(res.stowageStatus)"
                             border-color="#ffffff"/>
                    </view>
                  </view>
                  <view class="item">
                    <view class="content">
                      <view class="type">{{ res.departureName }}</view>
                      <view class="type">{{ res.destinationName }}</view>
                    </view>
                  </view>
                  <view class="total">
                    {{res.routeCount>0?'共'+res.routeCount+'站':''}}
                  </view>
                  <view class="bottom">
                    <view class="bottom-left">
                      <u-icon color="rgb(203,203,203)" name="more-dot-fill"></u-icon>
                    </view>
                    <view class="bottom-right">
                      <view class="btn">
                        <u-button type="info" :custom-style="customBtnStyle"
                                  size="mini" shape="circle"
                                  :hair-line="false" ripple plain
                                  @click="jumpRoutePage(res.stowageId)">
                          查看
                        </u-button>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
              <view v-else class="u-demo-area">
                <u-empty mode="data"></u-empty>
              </view>
            </scroll-view>
          </scroll-view>
        </swiper-item>
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
            <view v-if="missionList[2].length>0" class="page-box">
              <view v-for="(res, index) in missionList[2]" :key="index" class="order">
                <view class="top">
                  <view class="left">
                    <u-icon :size="30" color="rgb(94,94,94)" name="home"></u-icon>
                    <view class="store">
                      {{ res.departureAddress.province.substr(0, res.departureAddress.province.length - 1)}}
                      {{'-'+res.departureAddress.city.substr(0, res.departureAddress.city.length - 1) }}
                      往
                      {{ res.destinationAddress.province.substr(0, res.destinationAddress.province.length - 1)}}
                      {{'-'+res.destinationAddress.city.substr(0, res.destinationAddress.city.length - 1) }}
                    </view>
                    <u-icon :size="26" color="rgb(203,203,203)" name="arrow-right"></u-icon>
                  </view>
                  <view class="content">
                  </view>
                  <view class="right">
                    <u-tag :text="stowageStatusFormat(res.stowageStatus)"
                           :type="stowageStatusTagFormat(res.stowageStatus)"
                           border-color="#ffffff"/>
                  </view>
                </view>
                <view class="item">
                  <view class="content">
                    <view class="type">{{ res.departureName }}</view>
                    <view class="type">{{ res.destinationName }}</view>
                  </view>
                </view>
                <view class="total">
                  {{res.routeCount>0?'共'+res.routeCount+'站':''}}
                </view>
                <view class="bottom">
                  <view class="bottom-left">
                    <u-icon color="rgb(203,203,203)" name="more-dot-fill"></u-icon>
                  </view>
                  <view class="bottom-right">
                    <view class="btn">
                      <u-button type="info" :custom-style="customBtnStyle"
                                size="mini" shape="circle"
                                :hair-line="false" ripple plain
                                @click="jumpRoutePage(res.stowageId)">
                        查看
                      </u-button>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view v-else class="u-demo-area">
              <u-empty mode="data"></u-empty>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import { selectDictLabel } from '../../../common/utils'

export default {
  data() {
    return {
      missionList: [ [], [], [] ],
      dataList: [],
      tabList: [
        {
          name: '未确认'
        },
        {
          name: '进行中'
        },
        {
          name: '已完成'
        },
      ],
      current: 0,
      swiperCurrent: 0,
      tabsHeight: 0,
      stowageStatusOptions: [],
      dx: 0,
      loadStatus: [ 'loadmore', 'loadmore', 'loadmore', 'loadmore' ],
      customBtnStyle:{
        width:'100%',
        margin:'0',
      },
    }
  },
  onLoad() {
    this.getData()
    this.getDictDataMethods()
    // this.getOrderList(0);
    // this.getOrderList(1);
    // this.getOrderList(2);
  },
  onPullDownRefresh() {
    this.getData()
  },
  computed: {
    // 价格小数
    priceDecimal() {
      return val => {
        if ( val !== parseInt( val ) ) return val.slice( -2 )
        else return '00'
      }
    },
    // 价格整数
    priceInt() {
      return val => {
        if ( val !== parseInt( val ) ) return val.split( '.' )[0]
        else return val
      }
    },
  },
  methods: {
    getData() {
      uni.showLoading()
      this.$u.api.getDriverMission().then(res=>{
        console.log('getDriverMission')
        this.dataList = res
        this.missionList[0].length = 0
        this.missionList[1].length = 0
        this.missionList[2].length = 0
        this.dataList.forEach( ( item, index ) => {
          let stowageStatus = item.stowageStatus
          if ( stowageStatus >= 0 && stowageStatus <= 2 ) {
            this.missionList[0].push( item )
          } else if ( stowageStatus == 3 ) {
            this.missionList[1].push( item )
          } else if ( stowageStatus == 4 ) {
            this.missionList[2].push( item )
          }
        } )
        uni.hideLoading()
        uni.stopPullDownRefresh()
      })
    },
    getDictDataMethods() {
      this.$u.api.getDictDataList( 'wms_stowage_status' ).then( res => {
        this.stowageStatusOptions = res
      } )
    },
    // 页面数据
    getOrderList( idx ) {
      return this.missionList[idx]
    },
    reachBottom() {
      // 此tab为空数据
      console.log( 'reachBottom' )
      // if(this.current != 2) {
      //   this.loadStatus.splice(this.current,1,"loading")
      //   setTimeout(() => {
      //     this.getOrderList(this.current);
      //   }, 1200);
      // }
    },


    // 总价
    totalPrice( item ) {
      let price = 0
      item.map( val => {
        price += parseFloat( val.price )
      } )
      return price.toFixed( 2 )
    },
    // 总件数
    totalNum( item ) {
      let num = 0
      item.map( val => {
        num += val.number
      } )
      return num
    },
    // tab栏切换
    change( index ) {
      this.swiperCurrent = index
    },
    jumpRoutePage( stowageId ) {
      uni.navigateTo({
        url:'/pages/components/stowageRouteView/index?stowageId='+stowageId,
      })
    },
    confirmMission( stowageId ) {
      console.log( 'confirmMission', stowageId )
    },
    transition( { detail: { dx } } ) {
      this.$refs.tabs.setDx( dx )
    },
    animationfinish( { detail: { current } } ) {
      this.$refs.tabs.setFinishCurrent( current )
      this.swiperCurrent = current
      this.current = current
    },
    // 类型字典翻译
    stowageStatusFormat( key ) {
      return selectDictLabel( this.stowageStatusOptions, key )
    },
    stowageStatusTagFormat( stowageStatus ) {
      if ( stowageStatus == '0' ) {
        return 'info'
      } else if ( stowageStatus == '1' ) {
        return 'warning'
      } else if ( stowageStatus == '2' ) {
        return 'warning'
      } else if ( stowageStatus == '3' ) {
        return 'success'
      } else if ( stowageStatus == '4' ) {
        return 'info'
      } else if ( stowageStatus == '-1' ) {
        return 'danger'
      }
    },
  }
}
</script>

<style>
/* #ifndef H5 */
page {
  height: 100%;
  background-color: #f2f2f2;
}

/* #endif */
</style>

<style lang="scss" scoped>
.order {
  width: 710rpx;
  background-color: #ffffff;
  margin: 20rpx auto;
  border-radius: 20rpx;
  box-sizing: border-box;
  padding: 20rpx;
  font-size: 28rpx;
  .top {
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .store {
        margin: 0 10rpx;
        font-size: 32rpx;
        font-weight: bold;
      }
    }
    .right {
      color: $u-type-warning-dark;
    }
  }
  .item {
    display: flex;
    margin: 20rpx 0 0;
    .left {
      margin-right: 20rpx;
      image {
        width: 200rpx;
        height: 200rpx;
        border-radius: 10rpx;
      }
    }
    .content {
      .title {
        font-size: 28rpx;
        line-height: 50rpx;
      }
      .type {
        margin: 10rpx 0;
        font-size: 24rpx;
        color: $u-tips-color;
      }
      .delivery-time {
        color: #e5d001;
        font-size: 24rpx;
      }
    }
    .right {
      margin-left: 10rpx;
      padding-top: 20rpx;
      text-align: right;
      .decimal {
        font-size: 24rpx;
        margin-top: 4rpx;
      }
      .number {
        color: $u-tips-color;
        font-size: 24rpx;
      }
    }
  }
  .total {
    margin-top: 20rpx;
    text-align: right;
    font-size: 24rpx;
    .total-price {
      font-size: 32rpx;
    }
  }
  .bottom {
    display: flex;
    margin-top: 40rpx;
    padding: 0 10rpx;
    justify-content: space-between;
    align-items: center;
    .bottom-right {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      .btn {
        line-height: 52rpx;
        width: 160rpx;
        margin-left: 5rpx;
        //border-radius: 26rpx;
        //border: 2 rpx solid $u-border-color;
        font-size: 26 rpx;
        text-align: center;
        color: $u-type-info-dark;
      }
    }
    //.btn {
    //  line-height: 52rpx;
    //  width: 160rpx;
    //  //border: 2rpx solid $u-border-color;
    //  font-size: 26rpx;
    //  text-align: center;
    //  color: $u-type-info-dark;
    //}
    .evaluate {
      color: $u-type-warning-dark;
      border-color: $u-type-warning-dark;
    }
  }
}
.centre {
  text-align: center;
  margin: 200rpx auto;
  font-size: 32rpx;
  image {
    width: 164rpx;
    height: 164rpx;
    border-radius: 50%;
    margin-bottom: 20rpx;
  }
  .tips {
    font-size: 24rpx;
    color: #999999;
    margin-top: 20rpx;
  }
  .btn {
    margin: 80rpx auto;
    width: 200rpx;
    border-radius: 32rpx;
    line-height: 64rpx;
    color: #ffffff;
    font-size: 26rpx;
    background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
  }
}
.wrap {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--window-top));
  width: 100%;
}
.swiper-box {
  flex: 1;
}
.swiper-item {
  height: 100%;
}
.u-demo-area {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
