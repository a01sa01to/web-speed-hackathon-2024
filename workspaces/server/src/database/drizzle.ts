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

  database = drizzle(sqlite, { schema });
}

export function getDatabase() {
  if (sqlite == null || database == null) {
    throw new Error('Database is not initialized');
  }

  return database;
}
