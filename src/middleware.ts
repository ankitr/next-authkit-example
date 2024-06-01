import { authkitMiddleware } from "@workos-inc/authkit-nextjs";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  const customRequestHeader = `Custom Value`;
  const customResponseHeader = `Custom Value`;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-custom-request-header", customRequestHeader);

  const authkitResponse = await authkitMiddleware()(request, event);
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set("X-Custom-Response-Header", customResponseHeader);

  return response;
}

// Match against the pages
export const config = { matcher: ["/", "/account/:path*"] };
