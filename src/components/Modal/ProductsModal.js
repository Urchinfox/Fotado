// {/* css in card.scss */ }


// export default function ProductsModal() {
//     return (<>
//         <div className="modal fade" id="productModal" >
//             <div className="modal-dialog">
//                 <div className=" py-6 px-8 glass-modal">
//                     <div className="justify-content-between d-flex mb-12">
//                         <div>
//                             <span className="badge text-bg-neutral-80 text-neutral-30 fw-light me-3">
//                                 FT-37A001
//                             </span>
//                             <span className="badge text-bg-neutral-80 text-neutral-30 fw-light me-3">
//                                 Tesla
//                             </span>
//                             <span className="badge text-bg-neutral-80 text-neutral-30 fw-light">
//                                 Control Arm
//                             </span>

//                         </div>
//                         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                     </div>
//                     <div className="modal-body mb-13">
//                         <table className="table table-bordered border-neutral-80 table-dark table-striped">
//                             <thead>
//                                 <tr>
//                                     <th>Model</th>
//                                     <th>Year</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <td>Camry</td>
//                                     <td>2018–2022</td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>

//                 </div>
//             </div>
//         </div>



//     </>)
// }


// src/components/Modal/ProductsModal.jsx
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function ProductsModal() {
    const [productId, setProductId] = useState(null);
    const [brand, setBrand] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ftNumber, setFtNumber] = useState(null);
    const [name, setName] = useState(null);

    useEffect(() => {
        const modal = document.getElementById('productModal');

        const handleShow = (event) => {
            const button = event.relatedTarget;
            setProductId(button.getAttribute('data-product-id'));
            setBrand(button.getAttribute('data-brand'));
            setFtNumber(button.getAttribute('data-ft-number'));
            setName(button.getAttribute('data-name'));

            // 直接從 data-vehicle-list 讀取車型資料（不再查 Supabase）
            const vehicleListStr = button.getAttribute('data-vehicle-list');
            if (vehicleListStr) {
                try {
                    const vehicleList = JSON.parse(vehicleListStr);
                    setVehicles(vehicleList || []);
                } catch (e) {
                    console.error('解析 vehicle_list 失敗:', e);
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
        <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content py-6 px-8 glass-modal">
                    <div className="d-flex justify-content-between mb-lg-12 mb-8">

                        <div className="mt-2">
                            <span className="badge text-bg-neutral-80 text-neutral-30 fw-light me-3">
                                {ftNumber || 'FT-XXXXXX'}
                            </span>
                            <span className="badge text-bg-neutral-80 text-neutral-30 fw-light me-3">
                                {brand || '品牌'}
                            </span>
                            <span className="badge text-bg-neutral-80 text-neutral-30 fw-light">
                                {name || '產品名稱'}
                            </span>
                        </div>

                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body mb-lg-13 mb-8">
                        {loading ? (
                            <p className="text-center">載入中...</p>
                        ) : error ? (
                            <p className="text-danger text-center">{error}</p>
                        ) : vehicles.length === 0 ? (
                            <p className="text-center">無適用車型資料</p>
                        ) : (
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
                                            <td>{v.model}</td>
                                            <td>{v.year}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}