import {createContext, useContext, useState} from "react";
import {IAlertDialog} from "../../components/layout/AlertDialog";

interface ILayoutContext {
    alertDialog?: IAlertDialog;
}

const LayoutContext = createContext({} as ILayoutContext);

const LayoutProvider = ({children}) => {
    const [alertDialog, setAlertDialog] = useState<IAlertDialog>({
        isOpen: false,
        onClose: () => setAlertDialog({...alertDialog, isOpen: false}),
        onOpen: () => setAlertDialog({...alertDialog, isOpen: true}),
        title: '',
        description: '',
        buttons: []
    })


    const contextValues = {
        alertDialog
    }

    return (
        <LayoutContext.Provider value={contextValues}>
            {children}
        </LayoutContext.Provider>
    )
}

const useLayout = () => {
    return useContext(LayoutContext);
}

export {useLayout, LayoutProvider}
