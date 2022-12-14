import React, {createContext, useContext, useState} from "react";
export enum ERouteState {
    'IN' = 'IN',
    'OUT' = 'OUT',
    'LOA' = 'LOA'
}

interface IAppRouteStateContext {
    handleRouteState(state: ERouteState): void;
    routeState: ERouteState
}

const AppRouteStateContext = createContext({} as IAppRouteStateContext);


const AppRouteStateProvider = ({children}) => {
    const [routeState, setRouteState] = useState<ERouteState>(ERouteState.LOA)

    const handleRouteState = (state: ERouteState) => {
        setRouteState(state)
    }

    const contextValues = {
        handleRouteState,
        routeState
    }

    return (
        <AppRouteStateContext.Provider value={contextValues}>
            {children}
        </AppRouteStateContext.Provider>
    )
}

const useAppRouteState = () => {
    return useContext(AppRouteStateContext);
}

export {useAppRouteState, AppRouteStateProvider}
