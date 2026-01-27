// src/app/products/page.js
import { createClient } from '@/lib/supabase-server';
import ProductsCard from '@/components/Card/ProductsCard';
import Pagination from '@/components/Pagination/Pagination';
import Image from 'next/image';
import Link from 'next/link';
import { productsCardData } from '@/app/staticData/data';


export default async function ProductsPage({ searchParams }) {



    const supabase = createClient();

    // 讀取 page，從 URL ?page=x 取得，預設 1
    const currentPage = Number(searchParams.page) || 1;

    // 每頁 12 筆
    const pageSize = 13;

    // 計算偏移（從第幾筆開始）
    const offset = (currentPage - 1) * pageSize;

    // 讀取總筆數（為了算總頁數）
    const { count: totalCount } = await supabase
        .from('product_vehicles')
        .select('*', { count: 'exact', head: true });

    // 總頁數
    const totalPages = Math.ceil((totalCount || 0) / pageSize);

    // 讀取所有 product_vehicles，並 join products
    const { data: vehicleData, error } = await supabase
        .from('product_vehicles')
        .select(`
        id,
        brand,
        model,
        year,
        product_id,
        products!product_id (
          id,
          ft_number,
          name,
          description,
          image_url,
          link,
          category_id
        )
      `)
        .order('brand', { ascending: true }) // 按品牌排序
        .range(offset, offset + pageSize - 1);  // ← 這行新增：只取當頁

    if (error) {
        console.error('讀取車型資料失敗:', error);
        return <div className="text-center py-12">載入失敗，請稍後再試</div>;
    }



    // 讀取 categories（badge 用）
    const { data: categories } = await supabase.from('categories').select('id, name');
    const categoryMap = {};
    categories?.forEach(cat => {
        categoryMap[cat.id] = cat.name;
    });

    // 按 product_id + brand 群組（同一 FT 不同品牌拆卡片）
    const groupedData = {};
    vehicleData.forEach(v => {
        const productId = v.product_id;
        const brand = v.brand;

        const key = `${productId}-${brand}`; // 唯一 key：FT + 品牌

        if (!groupedData[key]) {
            groupedData[key] = {
                product: v.products,
                brand,
                vehicleList: [], // 所有車型（給 modal 用）
            };
        }

        groupedData[key].vehicleList.push({
            model: v.model,
            year: v.year,
        });
    });

    // 轉成陣列，每個 key 就是一張卡片
    const cardsData = Object.values(groupedData).map(group => ({
        ...group.product,
        brand: group.brand,
        vehicleList: group.vehicleList,
    }));
    return (
        <>

            <div className='d-flex align-items-center my-12 container'>
                {/* ... 你原本的篩選區程式碼 ... */}
                {/* 先保持靜態，之後再動態 */}
                <div className='d-none d-lg-block me-2'>
                    <button className="border py-1 px-3 rounded-pill bg-white border-neutral-40" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-chevron-down pe-1"></i>
                        SYSTEM
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Suspension</a></li>
                    </ul>
                </div>
                {/* 其他下拉保持原樣 */}
                <div className='d-none d-lg-block me-2'>
                    <button className="bg-white border-neutral-40 border py-1 px-3 rounded-pill" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-chevron-down pe-1"></i>
                        PART
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Control Arm</a></li>
                    </ul>
                </div>
                <div className='d-none d-lg-block me-2'>
                    <button className="bg-white border-neutral-40 border py-1 px-3 rounded-pill" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-chevron-down pe-1"></i>
                        MAKE
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Toyota</a></li>
                    </ul>
                </div>
                <div className='d-none d-lg-block me-2'>
                    <button className="bg-white border-neutral-40 border py-1 px-3 rounded-pill" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-chevron-down pe-1"></i>
                        MODEL
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">RAV4</a></li>
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

            <section className="container">
                <div className="row row-cols-2 g-4">
                    {
                        productsCardData.map((item) => {
                            return (
                                <div className="col" key={item.id}>
                                    <div className='bg-neutral-90 p-4 rounded-3 h-100'>

                                        <div className="row align-items-center">
                                            <div className="col-4 d-flex flex-column justify-content-center">
                                                <div>
                                                    <Image
                                                        src={item.img}
                                                        className="object-fit-cover w-100 img-base rounded-2"
                                                        width={122}
                                                        height={122}
                                                        alt={item.alt}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-8 text-neutral-30">
                                                <div className="p-3">
                                                    <div className="d-flex justify-content-between">
                                                        <h2 className="fw-light">{item.title}</h2>
                                                        <Link href={item.link}>
                                                            <i className="bi bi-arrow-up-right"></i>
                                                        </Link>
                                                    </div>
                                                    <p>{item.txt}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>


            <section>
                {cardsData.length > 0 ? (
                    <ProductsCard cardsData={cardsData} categoryMap={categoryMap} />
                ) : (
                    <div className="text-center py-12 text-neutral-40">
                        <p className="fs-4">查無產品資料</p>
                    </div>
                )}
            </section>


            <div className="text-center fs-6 mt-lg-12 mt-7 mb-7">
                <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
        </>
    );
}