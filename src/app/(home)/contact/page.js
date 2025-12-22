import Csr from "./Csr";
import { createClient } from '@/lib/supabase-server';

const res = await fetch('https://randomuser.me/api/');
const { results } = await res.json();
const data = results[0];

async function About() {
    const supabase = createClient();

    const { data: categories, error } = await supabase
        .from('categories')
        .select('*');

    if (error) {
        console.error('Supabase 連線失敗:', error);
        return <div>連線失敗！請檢查 key</div>;
    }

    return (<>
        <h2>This is about page e</h2>
        <p>{data.name.first}</p>
        <img src={data.picture.large} alt="" />
        <Csr data={data} />
        <div>
            <h2>This is home page FOTADO</h2>
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
    </>)
}

export default About;