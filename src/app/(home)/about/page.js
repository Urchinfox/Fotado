import worker from '@/shared/image/worker.webp';
import Image from "next/image";
import styles from './about.module.scss';
import timeline from '@/shared/image/timeline.webp';
import licence from '@/shared/image/licence.webp';


function About() {


    return (<>
        <div className="mt-lg-13 mt-0 mb-lg-15 mb-12">
            <div className="container-lg px-0">
                <div className="row g-0 mb-lg-14 mb-0">
                    <div className="col-lg-7 d-none d-lg-block">
                        <p>What we do</p>
                        <p className="fs-2 my-2">We always make the best</p>
                        <p className="mb-8">
                            Founded in 1981 in New Taipei City, Taiwan, Fotado Enterprise has evolved into a globally recognized supplier of premium automotive aftermarket parts. With more than 40 years of dedication to quality and innovation, we proudly serve customers on five continents.
                        </p>
                        <button className="btn btn-neutral-80 text-neutral-30">
                            <i className="bi bi-envelope-fill"></i> Contact us
                        </button>
                    </div>

                    <div className="col-lg-5 col-12 position-relative">
                        <div>
                            <Image
                                src={worker}
                                className={`w-100 h-auto img-base ${styles.imgGrayscale}`}
                                alt=""
                            />

                        </div>
                        <div className="position-absolute top-50 start-0 text-white translate-middle-y p-3 d-block d-lg-none">
                            <p>What we do</p>
                            <p className="fs-2 my-2">We always make the best</p>
                            <p className="mb-8">
                                Founded in 1981 in New Taipei City, Taiwan, Fotado Enterprise has evolved into a globally recognized supplier of premium automotive aftermarket parts. With more than 40 years of dedication to quality and innovation, we proudly serve customers on five continents.
                            </p>
                            <button className="btn btn-neutral-80 border border-neutral-40 text-neutral-30">
                                <i className="bi bi-envelope-fill"></i> Contact us
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center d-none d-lg-block">
                    <Image
                        className="img-base"
                        src={timeline}
                        width={1106}
                        height={800}
                        alt="/"
                    />
                </div>

                {/* 這邊用靜態資料回圈渲染 */}
                <div className={`rounded-5 bg-neutral-80 py-12 container-fluid d-block d-lg-none ${styles.timeline}`}>
                    <div className="mx-auto border-start border-white " style={{ maxWidth: '301px' }}>
                        <div className="mb-3 ps-2">
                            <p className={`${styles['timeline-yr']} mb-3 text-neutral-90 text-center`}>1981</p>
                            <h2 className={`${styles['timeline-title']} mb-4 text-neutral-60`}>Founded in New Taipei City, Taiwan</h2>
                            <p className={`${styles['timeline-txt']} text-neutral-60`}>Established in New Taipei City, Taiwan, laying a solid foundation in manufacturing excellence and quality commitment</p>
                        </div>
                        <div className="mb-3 ps-2">
                            <p className={`${styles['timeline-yr']} mb-3 text-neutral-90 text-center`}>1981</p>
                            <h2 className={`${styles['timeline-title']} mb-4 text-neutral-60`}>Founded in New Taipei City, Taiwan</h2>
                            <p className={`${styles['timeline-txt']} text-neutral-60`}>Established in New Taipei City, Taiwan, laying a solid foundation in manufacturing excellence and quality commitment</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>


        <div className={styles.certification}>
            <div className={styles['certification-container']}>
                <div className={styles['certification-content']}>
                    <div className={`${styles['certification-image']} mb-lg-0 mb-11`}>
                        <Image src={licence} width={272} height={385} alt="" className="img-base" />
                    </div>
                    <div className={styles['certification-text']}>
                        <p>For over four decades, Fotado Enterprise has remained steadfast in our philosophy of “Quality First, Customer Priority.” Through continuous innovation, superior product quality, and responsive service, we are committed to being your most dependable long-term partner in the global automotive aftermarket.</p>
                    </div>
                </div>
            </div>
        </div>

    </>)
}

export default About;