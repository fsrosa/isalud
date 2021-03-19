import React, { useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import styles from "./MainCard.module.scss";

const MainCard = ({ post, ...props }) => {
  return (
    <article className={styles.cardContainer}>
      <Link href={`/posts/${post.id}`}>
        <div className={styles.cardPictureContainer}>
          <img
            className={styles.cardPic}
            src={post.featured_media.large}
            alt={`post.metas.og:image:alt`}
          />
        </div>
      </Link>
      <div className={styles.cardTextContainer}>
        {/* <div className="">{}</div> */}
        <Link href={`/posts/${post.id}`}>
          <span className={styles.cardTitle}>{post.title}</span>
        </Link>
        <p className={styles.cardHeadline}>{post.headline}</p>
      </div>
    </article>
  );
};

export default MainCard;
