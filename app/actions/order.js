export function addOrder(price, dishname) {
    return(dispatch) => {
        dispatch({type: "ADD_ORDER", data: {price: price, dishname: dishname}})
    }
}

export function removeOrder(price, dishname) {
    return(dispatch) => {
        dispatch({type: "REMOVE_ORDER", data: {price: price, dishname: dishname}})
    }
}

export function clearOrderState(id) {
    return(dispatch) => {
        dispatch({type: "CLEAR_ORDER_STATE"})
    }
}