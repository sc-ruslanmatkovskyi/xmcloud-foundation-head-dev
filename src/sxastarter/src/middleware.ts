import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line
export default async function (req: NextRequest) {
  const url = req.nextUrl.clone();
  if (url.pathname === '/post') {
    NextResponse.redirect('/about', {
      status: 301,
    });
  }
}
