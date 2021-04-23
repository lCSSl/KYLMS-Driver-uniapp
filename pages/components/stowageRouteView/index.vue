<template>
  <view>
    <u-top-tips ref="uTips"></u-top-tips>
    <view class="wrap">
      <view class="u-tabs-box">
        <u-tabs-swiper ref="tabs" :current="current" :is-scroll="false" :list="tabList" activeColor="#016B09"
                       swiperWidth="750" @change="change"></u-tabs-swiper>
      </view>
      <swiper :current="swiperCurrent" class="swiper-box" @animationfinish="animationfinish" @transition="transition">
        <swiper-item class="swiper-item time-line-item">
          <u-time-line>
            <!--
            <uni-list>
              <uni-list-item class="time-line-item" v-for="(item,index) in rows">
                <u-time-line-item :key="index" nodeTop="0">
                  <template v-slot:node>
                    <view :class="'u-node '+[item.routeStatus=='-1'?'error':item.routeStatus=='1'?'success':'']">
                      <u-icon :name="item.routeStatus=='-1'?'error':item.routeStatus=='1'?'checkbox-mark':'rewind-right-fill'" color="#fff" :size="24"></u-icon>
                    </view>
                  </template>
                  <template v-slot:content>
                    <view @tap.stop="stop">
                      <u-row>
                        <u-col :span="9">
                          <view>
                            <text class="u-order-title">{{item.stowageWarehouseName}}</text>
                            <u-tag v-if="item.routeSort===0||item.routeSort===127" size="mini" :text="item.routeSort===0?'起点':item.routeSort===127?'终点':''"></u-tag>
                          </view>
                          <view class="u-order-desc">{{item.remark?item.remark:''}}</view>
                          <view class="u-order-time">{{item.updateTime?item.updateTime:''}}</view>
                        </u-col>
                        <u-col :span="3">
                          <u-button v-if="findFirst(item.routeId)&&stowageStatus==3" @click="arrival(item.routeId)" size="mini" type="success">到站</u-button>
                        </u-col>
                      </u-row>
                    </view>
                  </template>
                </u-time-line-item>
              </uni-list-item>
            </uni-list>
            -->
            <view class="time-line-item" v-for="(item,index) in rows">
              <u-time-line-item :key="index" nodeTop="0">
                <template v-slot:node>
                  <view :class="'u-node '+[item.routeStatus=='-1'?'error':item.routeStatus=='1'?'success':'']">
                    <u-icon :name="item.routeStatus=='-1'?'error':item.routeStatus=='1'?'checkbox-mark':'rewind-right-fill'" color="#fff" :size="24"></u-icon>
                  </view>
                </template>
                <template v-slot:content>
                  <view @tap.stop="stop">
                    <u-row>
                      <u-col :span="9">
                        <view>
                          <text class="u-order-title">{{item.stowageWarehouseName}}</text>
                          <u-tag v-if="item.routeSort===0||item.routeSort===127" size="mini" :text="item.routeSort===0?'起点':item.routeSort===127?'终点':''"></u-tag>
                        </view>
                        <view class="u-order-desc">{{item.remark?item.remark:''}}</view>
                        <view class="u-order-time">{{item.updateTime?item.updateTime:''}}</view>
                      </u-col>
                      <u-col :span="3">
                          <u-button v-if="findFirst(item.routeId)&&stowageStatus==3" @click="arrival(item.routeId)" size="mini" type="success">到站</u-button>
                      </u-col>
                    </u-row>
                  </view>
                </template>
              </u-time-line-item>
            </view>
          </u-time-line>
        </swiper-item>
        <swiper-item class="swiper-item">
          <view v-if="mapOn">
          </view>
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
      stowageId:null,
      stowageStatus:null,
      markPosition:false,
      mapOn:false,
      tabList:[
        {
          name: '总览'
        },
        {
          name: '线路'
        },
      ],
      missionList: [ [], [], [] ],
      rows: [],
      current: 0,
      swiperCurrent: 0,
      tabsHeight: 0,
      // 运单配载线路表格数据
      WmsStowageRouteList: [],
      dx: 0,
      loadStatus: [ 'loadmore', 'loadmore', 'loadmore', 'loadmore' ],
      customBtnStyle:{
        width:'100%',
        margin:'0',
      },
      startPoint: null,
      endPoint: null,
      waypoints: [],
    }
  },
  onLoad(options) {
    const {stowageId,stowageStatus } = options
    if (!stowageId||!stowageStatus){
      uni.showToast({
        title: '系统繁忙',
        duration: 2000,
        position: 'top',
      });
      uni.navigateBack();
    }
    this.stowageId = stowageId;
    this.stowageStatus = stowageStatus;
    console.log(options)
    this.init()
    this.getDictDataMethods()
  },
  onPullDownRefresh() {
    this.init()
  },
  computed: {
  },
  methods: {
    getData(){
      this.$u.api.getWmsStowageRouteList(this.stowageId).then(res=>{
        // this.dataList = res
        this.rows = res;
        uni.hideLoading()
        uni.stopPullDownRefresh()
      })
    },
    init() {
      uni.showLoading()
      this.getData()
    },
    getDictDataMethods() {
    },
    // 页面数据
    getOrderList( idx ) {
      return this.missionList[idx]
    },
    findFirst(routeId){
      const first = this.rows.find(i=>i.routeStatus=='0');
      return first?first.routeId == routeId:false;
    },
    arrival(routeId){
      const that = this
      if(that.markPosition){
        that.markPosition=!that.markPosition
        const find = that.rows.find( i=>i.routeId===routeId)
        const ll = find.ll
        console.log({
          routeId,
          ...ll
        })
        that.$u.api.arrivalSite({
          routeId,
          ...ll
        }).then(res=>{
            that.init();
        })
      }else {
        uni.getLocation( {
          success( res ) {
            that.$u.api.arrivalSite({
              routeId,
              lng:res.longitude,
              lat:res.latitude
            }).then(res=>{
              console.log(res)
            }).catch(res=>{
              that.markPosition = !that.markPosition
              that.$refs.uTips.show({
                title: '已开启虚拟定位以通过验证',
                type: 'warning',
                duration: '3333'
              })
              // that.$u.toast('已开启虚拟定位以通过验证',3333);
            })
          }
        } )
      }
    },
    change( index ) {
      this.swiperCurrent = index
      if ( !this.mapOn ){
        this.mapOn = !this.mapOn;
      }
    },
    stop(){
      console.log('stop')
    },
    transition( { detail: { dx } } ) {
      this.$refs.tabs.setDx( dx )
    },
    animationfinish( { detail: { current } } ) {
      this.$refs.tabs.setFinishCurrent( current )
      this.swiperCurrent = current
      this.current = current
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
.wrap {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--window-top));
  width: 100%;
  background-color: #ffffff;
}
.time-line-item{
  .success{
    background: #19be6b;
  }
  .error{
    background: #d41734;
  }
}
.u-node {
  width: 44rpx;
  height: 44rpx;
  border-radius: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d0d0d0;
}
.u-order-title {
  color: #333333;
  font-weight: bold;
  margin-right: 5rpx;
  font-size: 32rpx;
}
.u-order-title.unacive {
  color: rgb(150, 150, 150);
}
.u-order-desc {
  color: rgb(150, 150, 150);
  font-size: 28rpx;
  margin-bottom: 6rpx;
}
.u-order-time {
  color: rgb(200, 200, 200);
  font-size: 26rpx;
}
.tel {
  color: $u-type-primary;
}
.swiper-box {
  height: 100%;
  flex: 1;
  .swiper-item {
    height: 100%;
  }
  .time-line-item{
    padding: 24rpx 24rpx 24rpx 40rpx;
  }
  .map-item{
    width: 100%;
    height: calc(88vh - var(--window-top));
  }
}
</style>
