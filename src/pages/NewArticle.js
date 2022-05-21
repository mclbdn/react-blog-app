import styles from "./NewArticle.module.scss";
import img from "../assets/img.png";
import moment from "moment";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import axios from "axios";

const NewArticle = () => {
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageId, setImageId] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleDownloadImage = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://fullstack.exercise.applifting.cz/images/${imageId}`, {
        method: "GET",
        headers: {
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
          Authorization: localStorage.getItem("access_token"),
        },
      });

      const imageBlob = await response.blob();
      console.log(imageBlob);
      const localUrl = URL.createObjectURL(imageBlob);
      console.log(localUrl);
      setImageUrl(localUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", selectedFile);

    try {
      const response = await fetch("https://fullstack.exercise.applifting.cz/images", {
        method: "POST",
        headers: {
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
          Authorization: localStorage.getItem("access_token"),
        },
        body: formData,
      });

      const data = await response.json();
      setImageId(data[0].imageId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
      <Nav />
      <main>
        <form className={styles.publish_form}>
          <div className={styles.heading_and_publish_container}>
            <h1>Create new article</h1>
            <button>Publish article</button>
          </div>
          <label htmlFor="title">Article Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            required
            placeholder="My first article"
          />
          <label htmlFor="image">Article Title</label>
          <input type="file" name="image" onChange={handleFileSelect} id="title" required placeholder="My first article" />
        </form>
      </main>
      <button onClick={handleSubmit}>asdasd</button>
      <button onClick={handleDownloadImage}>Download</button>
      <img src={imageUrl} alt="" />
    </>
  );
};

export default NewArticle;
