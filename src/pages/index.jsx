import Head from "next/head";
import dynamic from "next/dynamic";

import { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import ArticleCard from "../components/ArticleCard/ArticleCard";
import MainCard from "../components/MainCard/MainCard";

const Loading = dynamic(() => import("../components/Loading/Loading"));
const NotFound = dynamic(() => import("../components/NotFound/NotFound"));
const Pagination = dynamic(() => import("../components/Pagination/Pagination"));

import styles from "../styles/Index.module.scss";

export default function Home({ postsData, totalPosts }) {
  const [isSearching, setIsSearching] = useState(false);
  const [posts, setPosts] = useState(postsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsQuantity, setPostsQuantity] = useState(totalPosts);
  const [findedPosts, setFindedPosts] = useState(0);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (value, currentPage = 1, relevantOrder) => {
    setNotFound(false);
    setIsLoading(true);

    const response = await fetch(
      `https://api.beta.mejorconsalud.com/wp-json/mc/v2/posts?search=${value}&page=${currentPage}${relevantOrder}`
    );
    const postsData = await response.json();
    if (postsData.size == 0) {
      setNotFound(true);
    }
    setPosts(postsData.data);
    setPostsQuantity(postsData.pages);
    setFindedPosts(postsData.size);

    setIsLoading(false);
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (!isSearching) {
      setPosts(postsData);
    }
  }, [postsData, isSearching, setPosts, currentPage]);

  return (
    <div>
      <Head>
        <title>iSaúde | Saúde Inteligente</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Blog sobre bons hábitos e cuidados para sua saúde!"
        />
        <meta
          name="keywords"
          content="saúde, bons hábitos, saúde inteligente, minha saúde"
        />
        <meta
          name="viewport"
          content="width=device-width"
          initial-scale="1.0"
        />
        <meta name="robots" content="index,follow" />
        <meta charSet="utf-8" />
        <meta name="author" content="Fabrício Rosa" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="iSaúde - Saúde Inteligente" />
        <meta
          property="og:description"
          content="Blog sobre bons hábitos e cuidados para sua saúde!"
        />
        <meta property="og:url" content="https://mejorconsalud.as.com/" />
        <meta property="og:site_name" content="Mejor con Salud"></meta>
      </Head>

      <Header />
      <SearchBar
        onSearch={handleSearch}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        placeholder="Digite algo para buscar uma notícia..."
        currentPage={currentPage}
        setIsLoading={setIsLoading}
      />
      <main className={styles.mainContainer}>
        <div className={styles.mainWrapper}>
          {isLoading ? (
            <>
              <Loading />
            </>
          ) : isSearching ? (
            notFound ? (
              <p>
                <NotFound />
              </p>
            ) : (
              <>
                {posts?.length &&
                  posts.map((post) => <MainCard post={post} key={post.id} />)}
                <Pagination
                  currentPage={currentPage}
                  totalPages={postsQuantity}
                  setCurrentPage={setCurrentPage}
                  onSearch={handleSearch}
                  findedPosts={findedPosts}
                />
              </>
            )
          ) : (
            posts?.length && (
              <>
                <h1>Últimas notícias</h1>
                <MainCard post={posts[0]} />
                {posts.slice(1, 7).map((post) => (
                  <ArticleCard post={post} key={post.id} />
                ))}
              </>
            )
          )}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://api.beta.mejorconsalud.com/wp-json/mc/v2/posts",
    { method: "GET" }
  );

  const postsData = await response.json();
  return {
    props: {
      postsData: postsData.data,
      totalPosts: postsData.size,
    },
  };
}
