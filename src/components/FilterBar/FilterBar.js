'use client';


export default function FilterBar() {
    return (<>
        <div className="filterBar px-8 py-8 position-absolute  start-50 translate-middle d-lg-block d-none text-white">
            <p>Find Your Parts</p>
            <div className='d-flex align-items-center'>
                <div className='me-2'>
                    <button className="border-0 py-1 px-3 rounded-pill" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-chevron-down pe-1"></i>
                        ENGINE SYSTEM
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                    </ul>
                </div>
                <div className='me-2'>
                    <button className="border-0 py-1 px-3 rounded-pill" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-chevron-down pe-1"></i>
                        PART
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                    </ul>
                </div>
                <div className='me-2'>
                    <button className="border-0 py-1 px-3 rounded-pill" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-chevron-down pe-1"></i>
                        MAKE

                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                    </ul>
                </div>
                <div className='me-2'>
                    <button className="border-0 py-1 px-3 rounded-pill" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-chevron-down pe-1"></i>
                        MODEL
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                    </ul>
                </div>

                <div className="position-relative me-2">
                    <input type="text" className="ps-5 py-1 rounded-pill border-0 " placeholder='OEM or CH NO.' />
                    <i className="text-dark bi bi-search position-absolute top-50 start-0 translate-middle-y px-1"></i>
                </div>

                <div>
                    <button type='button' className='border-0 rounded-pill bg-neutral-90 text-light py-2 px-4'><i className="bi bi-search"></i> Search</button>
                </div>

            </div>
        </div>


        <div className="filterBarMb d-block d-lg-none position-absolute translate-middle-x">
            <div className="position-relative mb-12 text-center">
                <input type="text" className="ps-5 py-1 rounded-pill w-100" placeholder='OEM or CH NO.' />

                <i className="text-dark bi bi-search position-absolute top-50 start-0 translate-middle-y px-1"></i>
            </div>
            <p className="text-white">Popular Products</p>
            <div className="d-flex flex-wrap" style={{ width: 320 }}>
                <button type="button" className="glass-btn rounded-pill me-2 mb-2">
                    Shock Absorber
                </button>
                <button type="button" className="glass-btn rounded-pill me-2 mb-2">
                    Control Arm
                </button>
                <button type="button" className="glass-btn rounded-pill me-2 mb-2">
                    Camry
                </button>
                <button type="button" className="glass-btn rounded-pill me-2 mb-2">
                    Altis
                </button>
                <button type="button" className="glass-btn rounded-pill me-2 mb-2">
                    Toyota
                </button>
                <button type="button" className="glass-btn rounded-pill">
                    Lateral Link
                </button>
            </div>
        </div>



    </>
    );
}