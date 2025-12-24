import Csr from "./Csr";
import { createClient } from '@/lib/supabase-server';
import worker from '@/shared/image/worker.webp';
import Image from "next/image";
import styles from './contact.module.scss';

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
        <div className="mt-13">
            <div className="container">
                <div className="row">
                    <div className="col-7">
                        <p>What we do</p>
                        <p className="fs-2 my-2">We always make the best</p>
                        <p className="mb-8">Founded in 1981 in New Taipei City, Taiwan, Fotado Enterprise has evolved into a globally recognized supplier of premium automotive aftermarket parts. With more than 40 years of dedication to quality and innovation, we proudly serve customers on five continents.</p>
                        <button type="button" className="btn btn-neutral-80 d-block"><i className="bi bi-envelope-fill"></i> Contact us</button>
                    </div>
                    <div className="col-5">
                        <div>
                            <Image
                                src={worker}
                                width={331}
                                height={331}
                                className={`img-base ${styles.imgGrayscale}`}

                                alt=""

                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className={styles.certification}>
            <div className={styles['certification-container']}>
                <div className={styles['certification-content']}>
                    <div className={styles['certification-image']}>
                        <Image src={worker} width={331} height={331} alt="" className="img-base" />
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