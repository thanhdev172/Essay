import React from "react";
import "./FontawesomeIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BUCKET_NAME = "my-image-upload-bucket-demo-sws-17";

class ImageItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeletePhoto = this.handleDeletePhoto.bind(this);
  }
  handleDeletePhoto(name) {
    // eslint-disable-next-line
    const { image, onDelete } = this.props;
    if (name) {
      onDelete(name);
    }
  }

  render() {
    return (
      <>
        <li>
          <div className="file-info">
            <FontAwesomeIcon className="folder" icon="folder" />
            <div className="file-name">{this.props.name}</div>
          </div>
          <div className="file-func">
            <a
              target="blank"
              href={
                "https://" +
                BUCKET_NAME +
                ".s3-ap-southeast-1.amazonaws.com/" +
                this.props.name
              }
            >
              <FontAwesomeIcon className="eye" icon="eye" />
            </a>
            <FontAwesomeIcon
              icon="trash-alt"
              className="trash"
              // onClick={this.handleDeletePhoto}
              onClick={() => this.handleDeletePhoto(this.props.name)}
            />
          </div>
        </li>
      </>
    );
  }
}

export default ImageItem;
