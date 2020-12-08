import fetch from "./requestOther"
import Qs from "qs";

export function ControlRemote(data,url){
    return fetch({
        url:'/StandardApiAction_ajaxSetParamConfig.action' + url,
        method:'post',
        data:Qs.stringify({json: JSON.stringify(data)}),
    })
}

export function TruckSetting(data){
    return fetch({
        url:'/StandardApiAction_truckDocumentationSetting.action',
        method:'post',
        data:Qs.stringify(data),
    })
}