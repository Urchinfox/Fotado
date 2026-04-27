// components/Header/DeskHeader.jsx
import Link from "next/link";
import Image from "next/image";
import Logo from '../../shared/image/Fotado.png';
import styles from '@/components/Header/header.module.scss';

export default function DeskHeader() {
    return (
        <header role="banner" className="d-flex align-items-center justify-content-between px-11 pt-5">
            <div>
                <Link href="/" aria-label="Fotado Homepage">
                    <Image
                        className="img-base"
                        src={Logo}
                        alt="Fotado - Premium Performance Suspension Parts"
                        width={441}
                        height={83}
                        priority
                    />
                </Link>
            </div>

            {/* 主要導航 */}
            <nav aria-label="Main Navigation">
                <ul className="d-flex">
                    <li className="me-6">
                        <Link href="/products" className={`${styles.txtHover} a-text`}>
                            Product
                        </Link>
                    </li>
                    <li className="me-6">
                        <Link href="/blog" className={`${styles.txtHover} a-text`}>
                            Blog
                        </Link>
                    </li>
                    <li className="me-6">
                        <Link href="/about" className={`${styles.txtHover} a-text`}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className={`${styles.txtHover} a-text`}>
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}