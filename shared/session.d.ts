import type { APIUser } from '#shared/types'

declare module '#auth-utils' {
  interface User extends APIUser {
    id: number
  }
  //
  interface UserSession {
    accessToken?: string
    refreshToken?: string
    idToken?: string
  }
}
// //
// declare module 'h3' {
//   interface H3EventContext {
//     $user?: UserOpenID
//   }
// }

export {}
