import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const result = await query(
            'SELECT id, nombre, apellido, email, telefono, dni, direccion, rol, activo, password FROM personas WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Persona not found' }, { status: 404 });
        }

        return NextResponse.json(result.rows[0]);
    } catch (error: any) {
        console.error("Database error fetching persona:", error);
        return NextResponse.json({ error: 'Error fetching persona' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();

        const {
            nombre, apellido, email, telefono, dni, direccion, rol, activo, password
        } = body;

        const result = await query(
            `UPDATE personas 
       SET 
         nombre = COALESCE($1, nombre),
         apellido = COALESCE($2, apellido),
         email = COALESCE($3, email),
         telefono = COALESCE($4, telefono),
         dni = COALESCE($5, dni),
         direccion = COALESCE($6, direccion),
         rol = COALESCE($7, rol),
         activo = COALESCE($8, activo),
         password = COALESCE($9, password)
       WHERE id = $10
       RETURNING id, nombre, apellido, email, telefono, dni, direccion, rol, activo, fecha_registro as "fechaRegistro"`,
            [nombre, apellido, email, telefono, dni, direccion, rol, activo, password, id]
        );

        if (result.rowCount === 0) {
            return NextResponse.json({ error: "Persona not found" }, { status: 404 });
        }

        return NextResponse.json(result.rows[0]);
    } catch (error: any) {
        console.error("Database error updating persona:", error);
        return NextResponse.json({ error: 'Error updating persona' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const result = await query('DELETE FROM personas WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return NextResponse.json({ error: "Persona not found" }, { status: 404 });
        }

        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error("Database error:", error);
        return NextResponse.json({ error: 'Error deleting persona' }, { status: 500 });
    }
}
