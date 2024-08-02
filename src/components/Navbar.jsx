import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-col items-center font-serif font-semibold bg-white">
      <Link //For navigation
        to="/"
        className=" cursor-pointer text-[5vw] lg:text-[2vw]  uppercase font-semibold "
      >
        Online Quiz Platform
      </Link>
      <hr className="w-full bg-gray-900" />
    </div>
  );
};

export default Header;
