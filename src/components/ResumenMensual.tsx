import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { RouteProp } from '@react-navigation/core';

type ResumenMensualProps = {
    route: RouteProp<MainStackParamList, "ResumenMensual">,
    navigation: FrameNavigationProp<MainStackParamList, "ResumenMensual">,
};

export function ResumenMensual({ navigation }: ResumenMensualProps) {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
                   "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const mesActual = new Date().getMonth();
    
    const [mesSeleccionado, setMesSeleccionado] = React.useState(mesActual);

    const datosMensuales = {
        ingresos: 15000,
        gastos: {
            semana1: 4500,
            semana2: 3800,
            semana3: 4200,
            semana4: 3900
        },
        categorias: [
            { nombre: "Mano de Obra", porcentaje: 40 },
            { nombre: "Fertilizantes", porcentaje: 25 },
            { nombre: "Riego", porcentaje: 15 },
            { nombre: "Otros", porcentaje: 20 }
        ]
    };

    const totalGastos = Object.values(datosMensuales.gastos).reduce((a, b) => a + b, 0);
    const ganancia = datosMensuales.ingresos - totalGastos;

    return (
        <scrollView className="bg-green-50">
            <stackLayout className="p-4 space-y-4">
                <gridLayout rows="auto" columns="auto, *, auto" className="bg-white p-4 rounded-xl">
                    <button 
                        col="0"
                        text="←"
                        className="text-green-600 font-bold text-xl"
                        onTap={() => setMesSeleccionado((prev) => (prev - 1 + 12) % 12)}
                    />
                    <label 
                        col="1"
                        text={meses[mesSeleccionado]}
                        className="text-xl font-bold text-green-800 text-center"
                    />
                    <button 
                        col="2"
                        text="→"
                        className="text-green-600 font-bold text-xl"
                        onTap={() => setMesSeleccionado((prev) => (prev + 1) % 12)}
                    />
                </gridLayout>

                <gridLayout rows="auto" columns="*, *, *" className="gap-4">
                    <stackLayout className="bg-green-100 p-4 rounded-xl col-0">
                        <label className="text-green-800 text-center">Ingresos</label>
                        <label className="text-green-900 text-center font-bold">${datosMensuales.ingresos}</label>
                    </stackLayout>
                    
                    <stackLayout className="bg-red-100 p-4 rounded-xl col-1">
                        <label className="text-red-800 text-center">Gastos</label>
                        <label className="text-red-900 text-center font-bold">${totalGastos}</label>
                    </stackLayout>
                    
                    <stackLayout className={`p-4 rounded-xl col-2 ${ganancia >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}>
                        <label className={ganancia >= 0 ? 'text-blue-800' : 'text-orange-800' + ' text-center'}>Ganancia</label>
                        <label className={ganancia >= 0 ? 'text-blue-900' : 'text-orange-900' + ' text-center font-bold'}>${ganancia}</label>
                    </stackLayout>
                </gridLayout>

                <stackLayout className="bg-white p-4 rounded-xl">
                    <label className="text-lg font-bold text-green-800 mb-4">
                        Gastos Semanales
                    </label>
                    
                    {Object.entries(datosMensuales.gastos).map(([semana, gasto], index) => (
                        <gridLayout
                            key={index}
                            rows="auto"
                            columns="*, auto"
                            className="mb-3"
                        >
                            <stackLayout col="0">
                                <label className="text-green-800">
                                    Semana {index + 1}
                                </label>
                                <progress
                                    value={gasto}
                                    maxValue={Math.max(...Object.values(datosMensuales.gastos))}
                                    className="bg-green-200 h-2 rounded-full"
                                />
                            </stackLayout>
                            <label
                                col="1"
                                className="text-green-600 font-bold"
                                text={`$${gasto}`}
                            />
                        </gridLayout>
                    ))}
                </stackLayout>

                <stackLayout className="bg-white p-4 rounded-xl">
                    <label className="text-lg font-bold text-green-800 mb-4">
                        Distribución de Gastos
                    </label>
                    
                    {datosMensuales.categorias.map((categoria, index) => (
                        <gridLayout
                            key={index}
                            rows="auto"
                            columns="*, auto"
                            className="mb-3"
                        >
                            <label
                                col="0"
                                className="text-green-800"
                                text={categoria.nombre}
                            />
                            <label
                                col="1"
                                className="text-green-600 font-bold"
                                text={`${categoria.porcentaje}%`}
                            />
                        </gridLayout>
                    ))}
                </stackLayout>

                <stackLayout className="bg-yellow-100 p-4 rounded-xl">
                    <label className="text-yellow-800 text-center">
                        💡 Tip: Compara tus gastos con el mes anterior para identificar áreas de mejora
                    </label>
                </stackLayout>
            </stackLayout>
        </scrollView>
    );
}