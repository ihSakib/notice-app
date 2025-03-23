import React, { useEffect, useState } from "react";

const Home = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch("https://notice-app-api.up.railway.app/notice")
      .then((response) => response.json())
      .then((data) => setNotices(data))
      .catch((error) => console.error("Error fetching notices:", error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notice Board</h1>
      {notices.length > 0 ? (
        <ul className="space-y-4">
          {notices.map((notice) => (
            <li key={notice.id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-bold">{notice.title}</h2>
              <p>{notice.description}</p>
              <a
                href={notice.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Download
              </a>
              <p className="text-gray-500 text-sm">{notice.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notices available.</p>
      )}
    </div>
  );
};

export default Home;
