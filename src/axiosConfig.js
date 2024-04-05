import axios from 'axios';

const axiosBase=axios.create({
    // baseURL:'http://localhost:5500/api'
    // baseURL:'https://evangadi-backend-deploy-3.onrender.com/api'
    // baseURL:'https://ant-singlet.cyclic.app/api'
    baseURL:'https://backend.yonashabtegeorgis.com/api'
})

export default axiosBase;
