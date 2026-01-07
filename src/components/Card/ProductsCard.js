import Image from "next/image";
import productSample from '@/shared/image/productSample.webp';
export default function ProductsCard() {
    return (<>
        <div className="container productsCard">
            <div className="row row-cols-lg-4 row-cols-2 gy-4">
                <div className="col">
                    <div className="p-2 bg-neutral-90 rounded-2">
                        <div className="text-center mb-3">
                            <Image
                                className="object-fit-cover rounded-3 w-100 productsCard-img"
                                src={productSample}
                                alt="/"
                                width={234}
                                height={156}
                            />
                        </div>
                        <div className="text-neutral-40 mb-3">
                            <p>FT No.: FT0001</p>
                            <p>Brand: Tesla</p>
                            <p>Model: Model 3</p>
                            <p>Year: 2019</p>
                            <p>Note: - - </p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <span className="badge text-bg-neutral-60 text-neutral-90 fw-light">Control Arm</span>
                            </div>
                            <div
                                className="rounded-circle bg-neutral-30 border border-neutral-40 d-flex justify-content-center align-items-center productsCard-cart"
                            >
                                <i className="bi bi-cart3"></i>
                            </div>


                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="p-2 bg-neutral-90 rounded-2">
                        <div className="text-center mb-3">
                            <Image
                                className="object-fit-cover rounded-3 w-100 productsCard-img"
                                src={productSample}
                                alt="/"
                                width={234}
                                height={156}
                            />
                        </div>
                        <div className="text-neutral-40 mb-3">
                            <p>FT No.: FT0001</p>
                            <p>Brand: Tesla</p>
                            <p>Model: Model 3</p>
                            <p>Year: 2019</p>
                            <p>Note: - - </p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <span className="badge text-bg-neutral-60 text-neutral-90 fw-light">Control Arm</span>
                            </div>
                            <div
                                className="rounded-circle bg-neutral-30 border border-neutral-40 d-flex justify-content-center align-items-center productsCard-cart"
                            >
                                <i className="bi bi-cart3"></i>
                            </div>


                        </div>
                    </div>
                </div>


            </div>
        </div>
    </>)
}