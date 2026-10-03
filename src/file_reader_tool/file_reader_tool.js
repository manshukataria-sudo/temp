import fs from "fs/promises";
import path from "node:path";
// extension will read file upto MAX_SIZE only
const MAX_SIZE = 1024 * 1024; // 1MB

// checking if the Agent is not requesting for reading file outside the project root directory
const isValidPath = ({ rootPath, filePath }) => {
  const projectRootPath = path.resolve(rootPath);
  const requestedFilePath = path.resolve(filePath);

  // get the relative path
  const relativePath = path.relative(projectRootPath, requestedFilePath);
  return (
    relativePath === "" ||
    (!relativePath.startsWith("..") && !path.isAbsolute(relativePath))
  );
};

async function read_file_tool({ rootPath, filePath }) {
  try {
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
