import { useState } from "react";
import "./jokeForm.css";

type Values = {
  author: string;
  joke: string;
};
const JokeForm = () => {
  const [values, setValues] = useState<Values>({ author: "", joke: "" });
  const [error, setError] = useState<string>("");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
        <div className="new-joke-form-group">
          <label htmlFor="joke">Joke</label>
          <textarea
            name="joke"
            id="joke"
            onChange={handleChange}
            value={values.joke}
          />
        </div>
        <button className="form-button">Submit</button>
      </form>
    </div>
  );
};

export default JokeForm;
