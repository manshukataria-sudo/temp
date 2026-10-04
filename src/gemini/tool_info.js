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
const write_file_tool_info = {
    type: "function",
    name: "write_file_tool",
    description:
        "Write or overwrite a file inside the project's root directory. " +
        "The tool can create the file and any missing parent directories if needed. " +
        "Provide the project's root directory path, the file path relative to that root, " +
        "and the complete content to write.",
    parameters: {
        type: "object",
        properties: {
            rootPath: {
                type: "string",
                description:
                    "Absolute path to the project's root directory.",
            },
            filePath: {
                type: "string",
                description:
                    "Path of the file to write, relative to rootPath. " +
                    "The file and its parent directories will be created if they do not exist.",
            },
            content: {
                type: "string",
                description:
                    "Complete content to write to the file.",
            },
        },
        required: ["rootPath", "filePath", "content"],
    },
};

export { read_file_tool_info, write_file_tool_info };
