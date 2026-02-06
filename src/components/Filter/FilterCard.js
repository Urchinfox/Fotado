// src/components/FilterCards.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { productsCardData } from '@/app/staticData/data';
import { useState, useEffect, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Loading from '../Loading/Loading';

export default function FilterCards({ hasFilter }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleCardClick = (categoryId) => {
        // 點擊後更新 URL 為 ?categoryId=xxx
        console.log('點擊的 categoryId (原始):', categoryId);
        console.log('點擊的 categoryId (trim):', categoryId.trim());


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


    return (<>
        <section className="container">
            <div className="row row-lg-cols-2 row-cols-1 g-4">
                {productsCardData.map((item) => (
                    <div className="col filterCard" key={item.id}>
                        <div
                            className="bg-neutral-90 p-4 rounded-3 h-100 cursor-pointer hover-scale"
                            onClick={() => handleCardClick(item.categoryId)}
                        >
                            <div className="row align-items-center">
                                <div className="col-lg-4 col-12 d-flex flex-column justify-content-center">
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

                                <div className="col-lg-8 col-12 text-neutral-30">
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
        {loading && <Loading />}

    </>);
}