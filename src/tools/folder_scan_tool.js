import fg from "fast-glob";
import fs from "node:fs/promises";
import path from "node:path";

async function scan_project_tool({ rootPath }) {
  try {
    // Validate rootPath
    if (typeof rootPath !== "string" || rootPath.trim() === "") {
      throw new Error("Root folder's path must be a non-empty string");
    }

    // Convert to absolute path
    const projectRoot = path.resolve(rootPath);

    // Check that rootPath exists
    const stat = await fs.stat(projectRoot);

    if (!stat.isDirectory()) {
      throw new Error("Provided root path is not a directory");
    }

    // Scan project files
    const files = await fg(["**/*.js", "**/*.html", "**/*.css"], {
      cwd: projectRoot,
      onlyFiles: true,
      ignore: [
        "**/node_modules/**",
        ".git/**",
        "dist/**",
        "build/**",
        ".next/**",
      ],
    });

    return {
      success: true,
      rootPath: projectRoot,
      files,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      rootPath,
    };
  }
}

export { scan_project_tool };