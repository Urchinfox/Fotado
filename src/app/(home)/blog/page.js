// app/blog/page.js（保持 Server Component，無 'use client'）
import { createClient } from '@/lib/supabase-server';
import BlogPage from '@/components/Pagination/BlogPage';
import BlogListClient from '@/components/Blog/BlogListClient';

export const metadata = {
    title: 'Blog | Fotado - Suspension Knowledge & Automotive Tips',
    description: 'Explore in-depth articles about car suspension systems, performance parts, maintenance guides, and industry insights from Fotado.',
};

export default async function Blog({ searchParams }) {
    const supabase = createClient();

    const tag = searchParams.tag || null;  // 從 URL ?tag=xxx 拿
    const page = Number(searchParams.page) || 1;
    const pageSize = 9; // 每頁 9 筆
    const offset = (page - 1) * pageSize;

    let query = supabase
        .from('posts')
        .select('id, title, slug, excerpt, thumbnail_url, tags, created_at, author, reading_time', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + pageSize - 1); // 分頁範圍
    if (tag) {
        query = query.contains('tags', [tag]);
    }

    const { data: posts, error, count } = await query;

    if (error) {
        console.error('抓文章失敗:', error);
        return <div>Failed to load articles. Please try again later.</div>;
    }

    const totalPages = Math.ceil((count || 0) / pageSize);

    return (
        <>
            {/* 傳 posts 給 Client Component */}
            <BlogListClient initialPosts={posts} initialTag={tag} />

            <BlogPage currentPage={page} totalPages={totalPages} />
        </>
    );
}