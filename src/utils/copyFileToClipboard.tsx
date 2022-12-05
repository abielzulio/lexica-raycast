/** Code snippet by Yug Sahu */
/* https://github.com/raycast/extensions/blob/b7937137fac796b8db01530a5384ff7df31bf246/extensions/unsplash/src/functions/copyFileToClipboard.ts */

import { environment, showToast, Toast } from "@raycast/api";
import { existsSync } from "fs";
import { runAppleScript } from "run-applescript";

export const copyFileToClipboard = async (url: string, id: string) => {
  const toast = await showToast(Toast.Style.Animated, "Downloading and copying image...");

  const selectedPath = environment.supportPath;
  const fixedPathName = selectedPath.endsWith("/") ? `${selectedPath}${id}.jpg` : `${selectedPath}/${id}.jpg`;

  try {
    const actualPath = fixedPathName;

    const command = !existsSync(actualPath)
      ? `set cmd to "curl -o " & q_temp_folder & " " & "${url}"
        do shell script cmd`
      : "";

    await runAppleScript(`
      set temp_folder to (POSIX path of "${actualPath}")
      set q_temp_folder to quoted form of temp_folder
      ${command}
      set x to alias (POSIX file temp_folder)
      set the clipboard to (read (contents of x) as JPEG picture)
    `);

    toast.style = Toast.Style.Success;
    toast.title = "Image copied to the clipboard!";
  } catch (err) {
    console.error(err);

    toast.style = Toast.Style.Failure;
    toast.title = "Something went wrong.";
    toast.message = "Try with another image or check your internet connection.";
  }
};
