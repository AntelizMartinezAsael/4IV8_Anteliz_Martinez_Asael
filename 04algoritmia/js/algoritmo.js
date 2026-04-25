function problema1(){
    var p1_input = document.querySelector('#p1-input').value;
    
    if(p1_input.trim() == ""){
        document.querySelector('#p1-output').textContent = 'Error: Datos vacios';
    }else{
        var p1_array = p1_input.split(' ');
        var p1_res = "";

        for(var i = p1_array.length - 1; i >= 0; i--){
            if(p1_array[i] != ""){
                p1_res += p1_array[i] + " ";
            }
        }
        document.querySelector('#p1-output').textContent = p1_res.trim();
    }
}

function problema2(){
    var p2_x1 = document.querySelector('#p2-x1').value;
    var p2_x2 = document.querySelector('#p2-x2').value;
    var p2_x3 = document.querySelector('#p2-x3').value;
    var p2_x4 = document.querySelector('#p2-x4').value;
    var p2_x5 = document.querySelector('#p2-x5').value;

    var p2_y1 = document.querySelector('#p2-y1').value;
    var p2_y2 = document.querySelector('#p2-y2').value;
    var p2_y3 = document.querySelector('#p2-y3').value;
    var p2_y4 = document.querySelector('#p2-y4').value;
    var p2_y5 = document.querySelector('#p2-y5').value;

    if(p2_x1=="" || p2_x2=="" || p2_x3=="" || p2_x4=="" || p2_x5=="" || p2_y1=="" || p2_y2=="" || p2_y3=="" || p2_y4=="" || p2_y5==""){
        document.querySelector('#p2-output').textContent = 'Error: Faltan datos';
    }else{
        var v1 = [Number(p2_x1), Number(p2_x2), Number(p2_x3), Number(p2_x4), Number(p2_x5)];
        var v2 = [Number(p2_y1), Number(p2_y2), Number(p2_y3), Number(p2_y4), Number(p2_y5)];

        v1 = v1.sort(function(a, b){
            return b - a;
        });
        v2 = v2.sort(function(a, b){
            return a - b;
        });

        var p2_producto = 0;
        for(var i = 0; i < v1.length; i++){
            p2_producto += v1[i] * v2[i];
        }
        document.querySelector('#p2-output').textContent = 'El producto escalar minimo es: ' + p2_producto;
    }
}

function problema3(){
    var p3_input = document.querySelector('#p3-input').value;
    
    if(p3_input.trim() == ""){
        document.querySelector('#p3-output').textContent = 'Error: Datos vacios';
    }else{
        var p3_palabras = p3_input.split(',');
        var p3_palabra_ganadora = "";
        var p3_max_unicos = 0;

        for(var i = 0; i < p3_palabras.length; i++){
            var palabra = p3_palabras[i].trim().toUpperCase();
            var letras_vistas = "";
            var cuenta_unicos = 0;

            for(var j = 0; j < palabra.length; j++){
                var letra = palabra.charAt(j);
                if(letra >= 'A' && letra <= 'Z'){
                    if(letras_vistas.indexOf(letra) == -1){
                        letras_vistas += letra;
                        cuenta_unicos++;
                    }
                }
            }

            if(cuenta_unicos > p3_max_unicos){
                p3_max_unicos = cuenta_unicos;
                p3_palabra_ganadora = palabra;
            }
        }

        if(p3_palabra_ganadora == ""){
            document.querySelector('#p3-output').textContent = 'Error: Sin letras validas';
        }else{
            document.querySelector('#p3-output').textContent = 'La palabra con mas caracteres unicos es: ' + p3_palabra_ganadora + ' con ' + p3_max_unicos + ' caracteres.';
        }
    }
}