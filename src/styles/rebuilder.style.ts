export const rebuilderContainer = {
    width: '100%',
    height: '100%'
}

export const spinnerContainer = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

export const mountedStyle = {
    animation: 'in-animation 300ms ease-in'
}

export const rebuilderGeneralStyle = `
    @keyframes in-animation {
                    0% {
                        opacity: 0;
                        visibility: hidden;
                    }
    
                    100% {
                        opacity: 1;
                        visibility: visible;
                    }
                }

                @keyframes out-animation {
                    0% {
                        opacity: 1;
                    }

                    100% {
                        opacity: 0;
                        visibility: hidden;
                    }
    }
`