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