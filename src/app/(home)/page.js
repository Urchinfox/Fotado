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


  return (<>
    <section className='mt-5'>
      <h1 className="sr-only">Fotado</h1>

      <div className=" container-lg px-0 px-lg-3">
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

    <section className='border rounded-3 py-10 bg-white shadow d-block d-lg-none' style={{ marginTop: '-30px', zIndex: '10', position: 'relative' }}>
      <div className="container">
        <div className='mb-6'>
          <p className='fw-bolder mb-2'>System</p>
          <Link href='/' className='btn btn-sm btn-neutral-20'>suspension</Link>
        </div>
        <div className='mb-6'>
          <p className='fw-bolder mb-2'>Part</p>
          <Link href='/' className='btn btn-sm btn-neutral-20 me-2 mb-2'>Shock Absorber</Link>
          <Link href='/' className='btn btn-sm btn-neutral-20 me-2 mb-2 bg-dark text-white'>Control Arm</Link>
          <Link href='/' className='btn btn-sm btn-neutral-20 me-2 mb-2'>Lateral Link</Link>
          <Link href='/' className='btn btn-sm btn-neutral-20 me-2 mb-2'>Stabilizer Link</Link>
        </div>
        <div className='mb-6'>
          <p className='fw-bolder mb-2'>Brands</p>
          <div className="d-flex">
            <div className='text-center'>
              <p className='d-inline-block me-2 p-6 rounded-circle bg-neutral-20'>Ford</p>
              <p>Ford</p>
            </div>
            <div className='text-center'>
              <p className='d-inline-block me-2 p-6 rounded-circle bg-neutral-20'>Kia</p>
              <p>Kia</p>
            </div>
            <div className='text-center'>
              <p className='d-inline-block me-2 p-6 rounded-circle bg-neutral-20'>Audi</p>
              <p>Audi</p>
            </div>
            <div className='text-center'>
              <p className='d-inline-block me-2 p-6 rounded-circle bg-neutral-20'>kia</p>
              <p>kia</p>
            </div>

          </div>
        </div>
        <div className='mb-12'>
          <p className='fw-bolder mb-2'>Search</p>
          <div className="position-relative me-2">
            <input type="text" className="bg-neutral-20 ps-8 py-1 rounded-pill border-0 " placeholder='OEM or FT NO.' />
            <i className="text-dark bi bi-search position-absolute top-50 start-0 translate-middle-y px-2"></i>
          </div>
        </div>
        <div className='text-center'>
          <button type='button' className='border-0 rounded-pill bg-neutral-90 text-light py-2 px-4'><i className="bi bi-search"></i> Search</button>
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
            <h2 className='fw-bolder'>Performance Upgrades</h2>
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

              <Link href='/product' className='btn btn-neutral-90'>View All Parts</Link>
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
              <Link className='position-absolute bottom-0' href='/' style={{ right: '20px' }}><i className="fs-1 text-white bi bi-arrow-up-right-circle"></i></Link>
            </div>

          </div>

        </div>
      </div>
    </section>



  </>
  );
}
