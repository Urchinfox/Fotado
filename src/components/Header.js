import Link from "next/link";
function Header() {
    return (
        <>
            <h2>This is Header</h2>
            <nav>
                <Link href='/about'>about</Link>
                <Link href='/about/er'>dynamic page</Link>
            </nav>
        </>
    )
}

export default Header;