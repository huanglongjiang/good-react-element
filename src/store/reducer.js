const defaultState = {
    userInfo:{}
}
export default (state = defaultState,action)=>{
    if(action.type === 'changeInput'){
        let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
        newState.userInfo = action.value
        return newState
    }
    return state
}