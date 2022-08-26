import { storage } from '../configs/firebase';
import { ref, uploadBytes, listAll } from 'firebase/storage';
import { v4 } from 'uuid';

const useStorage = (name) => {
  let listFiles = null;

  function uploadFile(files) {
    for (let i = 0; i < files.length; i++) {
      const uploadFile = ref(storage, `${name}/${files[i].name + v4()}`);
      uploadBytes(uploadFile, files[i])
        .then(() => {
          console.log('uploadFile');
        })
        .catch((err) => {
          console.log(err, 'err');
        });
    }
  }
  function getListFile() {
    const imageListRef = ref(storage, '/files');
    listAll(imageListRef).then((response) => {
      listFiles = response.items;
    });
  }

  return { uploadFile, getListFile, listFiles };
};
export default useStorage;
