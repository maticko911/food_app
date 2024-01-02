import React from "react";
import Card from "../UI/Card";

const FoodItem = (props) => {
  const cartHandler = (data) => {
    const dataToPass = {
      ...data,
    };
    props.addToCart(dataToPass);
  };
  return (
    <Card
      id={props.id}
      food={props.food}
      quantity={props.quantity}
      setQuantity={props.setQuantity}
      addToCart={cartHandler}
    />
  );
};

export default FoodItem;
