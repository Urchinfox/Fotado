'use client'
import Image from "next/image"
import Link from "next/link";
import Logo from '../../shared/image/Fotado.png'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function MobileHeader() {

    const closeMenu = () => {     //關閉選單
        const offcanvasEl = document.getElementById("offcanvasRight");
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (offcanvas) offcanvas.hide();
    };

    return (
        <header className="mbHeader d-block d-lg-none pt-6 px-6">
            <div className="d-flex align-items-center justify-content-between">
                <a href="/" className="block">
                    <Image
                        className="img-base mbLogo"
                        src={Logo}
                        alt="Fotado"
                        width={254}
                        height={48}
                        priority
                    />
                </a>
                <button className="border-0 bg-transparent" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i className="bi bi-list fs-5"></i></button>

                <div className="offcanvas offcanvas-end bg-neutral-80 text-white" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasRightLabel">Fotado</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body d-flex flex-column">
                        <div className="mb-auto">
                            <nav>
                                <ul className="">
                                    <li className="mb-6">
                                        <Link href="/" className="txt-hover a-text" onClick={closeMenu}>Home</Link>
                                    </li>
                                    <li className="mb-6">
                                        <Link href="/product" className="txt-hover a-text" onClick={closeMenu}>Product</Link>
                                    </li>
                                    <li className="mb-6">
                                        <Link className="txt-hover a-text" onClick={closeMenu} href='/news'>News</Link>
                                    </li>
                                    <li className="mb-6">
                                        <Link className="txt-hover a-text" onClick={closeMenu} href='/blog'>Blog</Link>
                                    </li>
                                    <li>
                                        <Link className="txt-hover a-text" onClick={closeMenu} href='/about'>About us</Link>
                                    </li>
                                </ul>

                            </nav>
                        </div>
                        <div className="d-flex justify-content-end align-items-center">
                            <div className="me-10">Contact us</div>
                            <div className="fs-1">
                                <a className="d-block text-white" href="/"><i className="bi bi-whatsapp"></i></a>
                                <a className="d-block text-white" href="/"><i className="bi bi-line"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </header>
    )
}