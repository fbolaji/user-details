import axios from 'axios';
import {
	FETCH_FORMCONFIG_DATA,
	CREATE_USER_DETAILS,
	LOADING,
	ERROR,
} from '../types/types';

const apiEndpoint = `http://localhost:3001`;

export const loading = (bool) => ({
	type: LOADING,
	payload: bool
});

export const fetchFormConfigData = () => {
	return (dispatch) => {
		dispatch(loading(true));
		
		return axios.get(`${apiEndpoint}/formConfigData`)
			.then(res => {
				dispatch({
					type: FETCH_FORMCONFIG_DATA,
					payload: res.data
				});
				
				dispatch(loading(false));
				
			})
			.catch(error => dispatch({type: ERROR, payload: error}));
	};
};

export const createUser = (userFormData) => {
	const {
		userid, 
		name, 
		role, 
		email, 
		password, 
		productUpdate, 
		otherProductUpdate, 
		completed
	} = userFormData;

	return (dispatch) => {
		dispatch(loading(true));

		return axios.post(`${apiEndpoint}/usersProfile`, {
			userid,
			name,
			role,
			email,
			password,
			productUpdate,
			otherProductUpdate,
			completed
		}).then(res => {
			  dispatch({
				  type: CREATE_USER_DETAILS,
				  payload: res.data
			  });
			  dispatch(loading(false));

		}).catch(error => {
			dispatch({
				type: ERROR,
				payload: error
			});
		});
	}
};