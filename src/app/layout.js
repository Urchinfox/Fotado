import '../shared/all.scss';

export const metadata = {

};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className='d-flex flex-column min-vh-100'>
                {children}
            </body>
        </html>
    );
}
