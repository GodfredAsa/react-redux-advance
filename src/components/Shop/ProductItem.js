import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
// import { useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";

const ProductItem = (props) => {
  const { title, price, description, id } = props;

  const dispatch = useDispatch();

  const addToCartHandler = () => {

    
// and then send http request
// fetch('firebase url', {method: POST, body: JSON.stringify(newCart)})

// dispatch and action 
dispatch(cartActions.addItemToCart({
  id,
  title,
  price,
}));


  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
