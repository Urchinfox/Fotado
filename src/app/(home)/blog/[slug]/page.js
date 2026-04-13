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
        .select('title, excerpt')
        .eq('slug', slug)
        .single();

    return {
        title: post ? `${post.title} | Fotado Blog` : 'Article | Fotado Blog',
        description: post?.excerpt || 'Read the latest insights on automotive suspension and performance parts.',
    };
}

export default async function BlogPost({ params }) {

    const supabase = createClient();
    const { slug } = params;
    // 先抓文章
    const { data: post, error } = await supabase
        .from('posts')
        .select('id, title, content, thumbnail_url, tags, created_at, author, reading_time, excerpt, updated_at')
        .eq('slug', slug)
        .single();


    if (error || !post) {
        return <div className='fs-2 text-center'>Article not found or failed to load</div>;
    }

    const formattedDate = formatArticleDate(post);
    const displayDate = post.updated_at || post.created_at;

    // 閱讀時間（後端計算或前端計算，這裡先用欄位）
    const readingTime = post.reading_time || 5;
    return (<>
        <h1 className="fs-5">{post.title}</h1>

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
                <Image
                    className={`w-100 object-fit-cover rounded-4 overflow-hidden ${styles.contentImg}`}
                    src={post.thumbnail_url}
                    width={800}
                    height={380}
                    alt={post.title}
                />
            </div>
        )}

        <div className={`prose max-w-none ${styles.blogContent}`}>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.content}</ReactMarkdown>
        </div>

        <div className='text-center mb-8'>

            <a className='btn btn-secondary ' href="/https://carico-b2c.com/">Find Your Parts</a>
        </div>



    </>
    );
}