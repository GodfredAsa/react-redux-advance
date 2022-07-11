import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "Jack and the Giants",
    description: "Jack climbs the giant plant",
  },
  {
    id: "p2",
    price: 5,
    title: "My First Book",
    description: "First book I ever wrote",
  },
  {
    id: "p3",
    price: 5,
    title: "The Hawk and the Hen",
    description: "The Best Story book in our Days!!!",
  },
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
