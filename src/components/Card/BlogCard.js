'use client';
// components/Card/BlogCard.jsx
import Link from "next/link";
import Image from "next/image";
import testImg from '@/shared/image/productSample.webp';
import { useSearchParams } from "next/navigation";
import styles from '@/components/Card/card.module.scss'

export default function BlogCard({ post = {} }) {

    const searchParams = useSearchParams()
    return (<>
        <div className="blogCard d-lg-block d-none">
            <div className="position-relative overflow-hidden d-flex d-lg-block">
                <div>
                    <Image
                        className="w-100 h-100 rounded-4 object-fit-cover"
                        src={post.thumbnail_url || testImg} // 用 post 的圖片，沒有的話用預設
                        width={280}
                        height={321}
                        alt={`${post.title} - Fotado Automotive Blog`}
                    />
                </div>

                <div className={`${styles.blogCardGlass}`}></div>

                <div className="position-absolute start-0 bottom-0 p-3 mb-2 w-100" style={{ zIndex: 2 }}>
                    <h2 className="fs-8 text-white">{post.title}</h2>
                    <p className="text-white mb-2 fs-9">
                        {post.excerpt || 'Read more about this topic...'} {/* 用 excerpt */}
                    </p>
                    <div className="mb-2">
                        {
                            post.tags?.map((t, i) => {
                                return (
                                    <span className="d-inline-block mb-1 rounded-pill bg-neutral-60 py-1 px-3 fs-8 me-2" key={i}>
                                        {t || 'Uncategorized'}
                                    </span>
                                )
                            })
                        }

                    </div>

                    {/* 這裡用 post.slug */}
                    <Link
                        href={`/blog/${post.slug}${searchParams.size > 0 ? '?' + searchParams.toString() : ''}`}
                        className="bg-neutral-30 rounded-pill py-2 d-block text-center fs-8">
                        Continue reading →
                    </Link>
                </div>
            </div>
        </div>


        <div className={`d-block d-lg-none ${styles.blogCardMb}`}>
            <Link href={`/blog/${post.slug}${searchParams.size > 0 ? '?' + searchParams.toString() : ''}`}>

                <div className="d-flex">
                    <div className="me-4">
                        <Image
                            src={post.thumbnail_url || testImg} // 用 post 的圖片，沒有的話用預設
                            alt={`${post.title} - Fotado Blog`}
                            width={100}
                            height={100}
                            className="blogCardMb-img object-fit-cover rounded-3"
                        />
                    </div>
                    <div className="flex-grow-1" style={{ minWidth: 0 }}>
                        <h2 className="fs-8 mb-1">{post.title}</h2>
                        <div className="mb-1 w-100 overflow-hidden">
                            <div className="d-flex flex-nowrap overflow-x-auto">
                                {
                                    post.tags?.map((t, i) => {
                                        return (
                                            <span
                                                key={i}
                                                className="rounded-pill bg-neutral-60 py-1 px-3 fs-9 me-2 flex-shrink-0"
                                                style={{ whiteSpace: "nowrap" }}
                                            >
                                                {t || "Uncategorized"}
                                            </span>
                                        )
                                    })
                                }

                            </div>
                        </div>
                        <p className="text-dark mb-1 fs-9">
                            {post.excerpt || 'Read more about this topic...'} {/* 用 excerpt */}
                        </p>
                        <time className="text-neutral-60 fs-9">
                            {new Date(post.created_at || post.updated_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                            })}
                        </time>
                    </div>

                </div>
            </Link>
        </div>
    </>);
}