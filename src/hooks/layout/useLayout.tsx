import React, {createContext, useContext, useState} from "react";
import {TGraphQLError} from "../../types/graphQL.type";
import ErrorDialog from "@components/dialogs/ErrorDialog";
import {useDisclose} from "native-base";
import SuccessDialog, {ISuccessDialog} from "@components/dialogs/SuccessDialog";
import Loading from "@components/layout/Loading";

interface ILayoutContext {
    handleGraphQLError(graphQLErrors: TGraphQLError): void;
    handleSuccessDialog(props: ISuccessDialog): void;
    handleLoading(state: boolean): void;
}

const LayoutContext = createContext({} as ILayoutContext);

const LayoutProvider = ({children}) => {
    const {isOpen: isErrorOpen, onClose: onCloseError, onOpen: onOpenError} = useDisclose(false)
    const {isOpen: isSuccessOpen, onClose: onCloseSuccess, onOpen: onOpenSuccess} = useDisclose(false)

    const [errorMessages, setErrorMessages] = useState<string[]>()
    const [successDialogProps, setSuccessDialogProps] = useState<ISuccessDialog>()
    const [loading, setLoading] = useState<boolean>(false);
    const handleGraphQLError = (graphQLErrors: TGraphQLError) => {
        setErrorMessages(graphQLErrors.graphQLErrors.map(({message}) => message))
        onOpenError()
    }

    const handleSuccessDialog = (props : ISuccessDialog) => {
        setSuccessDialogProps(props)
        onOpenSuccess();
    }

    const handleLoading = (state: boolean) => {
        setLoading(state)
    }

    const contextValues = {
        handleGraphQLError,
        handleSuccessDialog,
        handleLoading
    }

    return (
        <LayoutContext.Provider value={contextValues}>
            <ErrorDialog messages={errorMessages} isOpen={isErrorOpen} onOpen={onOpenError} onClose={onCloseError}/>
            <SuccessDialog {...successDialogProps} isOpen={isSuccessOpen} onClose={onCloseSuccess} onOpen={onOpenSuccess}/>
            <Loading loading={loading}/>
            {children}
        </LayoutContext.Provider>
    )
}

const useLayout = () => {
    return useContext(LayoutContext);
}

export {useLayout, LayoutProvider}
