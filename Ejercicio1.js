const numerosPrimos = (a,b) =>{
    let array = [];
    let result = [];
    //creo el array con todos los valores
    for(let i = a; i <= b; i++){
        array.push(i);
    }
    
    array.map(x => esPrimo(x) ? result.push(x) : null)

    console.log('Los numeros primos correspondientes son: ', result)
}

const esPrimo = (numero) => {
    //si el valor no es divisible por ningun numero entonces es primo (solo divide por 1 y por el mismo)
    for(let i = 2; i < numero; i++){
        if(numero % i === 0){
            return false
        }
    }

    return numero !== 1;
}

numerosPrimos(1, 10)