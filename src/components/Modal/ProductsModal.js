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

    // 監聽 modal 開啟事件
    useEffect(() => {
        const modal = document.getElementById('productModal');

        const handleShow = (event) => {
            const button = event.relatedTarget;
            const id = button.getAttribute('data-product-id');
            const selectedBrand = button.getAttribute('data-brand');
            setProductId(id);
            setBrand(selectedBrand);
        };

        modal.addEventListener('show.bs.modal', handleShow);

        return () => {
            modal.removeEventListener('show.bs.modal', handleShow);
        };
    }, []);

    // 當 productId + brand 改變時，讀取該品牌的所有車型
    useEffect(() => {
        if (!productId || !brand) return;

        const fetchVehicles = async () => {
            setLoading(true);
            setError(null);
            setVehicles([]);

            const { data, error } = await supabase
                .from('product_vehicles')
                .select('model, year')
                .eq('product_id', productId)
                .eq('brand', brand)  // 只取該品牌
                .order('model', { ascending: true });

            if (error) {
                setError('載入車型失敗，請稍後再試');
                console.error(error);
            } else {
                setVehicles(data || []);
            }
            setLoading(false);
        };

        fetchVehicles();
    }, [productId, brand]);

    return (
        <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content py-6 px-8 glass-modal">
                    <div className="d-flex justify-content-between mb-12">
                        <div>
                            <span className="badge text-bg-neutral-80 text-neutral-30 fw-light me-3">
                                FT-37A001
                            </span>
                            <span className="badge text-bg-neutral-80 text-neutral-30 fw-light me-3">
                                {brand || '品牌'}
                            </span>
                            <span className="badge text-bg-neutral-80 text-neutral-30 fw-light">
                                Control Arm
                            </span>

                        </div>

                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body mb-13">
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