<script>
export default {
  // 此处globalData为了演示其作用，不是uView框架的一部分
  globalData: {
    username: '白居易',
  },
  data(){
    return{
      cursor:0,
      markPosition:[
        {
          name:'中新服务区',
          lng:113.609044,
          lat:23.316956
        },
        {
          name:'沙迳服务区',
          lng:114.103167,
          lat:23.619657
        },
        {
          name:'石坝服务区',
          lng:114.638315,
          lat:23.529287
        },
        {
          name:'棉洋服务区',
          lng:115.659492,
          lat:23.60124
        },
        {
          name:'金灶服务区',
          lng:116.384984,
          lat:23.454287
        },
        {
          name:'潮州服务区',
          lng:116.747482,
          lat:23.6149065
        },
        {
          name:'小溪服务区',
          lng:117.356403,
          lat:24.374995
        },
        {
          name:'花都服务区',
          lng:117.640513,
          lat:24.449886
        },
        {
          name:'漳州站点',
          site:true,
          lng:117.674233,
          lat:24.489312
        },
        {
          name:'东孚服务区',
          lng:117.938466,
          lat:24.572598
        },
        {
          name:'厦门站点',
          site: true,
          lng:118.107123,
          lat:24.539098
        },
      ],
    }
  },
  onLaunch() {
    uni.getLocation( {
      success( res ) {
      }
    } )
    uni.$on( 'driverMission', ()=>{
      if ( this.vuex_mission) {
        console.log('have mission')
        if ( this.vuex_interval_id ){
          console.log('have interval')
          return;
        }else {

        }
        const currentIntervalId = setInterval( () => {
          const mission = this.vuex_mission
          const that = this
          uni.getLocation( {
              success( res ) {
                //发送虚拟定位
                const markPosition = that.markPosition
                const length = markPosition.length
                const cursor = ''+that.cursor
                const markPositionElement = markPosition[+cursor]
                that.$u.api.updateLocation({
                  id:mission.stowageId,
                  lng: markPositionElement.lng,
                  lat: markPositionElement.lat,
                }).then((res)=>{
                  console.log('send Location res=>:',res)
                })
                console.log(markPositionElement)
                if ( that.cursor==length-1 ){
                  that.cursor=0;
                }else {
                  that.cursor++;
                }
                // that.$u.api.updateLocation({
                //   id:mission.stowageId,
                //   lng:res.longitude,
                //   lat:res.latitude,
                // }).then((res)=>{
                //   console.log('send Location res=>:',res)
                // })
              }
            } )
        }, 60000 );
        this.$u.vuex( 'vuex_interval_id', currentIntervalId )
        //15分更新一次定位信息
      }else {
        console.log('not mission')
        if ( this.vuex_interval_id ){
          console.log('clear interval')
          clearInterval(this.vuex_interval_id)
        }else {

        }
        this.$u.api.checkDriverMission().then(res=>{
          if ( res&&res.stowageId ){
            this.$u.vuex( 'vuex_mission', res );
            uni.$emit('driverMission');
          }
        })
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
    console.log( 'app-show' )
    uni.$emit('driverMission');
  },
  onHide() {
    console.log( 'app-hide' )
    uni.$emit('driverMission');
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
