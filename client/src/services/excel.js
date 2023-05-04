import axiosClient from ".";

const ExportBlank = (indexes, filePath) =>
  axiosClient({
    method: "get",
    url: "/insurance/exportBlank",
    params: { indexes: indexes.toString(), filePath: filePath },
  });

const ImportInsur = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosClient({
    method: "post",
    url: "/insurance/import",
    data: formData,
  });
};

export { ExportBlank, ImportInsur };
