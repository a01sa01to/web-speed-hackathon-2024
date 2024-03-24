import Database from 'better-sqlite3';
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

import * as schema from '@wsh-2024/schema/src/models';

import { DATABASE_PATH } from '../constants/paths';

let sqlite: Database.Database | null = null;
let database: BetterSQLite3Database<typeof schema> | null = null;

export function initializeDatabase() {
  if (sqlite != null) {
    sqlite.close();
    sqlite = null;
    database = null;
  }

  sqlite = new Database(DATABASE_PATH, {
    readonly: false,
  });
  sqlite.exec('ALTER TABLE episode ADD COLUMN author_id TEXT NOT NULL DEFAULT "0";');
  sqlite.exec('UPDATE episode SET author_id = (SELECT author_id FROM book WHERE book_id = episode.book_id);');
  sqlite.exec('ALTER TABLE episode_page ADD COLUMN author_id TEXT NOT NULL DEFAULT "0";');
  sqlite.exec('ALTER TABLE episode_page ADD COLUMN book_id TEXT NOT NULL DEFAULT "0";');
  sqlite.exec('UPDATE episode_page SET author_id = (SELECT author_id FROM book WHERE book_id = episode_page.book_id);');
  sqlite.exec(
    'UPDATE episode_page SET book_id = (SELECT book_id FROM episode WHERE episode_id = episode_page.episode_id);',
  );
  sqlite.exec('ALTER TABLE feature ADD COLUMN author_id TEXT NOT NULL DEFAULT "0";');
  sqlite.exec('UPDATE feature SET author_id = (SELECT author_id FROM book WHERE book_id = feature.book_id);');
  sqlite.exec('ALTER TABLE ranking ADD COLUMN author_id TEXT NOT NULL DEFAULT "0";');
  sqlite.exec('UPDATE ranking SET author_id = (SELECT author_id FROM book WHERE book_id = ranking.book_id);');

  // index
  sqlite.exec('CREATE INDEX IF NOT EXISTS created_at_idx ON author (created_at);');
  sqlite.exec('CREATE INDEX IF NOT EXISTS image_id_idx ON author (image_id);');
  sqlite.exec('CREATE INDEX IF NOT EXISTS created_at_idx ON book (created_at);');
  sqlite.exec('CREATE INDEX IF NOT EXISTS image_id_idx ON book (image_id);');
  sqlite.exec('CREATE INDEX IF NOT EXISTS author_id_idx ON book (author_id);');
  sqlite.exec('CREATE INDEX IF NOT EXISTS release_id_idx ON book (release_id);');
  sqlite.exec('CREATE INDEX IF NOT EXISTS book_chap_idx ON episode (book_id, chapter);');
  sqlite.exec('CREATE INDEX IF NOT EXISTS author_id_idx ON episode (author_id);');
  sqlite.exec('CREATE INDEX IF NOT EXISTS book_id_idx ON episode (book_id);');
  sqlite.exec('CREATE INDEX IF NOT EXISTS image_id_idx ON episode (image_id);');
  sqlite.exec('CREATE INDEX IF NOT EXISTS episode_page_idx ON episode_page (episode_id, page);');
  sqlite.exec('CREATE INDEX IF NOT EXISTS episode_id_idx ON episode_page (episode_id);');
  sqlite.exec('CREATE INDEX IF NOT EXISTS book_id_idx ON episode_page (book_id);');
  sqlite.exec('CREATE INDEX IF NOT EXISTS author_id_idx ON episode_page (author_id);');
  sqlite.exec('CREATE INDEX IF NOT EXISTS image_id_idx ON episode_page (image_id);');
  sqlite.exec('CREATE INDEX IF NOT EXISTS created_at_idx ON feature (created_at);');
  sqlite.exec('CREATE INDEX IF NOT EXISTS book_id_idx ON feature (book_id);');
  sqlite.exec('CREATE INDEX IF NOT EXISTS author_id_idx ON feature (author_id);');
  sqlite.exec('CREATE INDEX IF NOT EXISTS rank_idx ON ranking (rank);');
  sqlite.exec('CREATE INDEX IF NOT EXISTS book_id_idx ON ranking (book_id);');
  sqlite.exec('CREATE INDEX IF NOT EXISTS author_id_idx ON ranking (author_id);');
  sqlite.exec('CREATE INDEX IF NOT EXISTS email_idx ON user (email);');

  database = drizzle(sqlite, { schema });
}

export function getDatabase() {
  if (sqlite == null || database == null) {
    throw new Error('Database is not initialized');
  }

  return database;
}
