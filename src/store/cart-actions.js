import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'https://reduxadv-c41ea-default-rtdb.europe-west1.firebasedatabase.app/cart.json'
            );

            if(!response.ok){
                throw new Error('Unable to fetch cart data');
            }

            const data = await response.json();
            return data;
        }
        try{
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
            }));
        } catch(error) {
            dispatch(
                uiActions.showNotification({
                  status: "error",
                  title:"Error!",
                  message:"Fetching cart data failed, really sorry.",
                })
              )
        }
    }
};

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
              status: "success",
              title:"Success!",
              message:"Sent cart data successfuly!",
            })
        )
    
        const sendRequest = async () => {
            const response = await fetch(
                'https://reduxadv-c41ea-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                method: 'PUT', 
                body:JSON.stringify(cart)
            });
            if(!response.ok){
            throw new Error('Sending cart data failed');
            }
        };
        try{
          await sendRequest(); 
          dispatch(
            uiActions.showNotification({
              status: "success",
              title:"Success!",
              message:"Sent cart data successfuly!",
            })
          ); 
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                  status: "error",
                  title:"Error!",
                  message:"Sending cart data failed, really sorry.",
                })
              )
        }
        

    

    }
}