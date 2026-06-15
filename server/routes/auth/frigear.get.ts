import { db, schema } from '@nuxthub/db'
import { eq } from 'drizzle-orm'
import { openIdUserSchema } from '#shared/schema'
import { mapUserToSession } from '#server/utils/session'
import * as jose from 'jose'

export default defineOAuthOidcEventHandler({
  config: {
    scope: ['openid', 'profile', 'email', 'role'],
  },
  async onSuccess(event, { user: _rawFrigearUser, tokens }) {
    const { sub: id, ...rest } = typeof _rawFrigearUser === 'string' ? JSON.parse(_rawFrigearUser) : _rawFrigearUser
    const frigearUser = openIdUserSchema.parse({ id, ...rest })
    let user = await db.query.user.findFirst({
      where: (users, { eq }) => {
        return eq(users.frigearId, frigearUser.id)
      },
    })

    if (!user) {
      [user] = await db.insert(schema.user)
        .values({
          frigearId: frigearUser.id,
          role: frigearUser.role || 'user',
          name: frigearUser.name,
          email: frigearUser.email,
          avatar: frigearUser.picture,
          lastLoginAt: new Date(),
        })
        .returning()
    } else {
      [user] = await db.update(schema.user)
        .set({
          email: frigearUser.email,
          name: frigearUser.name,
          role: frigearUser.role,
          avatar: frigearUser.picture,
          lastLoginAt: new Date(),
        })
        .where(eq(schema.user.id, user.id))
        .returning()
    }

    if (!user) {
      throw createError({
        status: 500,
        message: 'Failed to create user',
      })
    }

    type FrigearIdToken = { iss: string, sub: string, name: string, role: string, email: string, iat: number, exp: number }
    let frigearIdToken: FrigearIdToken | undefined
    if (tokens.id_token) {
      frigearIdToken = jose.decodeJwt(tokens.id_token) as FrigearIdToken
    }

    await setUserSession(event, {
      user: mapUserToSession(user),
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      idToken: tokens.id_token,
      frigearUrl: frigearIdToken?.iss || null,
      loggedInAt: Date.now(),
    })

    return sendRedirect(event, '/app')
  },
})
