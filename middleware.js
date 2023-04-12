import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { defaultProgressState } from './context/ProgressContext';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req) {
  const { pathname, search } = req.nextUrl;

  return ignorePaths(pathname, async ()=>{
    if ( req.cookies.has('artist') ) {
      const { id, score, progress_context } = JSON.parse(req.cookies.get('artist').value);
      const { data, error } = await supabase
        .from('player')
        .select('score, progress_context')
        .eq('id', id)
      ;

      // To change a cookie, first create a response
      const response = NextResponse.next();
      // Setting a cookie with additional options
      response.cookies.set({
        name: 'artist',
        value: JSON.stringify({
          id: id,
          score: data[0].score,
          progress_context: data[0].progress_context
        })
      });

      return response; 
    } else {
      const { data, error } = await supabase
        .from('player')
        .insert({ 
          access_page: `${pathname}${search}`, 
          updated_at: 'now()',
          progress_context: defaultProgressState
        })
        .select();
      
      const {
        id,
        created_at,
        access_page,
        score,
        progress_context,
        updated_at
      } = data[0];

      // To change a cookie, first create a response
      const response = NextResponse.next();
      // Setting a cookie with additional options

      response.cookies.set({
        name: 'artist',
        value: JSON.stringify({
          id,
          score,
          progress_context
        } )
      });
      return response; 
    }
  });
}

// export const config = {
//   matcher: [
//     '/portal/:path*',
//     '/twitter/:path*',
//     '/google/:path*',
//     '/reddit/:path*',
//     '/facebook/:path*',
//     '/youtube/:path*',
//   ]
// }

  //   // console.log(req.nextUrl)
  //   console.log(req.nextUrl.pathname)
  // if ( req.nextUrl.pathname === '/portal?id=0' || req.nextUrl.pathname.startsWith('/portal/') ) {
  //   // https://blrow.world?utm_source=painting&utm_medium=qr&utm_campaign=alpha&utm_id=0
  //   console.log('middleware')
  //   return NextResponse.rewrite(new URL('/portal?id=0&utm_source=painting&utm_medium=qr&utm_campaign=alpha&utm_id=0', req.url))
  // }

function ignorePaths(pathname, runFunction){
  if (
    pathname === '/' ||
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/api") || //  exclude all API routes
    pathname.startsWith("/static") || // exclude static files
    PUBLIC_FILE.test(pathname)  // exclude all files in the public folder
  ) {

  } else {
    return runFunction();
  }
}