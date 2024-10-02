import middleware from 'lib/middleware';
import { type NextFetchEvent, NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line
export default async function (req: NextRequest, ev: NextFetchEvent) {
  if (req.nextUrl.locale === 'uk-ua' && req.nextUrl.pathname.startsWith('/opera')) {
    req.nextUrl.locale = 'en';
    req.nextUrl.pathname = '/about';
    return NextResponse.redirect(req.nextUrl, 301);
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
