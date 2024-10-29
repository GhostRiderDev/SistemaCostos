import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { Home } from "./Home";
import { CostosDiarios } from "./CostosDiarios";
import { Reportes } from "./Reportes";
import { ResumenMensual } from "./ResumenMensual";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#059669",
                },
                headerTintColor: "white",
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Home"
                component={Home}
                options={{ title: "PlatanoProfit" }}
            />
            <StackNavigator.Screen
                name="CostosDiarios"
                component={CostosDiarios}
                options={{ title: "Registrar Costos" }}
            />
            <StackNavigator.Screen
                name="Reportes"
                component={Reportes}
                options={{ title: "Reportes" }}
            />
            <StackNavigator.Screen
                name="ResumenMensual"
                component={ResumenMensual}
                options={{ title: "Resumen Mensual" }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);