import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import "./allJokes.css";
import JokeCard from "../JokeCard/JokeCard";
import { Joke } from "../../lib/types";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
const AllJokes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [allJokes, setAllJokes] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [authorFilter, setAuthorFilter] = useState<string>("");
  const [sortingOrder, setSortingOrder] = useState("asc");

  const authors = useMemo(() => {
    if (allJokes?.length > 0) {
      const allAuthors = allJokes?.map((joke: Joke) => joke?.author);
      return [...new Set(allAuthors)];
    }
    return [];
  }, [allJokes]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [inputValue]);

  const { data, isSuccess } = useQuery({
    queryKey: ["allJokes", searchTerm],
    queryFn:
      searchTerm.trim() === ""
        ? () => api.get("")
        : () => api.get(`search?keyword=${searchTerm}`),
  });
  const jokes = data?.data;
  useEffect(() => {
    if (isSuccess) {
      setAllJokes(jokes);
    }
  }, [isSuccess, jokes]);
  const filteredJokes = useMemo(() => {
    return allJokes?.filter((joke: Joke) => {
      const ratingFilterMatch =
        ratingFilter === 0 || (joke?.rating as number) >= ratingFilter;
      const authorFilterMatch =
        authorFilter === "" || joke?.author === authorFilter;

      return ratingFilterMatch && authorFilterMatch;
    });
  }, [ratingFilter, allJokes, authorFilter]);
  const finalJokes = useMemo(() => {
    if (sortingOrder === "asc") {
      return filteredJokes?.sort(
        (a: Joke, b: Joke) => (a?.rating as number) - (b?.rating as number)
      );
    } else {
      return filteredJokes?.sort(
        (a: Joke, b: Joke) => (b?.rating as number) - (a?.rating as number)
      );
    }
  }, [filteredJokes, sortingOrder]);
  return (
    <div className="all-jokes">
      <div className="all-jokes-header">
        <h2>All jokes ({filteredJokes?.length})</h2>
        <div className="joke-search-container">
          <select
            name=""
            id=""
            onChange={(e) => setSortingOrder(e.target.value)}
          >
            <option value="">Sort by rating</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <div className="joke-search">
            <Search size={18} color="#808080" />
            <input
              type="text"
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <div className="joke-filers">
        <div>
          <select
            onChange={(e) => setAuthorFilter(e.target.value)}
            className="author-select"
          >
            <option value="">All authors</option>
            {authors?.map((author: string) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>
        <div className="slide-container" style={{ position: "relative" }}>
          <input
            type="range"
            min="0"
            max="5"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(Number(e.target.value))}
            className="slider"
            id="myRange"
          />
          <span style={{ position: "absolute", left: 0, top: "20px" }}>0</span>
          <span style={{ position: "absolute", left: "100%", top: "20px" }}>
            5
          </span>
          <span
            style={{
              left: `${ratingFilter * 18}%`,
              position: "absolute",
              top: "-26px",
              opacity: 0.5,
              width: "100px",
            }}
          >
            {ratingFilter > 1
              ? `${ratingFilter} Stars`
              : `${ratingFilter} Star`}
          </span>
        </div>
      </div>
      <div className="jokes-container">
        {finalJokes?.map((joke: Joke) => (
          <JokeCard key={joke.id} jokeData={joke} />
        ))}
      </div>
    </div>
  );
};

export default AllJokes;
