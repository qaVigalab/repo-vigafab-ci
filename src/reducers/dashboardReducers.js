import {
    SET_OPEN_ALERT,
    SET_USER_LOGIN,
    SET_SELECCIONADOS,
    SET_REMOVE_SELECCIONADOS,
    SET_ACTUALIZAR,
    SET_ID_ORDEN
} from '../types/dashboardTypes'

const INITIAL_STATE = {
    openAlert: false,
    userLogin: { Token: "1" },
    seleccionados: [],
    actualizar: "0",
    id_orden:false
};
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_OPEN_ALERT:
            return {
                ...state,
                openAlert: action.openAlert
            };
        case SET_USER_LOGIN:
            return {
                ...state,
                userLogin: action.userLogin
            };
        case SET_SELECCIONADOS:
            return {
                ...state,
                seleccionados: [...state.seleccionados, action.seleccionados]
            };
        case SET_REMOVE_SELECCIONADOS:
            const index = state.seleccionados.indexOf(action.seleccionados);
            state.seleccionados.splice(index, 1)
            if (action.seleccionados === 1) {
                state.seleccionados.splice(0, state.seleccionados.length)
            }


            return {

                seleccionados: state.seleccionados
                // seleccionados: [...state.seleccionados, action.seleccionados]
            };
        case SET_ACTUALIZAR:
            return {
                ...state,
                actualizar: [...state.actualizar, action.actualizar]
            };
        case SET_ID_ORDEN:
            return {
                ...state,
                id_orden: action.id_orden
            };
    }
    return state;
}
