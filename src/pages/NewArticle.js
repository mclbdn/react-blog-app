import styles from "./NewArticle.module.scss";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";

const NewArticle = () => {
  const navigate = useNavigate();
  const hiddenFileInput = useRef(null);
  const [mdContent, setMdContent] = useState("**Hello world!!!**");
  const [title, setTitle] = useState("");
  const [perex, setPerex] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageWasUploaded, setImageWasUploaded] = useState(false);
  const [imageId, setImageId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [formHasErrors, setFormHasErrors] = useState({});

  const publishArticle = async (e) => {
    e.preventDefault();

    if (mdContent.length === 0) {
      setFormHasErrors({ message: "Please add some content!" });
      return;
    } else if (!title) {
      setFormHasErrors({ message: "Please write a title!" });
      return;
    } else if (!imageUrl) {
      setFormHasErrors({ message: "Please upload an image!" });
      return;
    } else {
      try {
        const response = await fetch(`https://fullstack.exercise.applifting.cz/articles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
            Authorization: localStorage.getItem("access_token"),
          },
          body: JSON.stringify({
            title,
            perex,
            content: mdContent,
            imageId,
          }),
        });

        const data = await response.json();

        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDownloadImage = async () => {
    console.log("Inside handle download");
    try {
      const response = await fetch(`https://fullstack.exercise.applifting.cz/images/${imageId}`, {
        method: "GET",
        headers: {
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
          Authorization: localStorage.getItem("access_token"),
        },
      });

      const imageBlob = await response.blob();

      const localUrl = URL.createObjectURL(imageBlob);

      setImageUrl(localUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://fullstack.exercise.applifting.cz/images/${imageId}`, {
        method: "DELETE",
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

  const handleSubmit = async () => {
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
      setImageWasUploaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleBtnClick = () => {
    hiddenFileInput.current.click();
  };

  useEffect(() => {
    async function fetchData() {
      if (selectedFile) {
        await handleSubmit();
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

  function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

  useEffect(() => {
    let truncatedString = truncateString(mdContent, 50);
    setPerex(truncatedString);
  }, [mdContent]);

  return (
    <>
      <Nav />
      <main>
        {formHasErrors && <p className={styles.form_error}>{formHasErrors.message}</p>}
        <form onSubmit={publishArticle} className={styles.publish_form}>
          <div className={styles.heading_and_publish_container}>
            <h1 className={styles.h1}>Create new article</h1>
            <button type="submit" className={styles.publish_article_btn}>
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
            // required
            placeholder="My first article"
          />
          <p className={styles.p}>Featured image</p>
          <input
            multiple={false}
            ref={hiddenFileInput}
            className={styles.upload_image_input}
            type="file"
            name="image"
            onChange={handleFileSelect}
            id="title"
            // required
          />
          {!imageWasUploaded && (
            <button type="button" onClick={handleBtnClick} className={styles.upload_image_btn}>
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
              <button type="button" onClick={handleDelete} className={styles.delete_image_btn}>
                Delete
              </button>
            </div>
          )}
          <p className={styles.p}>Content</p>
          <div className={styles.md_container}>
            <MDEditor value={mdContent} onChange={setMdContent} />
            <MDEditor.Markdown source={mdContent} />
          </div>
        </form>
      </main>
    </>
  );
};

export default NewArticle;
