// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
let hotSearchUrl = '/ebapi/store_api/hot_search'
let indexUrl = '/ebapi/public_api/index'
const getDictDataListUrl = '/system/dict/data/type/'
const loginUrl = '/auth/login'
const logoutUrl = '/auth/logout'
const getDriverInfoUrl ='/system/user/getDriverInfo'
const getDriverMissionUrl ='/wms/WmsStowage/getDriverMission/0'
const checkDriverMissionUrl ='/wms/WmsStowage/checkDriverMission/0'
const getWmsStowageRouteListUrl ='/wms/WmsStowageRoute/list'
const departureUrl ='/wms/WmsStowage/departure/'
const arrivalSiteUrl ='/wms/WmsStowageRoute/driver/arrivalSite'
const updateLocationUrl ='/wms/WmsVehicle/updateLocation'

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = ( Vue, vm ) => {
	// 此处没有使用传入的params参数
	let getSearch = ( params = {} ) => vm.$u.get( hotSearchUrl, {
		id: 2
	} )
	
	// 此处使用了传入的params参数，一切自定义即可
	let getInfo = ( params = {} ) => vm.$u.post( indexUrl, params )
	const login = ( params ) => vm.$u.post( loginUrl, params )
	const logout = () => vm.$u.delete(logoutUrl)
	const getDriverInfo = () => vm.$u.get( getDriverInfoUrl)
	const getDictDataList = ( dictType ) => vm.$u.get( getDictDataListUrl + dictType )
	const getDriverMission = () => vm.$u.get( getDriverMissionUrl)
	const checkDriverMission = () => vm.$u.get( checkDriverMissionUrl)
	const getWmsStowageRouteList = (stowageId) =>vm.$u.get( getWmsStowageRouteListUrl,{stowageId})
	const departure = (stowageId) =>vm.$u.post( departureUrl+stowageId)
	const arrivalSite = (params) =>vm.$u.post( arrivalSiteUrl,params)
	const updateLocation = (params) =>vm.$u.put( updateLocationUrl,params)
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	const auth = {login,logout};
	const system = {getDriverInfo,getDictDataList}
	const wms = {getDriverMission,checkDriverMission,getWmsStowageRouteList,departure,arrivalSite,updateLocation}
	
	vm.$u.api = {
		...auth,
		...system,
		...wms,
		getSearch,
		getInfo,
	}
}
export default {
	install
}
