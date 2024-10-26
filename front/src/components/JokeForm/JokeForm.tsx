import { useState } from "react";
import "./jokeForm.css";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { Loader2 } from "lucide-react";

type Values = {
  author: string;
  joke: string;
};
const JokeForm = () => {
  const [values, setValues] = useState<Values>({ author: "", joke: "" });
  const [authorError, setAuthorError] = useState<string>("");
  const [jokeError, setJokeError] = useState<string>("");
  const { mutate, isPending } = useMutation({
    mutationFn: (values: Values) =>
      api.post("", { author: values.author, content: values.joke }),
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "joke") {
      if (value.length < 300 && value.length >= 10) {
        setJokeError("");
      }
    }
    if (name === "author") {
      if (value.length >= 3) {
        setAuthorError("");
      }
    }
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!values.author) {
      setAuthorError("Please fill in the author field");
    } else if (values.author.length < 3) {
      setAuthorError("Author name must be at least 3 characters long");
    } else {
      setAuthorError("");
    }

    if (!values.joke) {
      setJokeError("Please fill in the joke field");
    } else if (values.joke.length < 10) {
      setJokeError("Joke content is too short, provide 10 characters at least");
    } else if (values.joke.length > 300) {
      setJokeError(
        "Joke is too long, please keep it shorter than 300 characters"
      );
    } else {
      setJokeError("");
    }

    if (authorError || jokeError) {
      return;
    }
    mutate(values);
  };

  return (
    <div className="new-joke">
      <h2 className="new-joke-title">New Joke</h2>
      <form onSubmit={handleSubmit} className="new-joke-form">
        <div className="new-joke-form-group">
          <label htmlFor="author">Author</label>
          <input
            onChange={handleChange}
            value={values.author}
            type="text"
            name="author"
            id="author"
            className="new-joke-form-input"
          />
        </div>
        {authorError && <p className="error-message">{authorError}</p>}
        <div className="new-joke-form-group">
          <label htmlFor="joke">Joke</label>
          <textarea
            name="joke"
            id="joke"
            onChange={handleChange}
            value={values.joke}
          />
        </div>
        {jokeError && <p className="error-message">{jokeError}</p>}

        <button
          className={
            isPending || authorError || jokeError ? "disabled" : "form-button"
          }
        >
          {isPending && (
            <p>
              <Loader2 className="spin" size={20} />
            </p>
          )}
          Submit
        </button>
      </form>
    </div>
  );
};

export default JokeForm;
