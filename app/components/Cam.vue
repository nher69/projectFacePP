<template>
	<Page class="page">
		<ActionBar title="Camera" class="action-bar" />
        <StackLayout>
            <Button :text="textPicture" class="btn btn-primary" marginTop="20" @tap="takePicture"></Button>
            <Image :src="pictureFromCamera"></Image>
            
        </StackLayout>
	</Page>
</template>



<script>


import { Image } from "tns-core-modules/ui/image";
import * as camera from "nativescript-camera";
import * as http from "http";
import axios from "axios";

import { fromAsset } from 'tns-core-modules/image-source/image-source';
const imageSourceModule = require("tns-core-modules/image-source");

export default {
    data() {
        return {
            pictureFromCamera: null,
            textPicture: "Take a Picture",
            imageData: null
        };
    },
    methods: {

        takePicture() {

            camera.takePicture({ width: 300, height: 300, keepAspectRatio: true, saveToGallery: false})
                .then(imageAsset => { 
                    this.pictureFromCamera = imageAsset;
                    console.log(JSON.stringify(this.pictureFromCamera));


                    // imageSourceModule.fromAsset(imageAsset).then(res => {
                    // myImageSource = res;
                    // var base64 = myImageSource.toBase64String("jpeg", 50);
                    // console.log("base64");
                    // console.log(base64);

       
                        // //HTTP request HERE
                        //     http.request({
                        //     url: "https://api.faceid.com/faceid/v1/detect?" + "api_key=TEHWc-8gNFqinV-470D3Uh0Z-3teYxxL&api_secret=CrziqRzjXTVuhU4vjV7IxFNij2HNhE8i&image=",
                        //     //url: "https://api-us.faceplusplus.com/facepp/v3/detect?" + "api_key=vJxq_XE6sSKG-0OtbZRIR5Mqr4Z8kKQs&api_secret=kxjFcEfF-dDV6-MGaEE6nYI5tKtCBvva&", 
                        //     method: "POST",
                        //     headers: { "Content-Type": "application/json" },
                        //     content: JSON.stringify({
                        //         image_base64: this.pictureFromCamera.toString()
                        //     })
                        //     }).then(response => {
                        //         console.log(image_base64);
                        //         var result = response.content.toJSON();
                        //         console.log("results starts here");
                        //         console.log(result);
                        //         console.log("results ends here");
                        //     }, error => {
                        //         console.error(error);
                        //     }); 
                        // //ENDS HERE                                 
                })
                .catch(err => {
                    console.log("Error -> " + err.message);
                });
        }
    }
};
</script>
