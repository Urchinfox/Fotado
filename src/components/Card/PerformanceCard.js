'use client'
import card from '@/shared/image/card.webp';
import Image from 'next/image';
import Link from 'next/link';
import { pfmCardData } from '@/app/staticData/data';

export default function PerformanceCard() {



    return (
        <>
            {pfmCardData.map((item) => {
                return (
                    <div className="container">
                        <Link
                            href={item.link}
                            key={item.id}
                            className="text-decoration-none pfmCardScale"
                        >
                            <div className="row bg-neutral-90 mb-4 rounded-3 py-3 px-2 card-hover">
                                <div className="col-lg-4 col-12 d-flex flex-column justify-content-center mb-lg-0 mb-2">
                                    <Image
                                        src={item.img}
                                        className="object-fit-cover w-100 img-base rounded-2"
                                        width={122}
                                        height={122}
                                        alt={item.alt}
                                    />
                                </div>

                                <div className="col-lg-8 col-12 text-neutral-30">
                                    <div className="d-flex justify-content-between">
                                        <h2 className="fw-light">{item.title}</h2>
                                        <i className="bi bi-arrow-up-right d-none d-lg-block"></i>
                                    </div>

                                    <p>{item.txt}</p>
                                </div>
                            </div>
                        </Link>

                    </div>
                );
            })}
        </>
    );
}
