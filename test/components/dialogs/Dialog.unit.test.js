import {fireEvent, render, screen} from "@testing-library/react-native";
import {Dialog, ELEMENTS} from "@components/dialogs/Dialog";

const COMPONENT_NAME = 'Dialog'

test(COMPONENT_NAME, () => {
    const props = {
        isOpen: false,
        onClose: () => props.isOpen = !props.isOpen,
        title: 'Dialog'
    }

    render(<Dialog><></></Dialog>)

    fireEvent.press(screen.findByTestId(ELEMENTS.closeButton.testID))

    expect()
})