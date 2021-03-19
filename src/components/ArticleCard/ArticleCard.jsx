import React from "react";

import Link from "next/link";
import Image from "next/image";

import styles from "./ArticleCard.module.scss";

const ArticleCard = ({ post, ...props }) => {
  //const dateFormatted = post.date; //ToDo: Format Date
  return (
    <>
      <Link href={`/posts/${post.id}`}>
        <article className={styles.cardContainer}>
          <div className={styles.cardImageContainer}>
            <Image
              className={styles.cardImage}
              // ToDo: get og:image:alt in the request
              src={post.featured_media.large}
              alt="og:image:alt"
              height={300}
              width={300}
              onError={(e) => (e.target.src = "../../../public/notFound.png")}
            />
          </div>
          <div className={styles.cardTextContainer}>
            <div className="">{}</div>
            <span className={styles.cardTitle}>{post.title}</span>
          </div>
        </article>
      </Link>
    </>
  );
};

export default ArticleCard;
