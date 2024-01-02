import React from "react";
import Button from "./Button";

const Card = ({ id, food, quantity, setQuantity, addToCart }) => {
  const cartItemHandler = () => {
    const foodData = {
      ...food,
      title: food.title,
      price: food.price,
    };
    addToCart(foodData);
  };

  return (
    <div
      id={id}
      className="card w-96 bg-base-100 shadow-xl my-2 outline outline-2 outline-gray-200/75"
    >
      <figure>
        <img src={food.img} alt={food.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-warning">{food.title}</h2>
        <p>{food.description}</p>
        <div className="card-actions justify-end">
          <p className="text-warning font-semibold italic">
            <span className="text-neutral">Price:</span> ${food.price}
          </p>
          <span className="pr-10 text-neutral-content">Amount: {quantity}</span>
          <Button
            id={id}
            quantity={quantity}
            setQuantity={() => setQuantity(id)}
            addToCart={cartItemHandler}
          >
            {food.text}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
