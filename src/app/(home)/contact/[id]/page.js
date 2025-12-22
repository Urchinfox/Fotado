async function Contact({ params }) {
    const { id } = await params

    return (<>
        <h2>This is dynamic contact page {id} </h2>
    </>)
}

export default Contact;