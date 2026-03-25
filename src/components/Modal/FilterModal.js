// src/components/Filter/FilterModal.jsx
'use client';

export default function FilterModal({
    systems,
    // allParts,
    // uniqueMakes,
    // makeToParts,
    // makeToModels,
    selectedSystem,
    setSelectedSystem,
    selectedPart,
    setSelectedPart,
    selectedMake,
    setSelectedMake,
    selectedModel,
    setSelectedModel,
    ftNumber,
    setFtNumber,
    filteredParts,
    filteredMakes,
    filteredModels,
    handleSearch,
    hasAnyFilter
}) {
    return (
        <div className="modal fade" id="filterModal" tabIndex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-fullscreen-sm-down">
                <div className="modal-content glass-modal">
                    <div className="modal-header border-0">
                        <h1 className="modal-title fs-5" id="filterModalLabel">Find your part</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className='border rounded-3 py-10 bg-white shadow'>
                            <div className="container">
                                {/* SYSTEM */}
                                <div className='mb-6'>
                                    <p className='fw-bolder mb-2'>System</p>
                                    <div className="dropdown">
                                        <button className="border-0 btn btn-sm btn-neutral-20 dropdown-toggle w-100 text-start" type="button" data-bs-toggle="dropdown">
                                            {selectedSystem ? selectedSystem.name : 'Find your systems'}
                                        </button>
                                        <ul className="dropdown-menu w-100">
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
                                </div>

                                {/* PART */}
                                <div className='mb-6'>
                                    <p className='fw-bolder mb-2'>Part</p>
                                    <div className="dropdown">
                                        <button className="border-0 btn btn-sm btn-neutral-20 dropdown-toggle w-100 text-start" type="button" data-bs-toggle="dropdown" disabled={!selectedSystem}>
                                            {selectedPart ? selectedPart.name : 'Find your parts'}
                                        </button>
                                        <ul className="dropdown-menu w-100">
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
                                </div>

                                {/* MAKE */}
                                <div className='mb-6'>
                                    <p className='fw-bolder mb-2'>Make</p>
                                    <div className="dropdown">
                                        <button className="border-0 btn btn-sm btn-neutral-20 dropdown-toggle w-100 text-start" type="button" data-bs-toggle="dropdown" disabled={!selectedPart}>
                                            {selectedMake || 'Find your brands'}
                                        </button>
                                        <ul className="dropdown-menu w-100">
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
                                </div>

                                {/* MODEL */}
                                <div className='mb-6'>
                                    <p className='fw-bolder mb-2'>Model</p>
                                    <div className="dropdown">
                                        <button className="border-0 btn btn-sm btn-neutral-20 dropdown-toggle w-100 text-start" type="button" data-bs-toggle="dropdown" disabled={!selectedMake}>
                                            {selectedModel || 'Find your models'}
                                        </button>
                                        <ul className="dropdown-menu w-100">
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
                                </div>

                                {/* FT NO. (手機版 modal 裡也可以放 FT 搜尋，方便使用者) */}
                                <div className='mb-6'>
                                    <p className='fw-bolder mb-2'>FT NO.</p>
                                    <div className="position-relative">
                                        <input
                                            type="text"
                                            className="form-control ps-7 rounded-pill"
                                            placeholder='FT NO.'
                                            value={ftNumber}
                                            onChange={(e) => setFtNumber(e.target.value)}
                                        />
                                        <i className="text-dark bi bi-search position-absolute top-50 start-0 translate-middle-y px-2"></i>
                                    </div>
                                </div>

                                {/* Search 按鈕 */}
                                <div className='text-center'>
                                    <button
                                        type='button'
                                        className={`border-0 rounded-pill py-2 px-4 ${hasAnyFilter ? 'bg-neutral-90 text-light' : 'bg-neutral-70 text-neutral-40'}`}
                                        disabled={!hasAnyFilter}
                                        onClick={() => {
                                            handleSearch();
                                            // 關閉 modal
                                            const modalElement = document.getElementById('filterModal');
                                            const modal = bootstrap.Modal.getInstance(modalElement);
                                            modal.hide();
                                        }}
                                    >
                                        <i className="bi bi-search"></i> Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}