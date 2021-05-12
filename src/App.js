import React, { useEffect, useState } from "react";
import ImageUploader from "react-images-upload";
import Axios from "axios";
import axios from "axios";
import "./components/FontawesomeIcons";

import "./App.css";
import ImageItem from "./components/ImageItem";

// const BUCKET_NAME = "my-image-upload-bucket-demo-sws-17";
const API =
  "https://esib386y32.execute-api.ap-southeast-1.amazonaws.com/files/";

const UploadComponent = (props) => (
  <form>
    <label>
      File Upload URL:
      <input
        id="urlInput"
        type="text"
        onChange={props.onUrlChange}
        value={props.url}
      ></input>
    </label>
    <ImageUploader
      key="image-uploader"
      withIcon={true}
      singleImage={true}
      withPreview={true}
      label="Maximum size file: 5MB"
      buttonText="Choose an image"
      onChange={props.onImage}
      imgExtension={[".jpg", ".png", ".jpeg"]}
      maxFileSize={5242880}
    ></ImageUploader>
  </form>
);

const ImagesComponent = (props) => {
  const listImages = props.allImages;

  const handleDelete = (name) => {
    // eslint-disable-next-line
    const { imageName, onName } = props;
    if (name) {
      onName(name);
    }
  };
  return (
    <>
      <div className="grid wide">
        <div className="row list-files">
          <h2>List Images</h2>
          <ul className="list-images">
            {listImages.map((image) => {
              return (
                <ImageItem
                  name={image.name}
                  onDelete={handleDelete}
                  key={image.name}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

const App = () => {
  const [progress, setProgress] = useState("getUpload");
  const [url, setImageURL] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [listImages, setListImages] = useState([]);

  const onUrlChange = (e) => {
    setImageURL(e.target.value);
  };

  useEffect(() => {
    async function getImages() {
      const requestUrl =
        "https://esib386y32.execute-api.ap-southeast-1.amazonaws.com/files";
      const res = await fetch(requestUrl);
      const resJSON = await res.json();
      const data = resJSON.files;
      setListImages(data);
    }
    getImages();
  }, []);

  const handleDeletePhoto = (name) => {
    if (name) {
      if (window.confirm("Do you want to delete?")) {
        axios.delete(`${API}${name}`).then((res) => {
          if (res.status === 200) {
            let newListImages = listImages.filter((image) => {
              return image.name !== name;
            });
            // console.log(newListImages);
            setListImages(newListImages);
          }
        });
      }
    }
  };

  const onImage = async (failedImages, successImages) => {
    if (!url) {
      console.log("missing Url");
      setErrorMessage("missing a url to upload to");
      setProgress("uploadError");
      return;
    }

    setProgress("uploading");

    try {
      console.log("successImages", successImages);
      const parts = successImages[0].split(";");
      const mime = parts[0].split(":")[1];
      const name = parts[1].split("=")[1];
      const data = parts[2];
      const res = await Axios.post(url, { mime, name, image: data });

      setImageURL(res.data.imageURL);
      setProgress("uploaded");
    } catch (error) {
      console.log("error in upload", error);
      setErrorMessage(error.message);
      setProgress("uploadError");
    }
  };

  const content = () => {
    // eslint-disable-next-line
    switch (progress) {
      case "getUpload":
        return (
          <>
            <UploadComponent
              onUrlChange={onUrlChange}
              onImage={onImage}
              url={url}
            />
          </>
        );
      case "uploading":
        return <h2>Uploading....</h2>;
      case "uploaded":
        return (
          <>
            <UploadComponent
              onUrlChange={onUrlChange}
              onImage={onImage}
              url={url}
            />
          </>
        );
      case "uploadError":
        return (
          <>
            <div>Error message = {errorMessage}</div>
            <UploadComponent
              onUrlChange={onUrlChange}
              onImage={onImage}
              url={url}
            />
          </>
        );
    }
  };

  return (
    <div className="App">
      <h1>Photo Management System</h1>
      {content()}
      <ImagesComponent allImages={listImages} onName={handleDeletePhoto} />
    </div>
  );
};

export default App;
