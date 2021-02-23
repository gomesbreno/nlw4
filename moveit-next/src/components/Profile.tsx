import styles from "../styles/components/Profile.module.css";

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img
        src="https://avatars.githubusercontent.com/u/26438217?s=60&v=4"
        alt="Breno Gomes"
      />
      <div>
        <strong>Breno Gomes</strong>
        <p>Level 1</p>
      </div>
    </div>
  );
}
