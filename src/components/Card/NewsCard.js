'use client'
import Image from 'next/image';
import aapex from '@/shared/image/aapex.webp'
import sema from '@/shared/image/sema.webp'
import dubai from '@/shared/image/dubai.webp'
import Link from 'next/link';
import styles from '../Card/card.module.scss'


export default function NewsCard() {
    const newsData = [
        {
            id: 1,
            src: sema,
            title: 'Fotado Shines at SEMA Show 2025: Redefining Performance Tuning.',
            date: '2025-11-05',
        },
        {
            id: 2,
            src: aapex,
            title: 'Global Footprint: Recap of Our Success at AAPEX Las Vegas 2024.',
            date: '2024-11-02',
        },
        {
            id: 3,
            src: dubai,
            title: 'Building Connections: Fotado’s Journey Through AAPEX 2023 (Dubai).',
            date: '2023-11-01',
        },
    ];

    return (
        <div className="container">
            <div className="rounded-5 bg-neutral-30 py-13 px-5">
                <div className="d-flex justify-content-between px-lg-10 px-6">
                    <div>
                        <h2>Latest News</h2>
                        <p>What’s Next for Fotado</p>
                    </div>
                    {/* pending button for future news page */}
                    {/* <div>
                        <Link className="btn btn-neutral-90" href='/news'>
                            More
                        </Link>
                    </div> */}
                </div>


                <ul className={`${styles.newsCard} mt-9 d-flex`}>
                    {newsData.map((item) => (
                        <li key={item.id} className="position-relative mx-4 text-white">

                            <Link href="/" className="text-white text-decoration-none">
                                <Image
                                    className="rounded-4 w-100 object-fit-cover"
                                    src={item.src}
                                    width={336}
                                    height={400}
                                    alt={item.title}
                                />

                                <div className={`${styles.newsCardContent} d-flex justify-content-between align-items-end h-100 p-7 position-absolute top-0 start-0 w-100`}>
                                    <div>
                                        <p className="mb-2 fw-bold">{item.title}</p>
                                        <time dateTime={item.date}>{item.date}</time>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <i className="fs-1 bi bi-arrow-up-right-circle-fill mt-auto"></i>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}
