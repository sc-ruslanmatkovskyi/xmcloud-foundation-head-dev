import { type NextRequest, type NextFetchEvent, NextResponse } from 'next/server';
import middleware from 'lib/middleware';
import { debug } from '@sitecore-jss/sitecore-jss-nextjs/middleware';

// eslint-disable-next-line
export default async function (req: NextRequest, ev: NextFetchEvent) {
  // const existsRedirects = {
  //   pattern: '/^/test1[/]?$/gi',
  //   target: 'about',
  //   redirectType: 'REDIRECT_301',
  //   isQueryStringPreserved: false,
  //   locale: '',
  // };
  const newUrl = req.nextUrl.clone();

  debug.common('test middleware');
  const redirectUrl = `${newUrl.origin}/about`;
  if (newUrl.pathname === '/test1') {
    return NextResponse.redirect(redirectUrl, 301);
  }
  return middleware(req, ev);
}

export const config = {
  /*
   * Match all paths except for:
   * 1. /api routes
   * 2. /_next (Next.js internals)
   * 3. /sitecore/api (Sitecore API routes)
   * 4. /- (Sitecore media)
   * 5. /healthz (Health check)
   * 6. /feaas-render (FEaaS render)
   * 7. all root files inside /public
   */
  matcher: [
    '/',
    '/((?!api/|_next/|feaas-render|healthz|sitecore/api/|-/|favicon.ico|sc_logo.svg).*)',
  ],
};
