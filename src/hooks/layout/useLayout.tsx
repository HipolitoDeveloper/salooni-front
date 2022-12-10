import React from "react";

import {createContext, useContext, useState} from "react";
import {IAlertDialog} from "@components/layout/AlertDialog";
import {TGraphQLError} from "@interfaces/graphQL";
import ErrorDialog from "@components/dialogs/ErrorDialog";
import {useDisclose} from "native-base";

interface ILayoutContext {
    alertDialog?: IAlertDialog;
    handleGraphQLError(graphQLErrors: TGraphQLError): void;
}

const LayoutContext = createContext({} as ILayoutContext);

const LayoutProvider = ({children}) => {
    const {isOpen: isErrorOpen, onClose: onCloseError, onOpen: onOpenError} = useDisclose(false)
    const [errorMessages, setErrorMessages] = useState<string[]>()
    const [alertDialog, setAlertDialog] = useState<IAlertDialog>({
        isOpen: false,
        onClose: () => setAlertDialog({...alertDialog, isOpen: false}),
        onOpen: () => setAlertDialog({...alertDialog, isOpen: true}),
        title: '',
        description: '',
        buttons: []
    })

    const handleGraphQLError = (graphQLErrors: TGraphQLError) => {
        setErrorMessages(graphQLErrors.graphQLErrors.map(({message}) => message))
        onOpenError()
    }

    const contextValues = {
        alertDialog,
        handleGraphQLError
    }

    return (
        <LayoutContext.Provider value={contextValues}>
            <ErrorDialog messages={errorMessages} isOpen={isErrorOpen} onOpen={onOpenError} onClose={onCloseError} />
            {children}
        </LayoutContext.Provider>
    )
}

const useLayout = () => {
    return useContext(LayoutContext);
}

export {useLayout, LayoutProvider}
