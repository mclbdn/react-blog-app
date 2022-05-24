import styles from "./NewArticle.module.scss";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";

const NewArticle = () => {
  const navigate = useNavigate();
  const hiddenFileInput = useRef(null);
  const [title, setTitle] = useState("");
  const [perex, setPerex] = useState("");
  const [content, setContent] = useState("## Hi, there!");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageWasUploaded, setImageWasUploaded] = useState(false);
  const [imageId, setImageId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [formHasErrors, setFormHasErrors] = useState({});

  const publishArticle = async (e) => {
    e.preventDefault();
    console.log(localStorage.getItem("access_token"));

    // Did the user add content?
    if (content.length === 0) {
      setFormHasErrors({ message: "Please add some content!" });
      return;
    }

    // Did the user add perex?
    if (perex.length === 0) {
      setFormHasErrors({ message: "Please add some perex!" });
      return;
    }

    // Did the user set a title?
    if (!title) {
      setFormHasErrors({ message: "Please write a title!" });
      return;
    }

    // Did the user set an image?
    if (!imageUrl) {
      setFormHasErrors({ message: "Please upload an image!" });
      return;
    }

    try {
      const dataToSend = {
        title,
        content,
        perex,
        imageId,
      };

      await axios.post("https://fullstack.exercise.applifting.cz/articles", dataToSend, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
          Authorization: localStorage.getItem("access_token"),
        },
      });

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownloadImage = async () => {
    try {
      const response = await axios.get(`https://fullstack.exercise.applifting.cz/images/${imageId}`, {
        headers: {
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
          Authorization: localStorage.getItem("access_token"),
        },
        responseType: "blob",
      });

      const imageBlob = response.data;

      const localUrl = URL.createObjectURL(imageBlob);

      setImageUrl(localUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageDelete = async () => {
    try {
      await axios.delete(`https://fullstack.exercise.applifting.cz/images/${imageId}`, {
        headers: {
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
          Authorization: localStorage.getItem("access_token"),
        },
      });

      setSelectedFile(null);
      setImageWasUploaded(false);
      setImageId("");
      setImageUrl("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImage = async () => {
    const formData = new FormData();

    formData.append("image", selectedFile);

    try {
      const response = await axios.post("https://fullstack.exercise.applifting.cz/images", formData, {
        headers: {
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
          Authorization: localStorage.getItem("access_token"),
        },
      });

      setImageId(response.data[0].imageId);
      setImageWasUploaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // When clicking on the "Upload an image" button, trigger the invisible file input
  const handleBtnClick = () => {
    hiddenFileInput.current.click();
  };

  useEffect(() => {
    async function fetchData() {
      if (selectedFile) {
        await handleUploadImage();
      }
    }
    fetchData();
  }, [selectedFile]);

  useEffect(() => {
    async function fetchData() {
      if (selectedFile) {
        await handleDownloadImage();
      }
    }
    fetchData();
  }, [imageId]);

  useEffect(() => {
    const hasAccessToken = localStorage.getItem("access_token") ? true : false;

    if (!hasAccessToken) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Nav />
      <main>
        {formHasErrors && (
          <p id="form_error_paragraph" className={styles.form_error}>
            {formHasErrors.message}
          </p>
        )}
        <form onSubmit={publishArticle} className={styles.publish_form}>
          <div className={styles.heading_and_publish_container}>
            <h1 className={styles.h1}>Create new article</h1>
            <button id="new_article_publish_article_btn" type="submit" className={styles.publish_article_btn}>
              Publish article
            </button>
          </div>
          <label htmlFor="title" className={styles.label}>
            Article Title
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            placeholder="My first article"
            maxLength={100}
          />
          <label htmlFor="perex" className={styles.label}>
            Article Perex
          </label>
          <input
            type="text"
            name="perex"
            value={perex}
            onChange={(e) => setPerex(e.target.value)}
            id="perex"
            placeholder="My amazing perex"
            maxLength={100}
          />
          <p className={styles.p}>Featured image</p>
          <input
            multiple={false}
            ref={hiddenFileInput}
            className={styles.upload_image_input}
            type="file"
            name="image"
            onChange={handleFileSelect}
            id="photo"
          />
          {!imageWasUploaded && (
            <button id="new_article_image_upload_btn" type="button" onClick={handleBtnClick} className={styles.upload_image_btn}>
              Upload an Image
            </button>
          )}
          {imageWasUploaded && (
            <div className={styles.reupload_and_delete_container}>
              <img className={styles.uploaded_img} src={imageUrl} alt="uploaded file" />{" "}
              <button type="button" onClick={handleBtnClick} className={styles.reupload_image_btn}>
                ReUpload new
              </button>{" "}
              <p className={styles.divider_p}>|</p>{" "}
              <button type="button" onClick={handleImageDelete} className={styles.delete_image_btn}>
                Delete
              </button>
            </div>
          )}
          <p className={styles.p}>Content</p>
          <div className={styles.md_container}>
            <MDEditor value={content} onChange={setContent} />
            <MDEditor.Markdown source={content} />
          </div>
        </form>
      </main>
    </>
  );
};

export default NewArticle;
