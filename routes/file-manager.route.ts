import { Router } from "express";
import * as fileManagerController from "../controllers/file-manager.controller";
import multer from "multer";

const upload = multer();

const router = Router();

router.post('/upload', upload.array('files'), fileManagerController.uploadPost);


router.patch(
  '/change-file-name', 
  upload.none(),
  fileManagerController.changeFileNamePatch
);

router.patch(
  '/delete-file',
  upload.none(),
  fileManagerController.deleteFilePatch
);

export default router;
