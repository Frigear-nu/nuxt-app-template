import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('users', {
  id: integer().primaryKey({ autoIncrement: true }),
  frigearId: integer().unique(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text(),
  role: text().notNull().default('user'),
  avatar: text(),
  lastLoginAt: integer({ mode: 'timestamp' }),
  createdAt: integer({ mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer({ mode: 'timestamp' }).$onUpdateFn(() => new Date()),
})
