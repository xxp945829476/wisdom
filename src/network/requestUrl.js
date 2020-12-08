

let baseURL = '';
if (process.env.NODE_ENV == 'development') {    
    // baseURL = 'http://36.152.216.238:8001';
    baseURL = 'http://192.168.20.130:8001';
} else if (process.env.NODE_ENV == 'production') {    
    baseURL = 'http://221.231.140.166:8001';
    // baseURL = 'http://36.152.216.238:8001';
}

let imgurl = baseURL + '/api/uploadimg/';


export default {baseURL,imgurl}

