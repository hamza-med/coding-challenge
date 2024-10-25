import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import "./DayJoke.css";
const DayJoke = () => {
  const { data, isError } = useQuery({
    queryKey: ["joke"],
    queryFn: () => api.get("random"),
  });
  const jokeOfTheDay = data?.data;
  if (isError) {
    return (
      <div>
        <p className="text-error">Something went wrong</p>
      </div>
    );
  }

  return (
    <div>
      <div className="joke-card">
        <h2 className="joke-title">Joke of the day</h2>
        <p className="joke-content">{jokeOfTheDay?.content}</p>
      </div>
    </div>
  );
};

export default DayJoke;
