import logo from '@/shared/image/Fotado.png';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row align-items-center">
                    <div className="col-lg-4 col-12 d-flex justify-content-center mb-lg-0 mb-8">

                        <div>

                            {/* Logo */}
                            <div className="mb-3">
                                <Image
                                    className="img-base d-block"
                                    width={233}
                                    height={44}
                                    src={logo}
                                    alt=""
                                />
                            </div>

                            {/* Icons */}
                            <div className="d-flex justify-content-lg-start justify-content-center">
                                <a href="/" className="me-2 fs-5">
                                    <i className="bi bi-line"></i>
                                </a>
                                <a href="/" className="me-2 fs-5">
                                    <i className="bi bi-facebook"></i>
                                </a>
                                <a href="/" className="fs-5">
                                    <i className="bi bi-whatsapp"></i>
                                </a>
                            </div>

                        </div>
                    </div>

                    <div className="col-lg-8 col-12">
                        <div className='py-8 px-11 bg-neutral-30 rounded-4'>
                            <div className="row row-cols-lg-3 row-cols-1 justify-content-evenly">
                                <div className="col mb-lg-0 mb-8">
                                    <h2 className='fs-6 mb-2 fw-bolder'>Fotado Enterprise Co., Ltd</h2>
                                    <p>No. 10, Lane 63, Huacheng Rd., Xinzhuang Dist., New Taipei City 242, Taiwan</p>
                                    <p>TEL : <a href="tel:+886222766545">+886-2-2276-6545</a></p>
                                    <p>FAX : +886-2-8992-2408</p>
                                    <p>Email : <a href="mailto:carico.auto@gmail.com">carico.auto@gmail.com</a></p>
                                </div>
                                <div className="col mb-lg-0 mb-8">
                                    <p className='fs-6 mb-2 fw-bolder'>Products</p>
                                    <h2 className='fs-6 fw-lighter'>Suspension System</h2>
                                    <ul className='list-deco'>
                                        <li>Control Arm</li>
                                        <li>Shock Absorber</li>
                                        <li>Stabilizer Link</li>
                                        <li>Lateral Link</li>

                                    </ul>
                                </div>
                                <div className="col">
                                    <p className='fs-6 mb-2 fw-bolder'>Others</p>

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
            </div>
        </>
    )
}
export default Footer;