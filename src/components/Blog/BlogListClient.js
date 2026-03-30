// app/blog/BlogListClient.js
'use client';

import { useSearchParams } from 'next/navigation';
import BlogCard from '@/components/Card/BlogCard';

export default function BlogListClient({ initialPosts, initialTag }) {
    const searchParams = useSearchParams();
    const currentTag = searchParams.get('tag') || initialTag;

    // 這裡可以用 initialPosts 渲染，或之後加 client-side 過濾
    return (
        <div className="row gy-4">
            {initialPosts?.length > 0 ? (
                initialPosts.map((post) => (
                    <div className="col-lg-4 col-12" key={post.id}>
                        <BlogCard post={post} />
                    </div>
                ))
            ) : (
                <div className="col-12 text-center py-12 text-neutral-40">
                    <p className="fs-4">No articles found.</p>
                    <p>Please try another category or check back later.</p>
                </div>
            )}
        </div>
    );
}