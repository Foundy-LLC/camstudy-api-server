import express, {Request, Response} from "express";
import * as userController from "../controller/users";
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/:userId", userController.createUser);

/**
 * 프로필 이미지 업로드
 */
const uploadProfile = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, "uploads/")
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: {fileSize: 5 * 1024 * 1024},
})
router.post("/:userId/profile-image", uploadProfile.single("image"), userController.createUserProfileImage);

export default router;