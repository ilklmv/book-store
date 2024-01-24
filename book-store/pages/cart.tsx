import React, { useState } from "react";
import styles from "@/components/cart.module.css";

const CartPage: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>SHOPPING CART</h1>
      <div className={styles.container}>
        <div className={styles.container_row}>
          <p>ITEM</p>
          <p>QUANTITY</p>
          <p>PRICE</p>
          <p>DELIVERY</p>
        </div>
        <div className={styles.container_row1}>
          <p>Книга</p>
          <div className={styles.quantityContainer}>
            <button onClick={decreaseQuantity}>
              <img src="/minus.svg" alt="minus" />
            </button>
            <p className={styles.quantity}>{quantity}</p>
            <button onClick={increaseQuantity}>
              <img src="/plus.svg" alt="plus" />
            </button>
          </div>
          <p>Цена</p>
          <p>Shopping: delivery</p>
        </div>
        <div className={styles.container_row1}>
          <p>Книга</p>
          <div className={styles.quantityContainer}>
            <button onClick={decreaseQuantity}>
              <img src="/minus.svg" alt="minus" />
            </button>
            <p className={styles.quantity}>{quantity}</p>
            <button onClick={increaseQuantity}>
              <img src="/plus.svg" alt="plus" />
            </button>
          </div>
          <p>Цена</p>
          <p>Shopping: delivery</p>
        </div>
      </div>
      <h1 className={styles.title}>TOTAL PRICE:</h1>
      <button className={styles.checkout_button}>{"CHECKOUT"}</button>
    </div>
  );
};

export default CartPage;
