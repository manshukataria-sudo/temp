import fs from "node:fs/promises";
import path from "node:path";

// checking if the Agent is not requesting for writing file outside the project root directory
function isValidPath({ rootPath, filePath }) {
  const projectRootPath = path.resolve(rootPath);
  const requestedFilePath = path.resolve(filePath);
  const relativePath = path.relative(projectRootPath, requestedFilePath);

  return (
    relativePath === "" ||
    (!relativePath.startsWith("..") && !path.isAbsolute(relativePath))
  );
}
async function write_file_tool({ rootPath, filePath, content }) {
  try {
    // validating the rootPath
    if (typeof rootPath !== "string" || rootPath.trim() === "") {
      throw new Error("Root folder's path must be a non empty string");
    }
    if (typeof filePath !== "string" || filePath.trim() === "") {
      throw new Error("File path must be a non empty string");
    }
    // validating the content
    if (typeof content !== "string" || content.trim() === "") {
      throw new Error("Content to write is Invalid");
    }
    if (!isValidPath({ rootPath, filePath })) {
      throw new Error("Access denied! Invalid path");
    }

    // creating directory if not exists
    const dirName = path.dirname(filePath);
    await fs.mkdir(dirName);

    // file will be created, if not exists
    await fs.writeFile(filePath, content, "utf-8");
    return {
      success: true,
      filePath,
      message: "Content written successfully",
    };
  } catch (error) {
    return { success: false, filePath, message: error.message };
  }
}

export { write_file_tool };