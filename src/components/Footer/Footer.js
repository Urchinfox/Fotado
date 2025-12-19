import logo from '@/shared/image/Fotado.png';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
    return (
        <>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-4">
                        <div>
                            <Image
                                className='img-base'
                                width={233}
                                height={44}
                                src={logo}
                                alt=''
                            />
                        </div>
                        <div className='d-flex'>
                            <a href='/'>
                                <i className="me-2 fs-5 bi bi-line"></i>
                            </a>
                            <a href='/'>
                                <i className="me-2 fs-5 bi bi-facebook"></i>
                            </a>
                            <a href='/'>
                                <i className="me-2 fs-5 bi bi-whatsapp"></i>
                            </a>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="row justify-content-evenly">
                            <div className="col-4">
                                <h2 className='fs-4'>Fotado Enterprise Co., Ltd</h2>
                                <p>No. 10, Lane 63, Huacheng Rd., Xinzhuang Dist., New Taipei City 242, Taiwan</p>
                                <p>TEL : <a href="tel:+886222766545">+886-2-2276-6545</a></p>
                                <p>FAX : +886-2-8992-2408</p>
                                <p>Email : <a href="mailto:carico.auto@gmail.com">carico.auto@gmail.com</a></p>
                            </div>
                            <div className="col-4">
                                <p className='fs-4'>Products</p>
                                <h2 className='fs-6'>Suspension System</h2>
                                <ul className='list-deco'>
                                    <li>Control Arm</li>
                                    <li>Shock Absorber</li>
                                    <li>Stabilizer Link</li>
                                    <li>Lateral Link</li>

                                </ul>
                            </div>
                            <div className="col-4">
                                <p className='fs-4'>Others</p>

                                <ul className="footer-list">
                                    <li><Link href="/news">News</Link></li>
                                    <li><Link href="/catalog">E-Catalog</Link></li>
                                    <li><Link href="/terms">Use & Disclaimer</Link></li>
                                    <li><Link href="/about">About us</Link></li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer;