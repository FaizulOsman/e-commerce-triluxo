import Link from "next/link";
import { useRouter } from "next/router";

const Card = ({ id, image, title, price }) => {
  const { pathname } = useRouter();

  const userRole = pathname.split("/")[1];

  return (
    <div className="max-w-[1280px] w-11/12 mx-auto py-10">
      <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <a href="#!">
          <img className="rounded-t-lg" src={image} alt="" />
        </a>
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {title}
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <div className="flex justify-between items-centers">
            <h4 className="text-yellow-500 text-xl">{price}</h4>
            <Link href={`/${userRole}/products/${id}`}>
              <button className="rounded-md px-3 py-1 bg-blue-500 hover:bg-blue-600">
                See Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
