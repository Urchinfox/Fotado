// src/components/Pagination.jsx
'use client';

// import { useRouter } from 'next/navigation';

// export default function Pagination({ currentPage, totalPages }) {
//     const router = useRouter();

//     const goToPage = (page) => {
//         if (page < 1 || page > totalPages) return;
//         router.push(`/products?page=${page}`);
//     };

//     return (
//         <div className="text-center fs-6 mt-lg-12 mt-7 mb-7">
//             <span>
//                 <button
//                     onClick={() => goToPage(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="border-0 bg-transparent me-4"
//                     style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
//                 >
//                     <i className="bi bi-arrow-left-circle"></i>
//                 </button>

//                 {currentPage} / {totalPages || 1}

//                 <button
//                     onClick={() => goToPage(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className="border-0 bg-transparent ms-4"
//                     style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}
//                 >
//                     <i className="bi bi-arrow-right-circle"></i>
//                 </button>
//             </span>
//         </div>
//     );
// }

import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ currentPage, totalPages }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;

        // 保留所有原有 query param（例如 categoryId）
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());

        router.push(`/products?${params.toString()}`);
    };

    return (
        <div className="text-center fs-6 mt-lg-12 mt-7 mb-7">
            <span>
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="border-0 bg-transparent me-4"
                    style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
                >
                    <i className="bi bi-arrow-left-circle"></i>
                </button>

                {currentPage} / {totalPages || 1}

                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="border-0 bg-transparent ms-4"
                    style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}
                >
                    <i className="bi bi-arrow-right-circle"></i>
                </button>
            </span>
        </div>
    );
}