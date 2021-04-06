import React from "react";
import "./FontawesomeIcons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ImageItem = (props) => {
    return (
        <>
            <li>
                <div className="file-info">
                        <FontAwesomeIcon className="folder" icon="folder" />
                <div className="file-name">{props.name}</div>
                </div>
                    <div className="file-func">
                        <a target="blank" href={'https://my-image-upload-bucket-demo-sws-172.s3-ap-southeast-1.amazonaws.com/' + props.name}><FontAwesomeIcon className="eye" icon="eye" /></a>
                        <FontAwesomeIcon icon="trash-alt" className="trash" />
                </div>
            </li>
        </>
    )
}

export default ImageItem;