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

// 工地列表
export function SiteList(data){
    return fetch({
        url:'/api/sz-field/list',
        method:'post',
        data:data,
    })
}

// 工地新增
export function SiteAdd(data){
    return fetch({
        url:'/api/sz-field/add',
        method:'post',
        data:data,
    })
}

// 工地编辑
export function SiteEdit(data){
    return fetch({
        url:'/api/sz-field/edit',
        method:'post',
        data:data,
    })
}

// 工地左侧
export function SiteleftList(data){
    return fetch({
        url:'/api/sz-field/leftList',
        method:'post',
        data:data,
    })
}

// 审核工地
export function SitePermit(data){
    return fetch({
        url:'/api/sz-field/permit',
        method:'post',
        data:data,
    })
}

// 新增工地设施
export function AddFacility(data){
    return fetch({
        url:'/api/sz-facility/add',
        method:'post',
        data:data,
    })
}

// 编辑工地设施
export function EditFacility(data){
    return fetch({
        url:'/api/sz-facility/edit',
        method:'post',
        data:data,
    })
}

// 工地设施列表
export function FacilityList(data){
    return fetch({
        url:'/api/sz-facility/list',
        method:'post',
        data:data,
    })
}



// 工地设备列表
export function SiteEquipmentList(data){
    return fetch({
        url:'/api/sz-field-device/list',
        method:'post',
        data:data,
    })
}

// 新增工地设备
export function AddSiteEquipment(data){
    return fetch({
        url:'/api/sz-field-device/add',
        method:'post',
        data:data,
    })
}

// 编辑工地设备
export function EditSiteEquipment(data){
    return fetch({
        url:'/api/sz-field-device/edit',
        method:'post',
        data:data,
    })
}

// 解绑工地设备
export function UnbindSiteEquipment(data){
    return fetch({
        url:'/api/sz-field-device/unbind',
        method:'post',
        data:data,
    })
}

// 审批获取id
export function GetId(data){
    return fetch({
        url:'/api/common/getId',
        method:'post',
        data:Qs.stringify(data),
    })
}

// 审批获取用户
export function GetUseBaseInfo(data){
    return fetch({
        url:'/api/sys-user/baseInfo',
        method:'post',
        data:data,
    })
}
// 审批获取部门
export function GetDeptBaseInfo(data){
    return fetch({
        url:'/api/sys-dept/baseInfo',
        method:'post',
        data:data,
    })
}
// 审批获取部门类型
export function GetBaseInfo(data){
    return fetch({
        url:'/api/sys-base/baseInfo',
        method:'post',
        data:data,
    })
}

// 审批流新增
export function AddWorkflow(data){
    return fetch({
        url:'/api/workflow/add',
        method:'post',
        data:data,
    })
}


// 获取模板列表
export function ListWorkflow(data){
    return fetch({
        url:'/api/workflow/listWorkflow',
        method:'post',
        data:data,
    })
}

// 获取审批模板
export function GetFormInfo(data){
    return fetch({
        url:'/api/workflow/getFormInfo',
        method:'post',
        data:data,
    })
}

// 审批
export function AddInst(data){
    return fetch({
        url:'/api/workflow/addInst',
        method:'post',
        data:data,
    })
}

// 审批列表
export function ListMyWorkflow(data){
    return fetch({
        url:'/api/workflow/listMyWorkflow',
        method:'post',
        data:data,
    })
}

// 查看审批列表
export function GetInstTmpl(data){
    return fetch({
        url:'/api/workflow/getInstTmpl/' + data,
        method:'post',
    })
}

// 查看审批列表
export function WorkflowComment(data){
    return fetch({
        url:'/api/workflow/comment',
        method:'post',
        data:data,
    })
}

// 查看审批列表
export function ListMyLaunchWorkflow(data){
    return fetch({
        url:'/api/workflow/listMyLaunchWorkflow',
        method:'post',
        data:data,
    })
}

// 审批获取车辆
export function ListByVehicleTypes(data){
    return fetch({
        url:'/api/sz-vehicle/listByVehicleTypes',
        method:'post',
        data:data,
    })
}

// 获取所有模板列表
export function ListAllWorkflow(data){
    return fetch({
        url:'/api/workflow/listAllWorkflow',
        method:'post',
        data:data,
    })
}

// 修改模板
export function EditWorkflow(data){
    return fetch({
        url:'/api/workflow/editWorkflow',
        method:'post',
        data:data,
    })
}

// 下载
export function Download(data){
    return fetch({
        url:'/api/sys-file/download',
        method:'post',
        data:data,
        responseType:'arraybuffer'
    })
}

// 获取流程基本信息
export function GetBaseInfoWorkflow(data){
    return fetch({
        url:'/api/workflow/getBaseInfo',
        method:'post',
        data:data,
    })
}

// 获取流程信息
export function GetProgressInfo(data){
    return fetch({
        url:'/api/workflow/getProgressInfo',
        method:'post',
        data:data,
    })
}

// 获取首页车辆信息
export function IndexVehicleList(data){
    return fetch({
        url:'/api/sz-vehicle/indexVehicleList',
        method:'post',
        data:data,
    })
}

