import { relations } from 'drizzle-orm';

import { author } from '../author';
import { book } from '../book';
import { ranking } from '../ranking';

export const rankingRelations = relations(ranking, ({ one }) => ({
  author: one(author, {
    fields: [ranking.authorId],
    references: [author.id],
  }),
  book: one(book, {
    fields: [ranking.bookId],
    references: [book.id],
  }),
}));
