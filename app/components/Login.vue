<template>
	<Page class="page">
		<ActionBar title="Axios" class="action-bar" />
        
        <StackLayout>
            <TextView text="pictureBase64" v-model="textFieldPicture" />
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
import { createReadStream } from 'fs';
import { TNSHttpFormData, TNSHttpFormDataParam, TNSHttpFormDataResponse } from 'nativescript-http-formdata';
import { formattedTextProperty } from 'tns-core-modules/ui/text-base/text-base';




export default {
    data() {
        return {
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
                .takePicture({ width: 1024, height: 1024, keepAspectRatio: true, saveToGallery: false, cameraFacing: 'front' })
                .then(imageAsset => {

                    //Original
                    this.image = imageAsset.android;
                    let source = new imageSource.ImageSource();
                    source.fromAsset(imageAsset).then(source => {
                    this.pictureBase64String = source.toBase64String('jpeg', 20);
                    console.log(this.pictureBase64String);
                    console.log(imageAsset);
                    Toast.makeText(this.pictureBase64String, "long").show();
                    let fd = new FormData();
                    fd.append('image', this.image)            
                    console.log(pictureBase64String);
                    
                    var headers = {
	                    "Content-type"    : "application/json",
	                    "app_id"          : "0ce68448",
	                    "app_key"         : "985bb714733e3845e162bee42273d78b"
                        };

                    var payload  = { "image" : this.pictureBase64String };
  
            
                    http.request({
                            url: kurl,
                            method: "POST",
                            headers: kHeaders,
                            data: JSON.stringify(payload)
                            }).then(response => {
                                var result = response.content.toJSON();
                                console.log("results starts here");
                                console.log(result);
                                console.log("results ends here");
                            }, error => {
                                console.error(error);
                            }); 

                //    //HTTP request HERE
                //    //FacePP
                //             http.request({
                //             url: "https://api.faceid.com/faceid/v1/detect?api_key=TEHWc-8gNFqinV-470D3Uh0Z-3teYxxL&api_secret=CrziqRzjXTVuhU4vjV7IxFNij2HNhE8i",
                //             data: fd,
                //             method: "POST",
                //             headers: { 
                //                 "Content-Type": 'multipart/form-data '
                //             },
                //             content: {
                               
                //             }
                //             }).then(response => {
                //                 var result = response.content.toJSON();
                //                 console.log("results starts here");
                //                 console.log(result);
                //                 console.log("results ends here");
                //             }, error => {
                //                 console.error(error);
                //             }); 
                //         //ENDS HERE  
                    });
               })    
        },
        apiCall(){
            Toast.makeText("Kairos", "long").show();
            const fd = new FormData();
            fd.append('image', this.imageFile, this.imageFile.name)
            axios.post('https://api.faceid.com/faceid/v1/detect?api_key=TEHWc-8gNFqinV-470D3Uh0Z-3teYxxL&api_secret=CrziqRzjXTVuhU4vjV7IxFNij2HNhE8i',fd)
            .then(response => {
                var result = response.content.toJSON();
                console.log(result);
                }, error => {
                console.error(error);
                });
            }
        }  
    }
</script>
