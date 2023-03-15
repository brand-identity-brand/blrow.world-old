import { NextResponse } from 'next/server'

export function middleware(req) {
    console.log(req.nextUrl)
//   if ( req.nextUrl.pathname === '/portal?id=0' || req.nextUrl.pathname.startsWith('/portal/') ) {
//     // https://blrow.world?utm_source=painting&utm_medium=qr&utm_campaign=alpha&utm_id=0
//     console.log('middleware')
//     return NextResponse.rewrite(new URL('/portal?id=2', req.url))
//   }
}