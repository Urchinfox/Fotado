import Csr from "./Csr";
const res = await fetch('https://randomuser.me/api/');
const { results } = await res.json();
const data = results[0];

async function About() {
    return (<>
        <h2>This is about page e</h2>
        <p>{data.name.first}</p>
        <img src={data.picture.large} alt="" />
        <Csr data={data} />
    </>)
}

export default About;