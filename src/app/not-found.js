import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='text-center mt-8'>
            <h2>Page Not Found (404)</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link href="/" className='text-primary link-underline-primary '>
                Back to Home
            </Link>
        </div>
    )
}