// src/app/products/page.js
import { createClient } from '@/lib/supabase-server';
import ProductsCard from '@/components/Card/ProductsCard';
import Pagination from '@/components/Pagination/Pagination';
import FilterCards from '@/components/Filter/FilterCard';



export default async function ProductsPage({ searchParams }) {



    const supabase = createClient();

    // 讀取 page，從 URL ?page=x 取得，預設 1
    const currentPage = Number(searchParams.page) || 1;

    // 每頁 8 筆（測試用）
    const pageSize = 6;

    // 計算偏移
    const offset = (currentPage - 1) * pageSize;

    let cardsData = [];  // 外層宣告 cardsData

    // 讀取 categories（badge 用） - 這段一定要保留
    const { data: categories } = await supabase.from('categories').select('id, name');
    const categoryMap = {};
    categories?.forEach(cat => {
        categoryMap[cat.id] = cat.name;
    });

    // 總筆數（用視圖算卡片數量）
    let countQuery = supabase
        .from('product_cards_view')
        .select('*', { count: 'exact', head: true });  // 用 * 避免欄位不存在的問題

    if (searchParams.categoryId) {
        countQuery = countQuery.eq('category_id', searchParams.categoryId.trim());
    }

    const { count: totalCount } = await countQuery;

    const totalPages = Math.ceil((totalCount || 0) / pageSize);

    // 查詢當頁卡片
    let query = supabase
        .from('product_cards_view')
        .select(`
         product_id,
         brand,
         ft_number,
         name,
         description,
         image_url,
         link,
         category_id,
         vehicle_list
     `)
        .order('brand', { ascending: true })
        .range(offset, offset + pageSize - 1);

    if (searchParams.categoryId) {
        query = query.eq('category_id', searchParams.categoryId.trim());
    }

    const { data, error } = await query;

    if (error) {
        console.error('讀取視圖失敗:', error);
        return <div className="text-center py-12">載入失敗，請稍後再試</div>;
    }

    cardsData = data || [];

    console.log('[視圖查詢] 當頁卡片筆數:', cardsData.length);
    console.log('[最終輸出] 傳給 ProductsCard 的 cardsData 筆數:', cardsData.length);

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
                <div className="text-center py-12 text-neutral-40">
                    <p className="fs-4">請從上方選擇類別開始瀏覽</p>
                    <p>點擊篩選卡片或使用上方篩選條，即可查看產品</p>
                </div>
            )}

        </>
    );
}