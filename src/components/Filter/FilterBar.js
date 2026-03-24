'use client';

import { useState, useMemo, useTransition, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Loading from '../Loading/Loading';
import FilterModal from '../Modal/FilterModal';

export default function FilterBar({ systems = [], allParts = [], uniqueMakes = [], makeToParts = {}, makeToModels = {}, hasFilter }) {

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();

    //state

    const [selectedSystem, setSelectedSystem] = useState(null);
    const [selectedPart, setSelectedPart] = useState(null);
    const [selectedMake, setSelectedMake] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [ftNumber, setFtNumber] = useState('');


    // 動態過濾 PART（根據 SYSTEM）
    const filteredParts = useMemo(() => {
        if (!selectedSystem) return allParts;
        return allParts.filter(part => part.parent_id === selectedSystem.id);
    }, [selectedSystem, allParts]);

    // 動態過濾 MAKE（根據 PART）
    const filteredMakes = useMemo(() => {
        if (!selectedPart) return uniqueMakes;
        return uniqueMakes.filter(make => makeToParts[make]?.has(selectedPart.id));
    }, [selectedPart, uniqueMakes, makeToParts]);

    // 動態過濾 MODEL（根據 MAKE）
    const filteredModels = useMemo(() => {
        if (!selectedMake) return [];
        return [...(makeToModels[selectedMake] || [])];
    }, [selectedMake, makeToModels]);

    // 是否有任何條件被選 → 決定 Search 按鈕是否可用
    const hasAnyFilter = useMemo(() => {
        return (
            selectedSystem !== null ||
            selectedPart !== null ||
            selectedMake !== null ||
            selectedModel !== null ||
            ftNumber.trim() !== ''
        );
    }, [selectedSystem, selectedPart, selectedMake, selectedModel, ftNumber]);

    // 按 Search 更新 URL
    const handleSearch = () => {
        const params = new URLSearchParams();
        setLoading(true);

        startTransition(() => {
            if (selectedSystem) params.set('system', selectedSystem.id);
            if (selectedPart) params.set('part', selectedPart.id);
            if (selectedMake) params.set('make', selectedMake);
            if (selectedModel) params.set('model', selectedModel);
            if (ftNumber.trim()) params.set('ft', ftNumber.trim());

            // 回到第一頁
            params.delete('page');

            router.push(`/products?${params.toString()}`);

            // 清空 FT 輸入框
            setFtNumber('');

        })

    };


    useEffect(() => {
        // 讀取所有可能參數
        const partId = searchParams.get('part') || searchParams.get('categoryId');  // 兼容 FilterCard
        const make = searchParams.get('make');
        const model = searchParams.get('model');
        const ft = searchParams.get('ft');

        // 有 part 或 categoryId → 回填 system & part
        if (partId) {
            const part = allParts.find(p => p.id === partId);
            if (part) {
                setSelectedPart(part);
                const system = systems.find(s => s.id === part.parent_id);
                if (system) setSelectedSystem(system);
            }
        } else {
            // URL 完全沒 part/categoryId → 清空 system & part
            setSelectedPart(null);
            setSelectedSystem(null);
        }

        // 其他欄位回填或清空
        setSelectedMake(make || null);
        setSelectedModel(model || null);
        setFtNumber(ft || '');

        // 轉場完成後關閉 loading
        if (!isPending && loading) {
            setLoading(false);
        }
    }, [searchParams, isPending, loading, systems, allParts]);


    return (
        <>
            <div className="container filterBar p-lg-8 p-4 text-white">
                <p>Find Your Parts</p>
                <div className='d-flex align-items-center'>
                    {/* SYSTEM */}
                    <div className='me-2 d-lg-block d-none'>
                        <button className="border-0 py-1 px-2 rounded-pill" type="button" data-bs-toggle="dropdown">
                            <i className="bi bi-chevron-down pe-1"></i>
                            {selectedSystem ? selectedSystem.name : 'SYSTEM'}
                        </button>
                        <ul className="dropdown-menu">
                            {systems.map(sys => (
                                <li key={sys.id}>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() => {
                                            setSelectedSystem(sys);
                                            setSelectedPart(null);
                                            setSelectedMake(null);
                                            setSelectedModel(null);
                                        }}
                                    >
                                        {sys.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* PART */}
                    <div className='me-2 d-lg-block d-none'>
                        <button className="border-0 py-1 px-3 rounded-pill" type="button" data-bs-toggle="dropdown">
                            <i className="bi bi-chevron-down pe-1"></i>
                            {selectedPart ? selectedPart.name : 'PART'}
                        </button>
                        <ul className="dropdown-menu">
                            {filteredParts.length > 0 ? (
                                filteredParts.map(part => (
                                    <li key={part.id}>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => {
                                                setSelectedPart(part);
                                                setSelectedMake(null);
                                                setSelectedModel(null);
                                            }}
                                        >
                                            {part.name}
                                        </a>
                                    </li>
                                ))
                            ) : (
                                <li><a className="dropdown-item disabled">查無資料</a></li>
                            )}
                        </ul>
                    </div>

                    {/* MAKE */}
                    <div className='me-2 d-lg-block d-none'>
                        <button className="border-0 py-1 px-3 rounded-pill" type="button" data-bs-toggle="dropdown">
                            <i className="bi bi-chevron-down pe-1"></i>
                            {selectedMake || 'MAKE'}
                        </button>
                        <ul className="dropdown-menu">
                            {filteredMakes.length > 0 ? (
                                filteredMakes.map(make => (
                                    <li key={make}>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => {
                                                setSelectedMake(make);
                                                setSelectedModel(null);
                                            }}
                                        >
                                            {make}
                                        </a>
                                    </li>
                                ))
                            ) : (
                                <li><a className="dropdown-item disabled">查無車型</a></li>
                            )}
                        </ul>
                    </div>

                    {/* MODEL */}
                    <div className='me-2 d-lg-block d-none'>
                        <button className="border-0 py-1 px-3 rounded-pill" type="button" data-bs-toggle="dropdown">
                            <i className="bi bi-chevron-down pe-1"></i>
                            {selectedModel || 'MODEL'}
                        </button>
                        <ul className="dropdown-menu">
                            {filteredModels.length > 0 ? (
                                filteredModels.map(model => (
                                    <li key={model}>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => setSelectedModel(model)}
                                        >
                                            {model}
                                        </a>
                                    </li>
                                ))
                            ) : (
                                <li><a className="dropdown-item disabled">查無車型</a></li>
                            )}
                        </ul>
                    </div>

                    {/* FT NO. */}
                    <div className="position-relative me-2">
                        <input
                            type="text"
                            className="ps-5 py-1 rounded-pill border-0"
                            placeholder='FT NO.'
                            value={ftNumber}
                            onChange={(e) => setFtNumber(e.target.value)}
                        />
                        <i className="text-dark bi bi-search position-absolute top-50 start-0 translate-middle-y px-1"></i>
                    </div>
                    {/* 篩選icon */}
                    <div className='me-2 d-lg-none d-block'>
                        <button type='button' className='border-0 bg-transparent p-0' data-bs-toggle="modal" data-bs-target="#filterModal">
                            <i className="fs-5 bi bi-funnel text-dark"></i>
                        </button>
                    </div>

                    {/* Search 按鈕 */}
                    <div>
                        <button
                            type='button'
                            className={`border-0 rounded-pill py-2 px-lg-4 px-1 ${hasAnyFilter ? 'bg-neutral-90 text-light' : 'bg-neutral-70 text-neutral-40'}`}
                            disabled={!hasAnyFilter}
                            onClick={handleSearch}
                        >
                            <i className="bi bi-search"></i> Search
                        </button>
                    </div>
                </div>
            </div>
            <FilterModal
                systems={systems}
                selectedSystem={selectedSystem}
                setSelectedSystem={setSelectedSystem}
                selectedPart={selectedPart}
                setSelectedPart={setSelectedPart}
                selectedMake={selectedMake}
                setSelectedMake={setSelectedMake}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
                ftNumber={ftNumber}
                setFtNumber={setFtNumber}
                filteredParts={filteredParts}
                filteredMakes={filteredMakes}
                filteredModels={filteredModels}
                handleSearch={handleSearch}
                hasAnyFilter={hasAnyFilter}
            />
            {loading && <Loading />}
        </>
    );
}