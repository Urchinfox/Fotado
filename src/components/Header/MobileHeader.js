'use client';

import Image from "next/image";
import Link from "next/link";
import Logo from '../../shared/image/Fotado.png';
import styles from '@/components/Header/header.module.scss';

export default function MobileHeader() {

    const closeMenu = () => {
        const offcanvasEl = document.getElementById("offcanvasRight");
        if (offcanvasEl) {
            const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
            if (offcanvas) offcanvas.hide();
        }
    };

    return (
        <header role="banner" className="mbHeader d-block d-lg-none pt-6 px-6">
            <div className="d-flex align-items-center justify-content-between">
                {/* Logo */}
                <Link href="/" aria-label="Fotado Homepage - Go to home">
                    <Image
                        className="img-base mbLogo"
                        src={Logo}
                        alt="Fotado - Premium Performance Suspension Parts"
                        width={254}
                        height={48}
                        priority
                    />
                </Link>

                {/* 漢堡選單按鈕 */}
                <button
                    className="border-0 bg-transparent"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                    aria-label="Open mobile menu"
                >
                    <i className="bi bi-list fs-5"></i>
                </button>

                {/* Offcanvas 選單 */}
                <div
                    className="offcanvas offcanvas-end bg-neutral-80 text-white"
                    id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel"
                    tabIndex="-1"
                >
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasRightLabel">
                            Fotado Menu
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close mobile menu"
                        ></button>
                    </div>

                    <div className="offcanvas-body d-flex flex-column">
                        <div className="mb-auto">
                            <nav aria-label="Mobile main navigation">
                                <ul className="">
                                    <li className="mb-6">
                                        <Link href="/" className={`${styles.txtHover} txt-hover a-text`}>
                                            <span onClick={closeMenu}>Home</span>
                                        </Link>
                                    </li>
                                    <li className="mb-6">
                                        <Link href="/products" className={`${styles.txtHover} txt-hover a-text`}>
                                            <span onClick={closeMenu}>Product</span>
                                        </Link>
                                    </li>
                                    <li className="mb-6">
                                        <Link href="/blog" className={`${styles.txtHover} txt-hover a-text`}>
                                            <span onClick={closeMenu}>Blog</span>
                                        </Link>
                                    </li>
                                    <li className="mb-6">
                                        <Link href="/about" className={`${styles.txtHover} txt-hover a-text`}>
                                            <span onClick={closeMenu}>About</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className={`${styles.txtHover} txt-hover a-text`}>
                                            <span onClick={closeMenu}>Contact</span>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="d-flex justify-content-end align-items-center">
                            <div className="me-10">Contact us</div>
                            <div className="fs-1">
                                <a className="d-block text-white me-3" href="https://wa.me/886910968919" target="_blank" rel="noopener noreferrer" aria-label="Contact on WhatsApp">
                                    <i className="bi bi-whatsapp"></i>
                                </a>
                                <a className="d-block text-white" href="https://line.me/R/ti/p/@068tvesl?oat_content=url" target="_blank" rel="noopener noreferrer" aria-label="Contact on Line">
                                    <i className="bi bi-line"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}