/* eslint-disable sort/object-properties */
import { randomUUID } from 'node:crypto';

import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const episode = sqliteTable(
  'episode',
  {
    // primary key
    id: text('id')
      .primaryKey()
      .$defaultFn(() => randomUUID()),

    // columns
    name: text('name').notNull(),
    nameRuby: text('name_ruby').notNull(),
    description: text('description').notNull(),
    chapter: integer('chapter').notNull(),

    // relations
    authorId: text('author_id').notNull(),
    bookId: text('book_id').notNull(),
    imageId: text('image_id').notNull(),

    // metadata
    createdAt: text('created_at')
      .notNull()
      .$defaultFn(() => new Date().toISOString()),
    updatedAt: text('updated_at')
      .notNull()
      .$defaultFn(() => new Date().toISOString()),
  },
  (table) => ({
    bookChapIdx: index('book_chap_idx').on(table.bookId, table.chapter),
  }),
);
