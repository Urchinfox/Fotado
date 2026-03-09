// components/SidebarClient.js
'use client';
import styles from '@/app/(home)/blog/layout.module.scss'

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SidebarClient({ allTags }) {
    const searchParams = useSearchParams();
    const currentTag = searchParams.get('tag');

    return (
        <div className="bg-white rounded-4 py-10 px-6">
            {/* Categories */}
            <div className="border-lg-bottom border-0 pb-lg-8 pb-0 border-neutral-60">
                <p className="mb-5">Categories</p>
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
                                className={`d-inline-block me-2 mb-3 py-2 px-3 rounded-pill ${isActive ? 'bg-dark text-neutral-30' : 'bg-neutral-30 text-neutral-60'
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
                <p className="my-5">Popular posts</p>
                <div>
                    {/* 之後會用 Supabase 抓 reading_count 前 3 篇 */}
                    <div className="mb-5">
                        <h6>01 Why Is My Car Shaking?</h6>
                        <div className="ps-6">
                            <span className="d-block text-neutral-70">Suspension • Control Arm</span>
                            <span className={`text-neutral-60 ${styles.dateTimeTxt}`}>May 20 | 5 min read</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}