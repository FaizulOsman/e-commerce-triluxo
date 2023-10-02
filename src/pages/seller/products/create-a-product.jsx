import { useEffect, useState } from "react";

const CreateAProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const loadData = async () => {
    const res = await fetch("http://localhost:5000/products");
    const data = await res.json();
    setAllProducts(data);
  };

  const createProduct = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const image = e.target.image.value;
    const price = e.target.price.value;

    const data = {
      id: allProducts
        ? allProducts?.length + 1
        : Math.random() * (10000 - 100) + 100,
      title: title,
      image: image,
      price: `$${price}`,
    };

    try {
      const response = await fetch(`http://localhost:5000/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        console.log("Successfully updated product");

        setUpdatedData(updatedProduct);
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="py-10">
      <h1 className="text-3xl lg:text-4xl pb-5 text-center">
        Create A Product
      </h1>
      <form
        onSubmit={(e) => createProduct(e)}
        className="w-full max-w-sm mx-auto"
      >
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="title"
            >
              Title
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="title"
              type="text"
              name="title"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              type="text"
              htmlFor="image"
            >
              Image URL
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="image"
              type="text"
              name="image"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              type="text"
              htmlFor="price"
            >
              Price
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="price"
              type="text"
              name="price"
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAProduct;
