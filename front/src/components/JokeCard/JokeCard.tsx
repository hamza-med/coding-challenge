import { Joke } from "../../lib/types";
import "./jokeCard.css";
const JokeCard = ({ jokeData }: { jokeData: Joke }) => {
  return (
    <div className="card-container">
      <div className="card-container-header">
        <p className="card-container-content">{jokeData.content}</p>
        <p className="card-container-author"> by {jokeData.author}</p>
      </div>
      <div className="card-container-footer">
        <span>Rating</span>
        <select id="rating" value={jokeData?.rating}>
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
