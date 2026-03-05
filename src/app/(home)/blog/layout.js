// app/blog/layout.js
import styles from './layout.module.scss';

export default function BlogLayout({ children }) {
    return (
        <div className="container">
            <div className="row">
                {/* 左邊 sidebar（永遠固定） */}
                <div className="col-12 col-lg-3">
                    <div className={` rounded-4 py-10 px-6 ${styles.sideBar}`}>
                        {/* Categories */}
                        <div className="border-bottom pb-lg-8 pb-0 border-neutral-60">
                            <p className="mb-5">Categories</p>
                            <div>
                                <span className="bg-neutral-30 d-inline-block me-2 mb-3 py-2 px-3 rounded-pill">all</span>
                                <span className="bg-dark text-neutral-30 d-inline-block me-2 mb-3 py-2 px-3 rounded-pill">Suspension (3)</span>
                                <span className="bg-neutral-30 d-inline-block me-2 mb-3 py-2 px-3 rounded-pill">Control Arm (5)</span>
                                <span className="bg-neutral-30 d-inline-block me-2 mb-3 py-2 px-3 rounded-pill">Shock Absorber (7)</span>
                            </div>
                        </div>

                        {/* Popular posts */}
                        <div className="mt-8 d-none d-lg-block">
                            <p className="my-5">Popular posts</p>
                            <div>
                                <div className="mb-5">
                                    <h6>01 Why Is My Car Shaking?</h6>
                                    <div className="ps-6">
                                        <span className="d-block text-neutral-70">Suspension • Control Arm</span>
                                        <span className={`text-neutral-60 ${styles.dateTimeTxt}`}>May 20 | 5 min read</span>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <h6>02 Why Is My Car Shaking?</h6>
                                    <div className="ps-6">
                                        <span className="d-block text-neutral-70">Suspension • Control Arm</span>
                                        <span className={`text-neutral-60 ${styles.dateTimeTxt}`}>May 20 | 5 min read</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 右邊動態內容（列表或單篇） */}
                <div className="col-12 col-lg-9">
                    {children}
                </div>
            </div>
        </div>
    );
}