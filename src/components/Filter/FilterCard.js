// src/components/FilterCards.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { productsCardData } from '@/app/staticData/data';

export default function FilterCards({ hasFilter }) {
    const router = useRouter();

    // 如果已經有篩選條件，隱藏整個區塊
    if (hasFilter) return null;

    const handleCardClick = (categoryId) => {
        // 點擊後更新 URL 為 ?categoryId=xxx
        router.push(`/products?categoryId=${categoryId}`);
    };

    return (
        <section className="container">
            <div className="row row-cols-2 g-4">
                {productsCardData.map((item) => (
                    <div className="col filterCard" key={item.id}>
                        <div
                            className="bg-neutral-90 p-4 rounded-3 h-100 cursor-pointer hover-scale"
                            onClick={() => handleCardClick(item.categoryId)}
                        >
                            <div className="row align-items-center">
                                <div className="col-4 d-flex flex-column justify-content-center">
                                    <div>
                                        <Image
                                            src={item.img}
                                            className="object-fit-cover w-100 img-base rounded-2"
                                            width={122}
                                            height={122}
                                            alt={item.alt}
                                        />
                                    </div>
                                </div>

                                <div className="col-8 text-neutral-30">
                                    <div className="p-3">
                                        <div className="d-flex justify-content-between">
                                            <h2 className="fw-light">{item.title}</h2>
                                            <Link href={item.link}>
                                                <i className="bi bi-arrow-up-right"></i>
                                            </Link>
                                        </div>
                                        <p>{item.txt}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}