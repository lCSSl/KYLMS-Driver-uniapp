// 回显数据字典
export function selectDictLabel( datas, value ) {
	const actions = []
	Object.keys( datas ).some( ( key ) => {
		if ( datas[key].dictValue == ('' + value) ) {
			actions.push( datas[key].dictLabel )
			return true
		}
	} )
	return actions.join( '' )
}
