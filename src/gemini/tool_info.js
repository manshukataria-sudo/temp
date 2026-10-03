const read_file_tool_info = {
  type: "function",
  name: "read_file_tool",
  description:
    "Read the contents of a file inside the project's root directory. " +
    "Provide the project's root directory path and the file path relative to that root.",
  parameters: {
    type: "object",
    properties: {
      rootPath: {
        type: "string",
        description: "Absolute path to the project's root directory.",
      },
      filePath: {
        type: "string",
        description: "Path of the file to read, relative to rootPath.",
      },
    },
    required: ["rootPath", "filePath"],
  },
};
