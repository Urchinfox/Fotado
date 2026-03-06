

// components/Card/BlogCard.jsx
import Link from "next/link";
import Image from "next/image";
import testImg from '@/shared/image/productSample.webp';

export default function BlogCard({ post = {} }) {
    return (<>
        <div className="blogCard d-lg-block d-none">
            <div className="position-relative overflow-hidden d-flex d-lg-block">
                <div>
                    <Image
                        className="w-100 h-100 rounded-4 object-fit-cover blogCard-img"
                        src={post.thumbnail_url || testImg} // 用 post 的圖片，沒有的話用預設
                        width={280}
                        height={321}
                        alt={post.title}
                    />
                </div>

                <div className="blogCard-glass"></div>

                <div className="position-absolute start-0 bottom-0 p-3 mb-2" style={{ zIndex: 2 }}>
                    <h2 className="fs-8 text-white">{post.title}</h2>
                    <p className="text-white mb-2 fs-9">
                        {post.excerpt || '文章摘要載入中...'} {/* 用 excerpt */}
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
                    <Link href={`/blog/${post.slug}`} className="bg-neutral-30 rounded-pill py-2 d-block text-center fs-8">
                        Continue reading →
                    </Link>
                </div>
            </div>
        </div>


        <div className="d-block d-lg-none blogCardMb">
            <Link href={`/blog/${post.slug}`} className="">

                <div className="d-flex ">
                    <div className="me-4">
                        <Image
                            src={post.thumbnail_url || testImg} // 用 post 的圖片，沒有的話用預設
                            alt={post.title}
                            width={100}
                            height={100}
                            className="blogCardMb-img object-fit-cover h-100"
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
                            {post.excerpt || '文章摘要載入中...'} {/* 用 excerpt */}
                        </p>
                        <div><time dateTime="" className="text-neutral-60 fs-9">May 20</time></div>
                    </div>

                </div>
            </Link>
        </div>
    </>);
}