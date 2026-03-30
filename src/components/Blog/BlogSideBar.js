// components/SidebarClient.js
'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { formatArticleDate } from '../UtilFn/date';
import styles from '@/app/(home)/blog/blog.module.scss'

export default function SidebarClient({ allTags, popularPosts }) {
    const searchParams = useSearchParams();
    const currentTag = searchParams.get('tag');
    return (
        <div className={`rounded-4 py-lg-10 px-lg-6 p-0 ${styles.sideBar}`}>
            {/* Categories */}
            <div className="border-lg-bottom border-0 pb-lg-8 pb-0 border-neutral-60 my-lg-0 my-9">
                <h2 className="mb-5 fs-5 d-lg-block d-none">Categories</h2>
                <div>
                    <Link
                        href="/blog"
                        className={`d-inline-block me-2 mb-3 py-2 px-3 rounded-pill ${!currentTag ? 'bg-dark text-neutral-30' : 'bg-neutral-30 text-neutral-60'
                            }`}
                    >
                        all
                    </Link>

                    {allTags.map(({ tag, count }) => {
                        const isActive = currentTag === tag;

                        return (
                            <Link
                                key={tag}
                                href={`/blog?tag=${encodeURIComponent(tag)}`}
                                className={`d-inline-block me-2 mb-3 py-2 px-3 rounded-pill  ${isActive ? 'bg-dark text-neutral-30' : 'bg-neutral-30 text-neutral-60'
                                    }`}
                            >
                                {tag} ({count})
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Popular posts 保持靜態 */}
            <div className="mt-8 d-none d-lg-block">
                <h2 className="my-5 fs-5">Popular Posts</h2>
                <div>
                    {popularPosts.length === 0 ? (
                        <p className="text-neutral-60">暫無熱門文章</p>
                    ) : (
                        popularPosts.map((post, index) => {
                            return (
                                <div className="mb-5" key={post.id}>
                                    <Link href={`/blog/${post.slug}`} className="text-decoration-none">
                                        <h3 className="text-dark mb-1 fs-7">
                                            {index + 1}. {post.title}
                                        </h3>
                                    </Link>
                                    <div className="ps-8">
                                        <span className="d-block text-neutral-70">
                                            {post.tags?.slice(0, 2).join(' • ') || 'Uncategorized'}
                                        </span>
                                        <span className={`text-neutral-60 fs-9 ${styles.dateTimeTxt}`}>
                                            {formatArticleDate(post, 'en-US', { month: 'short', day: 'numeric' })} | {post.reading_time || 5} min read
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}