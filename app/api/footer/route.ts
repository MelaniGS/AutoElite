import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        // Attempt to select from footer_data, map to keyName for frontend
        const result = await query('SELECT key_name as "keyName", value FROM footer_data');
        return NextResponse.json(result.rows);
    } catch (error: any) {
        // If table doesn't exist, return empty or create it?
        // Let's create it if it doesn't exist to be safe
        if (error.code === '42P01') { // undefined_table
            await query(`
         CREATE TABLE IF NOT EXISTS footer_data (
           id SERIAL PRIMARY KEY,
           key_name VARCHAR(255) UNIQUE NOT NULL,
           value VARCHAR(500) NOT NULL
         )
       `);
            // Insert some defaults
            await query(`
         INSERT INTO footer_data (key_name, value) VALUES 
         ('address', 'C. Los Conquistadores y Francisco de Orellana'),
         ('phone', '07-2272642'),
         ('email', 'autoelite@gmail.com')
         ON CONFLICT (key_name) DO NOTHING
       `);
            const retryResult = await query('SELECT key_name as "keyName", value FROM footer_data');
            return NextResponse.json(retryResult.rows);
        }
        console.error("Footer GET error:", error);
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { keyName, value } = await request.json();

        // Use UPSERT (INSERT ... ON CONFLICT UPDATE)
        await query(`
      INSERT INTO footer_data (key_name, value) 
      VALUES ($1, $2)
      ON CONFLICT (key_name) 
      DO UPDATE SET value = $2
    `, [keyName, value]);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Footer POST error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
