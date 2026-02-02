import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { estado, fechaInicio, fechaFin, comentarios } = body;

        const result = await query(
            `UPDATE reservas 
       SET 
         estado = COALESCE($1, estado),
         fecha_inicio = COALESCE($2, fecha_inicio),
         fecha_fin = COALESCE($3, fecha_fin),
         notas = COALESCE($4, notas)
       WHERE id = $5
       RETURNING id`,
            [estado, fechaInicio, fechaFin, comentarios, id]
        );

        if (result.rowCount === 0) {
            return NextResponse.json({ error: "Reserva not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Database error updating reserva:", error);
        return NextResponse.json({ error: 'Error updating reserva' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await query('DELETE FROM reservas WHERE id = $1', [id]);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error("Database error deleting reserva:", error);
        return NextResponse.json({ error: 'Error deleting reserva' }, { status: 500 });
    }
}
