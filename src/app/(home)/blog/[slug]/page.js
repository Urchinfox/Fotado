// app/blog/[slug]/page.js
import styles from '../blog.module.scss';
import Image from 'next/image';
import { createClient } from '@/lib/supabase-server';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export default async function BlogPost({ params }) {

    const supabase = createClient();
    const { slug } = params;

    const { data: post, error } = await supabase
        .from('posts')
        .select('id, title, content, thumbnail_url, tags, created_at, author, reading_time, excerpt')
        .eq('slug', slug)
        .single();


    if (error || !post) {
        return <div>文章不存在或載入失敗</div>;
    }

    // 閱讀時間（後端計算或前端計算，這裡先用欄位）
    const readingTime = post.reading_time || 5;
    return (<>
        <h1 className="fs-5">{post.title}</h1>

        <div className="mt-lg-5 mt-3">
            <i className="bi bi-calendar-week me-2"></i>
            <time dateTime={post.created_at} className="text-neutral-90 fs-8 me-2">
                {new Date(post.created_at).toLocaleDateString('zh-TW', { year: 'numeric', month: 'short', day: 'numeric' })}
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


    </>
    );
}