import AllJokes from "../components/AllJokes/AllJokes";
import BestAuthors from "../components/BestAuthors/BestAuthors";
import DayJoke from "../components/DayJoke/DayJoke";

function Home() {
  return (
    <>
      <DayJoke />
      <AllJokes />
      <BestAuthors />
    </>
  );
}

export default Home;
