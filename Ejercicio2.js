   // JSON 
let values =  {
    1: {
        carrier: "CCH",
        service: "DEX",
    },
    2: {
        carrier: "CCH",
        service: "express",
    },
    3: {
        carrier: "CCH",
        service: "priority",
    },
    15: {
        carrier: "CHP",
        service: "nextday",
    },
    16: {
        carrier: "CHP",
        service: "sameday",
    },
    17: {
        carrier: "CHP",
        service: "express",
    }
}
// JSON
let json = { 
            data: {
                BUIN: [
                    {
                        limit: 1,
                        over_carrier_service_id: 17,
                        under_carrier_service_id: 17
                    },
                    {
                        limit: 2,
                        over_carrier_service_id: 15,
                        under_carrier_service_id: 15
                    }
                ],
                LAJA: [
                    {
                        limit: 2,
                        over_carrier_service_id: 1,
                        under_carrier_service_id: 1
                    },{
                        limit: 5,
                        over_carrier_service_id: 2,
                        under_carrier_service_id: 2
                    },{
                        limit: 1,
                        over_carrier_service_id: 17,
                        under_carrier_service_id: 17
                    }
                ],

                LEBU: [
                    {
                        limit: 2,
                        over_carrier_service_id: 1,
                        under_carrier_service_id: 1
                    },{
                        limit: 6,
                        over_carrier_service_id: 3,
                        under_carrier_service_id: 3
                    },{
                        limit: 5,
                        over_carrier_service_id: 2,
                        under_carrier_service_id: 2
                    },{
                        limit: 4,
                        over_carrier_service_id: 16,
                        under_carrier_service_id: 16
                    }
                ],

                LOTA: [
                    {
                        limit: 2,
                        over_carrier_service_id: 15,
                        under_carrier_service_id: 15
                    },{
                        limit: 4,
                        over_carrier_service_id: 16,
                        under_carrier_service_id: 16
                    },{
                        limit: 1,
                        over_carrier_service_id: 17,
                        under_carrier_service_id: 17
                    }
                ] 
            }
}


const resultado = () => {
    let max = 0;
    let maxNombre = '';
    let MaxCobertura = servicioMasCobertura();
    let arrayData = json.data;
    for (var localidad in arrayData){
        //Obtengo la localidad con mayor cantidad de servicios
        if(arrayData[localidad].length > max){
            max = arrayData[localidad].length
            maxNombre = localidad
        }
        //Transofrmacion de objeto
        arrayData[localidad] = arrayData[localidad]
            .map(x=>{return {limit: x.limit, over: values[x.over_carrier_service_id], under: values[x.under_carrier_service_id]}})
            .sort((a,b) => { return Number.parseInt(b.limit) - Number.parseInt(a.limit) })
            [0]
    }
    
    console.log(arrayData)
    console.log('La localidad con mayor cantidad de servicios disponibles es:',maxNombre)
    console.log('El servicio con mayor cobertura es', MaxCobertura.service, 'del carrier', MaxCobertura.carrier)
}

const servicioMasCobertura = () => {
    let arrayData = Object.values(json.data).flat(1);
    const obj = {};
    arrayData.forEach(x => {
        if(!obj[x.over_carrier_service_id]) obj[x.over_carrier_service_id] = 1;
        else obj[x.over_carrier_service_id]++;
    })
    //creo objeto contador con key/value, lo ordeno y shifteo el primer valor
    const res = Object.entries(obj).sort((a,b)=> b[1]-a[1]);
    return values[res.shift()[0]];
}

resultado()