import Image from 'next/image';
import Logo from '@/shared/image/Fotado.png'
import banner from '@/shared/image/landingPageBanner.jpg'
import FilterBar from '@/components/Filter/FilterBar';
import card from '@/shared/image/card.webp'
import NewsCard from '@/components/Card/NewsCard';
import PerformanceCard from '@/components/Card/PerformanceCard';
import ShockAbsorber from '@/shared/image/Shock-Absorber.webp'
import Link from 'next/link';
import worker from '@/shared/image/worker.webp'
import { getFilterData } from '@/components/UtilFn/getFilterData';
import styles from '../page.module.scss';


export default async function Home() {

  // FilterBar 需要的資料
  const filterData = await getFilterData();
  return (<>
    {/* Banner */}
    <section className='mt-5'>
      <h1 className={`${styles.srOnly}`}>Fotado - Premium Performance Suspension & Chassis Parts</h1>

      <div className=" container-lg px-0 px-lg-3">
        <div className={`position-relative ${styles.bannerContainer}`}>
          <Image
            src={banner}
            alt="Fotado high-performance suspension parts - Control arms, shock absorbers,brake disk,stabilizer link,lateral link and chassis upgrades"
            fill
            priority
            className={styles.homeBanner}
          />
          <div className={styles.bannerFilterBar}>
            <FilterBar
              systems={filterData.systems}
              allParts={filterData.allParts}
              uniqueMakes={filterData.uniqueMakes}
              makeToParts={filterData.makeToParts}
              makeToModels={filterData.makeToModels}
              type="home"        // 加上這個 prop，未來區分行為用
            />
          </div>
        </div>
      </div>
    </section>


    {/* features */}
    <section className='mt-10 d-none d-lg-block'>
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-3 g-4">

          <div className="col d-flex position-relative">
            <div className="rounded-3 w-100 overflow-hidden flex-fill">
              <Image
                src={card}
                className='object-fit-cover w-100 h-100'
                width={330}
                height={160}
                alt='SUSPENSION SYSTEM'
              />
            </div>
            <div className='end-50 top-50 position-absolute'>
              <p className='text-neutral-30 fs-3'>100+</p>
              <p className='text-neutral-30 fs-6'>SUSPENSION SYSTEM</p>
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
                  alt='fotado'
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
              <div className='fs-6'>Others</div>

              <div className='h-100 d-flex align-items-center'>
                <Image
                  src={card}
                  className='rounded-circle object-fit-cover me-2'
                  width={44}
                  height={44}
                  alt=''
                />
                <Image
                  src={card}
                  className='rounded-circle object-fit-cover me-2'
                  width={44}
                  height={44}
                  alt=''
                />
                <Image
                  src={card}
                  className='rounded-circle object-fit-cover'
                  width={44}
                  height={44}
                  alt=''
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    {/* Performance */}
    <section className='mt-lg-15 mt-11'>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12">
            <h2 className='fw-bolder'>Performance Upgrades</h2>
            <p className='mt-5 mb-4'>Enhance your vehicle’s performance with Fotado’s high-quality upgrade parts. Designed for strength and precision, our components deliver superior handling and durability under any driving condition.</p>
            <div className='text-center'>
              <Image
                src={ShockAbsorber}
                className='object-fit-cover img-base'
                width={415}
                height={354}
                alt='shock absorber'
              />
            </div>
            <div className='text-center mt-3'>

              <Link href='/products' className='btn btn-neutral-90'>View All Parts</Link>
            </div>
          </div>
          <div className="col-lg-6 col-12 mt-lg-0 mt-5">
            <PerformanceCard />
          </div>
        </div>
      </div>
    </section>


    <section className='my-lg-15 my-12'>
      <NewsCard />
    </section>

    {/* what we do */}
    <section className='mb-lg-15 mb-12'>
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
              <Link className='position-absolute bottom-0' href='/about' style={{ right: '20px' }}><i className={`fs-1 text-white bi bi-arrow-up-right-circle ${styles.biArrowUpRightCircle}`}></i></Link>
            </div>

          </div>

        </div>
      </div>
    </section>


  </>
  );
}
