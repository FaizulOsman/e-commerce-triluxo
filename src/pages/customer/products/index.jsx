import Card from "@/components/Card";
import Link from "next/link";
import { useEffect, useState } from "react";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  const loadData = async () => {
    const res = await fetch("http://localhost:5000/products");
    const data = await res.json();
    setAllProducts(data);
  };

  // console.log(allProducts);

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="max-w-[1280px] w-11/12 mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-center text-3xl lg:text-4xl font-bold py-10">
          All Products
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {allProducts?.map((product, index) => (
          <Card
            key={product?.id}
            id={product?.id}
            image={product?.image}
            title={product?.title}
            price={product?.price}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
