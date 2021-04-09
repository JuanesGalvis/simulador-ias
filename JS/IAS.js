const input = document.getElementById('input');
const Output = document.getElementById('Output');

const next = document.getElementById('next');
const reset = document.getElementById('reset');

const MemoriaData = document.getElementById('MemoriaData');
const MemoriaInstr = document.getElementById('MemoriaInstr');

const IBR = document.getElementById('IBR');
const PC = document.getElementById('PC');
const IR = document.getElementById('IR');
const MAR = document.getElementById('MAR');

const AC = document.getElementById('AC');
const MQ = document.getElementById('MQ');
const MBR = document.getElementById('MBR');

let PasoActual = 0;
let ProcessCounter = 0;
let operacion;
let anterior;

let ArrayMemoryInstr = [];
let CounterInstr = 300;
let ArrayMemoryData = [
    {
        dir: 200,
        value: 7
    },
    {
        dir: 201,
        value: 2
    },
    {
        dir: 202,
        value: 5
    },
    {
        dir: 203,
        value: 2
    },
]

let CounterData = 200;

function CrearLocacionEnMemoria(direccion, value) {
    return `${direccion}: ${value}`;
}

function RenderMemory(espc, memory) {
    memory.forEach(element => {

        espc === 'MemoriaInstr' ? 
            MemoriaInstr.appendChild(element)
            :
            MemoriaData.appendChild(
                `${CounterData}: ${element}` 
            )
        ;
    });
}

function RealizarOperación(operacion, Values, indice) {
    switch (operacion) {
        case 'ADD':
            if (AC.innerText === "")
            {
                AC.innerText =  ArrayMemoryData[Number.parseInt(Values[indice]-200)].value;
                console.log("No había nada en AC");
            } else {
                AC.innerText = (Number.parseInt(AC.innerText) + ArrayMemoryData[Number.parseInt(Values[indice]-200)].value);
                console.log("Había algo en AC así que lo sume");
            }

        break;

        case 'SUB':
            if (AC.innerText === "")
            {
                AC.innerText =  ArrayMemoryData[Number.parseInt(Values[indice]-200)].value;
                console.log("No había nada en AC");
            } else {
                AC.innerText = (Number.parseInt(AC.innerText) - ArrayMemoryData[Number.parseInt(Values[indice]-200)].value);

                console.log("Había algo en AC así que lo reste");
            }
        break;

        case 'MUL':
            if (AC.innerText === "")
            {
                AC.innerText =  ArrayMemoryData[Number.parseInt(Values[indice]-200)].value;
                console.log("No había nada en AC");
            } else {
                AC.innerText = (Number.parseInt(AC.innerText) * ArrayMemoryData[Number.parseInt(Values[indice]-200)].value);
                console.log("Había algo en AC así que lo multiplique");
            }
        break;
        case 'DIV':
            if (AC.innerText === "")
            {
                AC.innerText =  ArrayMemoryData[Number.parseInt(Values[indice]-200)].value;
                console.log("No había nada en AC");
            } else {
                AC.innerText = (Number.parseInt(AC.innerText) / ArrayMemoryData[Number.parseInt(Values[indice]-200)].value);
                console.log("Había algo en AC así que lo dividi");
            }
        break;
        case 'LOAD':
            AC.innerText =  ArrayMemoryData[Number.parseInt(Values[indice]-200)].value ;
        break;
        case 'PRINTF':
            
            Output.innerText = "> "+ArrayMemoryData[Number.parseInt(Values[indice]-200)].value;

        break;
        case 'STORE':
            
            MemoriaData.innerText = "";

            ArrayMemoryData.push({
                dir: Values[indice],
                value: Number.parseInt(AC.innerText)
            })

            CounterData = 200;

            for (let i = 0; i < ArrayMemoryData.length ; i++) {
            
                let UpdatedMemoryLocation = document.createElement('p')
                UpdatedMemoryLocation.innerText = `${CounterData}: ${ArrayMemoryData[i].value}`

                MemoriaData.appendChild(UpdatedMemoryLocation)

                CounterData++;
            }

            AC.innerText = "";
        break;
    }
}

function Next() { 

    const Values = input.value.split(' ');

    switch(PasoActual) {
        case 0:
            alert('Paso 0: Inicia el contador y guardamos la instrucción a realizar');
            
            PC.innerText = ProcessCounter
            MAR.innerText = ProcessCounter

            let NewMemoryLocation = document.createElement('p')
            NewMemoryLocation.innerText = CrearLocacionEnMemoria(CounterInstr, input.value);
            
            ArrayMemoryInstr.push(NewMemoryLocation);
            RenderMemory('MemoriaInstr' ,ArrayMemoryInstr);
            
            /** INICIALIZAR VALORES */
            for (let i = 0; i < ArrayMemoryData.length; i++) {
                
                NewMemoryLocation = document.createElement('p')
                NewMemoryLocation.innerText = `${CounterData}: ${ArrayMemoryData[i].value}`

                MemoriaData.appendChild(NewMemoryLocation)

                CounterData++;
            }

            PasoActual++;
            break;

        case 1: 
            alert('Paso 1: Separación de la operación a realizar y la próxima')
            
            IBR.innerText = Values[2]+' '+Values[3];
            IR.innerText = Values[0];
            MAR.innerText = Values[1];

            PC.innerText = CounterInstr;
            
            MBR.innerText = Values[0]+' '+Values[1];
            
            PasoActual++;
        break;

        case 2:
            alert("Paso 2: Ejecutamos la primera operación")

            operacion = Values[0];

            RealizarOperación(operacion, Values, 1);
            
            MBR.innerText = '';
            
            PasoActual++;
        break;
        case 3:
            alert("Paso 3: Pasamos la próxima instrucción")
            
            IBR.innerText = '';
            IR.innerText = Values[2];
            MAR.innerText = Values[3];
            MBR.innerText = Values[2]+' '+Values[3];
            
            PasoActual++;
        break;
            
        case 4:
            alert("Paso 4: Ejecutamos la segunda operación")
            
            operacion = Values[2];
            RealizarOperación(operacion, Values, 3);

            MBR.innerText = '';
            IR.innerText = '';
            MAR.innerText = '';

            PasoActual++;

        break;

        case 5:
            alert("Puedes volver a realizar otra pareja de instrucciones")
            
            CounterInstr++;

            NewInstruction = document.createElement('p')
            NewInstruction.innerText = CrearLocacionEnMemoria(CounterInstr, input.value);

            MemoriaInstr.innerText = "";

            ArrayMemoryInstr.push(NewInstruction);
            RenderMemory('MemoriaInstr' ,ArrayMemoryInstr);

            PasoActual = 1;
        break;
    }
}

next.addEventListener('click', Next);

function Reset() {
    input.value = "";
    Output.innerText = ''
    MemoriaData.innerText = ''
    MemoriaInstr.innerText = ''
    ArrayMemoryInstr = [];
    ArrayMemoryData = [
        {
            dir: 200,
            value: 7
        },
        {
            dir: 201,
            value: 2
        },
        {
            dir: 202,
            value: 5
        },
        {
            dir: 203,
            value: 2
        },
    ]
    IBR.innerText = ''
    PC.innerText = ''
    IR.innerText = ''
    MAR.innerText = ''
    AC.innerText = ''
    MQ.innerText = ''
    MBR.innerText = ''
    CounterInstr = 300;
    CounterData = 200;
    PasoActual = 0;
    ProcessCounter = 0;
}

reset.addEventListener('click', Reset);