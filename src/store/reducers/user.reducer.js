import {
	CREATE_USER_DETAILS,
	FETCH_FORMCONFIG_DATA,
	LOADING,
	ERROR,
} from '../types/types';

const INITIATE_STATE = {
	formConfigData: [],
	loadingData: false,
	createUserDetails: {},
	error: {},
};

export default (state = INITIATE_STATE, action) => {
	switch (action.type) {
		case LOADING: {
			return {
				...state, loadingData: (action.payload)
			}
		}
		case FETCH_FORMCONFIG_DATA: {
			return {
				...state,
				formConfigData: (action.payload)
			}
		}
		case CREATE_USER_DETAILS: {
			return {
				...state,
				createUserDetails: (action.payload)
			}
		}
		case ERROR: {
			return {
				...state,
				error: (action.payload)
			}
		}
		default:
			return state;
	}
};
