import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { getHomePosts } from '../lib/api'

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>云开发小站</title>
        <link rel="icon" href="https://main.qcloudimg.com/raw/3b942431a6ef465d3b8369969e861c0f/favicon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://www.cloudbase.net/">云开发 CloudBase!</a>
        </h1>


        <div className={styles.grid}>
          {posts.map(post => (
            <Link href={`/post/${post._id}`}>
              <a href="https://nextjs.org/docs" className={styles.card}>
                <h3>{post.title} &rarr;</h3>
                <p>{post.author}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.cloudbase.net/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="https://main.qcloudimg.com/raw/3b942431a6ef465d3b8369969e861c0f/favicon.png" alt="TCB Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: await getHomePosts()
  };
}