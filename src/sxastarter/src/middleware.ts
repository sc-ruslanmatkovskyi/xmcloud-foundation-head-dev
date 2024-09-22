import middleware from 'lib/middleware';
import { type NextFetchEvent, NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line
export default async function (req: NextRequest, ev: NextFetchEvent) {
  console.log('Middleware called', ev, req.nextUrl.clone());
  if (req.nextUrl.pathname === '/not-exists' || req.nextUrl.pathname === '/uk-ua/not-exists') {
    const res = NextResponse.next();
    const url = req.nextUrl.clone();
    url.locale = 'en';
    url.pathname = '/en/about';
    url.href = url.origin + url.pathname;

    const redirect = NextResponse.redirect(url, { status: 301, headers: res?.headers ?? {} });
    redirect.headers.set('Accept-Language', 'en');
    redirect.headers.delete('x-middleware-rewrite');
    redirect.headers.delete('x-middleware-next');

    return redirect;
  }

  if (req.nextUrl.href === '/one?w=1&q=2') {
    const redirect = NextResponse.redirect('/pageimage', { status: 301 });
    console.log('Redirecting to /pageimage');

    return redirect;
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
