import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            nombre, apellido, email, telefono, dni, password, direccion, rol
        } = body;

        // Check if email exists
        const existing = await query('SELECT id FROM personas WHERE email = $1', [email]);
        if (existing.rowCount && existing.rowCount > 0) {
            return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
        }

        // Insert
        // Default rol to CLIENTE if null
        const finalRol = rol || 'CLIENTE';

        const result = await query(
            `INSERT INTO personas (nombre, apellido, email, telefono, dni, direccion, password, rol, activo, fecha_registro)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true, NOW())
       RETURNING id, nombre, apellido, email, telefono, dni, direccion, rol, activo, fecha_registro as "fechaRegistro"`,
            [nombre, apellido, email, telefono, dni, direccion || '', password, finalRol]
        );

        const user = result.rows[0];

        return NextResponse.json(user);
    } catch (error: any) {
        console.error("Register DB Error:", error);
        return NextResponse.json({ error: 'System error during registration' }, { status: 500 });
    }
}
