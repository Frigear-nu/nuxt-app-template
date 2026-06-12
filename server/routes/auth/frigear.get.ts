import { db, schema } from '@nuxthub/db'
import { defineOAuthOidcEventHandler } from '#imports'
import { eq } from 'drizzle-orm'

export default defineOAuthOidcEventHandler({
  config: {
    scope: ['openid', 'profile', 'email', 'role'],
  },
  async onSuccess(event, { user: frigearUser }) {
    let user = await db.query.user.findFirst({
      where: (users, { eq }) => eq(users.email, frigearUser.email!),
    })

    if (!user) {
      [user] = await db.insert(schema.user)
        .values({
          // @ts-expect-error Somehow not typed :/
          role: (frigearUser as { role?: string })?.role || 'user',
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
      user,
      loggedInAt: Date.now(),
    })

    return sendRedirect(event, '/app')
  },
})
