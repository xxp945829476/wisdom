import fetch from "./request"
import Qs from "qs";


export function login(data){
    return fetch({
        url:'/api/login',
        method:'post',
        data:data,
    
    })
}

// 获取用户信息
export function GetUser(data){
    return fetch({
        url:'/api/sys-user/get',
        method:'post',
        data:data,
    })
}

// 获取权限菜单列表
export function menuRoleList(data){
    return fetch({
        url:'/api/sys-role-menu/list',
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

// 获取所有菜单列表
export function GetMenuList(data){
    return fetch({
        url:'/api/sys-menu/getAll',
        method:'post',
        data:data,
    })
}

// 新增菜单
export function AddMenu(data){
    return fetch({
        url:'/api/sys-menu/add',
        method:'post',
        data:data,
    })
}

// 编辑菜单
export function EditMenu(data){
    return fetch({
        url:'/api/sys-menu/edit',
        method:'post',
        data:data,
    })
}

// 获取角色
export function RoleList(data){
    return fetch({
        url:'/api/sys-role/list',
        method:'post',
        data:data,
    })
}

// 编辑角色
export function AddRole(data){
    return fetch({
        url:'/api/sys-role/add',
        method:'post',
        data:data,
    })
}

// 新增角色
export function EditRole(data){
    return fetch({
        url:'/api/sys-role/edit',
        method:'post',
        data:data,
    })
}

// 新增角色配置
export function AddRoleSet(data){
    return fetch({
        url:'/api/sys-role-menu/add',
        method:'post',
        data:data,
    })
}

// 编辑角色配置
export function EditRoleSet(data){
    return fetch({
        url:'/api/sys-role-menu/edit',
        method:'post',
        data:data,
    })
}

// 获取权限菜单
export function RoleMenuList(data){
    return fetch({
        url:'/api/sys-role-menu/list',
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

// 编辑部门
export function EditDepartment(data){
    return fetch({
        url:'/api/sys-dept/edit',
        method:'post',
        data:data,
    })
}

// 删除部门
export function DelDepartment(data){
    return fetch({
        url:'/api/sys-dept/del/' + data,
        method:'post',
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

// 导出部门
export function ExportDepartment(data){
    return fetch({
        url:'/api/sys-dept/export',
        method:'post',
        data:data,
        responseType:'arraybuffer'
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

// 新增用户
export function addUser(data){
    return fetch({
        url:'/api/sys-user/add',
        method:'post',
        data:data,
    })
}

// 编辑用户
export function EditUser(data){
    return fetch({
        url:'/api/sys-user/edit',
        method:'post',
        data:data,
    })
}

// 删除用户
export function DelUser(data){
    return fetch({
        url:'/api/sys-user/del',
        method:'post',
        data:data,
    })
}

// 批量删除用户
export function DelUserBatch(data){
    return fetch({
        url:'/api/sys-user/delBatch',
        method:'post',
        data:data,
    })
}

// 用户列表
export function UserList(data){
    return fetch({
        url:'/api/sys-user/list',
        method:'post',
        data:data,
    })
}

// 新增管辖区
export function AddElectronic(data){
    return fetch({
        url:'/api/sz-electronic-fence/add',
        method:'post',
        data:data,
    })
}

// 编辑管辖区
export function EditElectronic(data){
    return fetch({
        url:'/api/sz-electronic-fence/edit',
        method:'post',
        data:data,
    })
}

// 管辖区列表
export function Fencelist(data){
    return fetch({
        url:'/api/sz-electronic-fence/list',
        method:'post',
        data:data,
    })
}


//上传图片
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
//预览图片
export function ShowImg(data){
    return fetch({
        url:'/api/sys-file/showImg/' + data,
        method:'post',
        responseType:'blob'
    })
}

// 地区企业列表
export function ListEnterprise(data){
    return fetch({
        url:'/api/sys-area/listEnterprise',
        method:'post',
        data:data,
    })
}

// 车辆列表
export function Vehiclelist(data){
    return fetch({
        url:'/api/sz-vehicle/list',
        method:'post',
        data:data,
    })
}

// 新增车辆列表
export function AddVehicle(data){
    return fetch({
        url:'/api/sz-vehicle/add',
        method:'post',
        data:data,
    })
}

// 新增车辆列表
export function EditVehicle(data){
    return fetch({
        url:'/api/sz-vehicle/edit',
        method:'post',
        data:data,
    })
}
// 解绑车辆
export function UnbindVehicle(data){
    return fetch({
        url:'/api/sz-vehicle/unbind',
        method:'post',
        data:data,
    })
}

// 绑定车辆
export function BindVehicle(data){
    return fetch({
        url:'/api/sz-vehicle/bind',
        method:'post',
        data:data,
    })
}

// 审核车辆
export function PermitVehicle(data){
    return fetch({
        url:'/api/sz-vehicle/permit',
        method:'post',
        data:data,
    })
}

// 设备列表
export function Devicelist(data){
    return fetch({
        url:'/api/sz-device/list',
        method:'post',
        data:data,
    })
}

// 新增设备
export function AddDevicelist(data){
    return fetch({
        url:'/api/sz-device/add',
        method:'post',
        data:data,
    })
}

// 编辑设备
export function EditDevicelist(data){
    return fetch({
        url:'/api/sz-device/edit',
        method:'post',
        data:data,
    })
}

// 解绑设备
export function unbindDevice(data){
    return fetch({
        url:'/api/sz-device/unbind',
        method:'post',
        data:data,
    })
}

// 绑定设备
export function bindDevice(data){
    return fetch({
        url:'/api/sz-device/bind',
        method:'post',
        data:data,
    })
}

// 人员列表
export function driverList(data){
    return fetch({
        url:'/api/sz-driver/list',
        method:'post',
        data:data,
    })
}

// 新增人员
export function AddDriver(data){
    return fetch({
        url:'/api/sz-driver/add',
        method:'post',
        data:data,
    })
}

// 编辑人员
export function EditDriver(data){
    return fetch({
        url:'/api/sz-driver/edit',
        method:'post',
        data:data,
    })
}

// 删除人员
export function DelDriver(data){
    return fetch({
        url:'/api/sz-driver/del',
        method:'post',
        data:data,
    })
}

// 首页车辆树
export function IndexTree(data){
    return fetch({
        url:'/api/sz-vehicle/indexList',
        method:'post',
        data:data,
    })
}

// 首页车辆树
export function GetJsession(data){
    return fetch({
        url:'/api/getJsession',
        method:'post',
        data:data,
    })
}


