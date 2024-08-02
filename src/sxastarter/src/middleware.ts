import { debug } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line
export default async function (req: NextRequest) {
  const url = req.nextUrl.clone();

  debug.common('REDIRECT MIDDLEWARE');

  if (url.pathname.includes('post')) {
    url.pathname = '/about';
    url.href = url.href.replace('/post', '/about');
    return NextResponse.redirect(url, {
      status: 301,
    });
  }

  return NextResponse.next();
}
