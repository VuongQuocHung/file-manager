import { Request, Response } from "express";
import path from "path";
import fs from "fs";


export const uploadPost = (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];

    const savedLinks: any[] = [];

    const mediaDir = path.join(__dirname, "../media");

    files.forEach(file => {
      const filename = `${Date.now()}-${file.originalname}`;
      const filepath = path.join(mediaDir, filename);
      fs.writeFileSync(filepath, file.buffer);
      savedLinks.push({
        folder: "/media",
        filename: filename,
        mimetype: file.mimetype,
        size: file.size
      })
    });

    res.json({
      code: "success",
      message: "Upload thành công!",
      savedLinks: savedLinks
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!"
    });
  }
};

export const changeFileNamePatch = (req: Request, res: Response) => {
  try {
    const { folder, oldFileName, newFileName } = req.body;

    if(!folder || !oldFileName || !newFileName) {
      res.json({
        code: "error",
        message: "Thiếu thông tin cần thiết!"
      });
      return;
    }

    // Tạo đường dẫn đến các file
    const cleanFolder = folder.replace("/", ""); // loại bỏ dấu "/"
    const mediaDir = path.join(__dirname, '..', cleanFolder);
    const oldPath = path.join(mediaDir, oldFileName);
    const newPath = path.join(mediaDir, newFileName);

    if(!fs.existsSync(oldPath)) {
      res.json({
        code: "error",
        message: "File cũ không tồn tại!"
      });
      return;
    }

    if(fs.existsSync(newPath)) {
      res.json({
        code: "error",
        message: "Tên file mới đã tồn tại!"
      });
      return;
    }

    // Đổi tên file
    fs.renameSync(oldPath, newPath);

    res.json({
      code: "success",
      message: "Thành công!"
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: "error",
      message: "Lỗi server khi đổi tên file!"
    });
  }
}

export const deleteFilePatch = (req: Request, res: Response) => {
  try {
    const { fileName, folder } = req.body;

    if(!folder || !fileName) {
      res.json({
        code: "error",
        message: "Thiếu thông tin cần thiết!"
      });
      return;
    }


    // Tạo đường dẫn đến các file
    const cleanFolder = folder.replace("/", ""); // loại bỏ dấu "/"
    const mediaDir = path.join(__dirname, '..', cleanFolder);
    const oldPath = path.join(mediaDir, fileName);

    if(!fs.existsSync(oldPath)) {
      res.json({
        code: "error",
        message: "File cũ không tồn tại!"
      });
      return;
    }

    // Xóa file
    fs.unlinkSync(oldPath);


    res.json({
      code: "success",
      message: "Thành công!"
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: "error",
      message: "Lỗi server khi đổi tên file!"
    });
  }
}
