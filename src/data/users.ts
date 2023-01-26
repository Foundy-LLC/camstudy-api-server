import * as DB from './database'
import {userInfo} from "../model/users";

export async function createUser(userInfo: userInfo){
    const text: string = "INSERT INTO user_account (id, name, introduce, score, status) VALUES ($1, $2, $3, $4, $5)"
    const params ={
        text: text,
        values: userInfo
    }
    return DB.execute(params);
}

export async function getUsers(){
    const text: string = "SELECT * FROM user_account"
    const params ={
        text: text,
        values: ""
    }
    return DB.execute(params);
}