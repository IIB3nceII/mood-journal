export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    {
      source: '/((?!api/auth|auth|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' }
      ]
    }
  ]
}
