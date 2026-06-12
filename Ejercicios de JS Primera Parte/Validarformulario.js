// Expresiones regulares para validación de datos
const regDinero = /^\d+(\.\d{1,2})?$/; 
const regNota = /^([0-9](\.\d+)?|10)$/;
const regEntero = /^\d+$/;

// Función para mostrar resultados en pantalla
const mostrarMsg = (idRes, idErr, txt) => {
    document.getElementById(idErr).style.display = 'none';
    const contenedor = document.getElementById(idRes);
    contenedor.innerHTML = txt;
    contenedor.style.display = 'block';
};

// Función para manejar errores de entrada
const mostrarError = (idErr, idRes) => {
    document.getElementById(idErr).style.display = 'block';
    document.getElementById(idRes).style.display = 'none';
};

// 1. Cálculo de inversión (2% mensual)
function ejercicio1() {
    const capital = document.getElementById('p1-capital').value.trim();
    if (regDinero.test(capital) && capital !== "") {
        let ganancia = parseFloat(capital) * 0.02;
        mostrarMsg('res-1', 'err-1', `Ganancia: $${ganancia.toFixed(2)}`);
    } else mostrarError('err-1', 'res-1');
}

// 2. Comisiones por ventas (10% extra)
function ejercicio2() {
    const b = document.getElementById('p2-base').value.trim();
    const v1 = document.getElementById('p2-v1').value.trim();
    const v2 = document.getElementById('p2-v2').value.trim();
    const v3 = document.getElementById('p2-v3').value.trim();
    
    if ([b,v1,v2,v3].every(val => regDinero.test(val) && val !== "")) {
        let comision = (parseFloat(v1) + parseFloat(v2) + parseFloat(v3)) * 0.10;
        let total = parseFloat(b) + comision;
        mostrarMsg('res-2', 'err-2', `Total mensual: $${total.toFixed(2)}`);
    } else mostrarError('err-2', 'res-2');
}

// 3. Aplicación de descuento (15%)
function ejercicio3() {
    const monto = document.getElementById('p3-monto').value.trim();
    if (regDinero.test(monto) && monto !== "") {
        let final = parseFloat(monto) * 0.85;
        mostrarMsg('res-3', 'err-3', `Total con descuento: $${final.toFixed(2)}`);
    } else mostrarError('err-3', 'res-3');
}

// 4. Promedio ponderado de Algoritmos
function ejercicio4() {
    const p = document.getElementById('p4-par').value.trim();
    const e = document.getElementById('p4-exa').value.trim();
    const t = document.getElementById('p4-tra').value.trim();
    
    if ([p,e,t].every(val => regNota.test(val) && val !== "")) {
        let notaFinal = (parseFloat(p)*0.55) + (parseFloat(e)*0.30) + (parseFloat(t)*0.15);
        mostrarMsg('res-4', 'err-4', `Calificación Final: ${notaFinal.toFixed(2)}`);
    } else mostrarError('err-4', 'res-4');
}

// 5. Porcentaje de género en el grupo
function ejercicio5() {
    const h = document.getElementById('p5-h').value.trim();
    const m = document.getElementById('p5-m').value.trim();
    
    if (regEntero.test(h) && regEntero.test(m)) {
        let total = parseInt(h) + parseInt(m);
        if (total === 0) return mostrarMsg('res-5', 'err-5', "Grupo sin estudiantes");
        let ph = (parseInt(h) / total) * 100;
        let pm = (parseInt(m) / total) * 100;
        mostrarMsg('res-5', 'err-5', `Hombres: ${ph.toFixed(1)}% | Mujeres: ${pm.toFixed(1)}%`);
    } else mostrarError('err-5', 'res-5');
}

// 6. Cálculo de edad cronológica
function ejercicio6() {
    const fecha = document.getElementById('p6-fecha').value;
    if (fecha) {
        let nacimiento = new Date(fecha);
        let hoy = new Date();
        if (nacimiento > hoy) return mostrarMsg('res-6', 'err-6', "Fecha no válida");
        
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        let m = hoy.getMonth() - nacimiento.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
        mostrarMsg('res-6', 'err-6', `Edad: ${edad} años`);
    } else mostrarError('err-6', 'res-6');
}