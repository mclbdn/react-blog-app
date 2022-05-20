import styles from "./ArticlePreview.module.scss";
import img from "../assets/img.png";

const ArticlePreview = () => {
  return (
    <div className={styles.article_preview_container}>
      <div className={styles.left_side_preview}>
        <img src={img}></img>
      </div>
      <div className={styles.right_side_preview}>
        <h4>Why Do Cats Have Whiskers?</h4>
        <p className={styles.name_and_date}>Elisabeth Strain | 22. 5. 2022</p>
        <p className={styles.perex}>
          A cat's whiskers — or vibrissae — are a well-honed sensory tool that helps a cat see in the dark and steer clear of hungry predators.
          Whiskers are highly sensitive tactile hairs that grow in patterns on a cat's muzzle, above its eyes and elsewhere on its body, like the
          ears, jaw and forelegs
        </p>
        <div className={styles.link_and_comments}>
          <a href="">Read whole article</a>
          <p>0 comments</p>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;