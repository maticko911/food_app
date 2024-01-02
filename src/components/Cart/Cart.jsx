import React, { Fragment, useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import api from "../../api/api";
import Checkout from "./Checkout";
import { FormContextProvider } from "../context/FormContext";

const Cart = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const totalAmount = () => {
    return props.cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  };

  const deleteHandler = (id) => {
    const deleteItem = props.cartItems.filter((item) => item.id !== id);
    props.setCartItems(deleteItem);
    props.setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [id]:
        (prevQuantity[id] || 0) -
        props.cartItems.find((item) => item.id === id).quantity,
    }));
  };

  const handleDecrease = (id) => {
    props.setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [id]: (prevQuantity[id] || 0) - 1,
    }));
    props.setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      );
    });
  };

  const handleIncrease = (id) => {
    props.setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [id]: (prevQuantity[id] || 0) + 1,
    }));
    props.setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    });
  };

  const handleUserData = async (data) => {
    try {
      await api.post("users/users.json", data);

      const purchaseData = {
        ...data,
        items: props.cartItems,
        totalAmount: totalAmount(),
      };

      if (purchaseData.items.length === 0) {
        setIsVisible(false);
        setErrorMessage(true);

        const timeOut = setTimeout(() => {
          setErrorMessage(false);
        }, 3000);

        return () => {
          clearTimeout(timeOut);
        };
      } else {
        await api.post("users/purchase.json", purchaseData);

        props.setQuantity(0);
        props.setCartItems([]);

        setSuccessMessage(true);

        const timeOut = setTimeout(() => {
          setSuccessMessage(false);
        }, 3000);
        setIsVisible(false);
        setErrorMessage(false);
        return () => {
          clearTimeout(timeOut);
        };
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirmEvent = async () => {
    if (props.quantity === 0) {
      setErrorMessage(true);

      const timeOut = setTimeout(() => {
        setErrorMessage(false);
      }, 3000);

      return () => {
        clearTimeout(timeOut);
      };
    } else {
      setIsVisible(true);
    }
  };

  return (
    <Fragment>
      <label
        htmlFor="my-modal-6"
        className="btn outline outline-2 outline-warning m-2"
      >
        <div quantity={props.quantity} className="text-center">
          <ShoppingBagIcon className="w-6 h-6 inline-block mb-2" />
          <div className="px-2 text-red-600/70 text-xl inline-block">
            {props.quantity === 0 ? "" : props.quantity}
          </div>
        </div>
      </label>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {successMessage && (
            <div className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Your purchase has been confirmed!</span>
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Error! Task failed successfully.</span>
            </div>
          )}
          <h3 className="font-bold text-3xl uppercase py-3 border-b border-warning text-center">
            Order Description
          </h3>
          <div className="py-4">
            {props.cartItems.length > 0 ? (
              props.cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid items-center mb-2 border-b border-gray-200"
                >
                  <p className="text-xl font-bold text-warning">{item.title}</p>
                  <p className="inline-block">Quantity: {item.quantity}</p>
                  <div className="inline-block">
                    <button
                      className="btn"
                      onClick={() => handleIncrease(item.id)}
                    >
                      +
                    </button>
                    {item.quantity === 0 ? (
                      <button className="btn btn-disabled" disabled>
                        -
                      </button>
                    ) : (
                      <button
                        className="btn"
                        onClick={() => handleDecrease(item.id)}
                      >
                        -
                      </button>
                    )}
                  </div>
                  <p className="text-xl font-thin italic inline-block p-2">
                    Price: $ <span className="text-red-600">{item.price}</span>
                  </p>
                  <button
                    className="btn"
                    onClick={() => deleteHandler(item.id)}
                  >
                    <TrashIcon className="w-6 h-6 inline-block" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-base shadow-sm py-5 px-3 italic">
                Sorry, your cart is empty. Please add items to your cart.
              </p>
            )}
            <div className="italic text-2xl">
              Total Amount: $
              <span className="font-bold underline text-red-600">
                {totalAmount()}
              </span>
            </div>
          </div>
          {isVisible && (
            <FormContextProvider>
              <Checkout customerInfo={handleUserData} />
            </FormContextProvider>
          )}
          {!isVisible && (
            <div className="modal-action">
              <label htmlFor="my-modal-6" className="btn btn-secondary">
                Close
              </label>

              <button
                htmlFor="my-modal-6"
                className="btn btn-success"
                onClick={handleConfirmEvent}
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
