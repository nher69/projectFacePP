<template>
	<Page class="page">
		<ActionBar title="Axios" class="action-bar" />
        <StackLayout>
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
import * as axios from "axios/dist/axios";
import * as imageSource from "tns-core-modules/image-source";
import * as camera from "nativescript-camera";
import * as Toast from 'nativescript-toast';
import { createReadStream } from 'fs';


export default {
    data() {
        return {
            pictureFromCamera: null,
            textPicture: "Take a Picture",
            pictureBase64String : null,
            imageFile : null,
            wtf: "api call",
            file: null,
            facePPURL: 'https://api-us.faceplusplus.com/facepp/v3/detect?',
            api_key: 'api_key=staqi4c1MY8Ilev0xI1jbWc1UsqWk-Uw&',
            api_secret: 'api_secret=C3ArAl6Y0OUzgu1BAAUqsWcGqkuOdpC1&image_base64='
        };
    },
    methods: {
        takePicture(){
        camera.requestPermissions();
            camera                
                .takePicture({ width: 300, height: 300, keepAspectRatio: false, saveToGallery: false, cameraFacing: 'front' })
                .then(imageAsset => {
                    this.imageFile = imageAsset;
                    let source = new imageSource.ImageSource();
                    source.fromAsset(imageAsset).then(source => {
                    this.pictureBase64String = source.toBase64String("jpeg", 20);
                    console.log(this.pictureBase64String);
                                
                    //HTTP request HERE
                            http.request({
                            url: "https://api.faceid.com/faceid/v1/detect?" + "api_key=TEHWc-8gNFqinV-470D3Uh0Z-3teYxxL&api_secret=CrziqRzjXTVuhU4vjV7IxFNij2HNhE8i",
                            data:{image: imageAsset},
                            method: "POST",
                            headers: { 
                                "Content-Type": 'multipart/form-data'
                            },
                            content: {
                                "image": this.pictureFromCamera
                            }
                            }).then(response => {
                                
                                var result = response.content.toJSON();
                                console.log("results starts here");
                                console.log(result);
                                console.log("results ends here");
                            }, error => {
                                console.error(error);
                            }); 
                        //ENDS HERE  

                      //     axios({
                //             method: "post",
                //             url: "https://api.faceid.com/faceid/v1/detect?" + "api_key=TEHWc-8gNFqinV-470D3Uh0Z-3teYxxL&api_secret=CrziqRzjXTVuhU4vjV7IxFNij2HNhE8i",
                //             data: 'image'+ data,
                //             headers : {"Content-Type":" multipart/form-data"}      
                //           })
                //     .then(response => {
                //                      var result = response.data;
                //                      console.log(result);
                //                  }, error => {
                //                     console.error(error);
                //                  });
                // }) 




                    });
               })    
        },
        apiCall(){
            Toast.makeText("Hello World", "long").show();
            // //HTTP request HERE
            //     console.log("http here");
            //     console.log(this.pictureBase64String);
           
            //     http.request({
            //     url: "https://api.faceid.com/faceid/v1/detect?" + "api_key=TEHWc-8gNFqinV-470D3Uh0Z-3teYxxL&api_secret=CrziqRzjXTVuhU4vjV7IxFNij2HNhE8i&Image=" +source,
            //     //url: this.facePPURL + this.api_key + this.api_secret + this.image_base64 + this.pictureBase64String,                           
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     content: JSON.stringify({})
            //         }).then(response => {
            //             var result = response.content.toJSON();
            //             console.log("results starts here");
            //             console.log(result);
            //             console.log("results ends here");
            //             Toast.makeText(result, "long").show();
            //         }, error => {
            //             console.error(error);
            //         }); 
            // //ENDS HERE         
            }
        }  
    }
</script>
