import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

//  cart action for fetching data
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-redux-d3543-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch cart data");
      }
      const data = response.json();
      return data;
    };
    try {
     const cartData =  await fetchData();
    //  this systax ensures if there no items in the server it does not break but returns empty list
     dispatch(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,
     }))
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error ",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

//  cart action for sending data
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending...",
        message: "sending cart data...",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-redux-d3543-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error ",
          title: "Error!",
          message: "sending cart data failed!",
        })
      );
    }

    dispatch(
      uiActions.showNotification({
        status: "success",
        title: "Success!",
        message: "Sent cart data successfully!",
      })
    );
  };
};
