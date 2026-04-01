export const metadata = {
    robots: {
        index: false,
        follow: false,
    },
};


function authLayout({ children }) {
    return (
        <>
            <h2>this is auth layout page</h2>
            {children}

        </>


    )
}

export default authLayout;