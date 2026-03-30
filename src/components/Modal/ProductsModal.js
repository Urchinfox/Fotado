'use client';

import { useState, useEffect } from 'react';
import styles from '@/components/Modal/modal.module.scss';

export default function ProductsModal() {
    const [productId, setProductId] = useState(null);
    const [brand, setBrand] = useState(null);
    const [ftNumber, setFtNumber] = useState(null);
    const [name, setName] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const modal = document.getElementById('productModal');

        const handleShow = (event) => {
            const button = event.relatedTarget;
            if (!button) return;

            setProductId(button.getAttribute('data-product-id'));
            setBrand(button.getAttribute('data-brand'));
            setFtNumber(button.getAttribute('data-ft-number'));
            setName(button.getAttribute('data-name'));

            const vehicleListStr = button.getAttribute('data-vehicle-list');
            if (vehicleListStr) {
                try {
                    const parsedList = JSON.parse(vehicleListStr);
                    setVehicles(Array.isArray(parsedList) ? parsedList : []);
                } catch (e) {
                    console.error('Failed to parse vehicle list:', e);
                    setVehicles([]);
                }
            } else {
                setVehicles([]);
            }
        };

        modal.addEventListener('show.bs.modal', handleShow);

        return () => {
            modal.removeEventListener('show.bs.modal', handleShow);
        };
    }, []);

    return (
        <div
            className="modal fade"
            id="productModal"
            tabIndex="-1"
            aria-labelledby="productModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg">
                <div className={`modal-content py-6 px-8 ${styles.glassModal}`}>

                    {/* Modal Header */}
                    <div className="d-flex justify-content-between align-items-center mb-lg-12 mb-8">
                        <div className="d-flex gap-2 flex-wrap">
                            {/* FT Number - 幾乎一定會有，保留 fallback */}
                            {ftNumber && (
                                <span className="badge text-bg-neutral-80 text-neutral-30 fw-light">
                                    {ftNumber}
                                </span>
                            )}

                            {/* Brand - 如果有才顯示 */}
                            {brand && (
                                <span className="badge text-bg-neutral-80 text-neutral-30 fw-light">
                                    {brand}
                                </span>
                            )}

                            {/* Product Name - 如果有才顯示 */}
                            {name && (
                                <span className="badge text-bg-neutral-80 text-neutral-30 fw-light">
                                    {name}
                                </span>
                            )}
                        </div>

                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close modal"
                        ></button>
                    </div>

                    {/* Modal Body */}
                    <div className="modal-body mb-lg-13 mb-8">
                        {loading ? (
                            <p className="text-center py-5">Loading vehicle information...</p>
                        ) : error ? (
                            <p className="text-danger text-center py-5">{error}</p>
                        ) : vehicles.length === 0 ? (
                            <p className="text-center py-5 text-neutral-40">
                                No vehicle application data available for this product.
                            </p>
                        ) : (
                            <>
                                <h4 className="mb-4 fw-light fs-6">{name}</h4>
                                <table className="table table-bordered border-neutral-80 table-dark table-striped">
                                    <thead>
                                        <tr>
                                            <th>Model</th>
                                            <th>Year</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vehicles.map((v, index) => (
                                            <tr key={index}>
                                                <td>{v.model || '-'}</td>
                                                <td>{v.year || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}