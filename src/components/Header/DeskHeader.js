'use client'
import Link from "next/link";
import Logo from '../../shared/image/Fotado.png'
import Image from "next/image";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function DeskHeader() {
    return (
        <>
            <header className="d-flex align-items-center justify-content-between px-11 pt-5">
                <div>
                    <a href="/" className="block">
                        <Image
                            className="img-base"
                            src={Logo}
                            alt="Fotado"
                            width={441}
                            height={83}
                            priority
                        />
                    </a>

                </div>

                <nav>
                    <ul className="d-flex">
                        <li className="me-6">
                            <Link href="/products" className="txt-hover a-text">
                                Product
                            </Link>
                        </li>


                        <li className="me-6">
                            <Link className="txt-hover a-text" href='/news'>News</Link>
                        </li>
                        <li className="me-6">
                            <Link className="txt-hover a-text" href='/blog'>Blog</Link>
                        </li>
                        <li>
                            <Link className="txt-hover a-text" href='/contact'>Contact</Link>
                        </li>
                    </ul>

                </nav>

            </header>


        </>
    )
}

export default DeskHeader;