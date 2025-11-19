'use client'
import { useState } from "react";
function Csr({ data }) {
    const [newData, setNewData] = useState(data);

    const getData = async () => {
        const res = await fetch('https://randomuser.me/api/');
        const { results } = await res.json();
        const data1 = results[0];
        setNewData(data1);
        console.log(newData)

    }
    return (<>
        <hr />
        <h2>this is csr page</h2>
        <p className="fs-7 ps-13">{newData?.name?.first}</p>
        <button type="button" className="btn btn-secondary" onClick={getData}>update</button>

    </>)
}

export default Csr;