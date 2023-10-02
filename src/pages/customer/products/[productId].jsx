import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SingleProduct = () => {
  const { productId } = useParams("productId");
  const [product, setProduct] = useState([]);

  const loadData = async () => {
    const res = await fetch(`http://localhost:5000/products/${productId}`);
    const data = await res.json();
    setProduct(data);
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
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
