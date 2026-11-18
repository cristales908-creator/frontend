const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const frontendDirectory = path.resolve(__dirname, '..');

for (const filename of ['login.html', 'registro.html', 'index.html']) {
    test(`${filename} inline scripts parse`, () => {
        const html = fs.readFileSync(path.join(frontendDirectory, filename), 'utf8');
        const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)]
            .map(match => match[1])
            .filter(script => script.trim());

        assert.ok(scripts.length > 0, 'expected at least one inline script');
        for (const script of scripts) assert.doesNotThrow(() => new Function(script));
    });
}

test('frontend contains the backend endpoints used by its forms', () => {
    const login = fs.readFileSync(path.join(frontendDirectory, 'login.html'), 'utf8');
    const registration = fs.readFileSync(path.join(frontendDirectory, 'registro.html'), 'utf8');
    const dashboard = fs.readFileSync(path.join(frontendDirectory, 'index.html'), 'utf8');

    assert.match(login, /\/api\/auth\/login/);
    assert.match(registration, /\/api\/auth\/registrar/);
    assert.match(dashboard, /\/api\/alimentos\/historial/);
    assert.match(dashboard, /\/api\/alimentos\/consumo/);
    assert.match(dashboard, /\/api\/alimentos\/\$\{alimentoId\}\/stock-minimo/);
    assert.match(dashboard, /actualizarAlertaStock/);
    assert.match(dashboard, /setInterval\(cargarAlimentos, 60_000\)/);
    assert.match(dashboard, /Registrar ingrediente utilizado/);
    assert.match(dashboard, /alim-retirar-unidad/);
    assert.match(dashboard, /unidadRetiro/);
    assert.match(dashboard, /Pacientes destinatarios/);
    assert.match(dashboard, /pacientesPorMenuComida/);
    assert.match(dashboard, /pac-habitacion/);
    assert.match(dashboard, /imprimirMenuDelDia/);
    assert.match(dashboard, /paciente\.habitacion/);
    assert.match(dashboard, /\/api\/menus\/asignaciones/);
});

test('Vercel forwards API requests to the Render backend', () => {
    const vercelConfig = JSON.parse(fs.readFileSync(path.join(frontendDirectory, 'vercel.json'), 'utf8'));

    assert.deepEqual(vercelConfig.rewrites, [{
        source: '/api/:path*',
        destination: 'https://backend-5uw8.onrender.com/api/:path*'
    }]);
});

test('Render-hosted pages send API requests to the Render backend', () => {
    for (const filename of ['login.html', 'registro.html', 'index.html']) {
        const html = fs.readFileSync(path.join(frontendDirectory, filename), 'utf8');
        assert.match(html, /window\.location\.hostname\.endsWith\('\.onrender\.com'\)/);
        assert.match(html, /https:\/\/backend-5uw8\.onrender\.com/);
    }

    const login = fs.readFileSync(path.join(frontendDirectory, 'login.html'), 'utf8');
    const registration = fs.readFileSync(path.join(frontendDirectory, 'registro.html'), 'utf8');
    const dashboard = fs.readFileSync(path.join(frontendDirectory, 'index.html'), 'utf8');
    assert.match(login, /fetch\(`\$\{API_BASE\}\/api\/auth\/login`/);
    assert.match(registration, /fetch\(`\$\{API_BASE\}\/api\/auth\/registrar`/);
    assert.match(dashboard, /fetch\(`\$\{API_BASE\}\$\{url\}`/);
});