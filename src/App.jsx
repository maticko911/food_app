import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import FoodItem from "./components/Food/FoodItem";
import Footer from "./components/Footer/Footer";
import { debounce } from "lodash";
import api from "./api/api";

function App() {
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");
  const [filterSearchFood, setFilterSearchFood] = useState([foodItem]);
  const [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFoodItem, setSelectedFoodItem] = useState([]);

  useEffect(
    useCallback(() => {
      const fetchDataFromDB = async () => {
        setIsLoading(true);
        try {
          const response = await api.get("/food.json");
          const getData = response.data;

          const output = Object.keys(getData).map((item) => ({
            id: [item],
            ...getData[item],
          }));
          setFoodItem(output);
          setError(false);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          setError("Something went wrong!");
        }
      };
      fetchDataFromDB();
    }, []),
    []
  );

  useEffect(() => {
    const filterFood = debounce(() => {
      const filteredItems = foodItem.reduce((accumulator, dish) => {
        if (dish.title.toLowerCase().includes(search.toLowerCase())) {
          accumulator.push(dish);
        }
        return accumulator;
      }, []);
      setFilterSearchFood(filteredItems);
    }, 500);

    filterFood();

    return () => {
      filterFood.cancel();
    };
  }, [foodItem, search]);

  const quantitySet = (id) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [id]: (prevQuantity[id] || 0) + 1,
    }));
  };

  const totalQuantity = filterSearchFood.reduce((total, dish) => {
    const dishQuantity = quantity[dish.id] || 0;
    return total + dishQuantity;
  }, 0);

  const selectedFoodHandle = (selectedFood) => {
    const findSelectedFood = selectedFoodItem.find(
      (dish) => dish.id === selectedFood.id
    );

    if (findSelectedFood) {
      setSelectedFoodItem((prevItem) => {
        return prevItem.map((dish) =>
          dish.id === selectedFood.id
            ? {
                ...dish,
                quantity: dish.quantity + 1,
              }
            : dish
        );
      });
    } else {
      setSelectedFoodItem((prevFood) => {
        return [{ ...selectedFood, quantity: 1 }, ...prevFood];
      });
    }
  };

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        quantity={totalQuantity}
        setQuantity={setQuantity}
        setCartItems={setSelectedFoodItem}
        cartItems={selectedFoodItem}
      />
      <main className="grid grid-flow-row md:grid-rows-2 lg:grid-cols-2 xl:grid-cols-3 justify-items-center items-center py-5 md:px-4">
        {isLoading && !error && (
          <span className="loading loading-dots loading-lg"></span>
        )}
        {!isLoading && error && (
          <p className="text-3xl font-semibold text-red-600 text-center error-message">
            {error}
          </p>
        )}
        {filterSearchFood.length > 0 ? (
          filterSearchFood.map((dish) => (
            <ul key={dish.id}>
              {!isLoading && !error && (
                <FoodItem
                  id={dish.id}
                  food={dish}
                  quantity={quantity[dish.id] || 0}
                  setQuantity={() => quantitySet(dish.id[0])}
                  addToCart={selectedFoodHandle}
                />
              )}
            </ul>
          ))
        ) : (
          <p className="font-semibold text-warning">
            Sorry there is nothing you are looking for! (┬┬﹏┬┬)
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
