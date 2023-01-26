import express, { Request, Response } from "express";
import morgan from "morgan";
import usersRouter from './routes/users'
import fs from "fs"

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

try{
    fs.readdirSync("uploads");
}catch (e){
    console.error("upload 폴더가 없습니다. upload 폴더를 생성합니다.");
    fs.mkdirSync("uploads");
}

app.use("/users", usersRouter);

// Todo : 환경변수로 변환
app.listen(3001)