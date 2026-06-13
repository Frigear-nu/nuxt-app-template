import type { UserOpenID } from '#shared/types'

declare module '#auth-utils' {
  interface User extends UserOpenID {
    id: number
    frigearId: number
    lastLoginAt?: string
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
