import { 
    SIGN_IN, 
    SIGN_OUT,
    CREATE_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS
} from './types'
import axios from '../api/streams'

export const signIn = userId => {
    return { type: SIGN_IN, payload: userId }
}

export const signOut = () => {
    return { type: SIGN_OUT }
}

export const createStream = formValues => async dispatch => {
    const createResponse = await axios.post("/streams", formValues)
    return dispatch({ type: CREATE_STREAM, payload: createResponse })        
} 
