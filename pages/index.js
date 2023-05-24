import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [jobNameInput, setJobNameInput] = useState("");
  const [jobLevelInput, setJobLevelInput] = useState("");
  const [experienceInput, setExperienceInput] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobName: jobNameInput,
          jobLevel: jobLevelInput,
          experience: experienceInput,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
  }

  return (
    <div>
      <Head>
        <title>Job requirements</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>Find job requirements</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="jobName"
            placeholder="Enter job name"
            value={jobNameInput}
            onChange={(e) => setJobNameInput(e.target.value)}
          />
          <input
            type="text"
            name="jobLevel"
            placeholder="Enter job level (ex. junior)"
            value={jobLevelInput}
            onChange={(e) => setJobLevelInput(e.target.value)}
          />
          <input
            type="text"
            name="experience"
            placeholder="Enter years of experience"
            value={experienceInput}
            onChange={(e) => setExperienceInput(e.target.value)}
          />

          <div className={styles.buttonContainer}>
            <input type="submit" value="Create job description" disabled={isLoading} />
            {isLoading && <span className={styles.loadingMessage}>Loading...</span>}
          </div>
        </form>
        {result && (
          <div  className={styles.description} >
            <p>
              Job requirements and responsibilities of {jobLevelInput} {jobNameInput} with {experienceInput} year experience:
            </p>
          </div>
        )}
        {result && (
          <div
            className={styles.result}
            dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, "<br>") }}
          />
        )}
      </main>
    </div>
  );
}
