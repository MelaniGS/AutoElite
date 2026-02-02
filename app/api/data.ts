// Simple in-memory store for mock data
export let personasProxy = [
    {
        id: 1,
        nombre: "Juan",
        apellido: "Pérez",
        email: "juan@example.com",
        telefono: "123456789",
        dni: "12345678A",
        direccion: "Calle Falsa 123",
        rol: "CLIENTE",
        activo: true,
        fechaRegistro: new Date().toISOString()
    },
    {
        id: 2,
        nombre: "Maria",
        apellido: "Gomez",
        email: "maria@example.com",
        telefono: "987654321",
        dni: "87654321B",
        direccion: "Avenida Siempre Viva 742",
        rol: "EMPLEADO",
        activo: true,
        fechaRegistro: new Date().toISOString()
    }
];

export const setPersonas = (newPersonas: any[]) => {
    personasProxy = newPersonas;
}
