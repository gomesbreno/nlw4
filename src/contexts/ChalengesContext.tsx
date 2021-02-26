import { useState, createContext, ReactNode, useEffect } from "react";
import firebase from "firebase";

import challenges from "../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState<number>(1);
  const [currentExperience, setCurrentExperience] = useState<number>(0);
  const [challengesCompleted, setChallengesCompleted] = useState<number>(0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState<boolean>(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
    getUserProgress();
  }, []);

  function getUserProgress() {
    firebase
      .database()
      .ref(`/userProgress`)
      .once("value", (snapshot) => {
        const {
          challengesCompleted,
          currentExperience,
          level,
        } = snapshot.val();
        setChallengesCompleted(challengesCompleted);
        setCurrentExperience(currentExperience);
        setLevel(level);
      });
  }

  function persistUserProgress({
    challengesCompleted,
    currentExperience,
    level,
  }) {
    firebase
      .database()
      .ref(`/userProgress`)
      .set({ challengesCompleted, currentExperience, level })
      .then(() => {
        console.log("Salvo com sucesso");
      })
      .catch((err) => console.log(err));
  }

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio 🎉", {
        body: `Valendo ${challenge.amount} xp!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
    persistUserProgress({
      challengesCompleted: challengesCompleted + 1,
      currentExperience: finalExperience,
      level: level + 1,
    });
  }

  return (
    <ChallengeContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
  );
}
