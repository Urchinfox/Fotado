import '../shared/all.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapLoader from '@/components/BootstrapLoader';


export const metadata = {

};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
                />
            </head>
            <body className='d-flex flex-column min-vh-100'>
                <BootstrapLoader />
                {children}
            </body>
        </html>
    );
}
