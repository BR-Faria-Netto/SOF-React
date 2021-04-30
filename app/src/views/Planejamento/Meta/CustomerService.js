import axios from 'axios';

export class CustomerService {

    getCustomersSmall() {
        return axios.get('customers-small.json')
            .then(res => res.data.data);
    }

    getCustomersMedium() {
        return axios.get('customers-medium.json')
            .then(res => res.data.data);
    }

    getCustomersLarge() {
        return axios.get('customers-large.json')
            .then(res => res.data.data);
    }

    getCustomersXLarge() {
        return axios.get('customers-xlarge.json')
            .then(res => res.data.data);
    }

    getCustomers(params) {
        return axios.get('https://www.primefaces.org/data/customers', { params: params })
            .then(res => res.data)
    }
}