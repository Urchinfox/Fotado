// app/blog/layout.js
import { createClient } from '@/lib/supabase-server';
import Link from 'next/link';
import styles from './layout.module.scss';
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

    return (
        <div className="container">
            <div className="row">
                {/* 左邊 sidebar */}
                <div className="col-12 col-lg-3">
                    <BlogSideBar allTags={allTags} />
                </div>

                {/* 右邊內容 */}
                <div className="col-12 col-lg-9">
                    {children}
                </div>
            </div>
        </div>
    );
}