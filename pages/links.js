import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  const links = [
    {
      name: "Resume",
      url: "/Resume_iamzubin.pdf",
      description: "Checkout my resume here!!!",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/iamzubin/",
      description: "Find me on linkdin",
    },
    {
      name: "GitHub",
      url: "https://www.github.com/iamzubin/",
      description: "Take a look at my open source projects",
    },
    {
      name: "Twitter",
      url: "https://www.twitter.com/iamzubin/",
      description: "Follow me on twitter shitposting",
    },
    {
      name: "Email",
      url: "mailto:zchoudhary.10@gmail.com",
      description: "Send me an email",
    },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>iamzub.in | links</title>
        <meta name="description" content="links to socials and others" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div
          className={styles.flexRow}
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <Link className={styles.title} href="/" rel="noopener noreferrer">
            &larr;
          </Link>
          <h1 className={styles.title}>Links</h1>
          <h1
            className={styles.title}
            style={{
              color: "transparent",
              textShadow: "none",
            }}
          >
            &rarr;
          </h1>
        </div>
        <div className={styles.column}>
          {links.map((link) => (
            <a
              href={link.url}
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>{link.name} &rarr;</h2>
              <p>{link.description}</p>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
