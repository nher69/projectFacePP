<template>
	<Page class="page">
		<ActionBar title="Kairos" class="action-bar" />
        
        <StackLayout>
            <TextField v-model="name" hint="Enter Name" />
            <TextField v-model="gallery" hint="Enter Gallery Name or Company" />
            <Button :text="textPicture" class="btn btn-primary" marginTop="20" @tap="takePicture"></Button>
            <!-- <Image :src="pictureFromCamera"></Image> -->
            <Button :text="wtf" class="btn btn-primary" marginTop="20" @tap="apiCall"></Button>
        </StackLayout>
	</Page>
</template>

<script>
const bgHttp = require("nativescript-background-http");
const fs = require("file-system");
import * as FormData from 'form-data';
import * as http from "http";
import axios from "axios";
import * as imageSource from "tns-core-modules/image-source";
import * as camera from "nativescript-camera";
import * as Toast from 'nativescript-toast';
const enums = require("ui/enums");
import Cam from "./Cam.vue";
import { createReadStream } from 'fs';
import { TNSHttpFormData, TNSHttpFormDataParam, TNSHttpFormDataResponse } from 'nativescript-http-formdata';
import { formattedTextProperty } from 'tns-core-modules/ui/text-base/text-base';




export default {
    data() {
        return {
            //faceRecStarts here//
            name: '',
            pictureFromCamera: null,
            textPicture: "Open Camera",
            pictureBase64String : null,
            imageFile : null,
            wtf: "Kairos",
            file: null,
            facePPURL: 'https://api-us.faceplusplus.com/facepp/v3/detect?',
            api_key: 'api_key=staqi4c1MY8Ilev0xI1jbWc1UsqWk-Uw&',
            api_secret: 'api_secret=C3ArAl6Y0OUzgu1BAAUqsWcGqkuOdpC1&image_base64=',
            textFieldPicture: '',
            image:'',
            kHeaders: {
                        "Content-type"    : "application/json",
	                    "app_id"          : "0ce68448",
	                    "app_key"         : "985bb714733e3845e162bee42273d78b"},
            kurl: "http://api.kairos.com/detect"
        };
    },
    methods: {
        takePicture(){
        camera.requestPermissions();
            camera                
                .takePicture({ width: 100, height: 100, keepAspectRatio: false, saveToGallery: false, cameraFacing: 'front' })
                .then(imageAsset => {

                    //Original
                    this.image = imageAsset.android;
                    let source = new imageSource.ImageSource();
                    source.fromAsset(imageAsset).then(source => {
                    this.pictureBase64String = source.toBase64String('jpeg', 10);
                    console.log(this.pictureBase64String);
                    console.log(imageAsset);
                    Toast.makeText(this.pictureBase64String, "long").show();
                   


                   //HTTP request HERE
                   //FacePP
                            http.request({
                            url: "https://api.kairos.com/enroll",
                            method: "POST",
                            headers: { 
                                "Content-Type": 'application/json',
                                "app_id":"463f439a",
                                "app_key":"759f75c766278af536fbeb4f3dc64363"
                            },
                            content: JSON.stringify({
                                image: this.pictureBase64String,
                                subject_id: this.name,
                                gallery_name: "My Gallery"
                            })
                            }).then(response => {
                                var result = response.content.toJSON();
                                console.log("results starts here");
                                console.log(JSON.stringify(result));
                                console.log("results ends here");
                            }, error => {
                                console.error(error);
                            }); 
                        //ENDS HERE  
                    });
               })    
        },
        apiCall(){
            Toast.makeText("Kairos", "long").show();
            //FacePP
           
            }
        }  
    }
</script>
