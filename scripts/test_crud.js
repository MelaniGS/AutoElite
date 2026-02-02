
const https = require('https');

// Configuración del Auto de Prueba
const testAuto = JSON.stringify({
    marca: "TEST_AUTO",
    modelo: "Modelo Prueba",
    anio: 2024,
    precio: 99999,
    estado: "Disponible",
    kilometraje: 100,
    imagenUrl: "https://example.com/img.jpg",
    descripcion: "Auto de prueba generado automáticamente"
});

const optionsPost = {
    hostname: 'autoelite-backend-v5sw.onrender.com', // Tu dominio en Render
    path: '/api/autos',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': testAuto.length
    }
};

console.log('--- Iniciando Prueba de Flujo CRUD ---');

// 1. Ejecutar POST
const reqPost = https.request(optionsPost, (res) => {
    console.log(`1. Petición POST enviada. Status: ${res.statusCode}`);

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        if (res.statusCode === 201 || res.statusCode === 200) {
            const autoCreado = JSON.parse(data);
            console.log(`   ✅ Éxito: Auto creado con ID: ${autoCreado.id}`);

            // 2. Ejecutar DELETE (Limpieza)
            deleteAuto(autoCreado.id);
        } else {
            console.error(`   ❌ Fallo al crear: ${data}`);
        }
    });
});

reqPost.on('error', (error) => {
    console.error(`Error en POST: ${error}`);
});

reqPost.write(testAuto);
reqPost.end();

function deleteAuto(id) {
    const optionsDelete = {
        hostname: 'autoelite-backend-v5sw.onrender.com',
        path: `/api/autos/${id}`,
        method: 'DELETE'
    };

    const reqDelete = https.request(optionsDelete, (res) => {
        console.log(`2. Petición DELETE enviada para ID ${id}. Status: ${res.statusCode}`);
        if (res.statusCode === 204 || res.statusCode === 200) {
            console.log('   ✅ Éxito: Auto de prueba eliminado correctamente.');
        } else {
            console.log('   ⚠️ Advertencia: No se pudo eliminar el auto de prueba automáticamente.');
        }
        console.log('--- Prueba Finalizada ---');
    });

    reqDelete.on('error', (e) => console.error(`Error en DELETE: ${e}`));
    reqDelete.end();
}