// 获取首页车辆轨迹
export function QueryTrackDetail(data){
    return fetch({
        url:'/api/sz-vehicle/queryTrackDetail',
        method:'post',
        data:data,
    })
}

// 车辆证件列表
export function ListVehicleCertificate(data){
    return fetch({
        url:'/api/sz-vehicle/listVehicleCertificate',
        method:'post',
        data:data,
    })
}

// 新增黑名单
export function AddBlacklist(data){
    return fetch({
        url:'/api/sz-blacklist/add',
        method:'post',
        data:data,
    })
}

// 新增黑名单
export function EditBlacklist(data){
    return fetch({
        url:'/api/sz-blacklist/edit',
        method:'post',
        data:data,
    })
}

// 删除黑名单
export function DelBlacklist(data){
    return fetch({
        url:'/api/sz-blacklist/del/' + data,
        method:'post',
    })
}

// 黑名单列表
export function BlackList(data){
    return fetch({
        url:'/api/sz-blacklist/list',
        method:'post',
        data:data,
    })
}

// 下发黑名单
export function SendBlacklist(data){
    return fetch({
        url:'/api/sz-blacklist/send-blacklist',
        method:'post',
        data:data,
    })
}

// 导出轨迹
export function ExportLocust(data){
    return fetch({
        url:'/api/sz-vehicle/exportLocus',
        method:'post',
        data:data,
        responseType:'arraybuffer'
    })
}

// 获取当前位置
export function Geocoding(data){
    return fetch({
        url:'/api/common/geocoding',
        method:'post',
        data:data,
    })
}

// 获取录像
export function GetVideoFileInfo(data){
    return fetch({
        url:'/api/sz-vehicle/getVideoFileInfo',
        method:'post',
        data:data,
    })
}


// 上下线汇总表
export function OnlineOffline(data){
    return fetch({
        url:'/api/sys-login-summary/online-offline',
        method:'post',
        data:data,
    })
}

// 上下线明细表
export function onlineOfflineDetail(data){
    return fetch({
        url:'/api/sys-login-summary/online-offline-detail',
        method:'post',
        data:data,
    })
}

// 上下线率表
export function onlineOfflineSummary(data){
    return fetch({
        url:'/api/sys-login-summary/online-offline-summary',
        method:'post',
        data:data,
    })
}

// 导出上下线汇总表
export function ExportOnlineOffline(data){
    return fetch({
        url:'/api/sys-login-summary/export-online-offline',
        method:'post',
        data:data,
        responseType:'arraybuffer'
    })
}

// 导出上下线明细表
export function exportOnlineOfflineDetail(data){
    return fetch({
        url:'/api/sys-login-summary/export-online-offline-detail',
        method:'post',
        data:data,
        responseType:'arraybuffer'
    })
}

// 导出上线率明
export function ExportOnlineOfflineSummary(data){
    return fetch({
        url:'/api/sys-login-summary/export-online-offline-summary',
        method:'post',
        data:data,
        responseType:'arraybuffer'
    })
}

// 里程总表
export function MileageSummary(data){
    return fetch({
        url:'/api/sys-mileage-summary/summary',
        method:'post',
        data:data,
    })
}

// 导出里程总表
export function ExportSummary(data){
    return fetch({
        url:'/api/sys-mileage-summary/export-summary',
        method:'post',
        data:data,
        responseType:'arraybuffer'
    })
}

//视屏上传列表查询
export function QueryDownloadReplay(data){
    return fetch({
        url:'/api/sys-video/query-download-replay',
        method:'post',
        data:data,
    })
}

//ftp上传状态
export function QueryFtpStatus(data){
    return fetch({
        url:'/api/sys-video/query-ftp-status',
        method:'post',
        data:data,
    })
}

//ftp上传
export function FtpUpload(data){
    return fetch({
        url:'/api/sys-video/ftp-upload',
        method:'post',
        data:data,
    })
}

//录像下载
export function SubVideoDownload(data){
    return fetch({
        url:'/api/sys-video/sub-video-download',
        method:'post',
        data:data,
    })
}

//添加管控
export function AddControl(data){
    return fetch({
        url:'/api/sys-control-record/add',
        method:'post',
        data:data,
    })
}
//管控列表
export function ControlList(data){
    return fetch({
        url:'/api/sys-control-record/list',
        method:'post',
        data:data,
    })
}

//报警报表
export function DrivingAlarm(data){
    return fetch({
        url:'/api/sys-driving-summary/alarm',
        method:'post',
        data:data,
    })
}

//停车明细报表
export function ParkingDetail(data){
    return fetch({
        url:'/api/sys-driving-summary/parking-detail',
        method:'post',
        data:data,
    })
}

// 导出报警报表
export function ExportAlarm(data){
    return fetch({
        url:'/api/sys-driving-summary/export-alarm',
        method:'post',
        data:data,
        responseType:'arraybuffer'
    })
}

// 导出明细报表
export function ExportParkingDetail(data){
    return fetch({
        url:'/api/sys-driving-summary/export-parking-detail',
        method:'post',
        data:data,
        responseType:'arraybuffer'
    })
}

