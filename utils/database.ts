import * as SQLite from 'expo-sqlite';

export async function runDB() {
    try {
        const db = await SQLite.openDatabaseAsync('places.db');

        // Initialize the database
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS test (
                id INTEGER PRIMARY KEY NOT NULL,
                value TEXT NOT NULL,
                intValue INTEGER
            );
        `);

        // Insert some data
        await db.runAsync('INSERT INTO test (value, intValue) VALUES (?, ?)', ['test1', 123]);

        // Fetch data
        const allRows = await db.getAllAsync('SELECT * FROM test');
        console.log('All Rows:', allRows);
    } catch (error) {
        console.error('Database Error:', error);
    }
}
