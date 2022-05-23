import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";
import moment from "moment";
import img from "../assets/img.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";
import styles from "./SingleArticle.module.scss";

const SingleArticle = () => {
  let { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [numOfComments, setNumOfComments] = useState(0);
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [imageId, setImageId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [createdAt, setCreatedAt] = useState();

  const handleDownloadImage = async () => {
    try {
      const response = await axios.get(`https://fullstack.exercise.applifting.cz/images/${imageId}`, {
        headers: {
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
          Authorization: localStorage.getItem("access_token"),
        },
        responseType: "blob",
      });

      const imageBlob = await response.data;

      const localUrl = URL.createObjectURL(imageBlob);

      setImageUrl(localUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const postComment = async (e) => {
    e.preventDefault();

    const dataToSend = {
      articleId: id,
      author: commentAuthor,
      content: commentContent,
    };

    try {
      const response = await axios.post(`https://fullstack.exercise.applifting.cz/comments`, dataToSend, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
          Authorization: localStorage.getItem("access_token"),
        },
      });

      fetchNumberOfComments(id);
      console.log(response.data);
      setCommentAuthor("");
      setCommentContent("");
      fetchArticleDetails();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNumberOfComments = async (articleId) => {
    try {
      const response = await axios.get(`https://fullstack.exercise.applifting.cz/articles/${articleId}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
          Authorization: localStorage.getItem("access_token"),
        },
      });

      setNumOfComments(response.data.comments.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNumberOfComments(id);
  }, []);

  const fetchArticleDetails = async () => {
    const response = await axios.get(`https://fullstack.exercise.applifting.cz/articles/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
        Authorization: localStorage.getItem("access_token"),
      },
    });

    const data = await response.data;

    const unsortedComments = await response.data.comments;

    const sortedComments = unsortedComments.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setTitle(data.title);
    setContent(data.content);
    setComments(sortedComments);
    setCreatedAt(moment(new Date(data.createdAt)).format("MM/DD/YYYY"));
    setImageId(data.imageId);
  };

  useEffect(() => {
    fetchArticleDetails();
  }, [id]);

  useEffect(() => {
    handleDownloadImage();
  }, [imageId]);

  return (
    <>
      <Nav />
      <main className={styles.single_article_main_content}>
        <article>
          <h1 className={styles.article_title}>{title}</h1>
          <p className={styles.name_and_date}>
            Elon <span className={styles.circle_span}>&#9679;</span> {createdAt}
          </p>
          <div
            className={styles.thumbnail_image}
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
          <div className={styles.content}>
            <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
          </div>
        </article>
        <section className={styles.comment_section}>
          <form onSubmit={postComment}>
            <div className={styles.heading_and_publish_container}>
              <h4 className={styles.h1}>Comments({numOfComments})</h4>
              <button type="submit" className={styles.publish_comment_btn}>
                Publish comment
              </button>
            </div>
            <div className={styles.label_and_input}>
              <label htmlFor="commentAuthor" className={styles.label}>
                Your name
              </label>
              <input
                type="text"
                name="commentAuthor"
                className={`${styles.input} ${styles.author_input}`}
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                id="commentAuthor"
                placeholder="Kimbal Musk"
                maxLength={20}
                required
              />
            </div>
            <div className={styles.label_and_input}>
              <label htmlFor="commentContent" className={styles.label}>
                Your comment
              </label>
              <textarea
                required
                name="commentContent"
                className={styles.label}
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                id="commentContent"
                placeholder="This article is awesome!"
                maxLength={1000}
              />
            </div>
          </form>
          {comments &&
            comments.map((comment) => {
              return (
                <Comment
                  key={comment.commentId}
                  commentId={comment.commentId}
                  author={comment.author}
                  content={comment.content}
                  createdAt={comment.createdAt}
                  score={comment.score}
                />
              );
            })}
        </section>
      </main>
    </>
  );
};

export default SingleArticle;
