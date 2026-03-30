// src/app/products/page.js
import { createClient } from '@/lib/supabase-server';
import ProductsCard from '@/components/Card/ProductsCard';
import ProductPage from '@/components/Pagination/ProductPage';
import FilterCards from '@/components/Filter/FilterCard';
import FilterBar from '@/components/Filter/FilterBar';
import { getFilterData } from '@/components/UtilFn/getFilterData';



export default async function ProductsPage({ searchParams }) {

    const supabase = createClient();
    // 呼叫共用函式取得 FilterBar 需要的資料
    const filterData = await getFilterData();

    //pagination----------------------------------------

    // 讀取 page，從 URL ?page=x 取得，預設 1
    const currentPage = Number(searchParams.page) || 1;

    // 每頁 8 筆（測試用）
    const pageSize = 8;

    // 計算偏移
    const offset = (currentPage - 1) * pageSize;

    let cardsData = [];

    // 讀取 categories（badge 用）
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
    // 所有可能的過濾條件
    if (searchParams.part) {
        countQuery = countQuery.eq('category_id', searchParams.part);
    }
    if (searchParams.make) {
        countQuery = countQuery.eq('brand', searchParams.make);
    }
    if (searchParams.ft) {
        countQuery = countQuery.ilike('ft_number', `%${searchParams.ft}%`);
    }
    // model 之後再加（因為在 vehicle_list JSON 裡，需要額外處理）

    const { count: totalCount } = await countQuery;

    const totalPages = Math.ceil((totalCount || 0) / pageSize);



    //productsCard --------------------

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

    if (searchParams.part) {
        query = query.eq('category_id', searchParams.part);
    }
    if (searchParams.ft) {
        query = query.ilike('ft_number', `%${searchParams.ft}%`);
    }
    if (searchParams.make) {
        query = query.eq('brand', searchParams.make);
    }
    if (searchParams.model) {
        // model 在 vehicle_list JSON 裡，之後再處理（先做基本過濾）
    }

    const { data, error } = await query;

    if (error) {
        console.error('讀取視圖失敗:', error);
        return <div className="text-center py-12">載入失敗，請稍後再試</div>;
    }

    cardsData = data || [];

    // console.log('[視圖查詢] 當頁卡片筆數:', cardsData.length);
    // console.log('[最終輸出] 傳給 ProductsCard 的 cardsData 筆數:', cardsData.length);

    return (
        <>

            <div className='my-12 container'>
                <FilterBar
                    systems={filterData.systems}
                    allParts={filterData.allParts}
                    uniqueMakes={filterData.uniqueMakes}
                    makeToParts={filterData.makeToParts}
                    makeToModels={filterData.makeToModels}
                />
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
                                <h3 className="fs-3 fw-light mb-3">No products available in this category</h3>
                                <p className="fs-5 mb-4">This category is currently under development. Stay tuned!</p>
                                <p className="mb-5">Or explore other categories above to discover more products.</p>
                            </div>
                        )}
                    </section>

                    <div className="text-center fs-6 mt-lg-12 mt-7 mb-7">
                        <ProductPage currentPage={currentPage} totalPages={totalPages} />
                    </div>
                </>
            ) : (
                <div className="text-center py-12 text-neutral-40">
                    <p className="fs-4">Please select a category above to start browsing</p>
                    <p>Click on the filter cards or use the filter bar above to view products</p>
                </div>
            )}

        </>
    );
}