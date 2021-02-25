import styles from "../styles/components/Profile.module.css";
import { ChallengeContext } from "../contexts/ChalengesContext";
import { useContext } from "react";

export function Profile() {
  const { level } = useContext(ChallengeContext);

  return (
    <div className={styles.profileContainer}>
      <img
        src="https://avatars.githubusercontent.com/u/26438217?s=60&v=4"
        alt="Breno Gomes"
      />
      <div>
        <strong>Breno Gomes</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
