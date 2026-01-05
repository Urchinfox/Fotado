import Csr from "./Csr";
import { createClient } from '@/lib/supabase-server';
import worker from '@/shared/image/worker.webp';
import Image from "next/image";
import styles from './contact.module.scss';
import timeline from '@/shared/image/timeline.webp';
import licence from '@/shared/image/licence.webp';

const res = await fetch('https://randomuser.me/api/');
const { results } = await res.json();
const data = results[0];

async function About() {
    const supabase = createClient();

    const { data: categories, error } = await supabase
        .from('categories')
        .select('*');

    if (error) {
        console.error('Supabase 連線失敗:', error);
        return <div>連線失敗！請檢查 key</div>;
    }

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

        <h2>This is about page e</h2>
        <p>{data.name.first}</p>
        <img src={data.picture.large} alt="" />
        <Csr data={data} />
        <div>
            <h2>This is home page FOTADO</h2>
            <button type="button" className="btn btn-primary">yes i did it</button>

            <h2>Supabase 連線成功！ Upgrade</h2>
            <p>找到 {categories.length} 筆類別：</p>
            <ul>
                {categories.map(cat => (
                    <li key={cat.id}>
                        {cat.name} {cat.parent_id ? '(小類)' : '(大類)'}
                    </li>
                ))}
            </ul>
        </div>
    </>)
}

export default About;