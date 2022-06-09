import React, {createContext, useCallback, useContext, useState} from "react";
import Modal from "../../view/components/small/Modal";
import Loading from "../../view/components/small/Loading";
import Colors from "../../common/style/Colors";
import {Text, View} from "react-native";
import Notification from "../../view/components/small/Notification";

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
    const [notification, setNotification] = useState({
        hasNotification: false,
        message: "",
        page: ""
    })


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

    const handleNotification = (hasNotification, message, page) => {
        setNotification({
            hasNotification,
            message,
            page
        })
    }


    const contextValues = {
        modal,
        loading,
        handleModal,
        clearModal,
        handleLoading,
        handleNotification
    }

    return (
        <LayoutContext.Provider value={contextValues}>
            {/*{notification.hasNotification && (*/}
            {/*    <Notification {...notification} />*/}
            {/*)}*/}

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
            <Loading loading={loading} color={"black"}/>
            {children}
        </LayoutContext.Provider>
    )
}

const useLayout = () => {
    return useContext(LayoutContext)
}

export {useLayout, LayoutProvider}
