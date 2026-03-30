// src/components/FilterCards.jsx
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { filterCardData } from '@/app/staticData/filterCardData';
import { useState, useEffect, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Loading from '../Loading/Loading';
import styles from '@/components/Filter/filter.module.scss'

export default function FilterCards({ hasFilter }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleCardClick = (categoryId) => {
        // 點擊後更新 URL 為 ?categoryId=xxx
        // console.log('點擊的 categoryId (原始):', categoryId);
        // console.log('點擊的 categoryId (trim):', categoryId.trim());


        startTransition(() => {
            router.push(`/products?categoryId=${categoryId}`);
        })

        setLoading(true);

    };


    useEffect(() => {
        if (!isPending && loading) {
            setLoading(false);
        }
    }, [isPending, loading]);

    // 如果已經有篩選條件，隱藏整個區塊
    if (hasFilter) return null;


    return (
        <>
            {/* 加上語意標記，讓搜尋引擎知道這是「產品分類導引區」 */}
            <section className="container" aria-labelledby="filter-cards-title">
                <h2 id="filter-cards-title" className="sr-only">
                    Browse Products by Category
                </h2>

                <div className="row row-cols-lg-2 row-cols-1 g-4">
                    {filterCardData.map((item) => (
                        <div className={`col ${styles.filterCard}`} key={item.id}>
                            <div
                                className="bg-neutral-90 p-4 rounded-3 h-100 cursor-pointer hover-scale"
                                onClick={() => handleCardClick(item.categoryId)}
                                role="button"
                                tabIndex={0}
                                aria-label={`View ${item.title} products`}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleCardClick(item.categoryId);
                                    }
                                }}
                            >
                                <div className="row align-items-center">
                                    <div className="col-lg-4 col-12 d-flex flex-column justify-content-center">
                                        <div>
                                            <Image
                                                src={item.img}
                                                className="object-fit-cover w-100 img-base rounded-2"
                                                width={122}
                                                height={122}
                                                alt={`${item.title} - High performance automotive parts by Fotado`}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-8 col-12 text-neutral-30">
                                        <div className="p-3">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <h3 className="fw-light mb-2">{item.title}</h3>
                                                <i className="bi bi-arrow-up-right"></i>
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

            {loading && <Loading />}
        </>
    );
}