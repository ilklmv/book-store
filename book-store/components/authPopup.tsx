import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/components/authpopup.module.css";

interface AuthPopupProps {
  onLogin: (email: string, password: string) => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsPasswordIncorrect(false);
  };

  const handleLoginClick = () => {
    if (password !== "правильный_пароль") {
      setIsPasswordIncorrect(true);
      return;
    }

    onLogin(email, password);
    router.push("/profile");
  };

  return (
    <div className={styles.auth_popup_container}>
      <div className={styles.auth_popup}>
        <h2 className={styles.title}>Log in</h2>
        <div className={styles.input_container}>
          <label className={styles.label}>Email:</label>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className={styles.input_container}>
          <label className={styles.label}>Password:</label>
          <input
            className={`${styles.input} ${isPasswordIncorrect ? styles.incorrect_password : ""}`}
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {isPasswordIncorrect && (
            <p className={styles.error_message}>Incorrect password</p>
          )}
        </div>
        <button className={styles.login_button} onClick={handleLoginClick}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default AuthPopup;
