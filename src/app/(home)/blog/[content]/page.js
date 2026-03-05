// app/blog/[slug]/page.js
import styles from '../blog.module.scss';;
import Image from 'next/image';
import testImg from '@/shared/image/productSample.webp';

export default function BlogPost({ params }) {
    const { id } = params;
    console.log(params)
    return (<>
        <h1 className='fs-5'>Why Is My Car Shaking? | How to check your car for vibrations</h1>  {/* article title */}
        <div className='mt-5'>
            <i class="bi bi-calendar-week me-2"></i>
            <time datetime="" className={`text-neutral-90 fs-8 me-2`}>Apr.24.2025</time>
            <span className={`text-neutral-60 fs-8 me-2`}>5 min</span>
            <div className='d-block d-lg-inline'>
                <span className='me-2 mb-3 py-2 px-3 rounded-pill bg-neutral-30 fs-9'>Suspension</span>
                <span className={`me-2 mb-3 py-2 px-3 rounded-pill bg-neutral-30 fs-9`} >Control arm</span>
            </div>
        </div>
        <div className='my-5'>
            <Image
                className='w-100 object-fit-cover rounded-4 overflow-hidden'
                src={testImg}
                alt=''
                width={800}
                height={380}
            />
        </div>
        <p>When traveling long distances, the biggest fear is encountering vehicle issues, especially when high-speed driving suddenly causes unexpected vibrations, which can be quite nerve-wracking. There could be many reasons for a vehicle to shake or vibrate while driving. If you encounter a long holiday and find that car service centers are closed or if you can't find a service center on short notice, perform a preliminary self-inspection to avoid underestimating potential dangers.
            Slight vibrations while driving are normal, as components like the crankshaft, transmission gears, or engine parts are in operation. However, if the vibrations exceed minor levels and turn into uncomfortable shaking, it’s important to investigate the cause thoroughly.</p>
        <p>When traveling long distances, the biggest fear is encountering vehicle issues, especially when high-speed driving suddenly causes unexpected vibrations, which can be quite nerve-wracking. There could be many reasons for a vehicle to shake or vibrate while driving. If you encounter a long holiday and find that car service centers are closed or if you can't find a service center on short notice, perform a preliminary self-inspection to avoid underestimating potential dangers.
            Slight vibrations while driving are normal, as components like the crankshaft, transmission gears, or engine parts are in operation. However, if the vibrations exceed minor levels and turn into uncomfortable shaking, it’s important to investigate the cause thoroughly.</p>

    </>
    );
}