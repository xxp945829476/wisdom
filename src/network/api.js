import fetch from "./request"
import Qs from "qs";


export function login(data){
    return fetch({
        url:'/api/login',
        method:'post',
        data:data,
    
    })
}

// 获取菜单列表
export function menuList(data){
    return fetch({
        url:'/api/sys-menu/list',
        method:'post',
        data:data,
    })
}


// 获取车辆
export function getVehicleList(data){
    return fetch({
        url:'/api/sz-vehicle/list',
        method:'post',
        data:data,
    })
}

// 获取部门
export function DepartmentList(data){
    return fetch({
        url:'/api/sys-dept/list',
        method:'post',
        data:data,
    })
}

// 新增部门
export function AddDepartment(data){
    return fetch({
        url:'/api/sys-dept/add',
        method:'post',
        data:data,
    })
}

// 部门类型
export function BaseList(data){
    return fetch({
        url:'/api/sys-base/list',
        method:'post',
        data:data,
    })
}

// 地区
export function AreaList(data){
    return fetch({
        url:'/api/sys-area/list',
        method:'post',
        data:data,
    })
}



export function uploadOne(data){
    return fetch({
        url:'/api/sys-file/uploadOne',
        method:'post',
        data:data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}


