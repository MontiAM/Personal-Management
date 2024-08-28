export { default } from "next-auth/middleware"

export const config = { 
  // matcher: ["/dashboard/:path*"] 
  matcher: ["/dashboard/:path*", "/api/expenses/:path*"] 
}