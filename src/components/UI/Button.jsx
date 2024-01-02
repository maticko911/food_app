import React from "react";

const Button = (props) => {
  const handleQuantity = () => {
    props.setQuantity(props.id, props.quantity);

    const saveItemForCart = {
      id: props.id,
    };

    props.addToCart(saveItemForCart);
  };

  return (
    <button className="btn" onClick={handleQuantity}>
      {props.children}
    </button>
  );
};

export default Button;
