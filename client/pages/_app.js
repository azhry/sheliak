import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import 'styles/globals.css';
import { userService } from 'services';
import { Nav } from 'components';
import '../pages/css/style.css';

export default App;

function App({ Component, pageProps }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // run auth check on initial load
        authCheck(router.asPath);

        // set authorized to false to hide page content while changing routes
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // run auth check on route change
        router.events.on('routeChangeComplete', authCheck);

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, []);

    function authCheck(url) {
        // redirect to login, register, and forgotpw page if accessing a private page and not logged in 
        const publicPaths = ['/login', '/register', '/forgotpw', '/reset'];
        const path = url.split('?')[0];
        if (!userService.userValue && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/login' || '/register' || '/forgotpw' || '/reset',
                query: { returnUrl: router.asPath }
            });
        } 
        else {
            setAuthorized(true);
        }
    }

    return (
        <>
            <Head>
                <title>Sheliak Authentication Demo</title>

                <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
            </Head>
            <div className="background_header">
                {/* <img src={LOGO}/> */}
                <svg viewBox="0 0 600.001 184.777" width="300" height="50" xmlns="http://www.w3.org/2000/svg">
                    <g fill="#EFECEA" stroke="none" transform="matrix(0.104987, 0, 0, -0.1, -13.858282, 252.276642)">
                        <path d="M 5666 2517 C 5660 2513 4413 2510 2895 2511 L 135 2511 L 139 2103 C 141 1879 146 1691 150 1687 C 154 1683 188 1680 226 1682 L 295 1685 L 300 2008 C 304 2280 307 2332 320 2340 C 344 2355 5643 2353 5658 2338 C 5667 2329 5670 2241 5670 2003 L 5670 1679 L 5753 1682 L 5835 1685 L 5842 2085 C 5845 2305 5846 2493 5844 2502 C 5840 2515 5824 2519 5759 2522 C 5714 2524 5673 2522 5666 2517 Z"/>
                        <path d="M1095 2094 c-169 -43 -241 -155 -201 -315 21 -86 76 -138 202 -193 175 -77 218 -122 212 -219 -4 -50 -9 -63 -40 -93 -41 -41 -99 -58 -167 -48 -49 7 -76 21 -129 66 -38 32 -72 36 -95 10 -42 -47 2 -121 101 -169 51 -25 67 -28 162 -27 120 0 171 17 229 75 90 90 102 268 26 375 -41 58 -82 85 -208 140 -114 49 -162 90 -173 149 -8 44 8 78 51 108 46 33 157 36 236 7 69 -26 104 -19 115 24 16 65 -62 108 -206 112 -52 2 -104 1 -115 -2z"/>
                        <path d="M1601 2081 c-21 -21 -21 -27 -21 -470 0 -438 0 -449 21 -475 23 -29 55 -33 85 -12 18 13 19 30 22 217 2 124 7 208 14 216 8 10 50 13 158 13 130 0 149 -2 163 -18 15 -16 17 -46 17 -214 0 -176 2 -196 18 -211 23 -21 51 -22 80 -1 l22 15 0 460 c0 453 0 459 -21 480 -16 16 -28 20 -52 15 -17 -4 -35 -10 -40 -15 -5 -5 -8 -88 -7 -185 0 -108 -4 -184 -10 -196 -10 -19 -21 -20 -164 -20 -112 0 -156 3 -164 13 -6 7 -12 86 -14 194 -2 107 -7 186 -13 192 -6 6 -25 13 -42 17 -24 5 -36 1 -52 -15z"/>
                        <path d="M2383 2090 c-14 -6 -24 -21 -28 -42 -3 -18 -5 -227 -3 -464 3 -408 4 -433 22 -453 18 -20 28 -21 271 -21 231 0 253 1 268 18 21 23 22 52 3 78 -13 18 -30 19 -217 22 -144 2 -206 7 -211 15 -9 14 -11 268 -2 291 5 13 23 16 94 16 117 0 140 9 140 55 0 45 -23 55 -126 55 -117 0 -114 -5 -114 164 0 122 2 145 16 150 9 3 101 6 205 6 176 0 190 1 209 20 27 27 26 65 -2 84 -19 14 -61 16 -263 15 -132 0 -250 -4 -262 -9z"/>
                        <path d="M3062 2084 l-22 -15 0 -463 c0 -436 1 -464 18 -479 16 -15 48 -17 244 -17 209 0 226 1 242 19 25 27 17 72 -14 88 -17 9 -77 13 -187 13 -150 0 -163 1 -173 19 -6 13 -10 163 -10 420 l0 400 -22 15 c-12 9 -29 16 -38 16 -9 0 -26 -7 -38 -16z"/>
                        <path d="M3680 2080 c-19 -19 -20 -33 -20 -475 0 -442 1 -456 20 -475 28 -28 64 -25 89 6 21 26 21 37 21 471 l0 444 -25 24 c-29 30 -58 32 -85 5z"/>
                        <path d="M4186 2085 c-9 -9 -22 -37 -30 -63 -8 -26 -35 -114 -61 -197 -177 -570 -195 -630 -195 -657 0 -26 36 -58 64 -58 35 0 58 35 86 130 20 68 28 84 50 92 14 5 87 8 163 6 109 -2 140 -6 147 -18 6 -8 21 -52 35 -96 34 -110 64 -135 120 -98 31 20 32 49 6 130 -10 32 -29 93 -41 134 -22 74 -45 149 -100 325 -57 184 -89 291 -95 317 -11 45 -41 68 -90 68 -26 0 -50 -6 -59 -15z m131 -420 c29 -99 52 -189 51 -200 -3 -19 -11 -20 -123 -20 -141 0 -138 -3 -105 108 12 39 35 117 52 172 16 55 32 106 34 113 2 8 11 12 20 10 12 -2 32 -53 71 -183z"/>
                        <path d="M4723 2090 c-14 -6 -24 -21 -28 -42 -3 -18 -5 -228 -3 -466 l3 -434 24 -19 c30 -24 56 -24 81 1 18 18 20 33 20 163 0 116 3 147 17 167 26 39 66 80 78 80 6 0 62 -78 125 -172 152 -231 174 -258 210 -258 28 0 70 38 70 64 0 7 -62 106 -138 222 -192 291 -179 266 -157 301 10 15 70 92 133 170 123 155 132 177 81 215 -43 32 -66 14 -209 -174 -73 -95 -144 -185 -158 -200 -49 -53 -52 -45 -52 162 0 177 -1 191 -20 210 -21 21 -42 24 -77 10z"/>
                        <path d="M 145 1508 C 143 1501 139 1311 137 1085 L 132 675 L 2990 675 L 5847 675 L 5843 1085 C 5840 1311 5837 1501 5835 1508 C 5832 1516 5806 1520 5750 1520 L 5670 1520 L 5670 1192 C 5670 950 5667 861 5658 852 C 5649 843 5042 840 2990 840 C 429 840 333 841 317 858 C 302 874 300 913 300 1192 C 300 1471 298 1509 284 1514 C 254 1525 150 1521 145 1508 Z"/>
                    </g>
                </svg>
            </div>
            <div className="app-container bg-light">
                <Nav />
                <div className="container pt-4 pb-4">
                    {authorized &&
                        <Component {...pageProps} />
                    }
                </div>
            </div>
            
            <div className="background_footer">
                <div className="text-center mt-4">
                    <p style={{ color: '#fafbff'}}>
                        Sheliak Authentication Demo
                    </p>
                </div>
            </div>
        </>
    );
}
