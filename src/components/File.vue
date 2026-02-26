<template>
  <div class="file-uploader">
    <input type="file" id="file" />
    <button id="download">Download</button>
    <a
    id = "downloaded_link"
    :href="link"
    target="_blank"
    rel="noopener noreferrer"
  >
    ファイルを開く
  </a>
    <button id="upload">Upload</button>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { uploadData,getUrl } from "aws-amplify/storage";

export default {
  name: "FileUpload",
  setup() {
    onMounted(() => {
      const file = document.getElementById("file");
      const download = document.getElementById("download");
      const upload = document.getElementById("upload");

      download.addEventListener("click", async () => {
          const link = await getUrl({
          path: ({identityId}) => `profile-pictures/${identityId}/gazou.png`,
        });
        console.log(link.url);
        document.getElementById("downloaded_link").href=link.url;
      });

      upload.addEventListener("click", () => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file.files[0]);

        fileReader.onload = async (event) => {
          console.log("Complete File read successfully!", event.target.result);
          try {
            await uploadData({
              data: event.target.result,
              path: ({identityId}) => `profile-pictures/${identityId}/gazou.png`,
            });
          } catch (e) {
            console.log("error", e);
          }
        };
      });
    });
  },
};
</script>
