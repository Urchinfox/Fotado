import worker from '@/shared/image/worker.webp';
import Image from "next/image";
import styles from './about.module.scss';
import timeline from '@/shared/image/timeline.webp';
import licence from '@/shared/image/licence.webp';
import Link from 'next/link';
import { milestoneData } from '@/app/staticData/milestoneData';

export const metadata = {
    title: 'About Fotado | 40+ Years of Automotive Suspension Excellence',
    description: 'Founded in 1981 in Taiwan, Fotado Enterprise is a globally trusted manufacturer of high-performance suspension parts. Discover our story, philosophy, and commitment to quality.',
    openGraph: {
        title: 'About Fotado | Over 40 Years of Excellence in Automotive Parts',
        description: 'Premium suspension and chassis parts manufacturer with more than 40 years of experience serving customers worldwide.',
    },
};

export default function About() {
    return (
        <>
            <div className="mt-lg-13 mt-0 mb-lg-15 mb-12">
                <div className="container-lg px-0">
                    <div className="row g-0 mb-lg-14 mb-0">
                        {/* Desktop Content */}
                        <div className="col-lg-7 d-none d-lg-block">
                            <p className="text-neutral-60 mb-2">What we do</p>
                            <h1 className="fs-2 fw-bold my-2">We always make the best</h1>
                            <p className="mb-8">
                                Founded in 1981 in New Taipei City, Taiwan, Fotado Enterprise has evolved into a globally recognized supplier of premium automotive aftermarket parts.
                                With more than 40 years of dedication to quality and innovation, we proudly serve customers on five continents.
                            </p>
                            <Link href="/contact" className="btn btn-neutral-80 text-neutral-30">
                                <i className="bi bi-envelope-fill me-2"></i>Contact us
                            </Link>
                        </div>

                        {/* Image Section */}
                        <div className="col-lg-5 col-12 position-relative">
                            <Image
                                src={worker}
                                className={`w-100 h-auto img-base ${styles.imgGrayscale}`}
                                alt="Fotado team dedicated to manufacturing high-performance automotive suspension parts"
                                priority
                            />

                            {/* Mobile Content */}
                            <div className="position-absolute top-50 start-0 text-white translate-middle-y p-3 d-block d-lg-none">
                                <p className="text-neutral-60 mb-2">What we do</p>
                                <h1 className="fs-2 fw-bold my-2">We always make the best</h1>
                                <p className="mb-8">
                                    Founded in 1981 in New Taipei City, Taiwan, Fotado Enterprise has evolved into a globally recognized supplier of premium automotive aftermarket parts.
                                    With more than 40 years of dedication to quality and innovation, we proudly serve customers on five continents.
                                </p>
                                <Link href="/contact" className="btn btn-neutral-80 border border-neutral-40 text-neutral-30">
                                    <i className="bi bi-envelope-fill me-2"></i>Contact us
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Timeline - Desktop */}
                    <div className="text-center d-none d-lg-block">
                        <Image
                            className="img-base"
                            src={timeline}
                            width={1106}
                            height={800}
                            alt="Fotado company history timeline - Over 40 years of growth and innovation"
                        />
                    </div>

                    {/* Timeline - Mobile */}
                    <div className={`rounded-5 bg-neutral-80 py-12 container-fluid d-block d-lg-none ${styles.timeline}`}>
                        <div className="mx-auto border-start border-white" style={{ maxWidth: '301px' }}>
                            {milestoneData.map((item, index) => (
                                <div className="mb-3 ps-2" key={index}>
                                    <p className={`${styles['timeline-yr']} mb-3 text-neutral-90 text-center`}>
                                        {item.year}
                                    </p>
                                    <h3 className={`${styles['timeline-title']} mb-4 text-neutral-60`}>
                                        {item.title}
                                    </h3>
                                    <p className={`${styles['timeline-txt']} text-neutral-60`}>
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Certification Section */}
            <div className={styles.certification}>
                <div className={styles['certification-container']}>
                    <div className={styles['certification-content']}>
                        <div className={`${styles['certification-image']} mb-lg-0 mb-11`}>
                            <Image
                                src={licence}
                                width={272}
                                height={385}
                                alt="Fotado certifications and quality assurance documents"
                                className="img-base"
                            />
                        </div>
                        <div className={styles['certification-text']}>
                            <p>
                                For over four decades, Fotado Enterprise has remained steadfast in our philosophy of “Quality First, Customer Priority.”
                                Through continuous innovation, superior product quality, and responsive service, we are committed to being your most dependable long-term partner in the global automotive aftermarket.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}