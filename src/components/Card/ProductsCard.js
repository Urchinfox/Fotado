// src/components/Card/ProductsCard.jsx
import Image from 'next/image';
import ProductsModal from '../Modal/ProductsModal';
import styles from '@/components/Card/card.module.scss'

export default function ProductsCard({ cardsData = [], categoryMap = {} }) {
    if (cardsData.length === 0) return null;
    // console.log(cardsData)

    return (
        <div className={`container ${styles.productsCard}`}>
            <div className="row row-cols-lg-4 row-cols-2 gy-4">
                {cardsData.map((card, index) => (
                    <div className="col" key={`${card.id}-${card.brand || 'no-brand'}-${index}`}>
                        <div className="p-2 bg-neutral-90 rounded-2">
                            <div className="text-center mb-3">
                                <Image
                                    className="rounded-3 w-100 productsCard-img"
                                    src={(card.image_url || '/placeholder.jpg').trim()}
                                    alt={`${card.brand || 'Fotado'} ${card.name || 'auto chassis part'} - ${card.ft_number || 'FT number'}`}
                                    width={234}
                                    height={156}
                                    priority={false}
                                />
                            </div>
                            <div className="text-neutral-40 mb-3">
                                <h3 className="fw-light mb-2 fs-9">{card.name || card.title}</h3>
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
                                        data-vehicle-list={JSON.stringify(card.vehicle_list)}
                                        aria-label={`View details for ${card.brand} ${card.name}`}
                                    >
                                        View Details <i className="bi bi-three-dots rounded-circle text-neutral-40 border border-neutral-40"></i>
                                    </button>
                                </p>
                                <p>Note: {card.description || '- -'}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <span className="badge text-bg-neutral-60 text-neutral-90 fw-light">
                                        {categoryMap[card.category_id] || 'Uncategorized'}
                                    </span>
                                </div>
                                <a
                                    href={card.link || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-circle bg-neutral-30 border border-neutral-40 d-flex justify-content-center align-items-center productsCard-cart"
                                    style={{ width: '40px', height: '40px' }}
                                    aria-label={`Go to purchase ${card.name}`}
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