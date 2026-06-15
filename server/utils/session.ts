import type { User } from '@nuxthub/db/schema'
import type { APIUser } from '#shared/types'
import { objectOmit } from '@vueuse/core'

export const mapUserToSession = (user: User): APIUser => {
  return {
    ...objectOmit(user, ['password']),
    lastLoginAt: user.lastLoginAt?.toISOString() || null,
    createdAt: user.createdAt?.toISOString() || null,
    updatedAt: user.updatedAt?.toISOString() || null,
  }
}
