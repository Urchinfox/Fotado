import ProductsCard from "@/components/Card/ProductsCard";

function Product() {
    return (<>
        <div className='d-flex align-items-center my-12 container'>
            <div className='d-none d-lg-block me-2'>
                <button className="border py-1 px-3 rounded-pill bg-white border-neutral-40" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-chevron-down pe-1"></i>
                    ENGINE SYSTEM
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                </ul>
            </div>
            <div className='d-none d-lg-block me-2'>
                <button className="bg-white border-neutral-40 border py-1 px-3 rounded-pill" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-chevron-down pe-1"></i>
                    PART
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                </ul>
            </div>
            <div className='d-none d-lg-block me-2'>
                <button className="bg-white border-neutral-40 border py-1 px-3 rounded-pill" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-chevron-down pe-1"></i>
                    MAKE

                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                </ul>
            </div>
            <div className='d-none d-lg-block me-2'>
                <button className="bg-white border-neutral-40 border py-1 px-3 rounded-pill" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-chevron-down pe-1"></i>
                    MODEL
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                </ul>
            </div>

            <div className="position-relative me-2">
                <input type="text" className="ps-6 py-1 rounded-pill bg-white border-neutral-40 border " placeholder='OEM or FT NO.' />
                <i className="text-dark bi bi-search position-absolute top-50 start-0 translate-middle-y px-1"></i>
            </div>
            <div className="d-block d-lg-none me-2"><i className="fs-5 bi bi-funnel"></i></div>

            <div>
                <button type='button' className='border-0 rounded-2 bg-neutral-90 text-light py-2 px-3'><i className="bi bi-search"></i> Search</button>
            </div>

        </div>


        <section>
            <ProductsCard />
        </section>

        <div className="text-center fs-6 mt-lg-12 mt-7 mb-7">
            <span><i className="bi bi-arrow-left-circle me-4"></i>1 / 24<i className="bi bi-arrow-right-circle ms-4"></i></span>
        </div>
    </>)
}

export default Product;