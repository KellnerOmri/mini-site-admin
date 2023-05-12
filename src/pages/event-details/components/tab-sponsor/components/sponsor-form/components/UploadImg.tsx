import React, {useState} from 'react'
import './UploadImg.scss'
import {Fab} from "@mui/material";
import {Icon} from "../../../../../../../components/icon/Icon";
import emptyImage from '../../../../../../../assets/images/empty_image.jpeg'
import {SponsorModel} from "../../../../../../../models/sponsor.model";
export const UploadImg:React.FC<{setSponsorEventFormInput:any,sponsorEventFormInput:any,selectedImage:any,setSelectedImage:any}>=({setSponsorEventFormInput,sponsorEventFormInput,selectedImage,setSelectedImage})=>{
// const [selectedImage,setSelectedImage]=useState<File|null>(null)
    return <div className={"upload-image-container"}>
        <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            name="myImage"
            hidden={true}
            onChange={(e) => {
                setSelectedImage(e.target.files![0]);
                setSponsorEventFormInput({...sponsorEventFormInput as SponsorModel, "logoUrl": URL.createObjectURL(e.target.files![0])})

            }}
        />
          <label htmlFor="contained-button-file">
              <Fab className={"upload-icon-wrapper"} component="span" >
                 <Icon name={"uploadFile"}/>
              </Fab>
          </label>
        {selectedImage ? (
                <img
                    alt="not found"
                    width={"70px"}
                    height={"56px"}
                    src={URL.createObjectURL(selectedImage)}
                />
            ):
            <img
                alt="not fouasdfafsdnd"
                width={"70"}
                height={"56"}
                src={emptyImage}
            />
        }
    </div>
}