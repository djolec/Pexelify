import axios from "axios";
import toast from "react-hot-toast";

export const downloadMedia = async (
  url,
  filename,
  setDownloadPercent,
  // setIsErrorDownloading,
  type,
) => {
  try {
    const response = await axios({
      method: "get",
      url: url,
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        let downloadPercent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        setDownloadPercent(downloadPercent);
      },
    });

    const href = URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = href;
    link.setAttribute("download", `${filename}.${type}`);
    link.click();

    URL.revokeObjectURL(href);

    setTimeout(() => {
      setDownloadPercent(null);
    }, 2000);
  } catch (error) {
    toast.error(error.message);
    // console.log(error);
  }
};
