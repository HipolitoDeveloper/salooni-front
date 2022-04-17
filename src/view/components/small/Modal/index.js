import React from "react";

import RNModal from "react-native-modal";
import AlertModal from "./AlertModal";
import TutorialModal from "./TutorialModal";
import { Text } from "react-native";
import ConfirmModal from "./ConfirmModal";

const Modal = ({
                 tutorial,
                 visible,
                 title,
                 text,
                 onClose,
                 onOk,
                 cancelTitle,
                 okTitle,
                 variant,
                 errors
               }) => {

  const renderChildren = () => {
    switch (variant) {
      case "alert":
        return (
          <AlertModal
            title={title}
            errors={errors}
            onClose={onClose}

          />
        );

      case "confirm":
        return (
          <ConfirmModal
            title={title}
            text={text}
            onClose={onClose}
            onOk={onOk}
            cancelTitle={cancelTitle}
            okTitle={okTitle}
          />
        );

      case "tutorial":
        return (
          <TutorialModal
            onClose={onClose}
            tutorial={tutorial}
          />
        );
      default :
        return <>
          <Text>Oi</Text>
        </>;
    }
  };


  return (
    <>
      <RNModal
        onRequestClose={onClose}
        style={{
          justifyContent: "flex-end",
          margin: 0,
        }}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        isVisible={visible}>
        {renderChildren()}
      </RNModal>
    </>
  );
};

export default Modal;

//STATE TO DECLARE
// const [modal, setModal] = useState({
//   visible: false,
//   title: "",
//   text: "",
//   onOk: () => {},
//   okTitle: "",
//   onClose: () => {},
//   cancelTitle: "",
//   variant: ''
// })

// const handleModal = (visible,
//   title,
//   text,
//   onOk,
//   okTitle,
//   onClose,
//   cancelTitle,
//   variant) => {
//   setModal({
//   visible: false,
//   title: "",
//   text: "",
//   onOk: () => {},
//   okTitle: "",
//   onClose: () => {},
//   cancelTitle: "",
//   variant: ''
//   })
// }

