import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Post.module.css';
import { getAllPostId, getPost } from '../../lib/api';
import remark from 'remark'
import html from 'remark-html'

export default function Post({
    title,
    image,
    author,
    avator,
    contentHtml
}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="https://main.qcloudimg.com/raw/3b942431a6ef465d3b8369969e861c0f/favicon.png" />
            </Head>

            <main className={styles.main}>
                <div className={styles.info_container}>
                    <img className={styles.image} src={image}></img>
                    <div className={styles.info}>
                        <h1 className={styles.title}>{title}</h1>
                        <div className={styles.author_info}>
                            <div className={styles.avator} style={{ backgroundImage: `url(${avator})` }}></div>
                            <h2>{author}</h2>
                        </div>
                    </div>
                </div>

                <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: contentHtml }} />

                <Link href='/'><h3 className={styles.back}>返回</h3></Link>
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

export async function getStaticPaths() {
    return {
        paths: await getAllPostId(),
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const post = await getPost(params.id);

    const processedContent = await remark()
        .use(html)
        .process(post.content)
    post.contentHtml = processedContent.toString()

    return {
        props: post
    };
}