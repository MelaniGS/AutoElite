import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const result = await query(`
            SELECT 
                id, marca, modelo, anio, precio, kilometraje, color, transmision, combustible, descripcion, imagen_url as "imagenUrl", estado 
            FROM autos 
            WHERE id = $1
        `, [id]);

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Auto not found' }, { status: 404 });
        }

        return NextResponse.json(result.rows[0]);
    } catch (error: any) {
        console.error("Database error fetching auto:", error);
        return NextResponse.json({ error: 'Error fetching auto' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const {
            marca, modelo, anio, precio, kilometraje, color, transmision, combustible, descripcion, imagenUrl, estado
        } = body;

        const result = await query(
            `UPDATE autos SET 
                marca = $1, modelo = $2, anio = $3, precio = $4, kilometraje = $5, color = $6, 
                transmision = $7, combustible = $8, descripcion = $9, imagen_url = $10, estado = $11
             WHERE id = $12
             RETURNING id, marca, modelo, anio, precio, kilometraje, color, transmision, combustible, descripcion, imagen_url as "imagenUrl", estado`,
            [marca, modelo, anio, precio, kilometraje, color, transmision, combustible, descripcion, imagenUrl, estado, id]
        );

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Auto not found' }, { status: 404 });
        }

        return NextResponse.json(result.rows[0]);
    } catch (error: any) {
        console.error("Database error updating auto:", error);
        return NextResponse.json({ error: 'Error updating auto: ' + error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await query('DELETE FROM autos WHERE id = $1', [id]);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Database error deleting auto:", error);
        return NextResponse.json({ error: 'Error deleting auto' }, { status: 500 });
    }
}
