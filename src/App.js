import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import Notification from "./components/UI/Notification/Notification";
import { fetchCartData, sendCartData } from "./components/store/cart-actions";
// this is done to prevent the component
// from sending http request when rendered for the first time
let initial = true;
function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(()=> {
    dispatch(fetchCartData())  
  }, [dispatch])

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }if(cart.changed){
      dispatch(sendCartData(cart));
    }

    
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
