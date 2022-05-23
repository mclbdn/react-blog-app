import axios from "axios";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Comment.module.scss";
import { useState } from "react";

const Comment = ({ author, content, createdAt, score, commentId }) => {
  const [updatedScore, setUpdatedScore] = useState(score);

  const upVoteComment = async () => {
    console.log(localStorage.getItem("access_token"));
    try {
      const response = await fetch(`https://fullstack.exercise.applifting.cz/comments/${commentId}/vote/up/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
          Authorization: localStorage.getItem("access_token"),
        },
      });

      const data = await response.json();

      setUpdatedScore(data.score);
    } catch (err) {
      console.log(err);
    }
  };

  const downVoteComment = async () => {
    console.log(localStorage.getItem("access_token"));
    try {
      const response = await fetch(`https://fullstack.exercise.applifting.cz/comments/${commentId}/vote/down`, {
        method: "POST",
        headers: {
          "X-API-KEY": "af699f87-dfe3-4a31-9206-a9267dd42a6b",
          Authorization: localStorage.getItem("access_token"),
        },
      });

      const data = await response.json();

      setUpdatedScore(data.score);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.comment_container}>
        <div className={styles.name_and_time}>
          <p className={styles.commenter_name}>{author}</p>
          <p className={styles.comment_time}>2 hours ago</p>
        </div>
        <p className={styles.comment_content}>{content}</p>
        <div className={styles.comment_rating_container}>
          <p className={styles.score_para}>{updatedScore}</p>
          <span className={styles.score_divider}>|</span>
          <FontAwesomeIcon className={styles.plus_icon} icon={faChevronUp} onClick={upVoteComment} />
          <span className={styles.score_divider}>|</span>
          <FontAwesomeIcon className={styles.minus_icon} icon={faChevronDown} onClick={downVoteComment} />
        </div>
      </div>
    </>
  );
};

export default Comment;
