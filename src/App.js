import "./App.css";
import { useState } from "react";
import { storage } from "./firebase";
import firebase from "firebase/compat/app";

function App() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [image, setImage] = useState(null);
  const handleChange = (e) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        setImage(reader.result);
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleUpload = (e) => {
    const uploadTask = storage.ref(`/videos/${file.name}`).put(file);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        let percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percent + "% done");
        setProgress(percent);
      },
      console.error,
      () => {
        storage
          .ref(`/videos/${file.name}`)
          .getDownloadURL()
          .then((url) => {
            setFile(null);
            setImage(url);
            setProgress(null);
            console.log("upload url", url);
          });
      }
    );
  };
  return (
    <div className="app">
      <h1>This is a firebase storeage demo</h1>
      {progress && (
        <progress id="file" max="100" value={progress}>
          {progress}%
        </progress>
      )}
      <input type="file" onChange={handleChange} />
      <button disabled={!file} onClick={handleUpload}>
        upload to firebase
      </button>
      <img src={image} alt="" />
    </div>
  );
}

export default App;
