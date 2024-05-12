const host = "http://localhost:4500";

export const loginAPI = `${host}/api/auth/login`;
export const registerAPI = `${host}/api/auth/register`;
export const superloginAPI = `${host}/api/auth/super-login`;
export const superregisterAPI = `${host}/api/auth/super-register`;
export const adminloginAPI = `${host}/api/auth/admin-login`;
export const adminregisterAPI = `${host}/api/auth/admin-register`;
export const raiseproblem = `${host}/api/v1/add-problem`;
export const add_image=`${host}/api/v1/upload`;
export const getproblem=`${host}/api/v2/getproblem`;
export const getadmin=`${host}/api/auth/getadmin`;
export const getproblemadmin=`${host}/api/v2/getproblem-admin`;
export const getproblemsuper=`${host}/api/v2/getproblem-super`;
export const status_update=`${host}/api/v2/updatestatus`
export const delete_admin=`${host}/api/auth/delete`;