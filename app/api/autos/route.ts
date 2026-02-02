import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        const result = await query(`
            SELECT 
                id, 
                marca, 
                modelo, 
                anio, 
                precio, 
                kilometraje, 
                color, 
                transmision, 
                combustible, 
                descripcion, 
                imagen_url as "imagenUrl", 
                estado 
            FROM autos 
            ORDER BY id ASC
        `);

        return NextResponse.json(result.rows);
    } catch (error: any) {
        console.error("Database error fetching autos:", error);
        return NextResponse.json({ error: 'Error fetching autos' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            marca, modelo, anio, precio, kilometraje, color, transmision, combustible, descripcion, imagenUrl, estado
        } = body;

        const result = await query(
            `INSERT INTO autos (marca, modelo, anio, precio, kilometraje, color, transmision, combustible, descripcion, imagen_url, estado)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
             RETURNING id, marca, modelo, anio, precio, kilometraje, color, transmision, combustible, descripcion, imagen_url as "imagenUrl", estado`,
            [marca, modelo, anio, precio, kilometraje, color, transmision, combustible, descripcion, imagenUrl, estado || 'Disponible']
        );

        return NextResponse.json(result.rows[0]);
    } catch (error: any) {
        console.error("Database error creating auto:", error);
        return NextResponse.json({ error: 'Error creating auto: ' + error.message }, { status: 500 });
    }
}
