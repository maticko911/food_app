import React from "react";
import Search from "../Search/Search";
import Cart from "../Cart/Cart";

const Header = ({
  search,
  setSearch,
  setQuantity,
  quantity,
  cartItems,
  setCartItems,
}) => {
  return (
    <header className="grid grid-flow-col justify-between items-center p-5 border-b border-yellow-500/60 shadow-sm">
      <h1 className="font-bold text-3xl">Quantum Restaurant</h1>
      <Search search={search} setSearch={setSearch} />
      <Cart
        quantity={quantity}
        cartItems={cartItems}
        setQuantity={setQuantity}
        setCartItems={setCartItems}
      />
    </header>
  );
};

export default Header;
