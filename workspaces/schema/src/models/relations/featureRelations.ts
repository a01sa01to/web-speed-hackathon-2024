import { relations } from 'drizzle-orm';

import { author } from '../author';
import { book } from '../book';
import { feature } from '../feature';

export const featureRelations = relations(feature, ({ one }) => ({
  author: one(author, {
    fields: [feature.authorId],
    references: [author.id],
  }),
  book: one(book, {
    fields: [feature.bookId],
    references: [book.id],
  }),
}));
