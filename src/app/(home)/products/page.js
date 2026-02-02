// src/app/products/page.js
import { createClient } from '@/lib/supabase-server';
import ProductsCard from '@/components/Card/ProductsCard';
import Pagination from '@/components/Pagination/Pagination';
import FilterCards from '@/components/Filter/FilterCard';
import FilterBar from '@/components/Filter/FilterBar';



export default async function ProductsPage({ searchParams }) {

    const supabase = createClient();
    // 1. 大分類（parent_id IS NULL）
    const { data: systems } = await supabase
        .from('categories')
        .select('id, name')
        .is('parent_id', null)
        .order('name', { ascending: true });

    // 2. 小分類（帶 parent_id）
    const { data: allParts } = await supabase
        .from('categories')
        .select('id, name, parent_id')
        .not('parent_id', 'is', null)
        .order('name', { ascending: true });

    // 3. 品牌 + 小分類關聯（product_vehicles + join products）
    const { data: makePartRelations } = await supabase
        .from('product_vehicles')
        .select(`
    brand,
    products!product_id (category_id)
  `)
        .not('brand', 'is', null);

    // 去重 + 關聯整理
    const makeToParts = {};
    makePartRelations?.forEach(item => {
        const brand = item.brand;
        const categoryId = item.products?.category_id;
        if (brand && categoryId) {
            if (!makeToParts[brand]) makeToParts[brand] = new Set();
            makeToParts[brand].add(categoryId);
        }
    });

    // 4. 品牌 + 車型關聯
    const { data: modelMakeRelations } = await supabase
        .from('product_vehicles')
        .select('brand, model')
        .not('model', 'is', null);

    // 整理 brand -> models
    const makeToModels = {};
    modelMakeRelations?.forEach(item => {
        const brand = item.brand;
        const model = item.model;
        if (brand && model) {
            if (!makeToModels[brand]) makeToModels[brand] = new Set();
            makeToModels[brand].add(model);
        }
    });

    const uniqueMakes = [...new Set(modelMakeRelations?.map(m => m.brand.trim()) || [])].sort();


    //pagination----------------------------------------

    // 讀取 page，從 URL ?page=x 取得，預設 1
    const currentPage = Number(searchParams.page) || 1;

    // 每頁 8 筆（測試用）
    const pageSize = 8;

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

    console.log('[視圖查詢] 當頁卡片筆數:', cardsData.length);
    console.log('[最終輸出] 傳給 ProductsCard 的 cardsData 筆數:', cardsData.length);

    return (
        <>

            <div className='my-12 container'>
                <FilterBar
                    systems={systems || []}
                    allParts={allParts || []}
                    uniqueMakes={uniqueMakes}
                    makeToParts={makeToParts}      // brand -> Set of category_id
                    makeToModels={makeToModels}    // brand -> Set of model
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