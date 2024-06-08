import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";

const Info = ({ data }) => {
  return (
    <div className="w-full flex-1 flex flex-col gap-5">
      <p className="flex gap-3 items-center text-gray-500">
        <Link to="/">
          <AiOutlineHome />
        </Link>
        / <span>{data.tag}</span>
      </p>

      <div>
        <h1 className="font-bold text-xl md:text-2xl">{data.title}</h1>
        <img className="rounded-md max-w-[140px]" src={data.cover} alt="" />
      </div>

      <h1 className="font-bold text-lg">About This Note</h1>

      <p>{data.desc}</p>
    </div>
  );
};

export default Info;
