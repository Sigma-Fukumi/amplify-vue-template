<template>
  <div class="file-uploader">
    <input type="file" id="file" />
    <button id="upload">Upload</button>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { uploadData } from "aws-amplify/storage";

export default {
  name: "FileUpload",
  setup() {
    onMounted(() => {
      const file = document.getElementById("file");
      const upload = document.getElementById("upload");

      upload.addEventListener("click", () => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file.files[0]);

        fileReader.onload = async (event) => {
          console.log("Complete File read successfully!", event.target.result);
          try {
            await uploadData({
              data: event.target.result,
              path: ({identityId}) => `profile-pictures/${identityId}/${file.name}`,
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
