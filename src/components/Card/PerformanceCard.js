'use client';
import Image from 'next/image';
import Link from 'next/link';
import { pfmCardData } from '@/app/staticData/pfmCardData';
import styles from '@/components/Card/card.module.scss'


export default function PerformanceCard() {
    return (
        <>
            {pfmCardData.map((item) => {
                return (
                    <div className="container" key={item.id}>
                        <Link
                            href={item.link}
                            className={`text-decoration-none ${styles.pfmCardScale}`}
                            aria-label={`Learn more about ${item.title} - ${item.txt.substring(0, 60)}...`}
                        >
                            <div className="row bg-neutral-90 mb-4 rounded-3 py-3 px-2 card-hover">
                                <div className="col-lg-4 col-12 d-flex flex-column justify-content-center mb-lg-0 mb-2">
                                    <Image
                                        src={item.img}
                                        className="object-fit-cover w-100 img-base rounded-2"
                                        width={122}
                                        height={122}
                                        alt={`${item.title} - High performance automotive part by Fotado`}
                                        priority={false}
                                    />
                                </div>

                                <div className="col-lg-8 col-12 text-neutral-30">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <h3 className="fw-light mb-2">{item.title}</h3>
                                        <i className="bi bi-arrow-up-right d-none d-lg-block mt-1"></i>
                                    </div>

                                    <p className="mb-0">{item.txt}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </>
    );
}