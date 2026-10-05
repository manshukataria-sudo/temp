import path from "node:path";

// checks if the Agent is not requesting for read/write action on file outside the project root directory
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

export { isValidPath };
