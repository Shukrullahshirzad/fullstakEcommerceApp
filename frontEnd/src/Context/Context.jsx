import axios from "../axios"; // import an axios instance configured for API requests
import { useState, useEffect, createContext } from "react"; // import React hooks used in this file

// createContext creates a Context object that components can subscribe to.
// Providing a default shape helps with tooling and documents the available values.
const AppContext = createContext({
  data: [], // list of products or data fetched from the backend
  isError: "", // string used to store any fetch or runtime error message
  cart: [], // array representing the user's shopping cart
  addToCart: (product) => {}, // placeholder function that will add a product to the cart
  removeFromCart: (productId) => {}, // placeholder function that will remove a product by id
  refreshData: () => {}, // placeholder function to re-fetch data from the server
  updateStockQuantity: (productId, newQuantity) => {}, // placeholder in case stock update is needed
});

// AppProvider is a component that wraps parts of the app which need access to the context.
// It accepts `children` so it can wrap other components in the component tree.
export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]); // state to hold products fetched from the API
  const [isError, setIsError] = useState(""); // state to hold error messages (empty if no error)
  // initialize cart from localStorage so the cart persists across page refreshes
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // addToCart adds a product to the cart; if the product already exists increment quantity
  const addToCart = (product) => {
    // find if product already exists in cart by matching id
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      // product exists: create a new cart array with the matched product's quantity incremented
      const updatedCart = cart.map(
        (item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 } // copy the item and increase quantity
            : item // leave other items unchanged
      );
      setCart(updatedCart); // update state with the new cart
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // persist cart to localStorage
    } else {
      // product not in cart: add it with an initial quantity of 1
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart); // update cart state
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // persist cart to localStorage
    }
  };

  // removeFromCart removes a product from the cart by its id
  const removeFromCart = (productId) => {
    console.log("productID", productId); // debug log showing which product is being removed
    const updatedCart = cart.filter((item) => item.id !== productId); // filter out the removed product
    setCart(updatedCart); // update cart state with filtered array
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // update persisted cart
    console.log("CART", cart); // debug log: note this logs the old cart value due to state being async
  };

  // refreshData fetches product data from the backend API using axios
  const refreshData = async () => {
    try {
      const response = await axios.get("/products"); // GET /products endpoint
      // map backend Product fields to the shape the frontend expects:
      // backend: productId, name, price, brand, available, stockQuantity, category, description
      // frontend components expect: id, name, price, brand, productAvailable, quantity, category, description
      const normalized = (response.data || []).map((p) => ({
        id: p.productId ?? p.id, // prefer productId from backend, fall back to id
        name: p.name,
        price: p.price,
        brand: p.brand,
        description: p.description,
        category: p.category,
        productAvailable: p.available ?? p.productAvailable ?? true, // normalize availability flag
        quantity: p.stockQuantity ?? p.quantity ?? 0, // normalize stock/quantity field
        imageName: p.imageName ?? null, // preserve any imageName if backend provides one
        // keep other backend fields if needed
        ...p,
      }));
      setData(normalized); // store normalized data in state
    } catch (error) {
      setIsError(error.message); // capture and store any error message
    }
  };

  // clearCart empties the cart (useful after checkout or logout)
  const clearCart = () => {
    setCart([]); // set cart state to empty array
  };

  // useEffect with empty dependency array runs once on component mount
  // here it's used to fetch products when the app/provider first loads
  useEffect(() => {
    refreshData(); // call the function defined above to fetch data
  }, []);

  // Persist cart to localStorage whenever the `cart` state changes.
  // This keeps the localStorage copy in sync with React state.
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Provide the state and action functions to any component that consumes this context.
  // The object passed to `value` should include everything a consumer might need.
  return (
    <AppContext.Provider
      value={{
        data,
        isError,
        cart,
        addToCart,
        removeFromCart,
        refreshData,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext; // export the context so components can subscribe to it using useContext
