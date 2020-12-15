import {IS_AUTHENTICATED,USERNAME, ISLOADING, PURCHASE,PAYMENTOPEN} from './action';
export const initialState={
    isAuthenticated:localStorage.getItem('accessToken')?true:false,
    userName:"",
    isLoading: false,
    purchasedBook: null,
    paymentOpen: false
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
        case PURCHASE:{
            return {
                ...state,
                purchasedBook:action.payload
            }
        }
        case PAYMENTOPEN:{
            return {
                ...state,
                paymentOpen:action.payload
            }
        }
        default: return state
    }
}