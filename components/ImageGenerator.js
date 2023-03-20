import { useState, useEffect } from "react";
import styles from "./ImageGenerator.module.css";

const ImageGenerator = ({ prompt }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  console.log("ImageGenerator rendered");

  useEffect(() => {
    if (prompt) {
      const generateImage = async () => {
        console.log("generateImage called");
        try {
          const response = await fetch("/api/image-generation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: prompt }),
          });

          if (!response.ok) {
            throw new Error("Failed to generate image");
          }

          const data = await response.json();
          setImage(data.imageUrl);
          setError(null);
        } catch (error) {
          setImage(null);
          setError(error.message);
        }
      };

      generateImage();
    }
  }, [prompt]);

  if (!prompt) {
    return null;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!image) {
    return <div className={styles.status}>Generating image...</div>;
  }

  return <div className={styles.generated}><img className={styles.genimage} src={image} alt="Generated image" /></div>;
};

export default ImageGenerator;
