

// components/Card/BlogCard.jsx
import Link from "next/link";
import Image from "next/image";
import testImg from '@/shared/image/productSample.webp';

export default function BlogCard({ post = {} }) {
    return (
        <div>
            <div className="position-relative rounded-4 overflow-hidden">
                <div>
                    <Image
                        className="w-100 h-100  object-fit-cover rounded-4"
                        src={post.thumbnail_url || testImg} // 用 post 的圖片，沒有的話用預設
                        height={321}
                        width={280}
                        alt={post.title}
                    />
                </div>

                <div className="position-absolute bottom-0 start-0 p-3 mb-2">
                    <h2 className="text-white fs-8">{post.title}</h2>
                    <p className="text-white mb-2 fs-9">
                        {post.excerpt || '文章摘要載入中...'} {/* 用 excerpt */}
                    </p>
                    <div className="mb-2">
                        <span className="rounded-pill bg-neutral-60 py-1 px-3 fs-8">
                            {post.tags?.[0] || 'Uncategorized'} {/* 第一個標籤 */}
                        </span>
                    </div>

                    {/* 這裡用 post.slug */}
                    <Link href={`/blog/${post.slug}`} className="bg-neutral-30 rounded-pill py-2 d-block text-center fs-8">
                        Continue reading →
                    </Link>
                </div>
            </div>
        </div>
    );
}