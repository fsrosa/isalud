import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import parse from "html-react-parser";

import Header from "../../components/Header/Header";

import styles from "../../styles/Posts.module.scss";

export default function Posts({ postData }) {
  const [post, setPost] = useState(postData);
  var date = post.published.slice(0, 10);

  return (
    <>
      <Head>
        <title>{post.metas["title"]}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={post.metas["description"]} />
        <meta name="keywords" content={post.headline} />
        <meta
          name="viewport"
          content="width=device-width"
          initial-scale="1.0"
        />
        <meta charset="utf-8" />
        <meta name="robots" content={post.metas["robots"]} />
        <meta name="author" content={post.author.name} />
        <meta property="og:locale" content={post.metas["og:locale"]} />
        <meta property="og:type" content={post.metas["og:type"]} />
        <meta property="og:title" content={post.metas["og:title"]} />
        <meta property="twitter:card" content={post.metas["twitter:card"]} />
        <meta
          property="twitter:creator"
          content={post.metas["twitter:creator"]}
        />
        <meta property="twitter:site" content={post.metas["twitter:site"]} />
        <meta
          property="og:description"
          content={post.metas["og:description"]}
        />
        <meta property="og:url" content={post.link} />
        <meta
          property="og:site_name"
          content={post.metas["og:site_name"]}
        ></meta>
      </Head>
      <Header />
      <main className={styles.mainContainer}>
        <div className={styles.mainWrapper}>
          <div className={styles.postCategoryContainer}>
            <span className={styles.postCategory}>
              {post.categories?.length ? post.categories[0].name : "Geral"}
            </span>
          </div>

          <h1 className={styles.postTitle}>{post.title}</h1>

          <div className={styles.postSubContainer}>
            <p className={styles.postSub}>
              {date} <span>BY</span> {post.author.name}
            </p>
          </div>

          <div className={styles.postPictureContainer}>
            <Image
              className={styles.postPicture}
              src={post.featured_media["big-size"]}
              alt={post.metas["og:image:alt"]}
              width={400}
              height={300}
            />
          </div>

          <article className={styles.postContent}>
            {parse(post.content)}
          </article>

          <div className={styles.postBibliographyContainer}>
            <p>
              {post.bibliography ? (
                <>
                  <h2>Bibliografia</h2>
                  {parse(post.bibliography)}
                </>
              ) : (
                ""
              )}
            </p>
          </div>

          <div className={styles.postCategoriesContainer}>
            {post.tags?.length ? (
              <>
                <h2>Tags</h2>
                {post.tags?.map((tag) => (
                  <span key={tag.id}>{tag.name}</span>
                ))}
              </>
            ) : ""}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const response = await fetch(
    `https://api.beta.mejorconsalud.com/wp-json/mc/v1/posts/${id}`
  );

  const postData = await response.json();
  return {
    props: {
      postData: postData,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const response = await fetch(
    `https://api.beta.mejorconsalud.com/wp-json/mc/v1/posts`
  );
  const posts = await response.json();
  const paths = posts.map((post) => ({
    params: { id: `${post.id}` },
  }));
  return {
    paths: paths,
    fallback: 'blocking',
  };
}
