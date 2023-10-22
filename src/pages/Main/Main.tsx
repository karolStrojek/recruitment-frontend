import { ReactNode, useEffect } from "react";
import BackgroundBottom from "../../assets/Background2.png";
import BackgroundTop from "../../assets/backgroundTop.png";
import BackgroundTopBlack from "../../assets/tloTopBlack.png";
import styles from "./Main.module.scss";

export interface IMainPage {
  children: ReactNode;
}

export const MainPage = ({ children }: IMainPage) => {
  return (
    <main>
      <div className={`${styles.background}`}>
        {/* Create graphic background elements */}
        {Array.from(Array(3)).map(() => (
          <div
            style={{ backgroundImage: `url(${BackgroundBottom})` }}
            className={styles.mask}
          ></div>
        ))}
        {/* White background layer */}
        <img
          src={BackgroundTop}
          className={`${styles.background} ${styles.top}`}
        ></img>
      </div>
      {/* Wrapper for over the background elements */}
      <div className={styles.topLayer}>{children}</div>
    </main>
  );
};
