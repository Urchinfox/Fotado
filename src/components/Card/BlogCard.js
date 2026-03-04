import Link from "next/link"
import Image from "next/image"
import testImg from '@/shared/image/productSample.webp'

export default function BlogCard() {
    return (<>
        <div>
            <div className="position-relative rounded-4 overflow-hidden">
                <Image
                    className="w-100 h-100 object-fit-cover rounded-4"
                    src={testImg}
                    height={321}
                    width={280}
                    alt=""
                />

                <div className="position-absolute bottom-0 start-0 p-3 mb-2">
                    <h2 className="text-white fs-8">Why Is My Car Shaking?</h2>
                    <p className="text-white mb-2 fs-9">When traveling long distances, the biggest fear is encountering vehicle issues, especially when high-speed driving, [...] </p>
                    <div className="mb-2">
                        <span className="rounded-pill bg-neutral-60 py-1 px-3 fs-8">Suspension</span>
                    </div>

                    <Link href='/' className="bg-neutral-30 rounded-pill py-2 d-block text-center fs-8">Continue reading →</Link>

                </div>
            </div>
        </div>


    </>)
}