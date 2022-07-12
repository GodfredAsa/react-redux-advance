import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { uiActions } from "./components/store/ui-slice";
import Notification from "./components/UI/Notification/Notification";

// this is done to prevent the component 
// from sending http request when rendered for the first time
let initial = true;
function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "sending...",
          message: "sending cart data...",
        })
      );
      const response = await fetch(
        "https://react-http-redux-d3543-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        // when error we dispatch an error message
        // dispatch(uiActions.showNotification({
        //   status: 'error ',
        //   title: 'Error!',
        //   message: 'sending cart data failed!'
        // }))
        throw new Error("Sending cart data failed");
      }
      // there was no error so we send a success message
      // const responseData = await response.json();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    };
    // this was done to prevent the component 
    // from sending initial request when the component 
    // is rendered for the first time 
    if(initial){
      initial = false;
      return;
    }
    sendCartData().catch((error) => {
      // this handles all kinds of error that could occur as
      // compared to sending the error on line 27 - 32
      dispatch(
        uiActions.showNotification({
          status: "error ",
          title: "Error!",
          message: "sending cart data failed!",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
     {notification && <Notification 
        status={notification.status} 
        title={notification.title}
        message ={notification.message}
        />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
