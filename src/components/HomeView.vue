<template>
  <div>
    <div class="upload-file-box" :class="{ 'warning-dropzone': warningStatus }">
      <div @drop.prevent="handleDrop" class="chose-file">
        <h3>Drag and drop files</h3>
        <label class="button-upload" for="file">Browse files</label>
        <input type="file" id="file" @change="handleChangeFile" />
      </div>
      <h3 v-if="warningStatus" class="warning-title">{{ errorFile }}</h3>
    </div>
    <list-files @onDelete="handleDelete" :listFiles="listFiles" />
    <div class="submit-box">
      <button @click="onUploadFile">Upload File</button>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';
import useStorage from '../hook/useStorage';
import ListFiles from './ListFiles.vue';
const { uploadFile } = useStorage('files');

export default {
  name: 'HelloWorld',
  data() {
    return {
      // file: null,
      listFiles: [],
      numberOfFiles: 0,
      errorFile: null,
      warningStatus: false,
    };
  },
  components: {
    ListFiles,
  },
  methods: {
    condition(selected) {
      const typesFile = [
        'image/png',
        'image/jpg',
        'application/pdf',
        'text/plain',
      ];
      const ERRORS = {
        TOO_LARGE: 'Please select files less than 10MP in size.',
        LIMIT_FILES: 'Exceed the limit of 10 file',
        REQUIRED: 'Please select txt, png, jpg, pdf file.',
      };
      const MAX_SIZE = 10000000;
      const MAX_FILE = 10;
      if (selected) {
        if (typesFile.includes(selected.type)) {
          if (this.listFiles.length > MAX_FILE) {
            this.errorFile = ERRORS.LIMIT_FILES;
            console.log(this.errorFile);
            this.warningStatus = true;
          } else if (selected.size > MAX_SIZE) {
            this.errorFile = ERRORS.TOO_LARGE;
            console.log(this.errorFile);
            this.warningStatus = true;
          } else {
            this.listFiles.push(selected);
            this.warningStatus = false;
          }
        } else {
          this.errorFile = ERRORS.REQUIRED;
          console.log(this.errorFile);
          this.warningStatus = true;
        }
      }
    },
    handleChangeFile(e) {
      const selected = e.target.files[0];
      this.condition(selected);
    },
    onUploadFile() {
      uploadFile(this.listFiles);
      this.listFiles = [];
    },
    handleDrop(e) {
      const item = e?.dataTransfer.files[0];
      this.condition(item);
    },
    handleDelete(index) {
      this.listFiles.splice(index, 1);
    },
  },
  setup() {
    const events = ['dragenter', 'dragleave', 'dragover', 'drop'];

    onMounted(() => {
      events.forEach((event) =>
        document.body.addEventListener(event, (e) => e.preventDefault())
      );
    });
    onUnmounted(() => {
      events.forEach((event) =>
        document.body.removeEventListener(event, (e) => e.preventDefault())
      );
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#file[type='file'] {
  display: none;
}
.upload-file-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: 0 auto;
  background: #f8f8f8;
  border: 1px solid #dcdcdc;
  border-radius: 7px;
  min-height: 232px;
}
.upload-file-box .chose-file {
  text-align: center;
}
.upload-file-box .chose-file .button-upload {
  font-weight: 400;
  text-decoration: underline;
  cursor: pointer;
  font-size: 18px;
  line-height: 22px;
}
.submit-box {
  text-align: center;
}
.submit-box button {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #adadad;
  cursor: pointer;
}
.warning-dropzone {
  border-color: #ed5d5d;
}
.warning-title {
  position: absolute;
  top: 102%;
  left: 10px;
  color: #ed5d5d;
}
</style>
