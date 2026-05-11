'use client';
import Image from 'next/image';
import Link from 'next/link';
import { pfmCardData } from '@/app/staticData/pfmCardData';
import styles from '@/components/Card/card.module.scss'

export default function PerformanceCard() {
    return (
        // 將 container 移出 map 之外
        <div className="container">
            {pfmCardData.map((item) => {
                return (
                    <Link
                        key={item.id}
                        href={item.link}
                        className={`text-decoration-none d-block ${styles.pfmCardScale}`}
                        aria-label={`Learn more about ${item.title}`}
                    >
                        {/* 保持原本的 row 結構 */}
                        <div className="row bg-neutral-90 mb-4 rounded-3 py-3 px-3 card-hover g-0">
                            <div className="col-lg-4 col-12 d-flex flex-column justify-content-center mb-lg-0 mb-2">
                                <Image
                                    src={item.img}
                                    className="object-fit-cover w-100 img-base rounded-2"
                                    width={122}
                                    height={122}
                                    alt={`${item.title} - High performance automotive part`}
                                />
                            </div>

                            <div className="col-lg-8 col-12 text-neutral-30 ps-lg-3">
                                <div className="d-flex justify-content-between align-items-start">
                                    <h3 className="fw-light mb-2">{item.title}</h3>
                                    <i className="bi bi-arrow-up-right d-none d-lg-block mt-1"></i>
                                </div>
                                <p className="mb-0">{item.txt}</p>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

