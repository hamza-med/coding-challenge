import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { useMemo } from "react";
import { Joke } from "../../lib/types";
import "./bestAuthors.css";
import { StarIcon } from "lucide-react";
const BestAuthors = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ["allJokes"],
    queryFn: () => api.get(""),
  });
  const authorsWithRatings = useMemo(() => {
    if (isSuccess && data?.data) {
      const authors: {
        [author: string]: { totalRating: number; jokeCount: number };
      } = {};
      data.data.forEach((joke: Joke) => {
        const { author, rating } = joke;
        if (authors[author]) {
          authors[author].totalRating += rating as number;
          authors[author].jokeCount++;
        } else {
          authors[author] = { totalRating: rating as number, jokeCount: 1 };
        }
      });
      return Object.keys(authors).map((author) => ({
        author,
        averageRating: authors[author].totalRating / authors[author].jokeCount,
        jokesNumber: authors[author].jokeCount,
      }));
    }
    return [];
  }, [isSuccess, data]);
  const bestAuthors = useMemo(() => {
    return authorsWithRatings
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 5);
  }, [authorsWithRatings]);

  return (
    <div className="all-jokes">
      <h2>Top five authors</h2>
      <div className="all-authors-container">
        {bestAuthors.map((author) => (
          <div className="author-card">
            <p className="author">{author.author}</p>
            <p className="rating">
              <StarRating rating={Number(author.averageRating.toFixed(2))} />
            </p>
            <p className="jokes-number">
              {author.jokesNumber > 1
                ? `${author.jokesNumber} jokes`
                : `${author.jokesNumber} joke`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestAuthors;

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          size={20}
          fill={star <= rating ? "rgb(250 204 21)" : "none"}
          color={star <= rating ? "rgb(250 204 21)" : "rgb(209 213 219)"}
          key={star}
        />
      ))}
      {/* <span style={{ marginLeft: "5px", fontWeight: "500" }}>{rating}</span> */}
    </div>
  );
};
