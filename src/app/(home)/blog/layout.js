// app/blog/layout.js
import { createClient } from '@/lib/supabase-server';

import BlogSideBar from '@/components/Blog/BlogSideBar';

export default async function BlogLayout({ children, searchParams }) {
    const supabase = createClient();

    // 抓所有標籤（用 distinct 取出唯一值，並計算數量）
    const { data: tagsData, error } = await supabase
        .from('posts')
        .select('tags')
        .not('tags', 'is', null);  // 排除沒標籤的文章

    if (error) {
        console.error('抓標籤失敗:', error);
        // 可以 fallback 到靜態標籤
    }

    // 處理標籤 + 計算數量
    const tagCountMap = new Map();

    tagsData?.forEach((row) => {
        row.tags?.forEach((tag) => {
            tagCountMap.set(tag, (tagCountMap.get(tag) || 0) + 1);
        });
    });

    // 轉成陣列排序（可按字母或數量）
    const allTags = Array.from(tagCountMap.entries())
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count);  // 按數量降序



    // 抓熱門文章（reading_count 最高的前 3 篇）
    const { data: popularPosts, error: popularError } = await supabase
        .from('posts')
        .select('id, title, slug, tags, reading_time,created_at, updated_at')
        .order('reading_count', { ascending: false })
        .limit(3);

    if (popularError) {
        console.error('抓熱門文章失敗:', popularError);
    }

    return (
        <div className="container">
            <div className="row">
                {/* 左邊 sidebar */}
                <div className="col-12 col-lg-3">
                    <BlogSideBar allTags={allTags} popularPosts={popularPosts || []} />
                </div>

                {/* 右邊內容 */}
                <div className="col-12 col-lg-9">
                    {children}
                </div>
            </div>
        </div>
    );
}