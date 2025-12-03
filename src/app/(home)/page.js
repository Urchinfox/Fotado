import { createClient } from '@/lib/supabase-server';
import Image from 'next/image';
import Logo from '@/shared/image/Fotado.png'
import banner from '@/shared/image/landingPageBanner.jpg'
import FilterBar from '@/components/FilterBar/FilterBar';
import card from '@/shared/image/card.webp'




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

    <section className='mt-10'>
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

    <section className='mt-15'>

      <div className="container">
        <div className="row">
          <div className="col-6">
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
          <div className="col-6">
            <div className="row bg-neutral-90 mb-4 rounded-3 p-3">
              <div className="col-4 d-flex flex-column justify-content-center">
                <div>
                  <Image
                    src={card}
                    className='object-fit-cover w-100 img-base rounded-2'
                    width={122}
                    height={122}
                    alt=''
                  />
                </div>

              </div>
              <div className="col-8 text-neutral-30">
                <div className='d-flex justify-content-between '>
                  <h2 className='fw-light'>Control Arm</h2>
                  <i className="bi bi-arrow-up-right"></i>
                </div>
                <p>Engineered for precision and durability, our control arms deliver superior handling and stability—keeping your wheels aligned even under extreme performance conditions.</p>
              </div>
            </div>
            <div className="row bg-neutral-90 mb-4 rounded-3 p-3">
              <div className="col-4 d-flex flex-column justify-content-center">
                <div>
                  <Image
                    src={card}
                    className='object-fit-cover w-100 img-base rounded-2'
                    width={122}
                    height={122}
                    alt=''
                  />
                </div>

              </div>
              <div className="col-8 text-neutral-30 ">
                <div className='d-flex justify-content-between '>
                  <h2 className='fw-light'>Control Arm</h2>
                  <i className="bi bi-arrow-up-right"></i>
                </div>
                <p>Engineered for precision and durability, our control arms deliver superior handling and stability—keeping your wheels aligned even under extreme performance conditions.</p>
              </div>
            </div>
            <div className="row bg-neutral-90 mb-4 rounded-3 p-3">
              <div className="col-4 d-flex flex-column justify-content-center">
                <div>
                  <Image
                    src={card}
                    className='object-fit-cover w-100 img-base rounded-2'
                    width={122}
                    height={122}
                    alt=''
                  />
                </div>

              </div>
              <div className="col-8 text-neutral-30 ">
                <div className='d-flex justify-content-between '>
                  <h2 className='fw-light'>Control Arm</h2>
                  <i className="bi bi-arrow-up-right"></i>
                </div>
                <p>Engineered for precision and durability, our control arms deliver superior handling and stability—keeping your wheels aligned even under extreme performance conditions.</p>
              </div>
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
