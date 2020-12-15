export const IS_AUTHENTICATED="IS_AUTHENTICATED";
export const USERNAME="USERNAME";
export const ISLOADING= "ISLOADING";
export const PURCHASE="PURCHASE";
export const PAYMENTOPEN= "PAYMENTOPEN"; 

export const setIsAuthenticated=(payload)=>{
        return {
            type:IS_AUTHENTICATED,
            payload
        }
}

export const setUserName=(payload)=>{
    return {
        type:USERNAME,
        payload
    }
}

export const setIsLoading=(payload)=>{
    return {
        type:ISLOADING,
        payload
    }
}

export const setPurchaseItem=(payload)=>{
    return {
        type:PURCHASE,
        payload
    }
}

export const setPaymentOpen=(payload)=>{
    return {
        type:PAYMENTOPEN,
        payload
    }
}