import { db, schema } from '@nuxthub/db'
import { eq } from 'drizzle-orm'
import { frigearUserSchema } from '#shared/schema'

export default defineOAuthOidcEventHandler({
  config: {
    scope: ['openid', 'profile', 'email', 'role'],
  },
  async onSuccess(event, { user: _rawFrigearUser, tokens }) {
    const { sub: id, ...rest } = typeof _rawFrigearUser === 'string' ? JSON.parse(_rawFrigearUser) : _rawFrigearUser
    const frigearUser = frigearUserSchema.parse({ id, ...rest })
    let user = await db.query.user.findFirst({
      where: (users, { eq }) => eq(users.email, frigearUser.email!),
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
        .set({ lastLoginAt: new Date() })
        .where(eq(schema.user.id, user.id))
        .returning()
    }

    if (!user) {
      throw createError({
        status: 500,
        message: 'Failed to create user',
      })
    }

    await setUserSession(event, {
      user: {
        ...user,
        lastLoginAt: user.lastLoginAt?.toISOString(),
      },
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      idToken: tokens.id_token,
      loggedInAt: Date.now(),
    })

    return sendRedirect(event, '/app')
  },
})
