import React from "react";
import {Center, Modal, Spinner, Text} from "native-base";

interface ILoading {
    loading: boolean
}


const Loading: React.FC<ILoading> = ({loading}) => {

    return loading && (
        <Modal
            avoidKeyboard={true}
            isOpen={loading}>
            <Modal.Content backgroundColor='transparent'>
                    <Spinner  size='lg' color='purple.1000'/>
            </Modal.Content>
        </Modal>
    )
}

export default Loading;
