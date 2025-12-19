import { createClient } from '@/lib/supabase-server';
import Image from 'next/image';
import Logo from '@/shared/image/Fotado.png'
import banner from '@/shared/image/landingPageBanner.jpg'
import FilterBar from '@/components/FilterBar/FilterBar';
import card from '@/shared/image/card.webp'
import NewsCard from '@/components/Card/NewsCard';
import PerformanceCard from '@/components/Card/PerformanceCard';
import Link from 'next/link';
import worker from '@/shared/image/worker.webp'




export default async function Home() {
  const supabase = createClient();

  const { data: categories, error } = await supabase
    .from('categories')
    .select('*');

  if (error) {
    console.error('Supabase 連線失敗:', error);
    return <div>連線失敗！請檢查 key</div>;
  }

  return (<>
    <section className='mt-5'>
      <h1 className="sr-only">Fotado</h1>

      <div className="container">
        <div className='position-relative banner-container'>
          <Image
            src={banner}
            alt=""
            fill
            className="home-banner"
          />

          <FilterBar />
        </div>
      </div>



    </section>

    <section className='mt-10 d-none d-lg-block'>
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-3 g-4">

          <div className="col d-flex">
            <div className="rounded-3 w-100 overflow-hidden flex-fill">
              <Image
                src={card}
                className='object-fit-cover w-100 h-100'
                width={330}
                height={160}
                alt=''
              />
            </div>
          </div>

          <div className="col d-flex">
            <div
              className='d-flex flex-column justify-content-end rounded-3 border ps-3 pb-5 flex-fill'
              style={{ backgroundColor: '#D9D9D9' }}
            >
              <div className='d-block text-end'>
                <Image
                  src={Logo}
                  width={258}
                  height={49}
                  alt=''
                />
              </div>
              <p className='fs-1'>20+</p>
              <p className='fs-2 fw-light'>YEARS OF SERVICE</p>
            </div>
          </div>

          <div className="col d-flex">
            <div
              className="d-flex justify-content-evenly align-items-center rounded-3 flex-fill"
              style={{ backgroundColor: '#D9D9D9' }}>
              <div>Others</div>

              <div className='h-100 d-flex align-items-center'>
                <Image
                  src={card}
                  className='rounded-circle object-fit-cover'
                  width={150}
                  height={160}
                  alt=''
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section className='mt-lg-15 mt-11'>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12">
            <h2 className='fw-light'>Performance Upgrades</h2>
            <p className='mt-5 mb-4'>Enhance your vehicle’s performance with Fotado’s high-quality upgrade parts. Designed for strength and precision, our components deliver superior handling and durability under any driving condition.</p>
            <div>
              <Image
                src={card}
                className='object-fit-cover w-100 h-100 '
                width={415}
                height={354}
                alt=''
              />
            </div>
            <div className='text-center mt-3'>

              <button type='button' className='btn btn-neutral-90'>View All Parts</button>
            </div>
          </div>
          <div className="col-lg-6 col-12 mt-lg-0 mt-5">
            <PerformanceCard />
          </div>
        </div>
      </div>
    </section>


    <section className='mt-15'>
      <NewsCard />
    </section>


    <section>
      <div className="container-lg p-0">
        <div className='p-lg-5 p-0'>
          <div className="row align-items-center g-0">
            <div className="col-6 d-lg-flex justify-content-center align-items-center d-none">
              <div style={{ maxWidth: '304px' }}>
                <p className='fs-2'>What we do</p>
                <p className='mt-5 mb-12'>At Fotado, we specialize in high-performance automotive parts designed to enhance driving precision, stability, and style. From suspension components to custom upgrades, we deliver quality you can trust on and off the track.</p>
                <Link href="/contact" className="btn btn-neutral-30">
                  <i className="me-1 bi bi-arrow-up-right"></i>Contact us
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-12 position-relative">
              <div>
                <Image
                  className='img-base rounded-4'
                  src={worker}
                  width={637}
                  height={416}
                  alt=''
                />
              </div>
              <p className='d-none d-lg-block fs-6 position-absolute start-50 translate-middle-x text-white' style={{ bottom: '25px' }}>Fotado is dedicated to redefining vehicle performance.</p>
              <Link className='position-absolute bottom-0' href='/' style={{ right: '20px' }}><i className="fs-1 text-white bi bi-arrow-up-right-circle"></i></Link>
            </div>

          </div>

        </div>
      </div>
    </section>


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
  </>
  );
}
