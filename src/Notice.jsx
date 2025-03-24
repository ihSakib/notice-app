import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 10;

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

  const filteredNotices = notices.filter(
    (notice) =>
      notice.title.toLowerCase().includes(search.toLowerCase()) ||
      notice.description.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = filteredNotices.slice(
    indexOfFirstNotice,
    indexOfLastNotice
  );

  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return (
      <div className="flex  justify-center items-center mt-10 md:mt-20 lg:mt-30 ">
        <i className="fas fa-spinner fa-spin text-blue-500 text-2xl  md:text-3xl lg:text-4xl"></i>
      </div>
    );
  }

  return (
    <div className="p-4 mx-auto max-w-6xl flex flex-col min-h-[80dvh]">
      <input
        type="text"
        placeholder="Search by title "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded self-start"
      />
      {currentNotices.length > 0 ? (
        <ul className="w-full flex-grow">
          {currentNotices.map((notice) => (
            <li
              key={notice.id}
              className="w-full list-disc mb-2 p-2 border-b border-gray-300 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{notice.title}</h3>
                <p className="text-sm text-gray-500">
                  {formatDate(notice.date)}
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  to={`/notice/${notice.id}`}
                  className="text-blue-500 hover:text-blue-600 text-sm"
                >
                  View
                </Link>
                <a
                  href={notice.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 text-sm"
                >
                  Download
                </a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No notices available.</p>
      )}

      {/* Pagination */}
      {currentNotices.length > 0 && (
        <div className="mt-4 md:mt-6 flex justify-center items-center">
          <button
            onClick={prevPage}
            className="cursor-pointer text-sm px-3 py-1 mx-1 border border-slate-300 rounded hover:bg-slate-200"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`cursor-pointer text-sm px-3 py-1 mx-1 border border-slate-300 rounded ${
                index + 1 === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-slate-200"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={nextPage}
            className="cursor-pointer text-sm px-3 py-1 mx-1 border border-slate-300 hover:bg-slate-200 rounded"
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default Notice;
