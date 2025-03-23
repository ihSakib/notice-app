import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center mt-10 md:mt-15 lg:mt-20">
      <div className="text-center p-8 ">
        <i className="fas fa-face-frown text-6xl text-slate-400"></i>
        <h1 className="md:text-3xl text-2xl lg:text-4xl font-bold text-gray-800 mt-4">
          404
        </h1>
        <p className="text-sm md:text-base text-gray-700 mt-4">
          Oops! The page you're looking for cannot be found.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
