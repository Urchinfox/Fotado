
// app/blog/page.js
import BlogCard from '@/components/Card/BlogCard';
import BlogPage from '@/components/Pagination/BlogPage';
import testImg from '@/shared/image/productSample.webp';

// 假資料（模擬 Supabase 回傳的 posts）
const mockPosts = [
    {
        id: 1,
        title: "Why Is My Car Shaking?",
        slug: "why-is-my-car-shaking",
        excerpt: "When traveling long distances, the biggest fear is encountering vehicle issues...",
        thumbnail_url: testImg,
        tags: ["Suspension", "Control Arm", 'lateral link'],
    },
    {
        id: 2,
        title: "How to Choose Control Arm?",
        slug: "choose-control-arm",
        excerpt: "Control arms are key to suspension performance...",
        thumbnail_url: testImg,
        tags: ["Control Arm"],
    },
    {
        id: 3,
        title: "Shock Absorber Maintenance Tips",
        slug: "shock-absorber-tips",
        excerpt: "Regular check is important for safety...",
        thumbnail_url: testImg,
        tags: ["Shock Absorber"],
    },
    // 你可以加到 9 張
];

export default function Blog() {
    return (
        <>
            <div className="row gy-4">
                {mockPosts.map((post) => (
                    <div className="col-lg-4 col-12" key={post.id}>
                        <BlogCard post={post} />
                    </div>
                ))}
            </div>

            <BlogPage />
        </>
    );
}