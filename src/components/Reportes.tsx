import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { RouteProp } from '@react-navigation/core';
import { Dialogs } from "@nativescript/core";
import {
  shareImage,
  sharePdf,
  shareText,
  shareUrl,
  shareViaFacebook,
  shareViaTwitter,
} from "@nativescript/social-share";

type ReportesProps = {
    route: RouteProp<MainStackParamList, "Reportes">,
    navigation: FrameNavigationProp<MainStackParamList, "Reportes">,
};

export function Reportes({ navigation }: ReportesProps) {
    const datos = {
        categorias: [
            { nombre: "Mano de Obra", valor: 2500, icono: "👥" },
            { nombre: "Fertilizantes", valor: 1800, icono: "🌱" },
            { nombre: "Riego", valor: 800, icono: "💧" },
            { nombre: "Herramientas", valor: 600, icono: "🔧" },
            { nombre: "Transporte", valor: 400, icono: "🚛" },
            { nombre: "Otros", valor: 300, icono: "📦" }
        ]
    };

    const total = datos.categorias.reduce((sum, cat) => sum + cat.valor, 0);

    const mostrarGrafica = () => {
        // Aquí iría la lógica para mostrar la gráfica
        Dialogs.alert({
            title: "Visualización de Datos",
            message: "Se mostrará una gráfica interactiva con los datos del reporte",
            okButtonText: "OK"
        });
    };

    const exportarDatos = () => {
        const reporte = datos.categorias
            .map(cat => `${cat.nombre}: $${cat.valor}`)
            .join('\n');
        
        shareText(`Reporte de Costos\n\n${reporte}\n\nTotal: $${total}`, "Compartir Reporte");
    };

    return (
        <scrollView className="bg-green-50">
            <stackLayout className="p-4 space-y-4">
                <gridLayout rows="auto" columns="*, *" className="gap-4">
                    <stackLayout className="bg-blue-100 p-4 rounded-xl col-0">
                        <label className="text-blue-800 text-center text-lg">Total Gastos</label>
                        <label className="text-blue-900 text-center text-2xl font-bold">${total}</label>
                    </stackLayout>
                    
                    <stackLayout className="bg-green-100 p-4 rounded-xl col-1">
                        <label className="text-green-800 text-center text-lg">Registros</label>
                        <label className="text-green-900 text-center text-2xl font-bold">{datos.categorias.length}</label>
                    </stackLayout>
                </gridLayout>

                <stackLayout className="bg-white p-4 rounded-xl">
                    <label className="text-xl font-bold text-green-800 mb-4">
                        Desglose por Categoría
                    </label>

                    {datos.categorias.map((categoria, index) => (
                        <gridLayout
                            key={index}
                            rows="auto"
                            columns="auto, *, auto"
                            className="mb-4"
                        >
                            <label
                                col="0"
                                className="text-2xl mr-3"
                                text={categoria.icono}
                            />
                            <stackLayout col="1">
                                <label className="text-green-800 font-bold">
                                    {categoria.nombre}
                                </label>
                                <progress
                                    value={categoria.valor}
                                    maxValue={total}
                                    className="bg-green-200 h-2 rounded-full"
                                />
                            </stackLayout>
                            <label
                                col="2"
                                className="text-green-600 font-bold"
                                text={`$${categoria.valor}`}
                            />
                        </gridLayout>
                    ))}
                </stackLayout>

                <gridLayout rows="auto" columns="*, *" className="gap-4">
                    <button
                        col="0"
                        className="bg-blue-600 text-white p-4 rounded-xl"
                        onTap={mostrarGrafica}
                    >
                        📊 Ver Gráfica
                    </button>
                    
                    <button
                        col="1"
                        className="bg-purple-600 text-white p-4 rounded-xl"
                        onTap={exportarDatos}
                    >
                        📤 Exportar
                    </button>
                </gridLayout>
            </stackLayout>
        </scrollView>
    );
}