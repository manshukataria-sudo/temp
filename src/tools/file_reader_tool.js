import fs from "fs/promises";
import { isValidPath } from "./path_validator/path_validator.js";

// extension will read file upto MAX_SIZE only
const MAX_SIZE = 1024 * 1024; // 1MB

async function read_file_tool({ rootPath, filePath }) {
  try {
    if (typeof rootPath !== "string" || rootPath.trim() === "") {
      throw new Error("Root folder's path must be a non empty string");
    }
    if (typeof filePath !== "string" || filePath.trim() === "") {
      throw new Error("File path must be a non empty string");
    }
    // validating the path
    if (!isValidPath({ rootPath, filePath })) {
      throw new Error("Access denied! due to Invalid Path");
    }
    const fileStat = await fs.stat(filePath);
    if (!fileStat.isFile()) {
      throw new Error("Provided path is not a file");
    }
    if (fileStat.size > MAX_SIZE) {
      throw new Error("File is too large to read");
    }

    // reading file content
    const content = await fs.readFile(filePath, "utf-8");
    return {
      success: true,
      filePath,
      fileSize: fileStat.size,
      fileContent: content,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export { read_file_tool };
