import styles from "./NotFound.module.scss";

import Image from "next/image";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerWrapper}>
        <Image src="/notFound.png" alt="Not Found" width={370} height={290} />
        <p>Não existem artigos relacionados ao termo pesquisado!</p>
      </div>
    </div>
  );
};

export default NotFound;
