'use client'
import card from '@/shared/image/card.webp';
import Image from 'next/image';
import Link from 'next/link';

export default function PerformanceCard() {

    const pfmCardData = [
        {
            id: 1,
            title: 'Control Arm',
            img: card,
            txt: 'Engineered for precision and durability, our control arms deliver superior handling and stability—keeping your wheels aligned even under extreme performance conditions.',
            alt: '',
            link: '/',
        },
        {
            id: 2,
            title: 'Control Arm',
            img: card,
            txt: 'Engineered for precision and durability, our control arms deliver superior handling and stability—keeping your wheels aligned even under extreme performance conditions.',
            alt: '',
            link: '/',

        },
        {
            id: 3,
            title: 'Control Arm',
            img: card,
            txt: 'Engineered for precision and durability, our control arms deliver superior handling and stability—keeping your wheels aligned even under extreme performance conditions.',
            alt: '',
            link: '/',
        }
    ];

    return (
        <>
            {pfmCardData.map((item) => {
                return (
                    <div className="row bg-neutral-90 mb-4 rounded-3" key={item.id}>
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
                );
            })}
        </>
    );
}
