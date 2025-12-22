'use client'
import Image from 'next/image';
import news from '@/shared/image/news.webp'
import news1 from '@/shared/image/news1.webp'
import news2 from '@/shared/image/news2.webp'
import Link from 'next/link';


export default function NewsCard() {
    const newsData = [
        {
            id: 1,
            src: news,
            title: 'Fotado is dedicated to redefining vehicle performance.',
            date: '2024-05-10',
        },
        {
            id: 2,
            src: news1,
            title: 'Fotado is dedicated to redefining vehicle performance.',
            date: '2024-05-10',
        },
        {
            id: 3,
            src: news2,
            title: 'Fotado is dedicated to redefining vehicle performance.',
            date: '2024-05-10',
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
                    <div>
                        <Link className="btn btn-neutral-90" href='/news'>
                            More
                        </Link>
                    </div>
                </div>


                <ul className="newsCard mt-9 d-flex">
                    {newsData.map((item) => (
                        <li key={item.id} className="position-relative mx-4 newsCard text-white">
                            <Image
                                className="rounded-4 w-100 object-fit-cover"
                                src={item.src}
                                width={336}
                                height={400}
                                alt={item.title}
                            />

                            <div className="newsCardContent d-flex justify-content-between align-items-end h-100 p-7 position-absolute top-0 start-0">
                                <div>
                                    <p className="mb-2 ">{item.title}</p>
                                    <time dateTime={item.date}>{item.date}</time>
                                </div>
                                <div className="d-flex flex-column">
                                    <i className="fs-1 bi bi-arrow-up-right-circle-fill mt-auto"></i>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>




            </div>
        </div>

    );
}
