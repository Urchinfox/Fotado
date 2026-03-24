// lib/getFilterData.js
import { createClient } from '@/lib/supabase-server';

export async function getFilterData() {
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

    // 3. 品牌 + 小分類關聯
    const { data: makePartRelations } = await supabase
        .from('product_vehicles')
        .select(`
      brand,
      products!product_id (category_id)
    `)
        .not('brand', 'is', null);

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

    return {
        systems: systems || [],
        allParts: allParts || [],
        uniqueMakes,
        makeToParts,
        makeToModels
    };
}