import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  // Changed state variable from animalInput to movieInput
  const [movieInput, setMovieInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      // Added this line to convert the movie input string to an array. The trim() method removes any whitespace before or after each movie title.
      const movieArray = movieInput.split(',').map(movie => movie.trim());

      // Changed 'animal' to 'movies' in the request body
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movies: movieArray }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      // Cleared the movie input field after submitting
      setMovieInput("");
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  console.log(result); // Add this line
   
   
  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <main className={styles.main}>
        <h3>Recommend Movies</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="movies"
            placeholder="Enter a list of movies"
            value={movieInput}
            onChange={(e) => setMovieInput(e.target.value)}
          />
          <input type="submit" value="Generate Recommendations" />
        </form>
        <div className={styles.result}>
        {result && result.split('\n').map((rec, index) => rec && <p key={index}>{rec}</p>)}
         </div>
      </main>
    </div>
  );
  
}
