import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://notice-app-api.up.railway.app/notice")
      .then((response) => response.json())
      .then((data) => {
        setNotices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching notices:", error);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  if (loading) {
    return (
      <div className="flex  justify-center items-center mt-10 md:mt-20 lg:mt-30 ">
        <i className="fas fa-spinner fa-spin text-blue-500 text-2xl  md:text-3xl lg:text-4xl"></i>
      </div>
    );
  }

  return (
    <div className="mb-10 md:mt-10 lg:mt-16 flex flex-col md:items-center justify-center p-4 ">
      <h1 className=" mb-3 md:mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text text-2xl md:text-3xl lg:text-4xl font-semibold w-fit ">
        Latest.
      </h1>
      {notices.length > 0 ? (
        <ul className="w-full max-w-5xl grid grid-cols-2 gap-4  md:grid-cols-3 ">
          {notices.slice(0, 6).map((notice) => (
            <li
              key={notice.id}
              className="p-4 md:px-8 md:py-6 bg-slate-100 rounded-2xl border border-slate-200 transition transform duration-200 hover:scale-105 flex flex-col justify-between"
            >
              <div>
                {" "}
                <h2 className=" md:text-xl font-semibold m-0 text-gray-800 mb-2">
                  {notice.title.slice(0, 15)}...
                </h2>
                <p className="text-gray-500 text-sm md:text-sm mb-4">
                  {formatDate(notice.date)}
                </p>
              </div>
              <div>
                <Link
                  to={`/notice/${notice.id}`}
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:text-blue-800 transition-colors text-sm md:text-base"
                >
                  See More →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No notices available.</p>
      )}
    </div>
  );
};

export default Home;
