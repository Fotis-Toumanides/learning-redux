import { useEffect, Fragment } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

import { fetchCartData, sendCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  },[fetchCartData])

  useEffect(() => {

    if(isInitial){
      isInitial=false;
      return;
    }
// (Handling everything in cartSlice with Action Creator)
    if(cart.changed){
      dispatch(sendCartData(cart))      
    }



// (Handlind everything in the App function)
   /*  const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title:"Sending...",
          message:"Sending cart data, please wait",
        })
      )
      const response = await fetch('https://reduxadv-c41ea-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
      method: 'PUT', 
      body:JSON.stringify(cart)
    });
    if(!response.ok){
      throw new Error('Sending cart data failed');
      
    } */


    /* const responseData = await response.json(); */


   /*  dispatch(
      uiActions.showNotification({
        status: "success",
        title:"Success!",
        message:"Sent cart data successfuly!",
      })
    ); 
    }
    

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title:"Error!",
          message:"Sending cart data failed, really sorry.",
        })
      ) 
    })*/
  },[cart, dispatch]);

  return (
    <Fragment>
      <Layout>
      {notification && <Notification 
        status={notification.status} 
        title={notification.title} 
        message={notification.message}
        />}

        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
