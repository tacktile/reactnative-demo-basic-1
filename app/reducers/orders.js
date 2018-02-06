let ordersState = { noItems: 0, totalAmount: 0, orderedDishes: [] };

const ordersReducer = (state = ordersState, action) => {
    switch (action.type) {
        case "GET_MENU": {
            let restoId = id;

        }
        case "ADD_ORDER": {
            let order = action.data;
            var set = false;
            state.noItems++;
            state.totalAmount += order.price;
            if(state.orderedDishes.length>0) {
                state.orderedDishes.map((dish) => {
                    if(dish.dishname == order.dishname) {
                        dish.number++;
                        set = true;
                    }
                })
            }
            if(!set) {
                state.orderedDishes.push({dishname: order.dishname, number: 1, price: order.price});
            }
            return {...state};
        }
        case "REMOVE_ORDER": {
            let order = action.data;

            if(state.orderedDishes.length>0) {
                state.orderedDishes.map((dish, index) => {
                    if(dish.dishname == order.dishname) {
                        state.noItems--;
                        state.totalAmount -= order.price;
                        if(dish.number<2) {
                            state.orderedDishes.splice(index, 1);
                        } else {
                            dish.number--;
                        }
                    }
                })
            }
            return {...state};
        }
        case "CLEAR_ORDER_STATE": {
            state.noItems = 0;
            state.totalAmount = 0;
            state.orderedDishes = [];
            return {...state};
        }
        default:
            return state;
    }
};

export default ordersReducer;