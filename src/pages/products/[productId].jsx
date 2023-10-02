import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SingleProduct = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const { productId } = useParams("productId");
  const [product, setProduct] = useState([]);

  const loadData = async () => {
    const res = await fetch(`http://localhost:5000/products/${productId}`);
    const data = await res.json();
    setProduct(data);
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const price = e.target.price.value;

    const data = {
      title: title,
      price: price,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/products/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

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

  const deleteProduct = async () => {
    const isConfirm = window.confirm("Do you want to delete this product?");
    if (isConfirm) {
      try {
        const response = await fetch(
          `http://localhost:5000/products/${productId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

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
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="max-w-[1280px] w-11/12 mx-auto">
      <h1 className="text-3xl lg:text-4xl font-bold text-center my-10">
        Product Details
      </h1>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-[450px] mx-auto"
          />
        </div>
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl lg:text-4xl font-bold py-4">
              {product?.title}
            </h1>
            <h4 className="text-2xl font-semibold text-yellow-500 py-4">
              {product?.price}
            </h4>
          </div>
          <p>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <div className="flex gap-6 py-10">
            <button
              onClick={() => deleteProduct()}
              className="rounded-md px-3 py-1 bg-red-500 hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => setIsUpdate(!isUpdate)}
              className="rounded-md px-3 py-1 bg-green-500 hover:bg-green-600"
            >
              Update
            </button>
          </div>
        </div>
      </div>
      {isUpdate && (
        <div className="py-10">
          <h1 className="text-3xl lg:text-4xl py-6">Update this product</h1>
          <form onSubmit={(e) => updateProduct(e)} className="w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="title"
                >
                  {product?.title}
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="title"
                  type="text"
                  name="title"
                  defaultValue={product?.title}
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
                  {product?.price}
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="price"
                  type="text"
                  name="price"
                  defaultValue={product?.price}
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
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
