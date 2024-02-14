import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://api.github.com";

const App = () => {
  const [query, setQuery] = useState("");
  const [githubData, setGithubData] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  // const [repo, setRepo] = useState([]);

  const handleFetch = async () => {
    try {
      const res = await axios(
        `/search/users?q=${query}&per_page=10&page=${pageNo}`
      );
      // ${&page,per_page,sort,order}
      console.log(res);
      setGithubData(res.data.items);
    } catch (error) {
      console.error("error in fetch function", error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, [pageNo]);

  // const handleRepo = async (name) => {
  //   try {
  //     const res = await axios(`/users/${name}/repos`);
  //     console.log(res);
  //     setRepo(res.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="w-full h-screen bg-gray-400">
      <div className="w-full h-[40vh] bg-yellow-50 grid place-items-center">
        <div className="w-[300px] border-red-500 border flex p-5">
          <input
            type="search"
            className="w-full h-[3rem] rounded px-3 border outline-0"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="p-2 bg-green-200 text-green-900"
            onClick={handleFetch}
          >
            search
          </button>
        </div>
      </div>
      {pageNo}
      <div className="w-full h-auto bg-green-50 grid place-items-center">
        <div className="flex gap-5">
          <button
            disabled={pageNo <= 1 ? true : false}
            className={`px-5 py-1 ${
              pageNo <= 1 ? "bg-red-400" : "bg-teal-500"
            }`}
            onClick={() => setPageNo((prev) => (prev -= 1))}
          >
            pre
          </button>
          <button
            className="px-5 py-1 bg-gray-500"
            onClick={() => setPageNo((prev) => (prev += 1))}
          >
            next
          </button>
        </div>
        {githubData?.map((item, index) => (
          <div key={index}>
            {item.login}
            <img src={item.avatar_url} alt="" className="w-24" />
            <button
              onClick={() => handleRepo(item.login)}
              className="bg-red-400 px-7 py-2"
            >
              repo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
