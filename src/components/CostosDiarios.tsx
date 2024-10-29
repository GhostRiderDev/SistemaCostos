import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { RouteProp } from '@react-navigation/core';
import { Dialogs, ObservableArray } from "@nativescript/core";

type CostosDiariosProps = {
    route: RouteProp<MainStackParamList, "CostosDiarios">,
    navigation: FrameNavigationProp<MainStackParamList, "CostosDiarios">,
};

type CostoItem = {
    id: string;
    categoria: string;
    descripcion: string;
    monto: number;
};

export function CostosDiarios({ navigation }: CostosDiariosProps) {
    const [costos, setCostos] = React.useState<CostoItem[]>([]);
    const [categoria, setCategoria] = React.useState("manoDeObra");
    const [descripcion, setDescripcion] = React.useState("");
    const [monto, setMonto] = React.useState("");

    const categorias = new ObservableArray([
        { id: "manoDeObra", nombre: "Mano de Obra", icono: "👥" },
        { id: "fertilizantes", nombre: "Fertilizantes", icono: "🌱" },
        { id: "riego", nombre: "Riego", icono: "💧" },
        { id: "herramientas", nombre: "Herramientas", icono: "🔧" },
        { id: "transporte", nombre: "Transporte", icono: "🚛" },
        { id: "otros", nombre: "Otros", icono: "📦" }
    ]);

    const agregarCosto = () => {
        if (!descripcion || !monto) {
            Dialogs.alert({
                title: "Error",
                message: "Por favor completa todos los campos",
                okButtonText: "OK"
            });
            return;
        }

        const nuevoCosto: CostoItem = {
            id: Date.now().toString(),
            categoria,
            descripcion,
            monto: Number(monto)
        };

        setCostos([...costos, nuevoCosto]);
        setDescripcion("");
        setMonto("");
    };

    const eliminarCosto = (id: string) => {
        setCostos(costos.filter(costo => costo.id !== id));
    };

    const guardarCostos = () => {
        const total = costos.reduce((sum, costo) => sum + costo.monto, 0);
        Dialogs.alert({
            title: "Costos Guardados",
            message: `Se guardaron ${costos.length} registros\nTotal: $${total}`,
            okButtonText: "OK"
        }).then(() => {
            navigation.goBack();
        });
    };

    return (
        <scrollView className="bg-green-50">
            <stackLayout className="p-4 space-y-4">
                <label className="text-xl font-bold text-green-800 text-center">
                    Nuevo Registro de Costo
                </label>

                <gridLayout rows="auto" columns="*" className="bg-white p-4 rounded-xl">
                    <scrollView orientation="horizontal" className="h-20">
                        <flexboxLayout className="space-x-2">
                            {categorias.map((cat) => (
                                <stackLayout 
                                    key={cat.id}
                                    className="p-3 rounded-lg mx-1"
                                    backgroundColor={cat.id === categoria ? '#059669' : '#E5E7EB'}
                                    onTap={() => setCategoria(cat.id)}
                                >
                                    <label 
                                        text={cat.icono}
                                        className="text-2xl text-center"
                                    />
                                    <label 
                                        text={cat.nombre}
                                        className="text-xs mt-1"
                                        color={cat.id === categoria ? '#ffffff' : '#374151'}
                                    />
                                </stackLayout>
                            ))}
                        </flexboxLayout>
                    </scrollView>
                </gridLayout>

                <stackLayout className="bg-white p-4 rounded-xl space-y-4">
                    <textField
                        hint="Descripción del gasto"
                        text={descripcion}
                        onTextChange={(args) => setDescripcion(args.value)}
                        className="border-b border-green-300 p-2"
                    />
                    
                    <textField
                        hint="Monto"
                        text={monto}
                        keyboardType="number"
                        onTextChange={(args) => setMonto(args.value)}
                        className="border-b border-green-300 p-2"
                    />

                    <button
                        className="bg-green-600 text-white p-3 rounded-lg"
                        onTap={agregarCosto}
                    >
                        ➕ Agregar Costo
                    </button>
                </stackLayout>

                {costos.length > 0 && (
                    <stackLayout className="space-y-2">
                        <label className="text-lg font-bold text-green-800">
                            Costos Registrados
                        </label>
                        
                        {costos.map((costo) => (
                            <gridLayout
                                key={costo.id}
                                rows="auto"
                                columns="auto, *, auto, auto"
                                className="bg-white p-3 rounded-lg"
                            >
                                <label
                                    col="0"
                                    text={categorias.find(c => c.id === costo.categoria)?.icono}
                                    className="mr-2"
                                />
                                <label
                                    col="1"
                                    text={costo.descripcion}
                                    className="text-green-800"
                                />
                                <label
                                    col="2"
                                    text={`$${costo.monto}`}
                                    className="text-green-600 font-bold mr-2"
                                />
                                <button
                                    col="3"
                                    text="❌"
                                    className="text-red-500"
                                    onTap={() => eliminarCosto(costo.id)}
                                />
                            </gridLayout>
                        ))}

                        <button
                            className="bg-green-600 text-white p-4 rounded-xl mt-4"
                            onTap={guardarCostos}
                        >
                            💾 Guardar Todos los Costos
                        </button>
                    </stackLayout>
                )}
            </stackLayout>
        </scrollView>
    );
}