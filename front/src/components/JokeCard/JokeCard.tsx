import { useMutation } from "@tanstack/react-query";
import { Joke } from "../../lib/types";
import "./jokeCard.css";
import { api } from "../../lib/api";
const JokeCard = ({ jokeData }: { jokeData: Joke }) => {
  const { mutate } = useMutation({
    mutationFn: ({ id, rate }: { id: number; rate: number }) =>
      api.put(`/${id}/rate?rating=${rate}`),
  });
  return (
    <div className="card-container">
      <div className="card-container-header">
        <p className="card-container-content">{jokeData.content}</p>
        <p className="card-container-author"> by {jokeData.author}</p>
      </div>
      <div className="card-container-footer">
        <span>Rating</span>
        <select
          id="rating"
          value={jokeData?.rating}
          onChange={(e) =>
            mutate({ id: jokeData.id, rate: Number(e.target.value) })
          }
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
    </div>
  );
};

export default JokeCard;
