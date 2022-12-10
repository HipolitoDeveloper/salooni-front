import React, {createContext, useContext, useState} from "react";
import {TGraphQLError} from "@interfaces/graphQL";
import ErrorDialog from "@components/dialogs/ErrorDialog";
import {useDisclose} from "native-base";
import SuccessDialog from "@components/dialogs/SuccessDialog";

interface ILayoutContext {
    handleGraphQLError(graphQLErrors: TGraphQLError): void;
    handleSuccessDialog(description: string): void;
}

const LayoutContext = createContext({} as ILayoutContext);

const LayoutProvider = ({children}) => {
    const {isOpen: isErrorOpen, onClose: onCloseError, onOpen: onOpenError} = useDisclose(false)
    const {isOpen: isSuccessOpen, onClose: onCloseSuccess, onOpen: onOpenSuccess} = useDisclose(false)

    const [errorMessages, setErrorMessages] = useState<string[]>()
    const [successDescription, setSuccessDescription] = useState<string>()

    const handleGraphQLError = (graphQLErrors: TGraphQLError) => {
        setErrorMessages(graphQLErrors.graphQLErrors.map(({message}) => message))
        onOpenError()
    }

    const handleSuccessDialog = (description: string) => {
        setSuccessDescription(description)
        onOpenSuccess();
    }

    const contextValues = {
        handleGraphQLError,
        handleSuccessDialog
    }

    return (
        <LayoutContext.Provider value={contextValues}>
            <ErrorDialog messages={errorMessages} isOpen={isErrorOpen} onOpen={onOpenError} onClose={onCloseError}/>
            <SuccessDialog description={successDescription} isOpen={isSuccessOpen} onClose={onCloseSuccess} onOpen={onOpenSuccess}/>
            {children}
        </LayoutContext.Provider>
    )
}

const useLayout = () => {
    return useContext(LayoutContext);
}

export {useLayout, LayoutProvider}
