// components/Footer/Footer.jsx
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/shared/image/Fotado.png';
import styles from '@/components/Footer/footer.module.scss';

export default function Footer() {
    return (
        <footer role="contentinfo" className="container-fluid my-3">
            <div className="row align-items-center">
                <div className="col-lg-4 col-12 d-flex justify-content-center mb-lg-0 mb-8">
                    <div>
                        {/* Logo */}
                        <div className="mb-3">
                            <Link href="/" aria-label="Fotado Homepage">
                                <Image
                                    className="img-base d-block"
                                    width={233}
                                    height={44}
                                    src={logo}
                                    alt="Fotado - Premium Performance Suspension Parts"
                                    priority={false}
                                />
                            </Link>
                        </div>

                        {/* Social Icons */}
                        <div className="d-flex justify-content-lg-start justify-content-center gap-3">
                            <a
                                href="https://line.me/R/ti/p/@068tvesl?oat_content=url"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow us on Line"
                            >
                                <i className="bi bi-line fs-5"></i>
                            </a>
                            <a
                                href="https://www.facebook.com/CARICOautoparts"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow us on Facebook"
                            >
                                <i className="bi bi-facebook fs-5"></i>
                            </a>
                            <a
                                href="https://wa.me/886910968919"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Contact us on WhatsApp"
                            >
                                <i className="bi bi-whatsapp fs-5"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="col-lg-8 col-12 ">
                    <div className="py-8 px-11 bg-neutral-30 rounded-4 bg-white">
                        <div className="row row-cols-lg-3 row-cols-1 justify-content-evenly">

                            {/* Company Info */}
                            <div className="col mb-lg-0 mb-8">
                                <h3 className="fs-6 mb-2 fw-bolder">Fotado Enterprise Co., Ltd</h3>
                                <p className="mb-1">
                                    No. 10, Lane 63, Huacheng Rd., Xinzhuang Dist.,<br />
                                    New Taipei City 242, Taiwan
                                </p>
                                <p className="mb-1">
                                    TEL : <a href="tel:+886222766545">+886-2-2276-6545</a>
                                </p>
                                <p className="mb-1">
                                    FAX : +886-2-8992-2408
                                </p>
                                <p>
                                    Email : <a href="mailto:carico.auto@gmail.com">carico.auto@gmail.com</a>
                                </p>
                            </div>

                            {/* Products */}
                            <div className="col mb-lg-0 mb-8">
                                <h3 className="fs-6 mb-2 fw-bolder">Products</h3>
                                <ul className={styles.listDeco}>
                                    <li>Control Arm</li>
                                    <li>Shock Absorber</li>
                                    <li>Stabilizer Link</li>
                                    <li>Lateral Link</li>
                                </ul>
                            </div>

                            {/* Others */}
                            <div className="col">
                                <h3 className="fs-6 mb-2 fw-bolder">Others</h3>
                                <ul className={styles.footerList}>
                                    <li><Link href="/news">News</Link></li>
                                    <li><Link href="/catalog">E-Catalog</Link></li>
                                    <li><Link href="/terms">Use &amp; Disclaimer</Link></li>
                                    <li><Link href="/about">About us</Link></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}