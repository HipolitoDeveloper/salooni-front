const ButtonOverride = {
    variants: {
        rounded: {
            backgroundColor: 'purple.1000',
            borderRadius: '50px',
            w: '55%',
            height: '50px',
            _text: {
                fontSize: '28px',
                color: 'white.1000'
            }
        },
        circle: {
            backgroundColor: 'white.1000',
            borderRadius: '50px',
            borderColor: 'purple.1000',
            borderStyle: 'solid',
            borderWidth: '2px',
            w: '35px',
            height: '35px',
            _text: {
                fontSize: '20px',
            }
        }
    }

}

export default ButtonOverride
