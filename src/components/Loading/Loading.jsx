import ReactLoading from "react-loading";

import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerWrapper}>
        <ReactLoading type="spin" color="#000" />
      </div>
    </div>
  );
};

export default Loading;
