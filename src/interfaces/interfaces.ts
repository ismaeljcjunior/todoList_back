
export interface ITaskProps {
    id_tasks?: number
    task_name?: string
    task_status?: string
}

export interface IUserProps {
    id_users?: number
    name_user?: string
    login_user?: string
    password_user?: string
}

export interface IUserLoginProps {
    userLogin?: string
    userPassword?: string
}