import { JsonValue } from '@prisma/client/runtime/library';
import { create } from 'zustand';

interface Configuration {
    vehicle: string[];
    typeOfCarWash: JsonValue;
    message: string
}

interface State {
    currentConfiguration: Configuration;
    setConfigurations: (configs: Configuration) => void;
    addCarWashType: (newType: { type: string; price: number }) => void;
    removeCarWashType: (type: string) => void;
    addVehicle: (vehicle: string) => void;
    removeVehicle: (vehicle: string) => void;
    modifyMessage: (message: string) => void;
}

export const useConfigurationsStore = create<State>((set) => {
    return {
        currentConfiguration: { vehicle: ["auto", "moto"], typeOfCarWash: [{ type: "Exterior", price: 8500 }, { type: "Interior", price: 6500 }, { type: "Completo", price: 12500 }], message: "Tu 'vehículo' patente 'patente' de color 'color', ya está listo para que lo retires!" },

        setConfigurations: (configs: Configuration) => {
            set(state => ({
                currentConfiguration: configs
            }))
        },

        addCarWashType: (newType) => {
            set((state) => ({
                currentConfiguration: {
                    ...state.currentConfiguration,
                    typeOfCarWash: [...(state.currentConfiguration.typeOfCarWash as any[]), newType],
                }
            }));
        },

        removeCarWashType: (type) => {
            set((state) => ({
                currentConfiguration: {
                    ...state.currentConfiguration,
                    typeOfCarWash: (state.currentConfiguration.typeOfCarWash as any[]).filter(t => t.type !== type),
                }
            }));
        },

        addVehicle: (vehicle) => {
            set((state) => ({
                currentConfiguration: {
                    ...state.currentConfiguration,
                    vehicle: [...state.currentConfiguration.vehicle, vehicle],
                }
            }));
        },

        removeVehicle: (vehicle) => {
            set((state) => ({
                currentConfiguration: {
                    ...state.currentConfiguration,
                    vehicle: state.currentConfiguration.vehicle.filter(v => v !== vehicle),
                }
            }));
        },

        modifyMessage: (message) => {
            set((state) => ({
                currentConfiguration: {
                    ...state.currentConfiguration,
                    message: message
                }
            }));
        },
    }
});