// 在线状态
export function GetDeviceOlStatus(data){
    return fetch({
        url:'/api/common/getDeviceOlStatus',
        method:'post',
        data:data,
    })
}

// 保存登录页面配置
export function SetLogin(data){
    return fetch({
        url:'/api/sys-setting/set',
        method:'post',
        data:data,
    })
}

// 登录页面配置详情
export function GetLogin(data){
    return fetch({
        url:'/api/sys-setting/get',
        method:'post',
        data:data,
    })
}

// 获取黑白车
export function SummaryBlacklist(data){
    return fetch({
        url:'/api/sys-summary-blacklist/list',
        method:'post',
        data:data,
    })
}

// 导出黑白车
export function ExportSummaryBlacklist(data){
    return fetch({
        url:'/api/sys-summary-blacklist/export-list',
        method:'post',
        data:data,
        responseType:'arraybuffer'
    })
}

// 下发电子围栏
export function SendCertificate(data){
    return fetch({
        url:'/api/sys-send-certificate/send',
        method:'post',
        data:data,
    })
}

// 获取黑车附件
export function GetAlarmFile(data){
    return fetch({
        url:'/api/sys-summary-blacklist/alarmFile',
        method:'post',
        data:data,
    })
}

// 考核依据列表
export function GetAssessList(data){
    return fetch({
        url:'/api/sys-assess-basis/list',
        method:'post',
        data:data,
    })
}

// 新增考核依据
export function AddAssess(data){
    return fetch({
        url:'/api/sys-assess-basis/add',
        method:'post',
        data:data,
    })
}

// 编辑考核依据
export function EditAssess(data){
    return fetch({
        url:'/api/sys-assess-basis/edit',
        method:'post',
        data:data,
    })
}

// 删除考核依据
export function DelAssess(data){
    return fetch({
        url:'/api/sys-assess-basis/del',
        method:'post',
        data:data,
    })
}

// 新增考核
export function AddAssessPoint(data){
    return fetch({
        url:'/api/sys-assess-point/add',
        method:'post',
        data:data,
    })
}

// 考核列表
export function AssessPointList(data){
    return fetch({
        url:'/api/sys-assess-point/list',
        method:'post',
        data:data,
    })
}

// 企业评价
export function DeptAssess(data){
    return fetch({
        url:'api/sys-assess-point/dept-assess',
        method:'post',
        data:data,
    })
}

// 导出企业评价
export function ExportDeptAssess(data){
    return fetch({
        url:'/api/sys-assess-point/export-dept-assess',
        method:'post',
        data:data,
        responseType:'arraybuffer'
    })
}

// 新增车辆黑名单
export function AddVehicleBlack(data){
    return fetch({
        url:'api/sys-vehicle-blacklist/add',
        method:'post',
        data:data,
    })
}

// 新增企业黑名单
export function AddDeptBlack(data){
    return fetch({
        url:'api/sys-dept-blacklist/add',
        method:'post',
        data:data,
    })
}

// 车辆黑名单列表
export function VehicleBlackList(data){
    return fetch({
        url:'api/sys-vehicle-blacklist/list',
        method:'post',
        data:data,
    })
}

// 企业黑名单列表
export function VehicleDeptList(data){
    return fetch({
        url:'api/sys-dept-blacklist/list',
        method:'post',
        data:data,
    })
}

// 移除车辆黑名单
export function RemoveVehicleBlack(data){
    return fetch({
        url:'api/sys-vehicle-blacklist/remove',
        method:'post',
        data:data,
    })
}

// 移除企业黑名单
export function RemoveDeptBlack(data){
    return fetch({
        url:'api/sys-dept-blacklist/remove',
        method:'post',
        data:data,
    })
}

// 导出车辆黑名单
export function ExportVehicleBlack(data){
    return fetch({
        url:'/api/sys-vehicle-blacklist/export',
        method:'post',
        data:data,
        responseType:'arraybuffer'
    })
}

// 导出企业黑名单
export function ExportDeptBlack(data){
    return fetch({
        url:'/api/sys-dept-blacklist/export',
        method:'post',
        data:data,
        responseType:'arraybuffer'
    })
}

// 案件列表
export function CaseList(data){
    return fetch({
        url:'api/sys-case/list',
        method:'post',
        data:data,
    })
}

// 新增案件
export function AddCase(data){
    return fetch({
        url:'api/sys-case/add',
        method:'post',
        data:data,
    })
}

// 编辑案件
export function EditCase(data){
    return fetch({
        url:'api/sys-case/edit',
        method:'post',
        data:data,
    })
}

// 新增案件处罚
export function AddPunish(data){
    return fetch({
        url:'api/sys-case/add-punish',
        method:'post',
        data:data,
    })
}
// 编辑案件处罚
export function EditPunish(data){
    return fetch({
        url:'api/sys-case/edit-punish',
        method:'post',
        data:data,
    })
}

// 编辑案件处罚
export function SavePunish(data){
    return fetch({
        url:'api/sys-case/save-punish',
        method:'post',
        data:data,
    })
}






