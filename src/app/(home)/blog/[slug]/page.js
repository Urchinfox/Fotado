// app/blog/[slug]/page.js
import styles from '../blog.module.scss';
import Image from 'next/image';
import { createClient } from '@/lib/supabase-server';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { formatArticleDate } from '@/components/UtilFn/date';


//用來動態產生單頁面的 SEO metadata（title、description、openGraph等）
export async function generateMetadata({ params }) {
    const supabase = createClient();
    const { slug } = params;

    const { data: post } = await supabase
        .from('posts')
        .select('title, excerpt', 'thumbnail_url')
        .eq('slug', slug)
        .single();
    if (!post) return { title: 'Article Not Found' };

    return {
        // title: post ? `${post.title} | Fotado Blog` : 'Article | Fotado Blog',
        title: post.title, //layout 有寫 template，這裡傳入純標題即可
        description: post?.excerpt || 'Read the latest insights on automotive suspension and performance parts.',
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [{ url: post.thumbnail_url }],
            type: 'article',
            publishedTime: post.created_at,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.thumbnail_url],
        },
    };
}

export default async function BlogPost({ params }) {

    const supabase = createClient();
    const { slug } = params;
    // 先抓文章
    const { data: post, error } = await supabase
        .from('posts')
        // .select('id, title, content, thumbnail_url, tags, created_at, author, reading_time, excerpt, updated_at')
        .select('*')
        .eq('slug', slug)
        .single();


    if (error || !post) {
        return <div className='fs-2 text-center'>Article not found or failed to load</div>;
    }
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.thumbnail_url,
        "datePublished": post.created_at,
        "dateModified": post.updated_at || post.created_at,
        "author": { "@type": "Organization", "name": "Fotado Enterprise" },
        "description": post.excerpt
    };

    const formattedDate = formatArticleDate(post);
    const displayDate = post.updated_at || post.created_at;

    // 閱讀時間（後端計算或前端計算，這裡先用欄位）
    const readingTime = post.reading_time || 5;

    return (<>
        <article>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <h1 className="fs-4">{post.title}</h1>

            <div className="mt-lg-5 mt-3">
                <i className="bi bi-calendar-week me-2"></i>
                <time dateTime={displayDate} className="text-neutral-90 fs-8 me-2">
                    {formattedDate}
                </time>
                <span className="text-neutral-60 fs-8 me-2 mb-lg-0">{readingTime} min</span>
                <div className="d-block d-lg-inline mt-3">
                    {post.tags?.map((tag, i) => (
                        <span key={i} className="me-2 mb-3 py-2 px-3 rounded-pill bg-neutral-30 fs-9">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {post.thumbnail_url && (
                <div className="my-5">
                    <figure>
                        <Image
                            className={`w-100 object-fit-cover rounded-4 overflow-hidden ${styles.contentImg}`}
                            src={post.thumbnail_url}
                            width={1200}
                            height={630}
                            alt={post.title}
                            priority
                        />
                    </figure>
                </div>
            )}

            <section className={`prose lg:prose-xl max-w-none  ${styles.blogContent}`}>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {post.content}
                </ReactMarkdown>
            </section>

            {/* <div className='text-center mb-8'>

                <a className='btn btn-secondary ' href="https://carico-b2c.com/zh_tw/shop/">Find Your Parts</a>
            </div> */}
            <div className='bg-neutral-90 rounded-4 p-8 text-center my-15 border border-neutral-80'>
                <h4 className="text-neutral-30 mb-4">Looking for High-Performance Suspension Parts?</h4>
                <p className="text-neutral-40 mb-6">Explore our full range of professional automotive solutions on our official online store.</p>
                <a
                    className='btn btn-neutral-30 text-dark px-6 py-3 rounded-pill fw-bold transition-all'
                    href="https://carico-b2c.com/zh_tw/shop/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Shop Fotado Parts <i className="bi bi-arrow-right ms-2"></i>
                </a>
            </div>


        </article>
    </>
    );
}