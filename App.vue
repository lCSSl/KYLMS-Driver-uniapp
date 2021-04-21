<script>
export default {
  // 此处globalData为了演示其作用，不是uView框架的一部分
  globalData: {
    username: '白居易',
    intervalId: null,
    location: false,
  },
  onLaunch() {
    uni.$on( 'driverMission', ()=>{
      console.log( 'app-show' )
      console.log( 'getLocation?', this.vuex_get_location )
      console.log( 'vuex_interval_id?', this.vuex_interval_id )
      const vuexMission = this.vuex_mission
      if ( vuexMission) {
        const intervalId = setInterval( () => {
          this.$u.vuex( 'vuex_interval_id', intervalId )
          const getLocation = this.vuex_get_location
          const vuexIntervalId = this.vuex_interval_id
            uni.getLocation( {
              success( res ) {
                console.log( 'vuexMission', vuexMission )
                console.log( vuexIntervalId, getLocation, res )
              }
            } )
        }, 3000 );
      }else {
        console.log('not mission')
      }
    });
    // 1.1.0版本之前关于http拦截器代码，已平滑移动到/common/http.interceptor.js中
    // 注意，需要在/main.js中实例化Vue之后引入如下(详见文档说明)：
    // import httpInterceptor from '@/common/http.interceptor.js'
    // Vue.use(httpInterceptor, app)
    // process.env.VUE_APP_PLATFORM 为通过js判断平台名称的方法，结果分别如下：
    /**
     * h5，app-plus(nvue下也为app-plus)，mp-weixin，mp-alipay......
     */
  },
  onShow() {
    uni.$emit('driverMission');
    console.log('app--->$emit')
  },
  onHide() {
    console.log( 'app-hide' )
    // const vuexIntervalId = this.vuex_interval_id
    // this.$u.vuex( 'vuex_get_location', false )
    // this.$u.vuex( 'vuex_interval_id', null )
    // clearInterval( vuexIntervalId )
  },
  methods: {},
}
</script>

<style lang="scss">
@import "uview-ui/index.scss";
@import "common/demo.scss";
</style>
