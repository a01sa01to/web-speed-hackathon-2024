import { relations } from 'drizzle-orm';

import { author } from '../author';
import { book } from '../book';
import { episode } from '../episode';
import { episodePage } from '../episodePage';
import { image } from '../image';

export const episodePageRelations = relations(episodePage, ({ one }) => ({
  author: one(author, {
    fields: [episodePage.authorId],
    references: [author.id],
  }),
  book: one(book, {
    fields: [episodePage.bookId],
    references: [book.id],
  }),
  episode: one(episode, {
    fields: [episodePage.episodeId],
    references: [episode.id],
  }),
  image: one(image, {
    fields: [episodePage.imageId],
    references: [image.id],
  }),
}));
