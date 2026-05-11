export default function sitemap() {
    return [
        {
            url: 'https://www.fotado.com.tw',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://www.fotado.com.tw/products',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: 'https://www.fotado.com.tw/contact',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: 'https://www.fotado.com.tw/blog',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://www.fotado.com.tw/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];
}



// 未來若要加入動態資料庫資料，可參考此結構：
// export default async function sitemap() {
//     // 假設從資料庫取得所有產品
//     // const products = await getProducts();
    
//     // const productUrls = products.map((item) => ({
//     //     url: `https://www.fotado.com.tw/products/${item.id}`,
//     //     lastModified: item.updatedAt,
//     //     changeFrequency: 'weekly',
//     //     priority: 0.8,
//     // }));
    
//     // return [...baseUrls, ...productUrls];
// }