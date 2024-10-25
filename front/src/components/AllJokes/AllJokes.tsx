import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import "./allJokes.css";
import JokeCard from "../JokeCard/JokeCard";
import { Joke } from "../../lib/types";
import { useEffect, useState } from "react";
const AllJokes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [allJokes, setAllJokes] = useState([]);

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

  return (
    <div className="all-jokes">
      <div className="all-jokes-header">
        <h2>All jokes ({allJokes?.length})</h2>
        <div className="joke-filers">
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search"
          />
        </div>
      </div>
      <div className="jokes-container">
        {jokes?.map((joke: Joke) => (
          <JokeCard key={joke.id} jokeData={joke} />
        ))}
      </div>
    </div>
  );
};

export default AllJokes;
