// src/app/products/page.js
import { createClient } from '@/lib/supabase-server';
import ProductsCard from '@/components/Card/ProductsCard';
import Pagination from '@/components/Pagination/Pagination';
import FilterCards from '@/components/Filter/FilterCard';



export default async function ProductsPage({ searchParams }) {



    const supabase = createClient();

    // 讀取 page，從 URL ?page=x 取得，預設 1
    const currentPage = Number(searchParams.page) || 1;

    // 每頁 12 筆
    const pageSize = 13;

    // 計算偏移（從第幾筆開始）
    const offset = (currentPage - 1) * pageSize;


    let countQuery = supabase.from('product_vehicles').select('*', { count: 'exact', head: true });
    if (searchParams.categoryId) {
        countQuery = countQuery.eq('products.category_id', searchParams.categoryId);
        console.log(countQuery)
    }

    // 讀取總筆數（為了算總頁數）
    const { count: totalCount } = await countQuery;

    // 總頁數
    // const totalPages = Math.ceil((totalCount || 0) / pageSize);

    let vehicleData = [];
    let totalPages = 0;

    if (searchParams.categoryId) {
        // 先過濾 products
        let productQuery = supabase.from('products').select('id');
        productQuery = productQuery.eq('category_id', searchParams.categoryId.trim());

        const { data: filteredProducts } = await productQuery;
        const productIds = filteredProducts?.map(p => p.id) || [];

        console.log('找到的 productIds:', productIds);

        if (productIds.length > 0) {
            // 有產品 → 正常查詢
            let query = supabase
                .from('product_vehicles')
                .select(`
                    id, brand, model, year, product_id,
                    products!product_id (id, ft_number, name, description, image_url, link, category_id)
                `)
                .order('brand', { ascending: true })
                // .range(offset, offset + pageSize - 1)
                .in('product_id', productIds);

            const { data, error } = await query;
            if (error) {
                console.error('讀取失敗:', error);
                return <div className="text-center py-12">載入失敗，請稍後再試</div>;
            }
            vehicleData = data || [];
        } else {
            // 沒有產品 → 直接空資料
            vehicleData = [];
            console.log('該 categoryId 無產品，直接返回空資料');
        }
    } else {
        // 無篩選 → 讀全部（你的原有查詢）
        let query = supabase
            .from('product_vehicles')
            .select(`
                id, brand, model, year, product_id,
                products!product_id (id, ft_number, name, description, image_url, link, category_id)
            `)
            .order('brand', { ascending: true })
        // .range(offset, offset + pageSize - 1);

        const { data, error } = await query;
        if (error) {
            console.error('讀取失敗:', error);
            return <div className="text-center py-12">載入失敗，請稍後再試</div>;
        }
        vehicleData = data || [];
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
        const brand = v.brand || '未知品牌';  // 防 undefined

        const key = `${productId}-${brand}`;

        if (!groupedData[key]) {
            groupedData[key] = {
                product: v.products,
                brand,
                vehicleList: [],
            };
        }

        groupedData[key].vehicleList.push({
            model: v.model || '-',
            year: v.year || '-',
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



            <FilterCards hasFilter={Object.keys(searchParams).length > 0} />


            {/* 判斷是否有篩選條件 */}
            {Object.keys(searchParams).length > 0 ? (
                // 有篩選條件 → 顯示產品列表 + 分頁
                <>
                    <section>
                        {cardsData.length > 0 ? (
                            <ProductsCard cardsData={cardsData} categoryMap={categoryMap} />
                        ) : (
                            <div className="text-center py-12 text-neutral-40">
                                <div className="mb-6">
                                    <i className="bi bi-search fs-1 text-neutral-60"></i>
                                </div>
                                <h3 className="fs-3 fw-light mb-3">目前尚無此類商品</h3>
                                <p className="fs-5 mb-4">該類別正在積極開發中，敬請期待！</p>
                                <p className="mb-5">或點擊上方其他類別繼續探索更多產品～</p>
                            </div>
                        )}
                    </section>

                    <div className="text-center fs-6 mt-lg-12 mt-7 mb-7">
                        <Pagination currentPage={currentPage} totalPages={totalPages} />
                    </div>
                </>
            ) : (
                // 無篩選條件 → 只顯示提示
                <div className="text-center py-12 text-neutral-40">
                    <p className="fs-4">請從上方選擇類別開始瀏覽</p>
                    <p>點擊篩選卡片或使用上方篩選條，即可查看產品</p>
                </div>
            )}

        </>
    );
}