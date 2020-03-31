export const openMessajeShow = (dispatch, openMensaje) => {
    dispatch({
        type: "OPEN_SNACKBAR",
        openMensaje: openMensaje
    })
}