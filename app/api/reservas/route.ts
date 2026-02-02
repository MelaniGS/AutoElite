import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const personaId = searchParams.get('personaId');

        let queryText = `
            SELECT 
                r.id, 
                r.fecha_inicio as "fechaInicio", 
                r.fecha_fin as "fechaFin", 
                r.estado, 
                r.notas as "comentarios",
                r.fecha_reserva as "fechaReserva",
                p.id as "personaId",
                p.nombre as "persona_nombre",
                p.apellido as "persona_apellido",
                p.email as "persona_email",
                a.id as "autoId",
                a.marca as "auto_marca",
                a.modelo as "auto_modelo",
                a.precio as "auto_precio"
            FROM reservas r
            JOIN personas p ON r.persona_id = p.id
            JOIN autos a ON r.auto_id = a.id
        `;

        const queryParams: any[] = [];
        if (personaId) {
            queryText += ` WHERE r.persona_id = $1`;
            queryParams.push(personaId);
        }

        queryText += ` ORDER BY r.fecha_reserva DESC`;

        const result = await query(queryText, queryParams);

        // Format for frontend expectations
        const reservas = result.rows.map(row => ({
            id: row.id,
            personaId: row.personaId,
            autoId: row.autoId,
            fechaReserva: row.fechaReserva,
            fechaInicio: row.fechaInicio,
            fechaFin: row.fechaFin,
            estado: row.estado,
            comentarios: row.comentarios || "",
            montoTotal: row.auto_precio, // Fallback to auto price as mock monto
            persona: {
                id: row.personaId,
                nombre: row.persona_nombre,
                apellido: row.persona_apellido,
                email: row.persona_email
            },
            auto: {
                id: row.autoId,
                marca: row.auto_marca,
                modelo: row.auto_modelo,
                precio: row.auto_precio
            }
        }));

        return NextResponse.json(reservas);
    } catch (error: any) {
        console.error("Database error fetching reservas:", error);
        return NextResponse.json({ error: 'Error fetching reservas' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { personaId, autoId, fechaInicio, fechaFin, estado, comentarios } = body;

        const result = await query(
            `INSERT INTO reservas (persona_id, auto_id, fecha_inicio, fecha_fin, estado, notas, fecha_reserva)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING id`,
            [personaId, autoId, fechaInicio, fechaFin, estado || 'Pendiente', comentarios]
        );

        return NextResponse.json({ id: result.rows[0].id, success: true });
    } catch (error: any) {
        console.error("Database error creating reserva:", error);
        return NextResponse.json({ error: 'Error creating reserva: ' + error.message }, { status: 500 });
    }
}
