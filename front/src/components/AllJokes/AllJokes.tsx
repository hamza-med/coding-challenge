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

  const authors = useMemo(() => {
    if (allJokes?.length > 0) {
      const authors = allJokes?.map((joke: Joke) => joke?.author);
      return [...new Set(authors)];
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
    if (ratingFilter > 0 && allJokes?.length > 0) {
      return allJokes?.filter((joke: Joke) => {
        const ratingFilterMatch =
          ratingFilter === 0 || (joke?.rating as number) >= ratingFilter;
        const authorFilterMatch =
          authorFilter === "" || joke?.author === authorFilter;

        return ratingFilterMatch && authorFilterMatch;
      });
    }
  }, [ratingFilter, allJokes, authorFilter]);

  return (
    <div className="all-jokes">
      <div className="all-jokes-header">
        <h2>All jokes ({filteredJokes?.length})</h2>
        <div className="joke-search">
          <Search size={18} color="#808080" />
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search"
          />
        </div>
      </div>
      <div className="joke-filers">
        <div>
          <select
            onChange={(e) => setAuthorFilter(e.target.value)}
            className="author-select"
          >
            <option value="">Author</option>
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
          <span
            style={{
              left: `${ratingFilter * 18}%`,
              position: "absolute",
              top: "20px",
              opacity: 0.5,
            }}
          >
            {ratingFilter}
          </span>
        </div>
      </div>
      <div className="jokes-container">
        {filteredJokes?.map((joke: Joke) => (
          <JokeCard key={joke.id} jokeData={joke} />
        ))}
      </div>
    </div>
  );
};

export default AllJokes;
