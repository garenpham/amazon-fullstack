import axios from 'axios';

const instance = axios.create({
	baseURL:
		'https://us-central1-ecom-typescript-phamminhtan.cloudfunctions.net/api', // The Firebase API deployed function URL
});

export default instance;
