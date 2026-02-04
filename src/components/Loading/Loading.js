import styles from './Loading.module.css'
// import { useState } from 'react';

export default function Loading() {

    // const [loading, setLoading] = useState(false);

    return (
        <div className={styles.backdrop}>
            <div className={styles.glassBox}>
                <div className="spinner-border text-light mb-3" />
                <p className="text-neutral-40 mb-0">Loading...</p>
            </div>
        </div>
    );
}
