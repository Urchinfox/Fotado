// src/components/Card/ProductsCard.jsx
import Image from 'next/image';
import ProductsModal from '../Modal/ProductsModal';

export default function ProductsCard({ cardsData = [], categoryMap = {} }) {
    if (cardsData.length === 0) return null;

    return (
        <div className="container productsCard">
            <div className="row row-cols-lg-4 row-cols-2 gy-4">
                {cardsData.map((card) => (
                    <div className="col" key={`${card.id}-${card.brand}`}>
                        <div className="p-2 bg-neutral-90 rounded-2">
                            <div className="text-center mb-3">
                                <Image
                                    className="object-fit-cover rounded-3 w-100 productsCard-img"
                                    src={(card.image_url || '/placeholder.jpg').trim()}
                                    alt={`${card.brand || '品牌'} ${card.name || '產品'} - ${card.ft_number || '編號'}`}
                                    width={234}
                                    height={156}
                                    priority={false}
                                />
                            </div>
                            <div className="text-neutral-40 mb-3">
                                <p>FT No.: {card.ft_number}</p>
                                <p>Brand: {card.brand || '-'}</p>
                                <p>Model & Year :
                                    <button
                                        type="button"
                                        className="border-0 bg-neutral-80 text-neutral-40 rounded-1 productsCard-details"
                                        data-bs-toggle="modal"
                                        data-bs-target="#productModal"
                                        data-product-id={card.id}
                                        data-brand={card.brand}  // 傳品牌給 modal
                                        data-ft-number={card.ft_number}  // 傳編號給 modal
                                        data-name={card.name} //傳品名給 modal
                                    >
                                        View Details <i className="bi bi-three-dots rounded-circle text-neutral-40 border border-neutral-40"></i>
                                    </button>
                                </p>
                                <p>Note: {card.description || '- -'}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <span className="badge text-bg-neutral-60 text-neutral-90 fw-light">
                                        {categoryMap[card.category_id] || '未知分類'}
                                    </span>
                                </div>
                                <a
                                    href={card.link || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-circle bg-neutral-30 border border-neutral-40 d-flex justify-content-center align-items-center productsCard-cart"
                                    style={{ width: '40px', height: '40px' }}
                                >
                                    <i className="bi bi-cart3"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ProductsModal />
        </div>
    );
}