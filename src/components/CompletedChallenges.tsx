import { useContext } from "react";
import styles from "../styles/components/CompletedChallenges.module.css";
import { ChallengeContext } from "../contexts/ChalengesContext";

export function CompletedChallenges() {
  const { challengesCompleted } = useContext(ChallengeContext);

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}
