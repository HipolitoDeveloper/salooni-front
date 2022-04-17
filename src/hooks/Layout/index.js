import React, {createContext, useCallback, useContext, useState} from "react";
import Modal from "../../view/components/small/Modal";
import Loading from "../../view/components/small/Loading";
import Colors from "../../common/style/Colors";

const LayoutContext = createContext();

const LayoutProvider = ({children}) => {
    const [modal, setModal] = useState({
        visible: false,
        title: "Atenção",
        text: "",
        onOk: () => {
        },
        okTitle: "",
        onClose: () => {
        },
        cancelTitle: "",
        variant: "default"
    })

    const [loading, setLoading] = useState(false)

    const handleModal = (modal) => {
        setModal(
            {
                ...modal
            }
        )
    }

    const clearModal = () => {
        setModal({
            visible: false,
            title: "Atenção",
            text: "",
            onOk: () => {
            },
            okTitle: "",
            onClose: () => {
            },
            cancelTitle: "",
            variant: "default"
        })
    }

    const handleLoading = (loading) => {
        setLoading(loading)
    }


    const contextValues = {
        handleModal,
        clearModal,
        modal,
        handleLoading,

    }

    return (
        <LayoutContext.Provider value={contextValues}>
            <Modal
                {...modal}
                onOk={() => {
                    modal.onOk();
                    setModal({...modal, visible: false})
                }}
                onClose={() => {
                    modal.onClose();
                    setModal({...modal, visible: false})
                }}
            />
            <Loading loading={loading} color={Colors.PURPLE}/>
            {children}
        </LayoutContext.Provider>
    )
}

const useLayout = () => {
    return useContext(LayoutContext)
}

export {useLayout, LayoutProvider}
