import {IS_AUTHENTICATED,USERNAME, ISLOADING} from './action';
export const initialState={
    isAuthenticated:localStorage.getItem('accessToken')?true:false,
    userName:"",
    isLoading: false
}

export const stateReducer=(state=initialState,action)=>{
    switch(action.type){
        case IS_AUTHENTICATED:{
            return {
                ...state,
                isAuthenticated:action.payload
            }
        }
        case USERNAME:{
            return {
                ...state,
                userName:action.payload
            }
        }
        case ISLOADING:{
            return {
                ...state,
                isLoading:action.payload
            }
        }
        default: return state
    }
}