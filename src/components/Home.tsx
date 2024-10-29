import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { RouteProp } from '@react-navigation/core';

type HomeProps = {
    route: RouteProp<MainStackParamList, "Home">,
    navigation: FrameNavigationProp<MainStackParamList, "Home">,
};

export function Home({ navigation }: HomeProps) {
    return (
        <scrollView className="bg-green-50">
            <stackLayout className="p-4 space-y-6">
                <image
                    src="https://i.imgur.com/YP3Bf0l.png"
                    className="h-40 rounded-xl"
                    stretch="aspectFill"
                />
                
                <label className="text-3xl font-bold text-center text-green-800">
                    PlatanoProfit
                </label>
                
                <label className="text-center text-green-600">
                    Tu asistente inteligente para el control de costos en la producción de plátano
                </label>

                <gridLayout rows="auto, auto, auto" columns="*, *" className="gap-4">
                    <stackLayout 
                        row="0" 
                        col="0" 
                        className="bg-green-600 p-4 rounded-xl"
                 i       onTap={() => navigation.navigate("CostosDiarios")}
                    >
                        <image
                            src="https://i.imgur.com/nJQCYSm.png"
                            className="h-20"
                            stretch="aspectFit"
                        />
                        <label className="text-white text-center font-bold mt-2">
                            Registrar Costos
                        </label>
                    </stackLayout>
                    
                    <stackLayout 
                i        row="0" 
                        col="1" 
                        className="bg-blue-600 p-4 rounded-xl"
                        onTap={() => navigation.navigate("Reportes")}
                    >
                        <image
                            src="https://i.imgur.com/K8Pgjph.png"
                            className="h-20"
                            stretch="aspectFit"
                        />
                        <label className="text-white text-center font-bold mt-2">
                            Ver Reportes
                        </label>
                    </stackLayout>
                    
                    <stackLayout 
                        row="1" 
                        colSpan="2" 
                        className="bg-purple-600 p-4 rounded-xl"
                        onTap={() => navigation.navigate("ResumenMensual")}
                    >
                        <image
                            src="https://i.imgur.com/L2YwphC.png"
                            className="h-20"
                            stretch="aspectFit"
                        />
                        <label className="text-white text-center font-bold mt-2">
                            Resumen Mensual
                        </label>
                    </stackLayout>
                </gridLayout>

                <stackLayout className="bg-green-100 p-6 rounded-xl space-y-2">
                    <label className="text-green-800 font-bold text-center">
                        💡 Tip del día
                    </label>
                    <label className="text-green-700 text-center">
                        Registra tus costos diariamente para mantener un control preciso de tu inversión
                    </label>
                </stackLayout>
            </stackLayout>
        </scrollView>
    );
}