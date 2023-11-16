import Head from 'next/head';
import useLang from '@/hooks/useLang';
import { TbSend } from "react-icons/tb";
import styles from "@/styles/index.module.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/api/sendEmail'  // Ruta para desarrollo
  : '/api/sendEmail';



export default function Home() {
  const { t, l } = useLang();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [lang, setLang] = useState(l || "es");
  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedIsEmail = localStorage.getItem("isEmail");
      setIsSuccess(storedIsEmail ? JSON.parse(storedIsEmail) : false);
      setShowUI(true);
    }
  }, []);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (email.length < 5 || email.length > 120) {
      setLoading(false);
      return setError(t("error.email.length"));
    }
    try {
      const res = await axios.post(apiUrl, { email, lang });
      setIsSuccess(true);
      localStorage.setItem("isEmail", JSON.stringify(true));
      setError("");
    } catch (e) {
      console.error(e);
      setError(t("error.email.used"));
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Tip Roulette</title>
      </Head>
      <main>
        <h1 className={styles.title}>{t("index.title")}</h1>
        <h2 className={styles.description}>{t("index.description")}...</h2>
        {
          showUI ? <section className={styles.sendEmail}>
          {!isSuccess ? (
            <>
              <span className={styles.emailMsg}>{t("index.msgEmail")}</span>
              <form className={styles.emailForm} onSubmit={submitHandler}>
                <input
                  type="email"
                  minLength={5}
                  maxLength={120}
                  placeholder="Email"
                  className={styles.emailField}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className={styles.btnSendEmail} disabled={loading}>
                  <TbSend />
                </button>
              </form>
              {error ? <span className={styles.errorMsg}>{error}</span> : null}
            </>
          ) : (
            <p className={styles.successMsg}>{t("message.success")}
            <br />
            {t("message.success_2")}
            </p>
          )}
        </section> : <></>
        }
        
        
      </main>
    </>
  )
}
