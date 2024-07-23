import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line
export default async function (req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = '/about';
  url.href = url.href.replace('/post', '/about');

  if (url.pathname === '/post') {
    NextResponse.redirect('/about', {
      status: 301,
    });
  }
}
