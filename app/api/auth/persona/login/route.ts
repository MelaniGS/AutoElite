import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const result = await query(
            `SELECT id, nombre, apellido, email, rol, activo, password 
       FROM personas 
       WHERE email = $1`,
            [email]
        );

        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
        }

        const user = result.rows[0];

        // Simple password check (plaintext as per current setup, though normally hash)
        // The previous Java code seemed to use plaintext or simple match based on seed data.
        // If seed data has 'password123', we check directly.
        if (user.password !== password) {
            return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
        }

        // Remove password
        delete user.password;

        return NextResponse.json(user);
    } catch (error: any) {
        console.error("Login DB Error:", error);
        return NextResponse.json({ error: 'System error' }, { status: 500 });
    }
}
