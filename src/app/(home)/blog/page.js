import styles from "./blog.module.scss"
import BlogCard from "@/components/Card/BlogCard"
import BlogPage from "@/components/Pagination/BlogPage"
export default function Blog() {
    return (<>
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <div className="bg-white rounded-4 py-10 px-6">
                        <div className=" border-bottom pb-8 border-neutral-60 ">
                            <p className="mb-5">Categories</p>
                            <div>
                                <span className="bg-neutral-30 d-inline-block me-2 mb-3 py-2 px-3 rounded-pill">all</span>
                                <span className="bg-dark text-neutral-30 d-inline-block me-2 mb-3 py-2 px-3 rounded-pill">Suspension (3)</span>
                                <span className="bg-neutral-30 d-inline-block me-2 mb-3 py-2 px-3 rounded-pill">Control Arm (5)</span>
                                <span className="bg-neutral-30 d-inline-block me-2 mb-3 py-2 px-3 rounded-pill">Shock Absorber (7)</span>
                            </div>
                        </div>

                        <div className="mt-8">
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
                <div className="col-9">
                    <div className="row gy-4">
                        <div className="col-4">
                            <BlogCard />
                        </div>
                    </div>
                </div>
            </div>

            <BlogPage />
        </div>

    </>)
}