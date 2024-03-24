/* eslint-disable sort/object-properties */
import { randomUUID } from 'node:crypto';

import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const episodePage = sqliteTable(
  'episode_page',
  {
    // primary key
    id: text('id')
      .primaryKey()
      .$defaultFn(() => randomUUID()),

    // columns
    page: integer('page').notNull(),

    // relations
    episodeId: text('episode_id').notNull(),
    bookId: text('book_id').notNull(),
    authorId: text('author_id').notNull(),
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
    episodePageIdx: index('episode_page_idx').on(table.episodeId, table.page),
    episodeIdIdx: index('episode_id_idx').on(table.episodeId),
    bookIdIdx: index('book_id_idx').on(table.bookId),
    authorIdIdx: index('author_id_idx').on(table.authorId),
    imageIdIdx: index('image_id_idx').on(table.imageId),
  }),
);
