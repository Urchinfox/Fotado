import { createClient } from '@/lib/supabase-server';

export default async function Home() {
  const supabase = createClient();

  const { data: categories, error } = await supabase
    .from('categories')
    .select('*');

  if (error) {
    console.error('Supabase 連線失敗:', error);
    return <div>連線失敗！請檢查 key</div>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>This is home page FOTADO</h1>
      <button type="button" className="btn btn-primary">yes i did it</button>

      <h2>Supabase 連線成功！ Upgrade</h2>
      <p>找到 {categories.length} 筆類別：</p>
      <ul>
        {categories.map(cat => (
          <li key={cat.id}>
            {cat.name} {cat.parent_id ? '(小類)' : '(大類)'}
          </li>
        ))}
      </ul>
    </div>
  );
}
