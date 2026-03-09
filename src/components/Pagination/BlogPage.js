// components/Pagination/BlogPage.jsx
'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function BlogPage({ currentPage, totalPages }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const goToPage = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="text-center fs-6 mt-lg-12 mt-7 mb-7">
            <span>
                <button
                    className="border-0 bg-transparent me-4"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                >
                    <i className="bi bi-arrow-left-circle"></i>
                </button>

                {currentPage} / {totalPages}

                <button
                    className="border-0 bg-transparent ms-4"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                >
                    <i className="bi bi-arrow-right-circle"></i>
                </button>
            </span>
        </div>
    );
}