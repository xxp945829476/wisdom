

let baseURL = '';
if (process.env.NODE_ENV == 'development') {    
    baseURL = 'http://192.168.20.120:8001';
} else if (process.env.NODE_ENV == 'production') {    
    baseURL = 'http://192.168.20.120:8001';
}


let imgurl = baseURL + '/api/uploadimg/'


export default {baseURL,imgurl}

