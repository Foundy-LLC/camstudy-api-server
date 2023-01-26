import {Request, Response} from "express";
import {userInfo} from "../model/users";
import * as usersData from "../data/users"

export async function createUser(req: Request, res: Response) {
    const newUserInfo: userInfo = req.body;
    console.log(req.path);
    const insertId = await usersData.createUser(newUserInfo);
    res.status(200).json({insertId: insertId});
}



export async function createUserProfileImage(req: Request, res: Response) {
    console.log(req.file, req.body);
    res.send("OK");
}

// export async function getUsers(req: Request, res: Response) {
//     const Users: Array<GetAdmin> = await adminData.getAdmin();
//     res.send(Users);
// }