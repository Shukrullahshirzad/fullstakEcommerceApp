import React, { useEffect, useState } from "react";
import axios from "axios";

// axios is a promise-based HTTP client for the browser and Node.js. It makes it easy to send asynchronous HTTP requests to REST endpoints and perform CRUD operations. It also supports the Promise API that is native to JS ES6+.

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false); // State to track if there was an error

  useEffect(() => {

    // useEffect is a hook that allows you to perform side effects in function components. Its syntax is useEffect(callback, dependencies). The callback function contains the side-effect logic. The dependencies array is optional and allows you to control when the effect runs.
    // The useEffect hook is called after the component is rendered. for example, if you want to fetch data from an API after the component is rendered, you can use useEffect to do that. in this case the fetchData function is called after the component is rendered.
    // By default, it runs both after the first render and after every update. However, if you provide an empty dependency array (as in this case), it will only run once after the initial render. in this example, the fetchData function is defined inside the useEffect hook and is called immediately after the component mounts. This is a common pattern for fetching data when a component loads. this approach will prevent multiple API calls on re-renders.

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        // instead of fetch we are using axios. fetch is a built-in function in JavaScript that allows you to make network requests similar to XMLHttpRequest (XHR). It is a modern and more powerful alternative to XHR, providing a simpler and cleaner API for making HTTP requests. using fetch we have to convert the response to json using response.json() but in axios it is done automatically
        // response have the following properties: data, status, statusText, headers, config, request. the following is description of each property:
        // data: The response body provided by the server. This is the main content you are interested in.
        // status: The HTTP status code returned by the server (e.g., 200 for success, 404 for not found).
        // statusText: The HTTP status message corresponding to the status code (e.g., "OK" for 200).
        // headers: An object containing the response headers sent by the server. Headers provide additional information about the response, such as content type, content length, etc.
        // config: The configuration object that was used to make the request. This includes details like the URL, method, headers, etc.
        // request: The underlying request object that was used to make the HTTP request. This is typically an instance of XMLHttpRequest in the browser or an instance of http.ClientRequest in Node.js.
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      }
    };

    fetchData();
  }, []);

  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Something went wrong...
      </h2>
    );
  }

  return (
    <>
      <div className="grid">
        {products.map((product) => (
          <div
            className="card mb-3"
            key={product.id}
            style={{
              width: "270px",
              height: "210px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              borderRadius: "10px",
              overflow: "hidden",

              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "stretch",
            }}
          >
            <div
              className="card-body"
              style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <div>
                <h5
                  className="card-title"
                  style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}
                >
                  {product.name.toUpperCase()}
                </h5>
                <i
                  className="card-brand"
                  style={{ fontStyle: "italic", fontSize: "0.8rem" }}
                >
                  {"by " + product.brand}
                </i>
              </div>
              <hr className="hr-line" style={{ margin: "10px 0" }} />
              <div className="home-cart-price">
                <h5
                  className="card-text"
                  style={{
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    marginBottom: "5px",
                  }}
                >
                  <i className="bi bi-currency-rupee"></i>
                  {product.price}
                </h5>
              </div>
              <button
                className="btn-hover color-9"
                style={{ margin: "10px 25px 0px " }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
