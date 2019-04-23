<template>
	<Page class="page">
		<ActionBar title="Axios" class="action-bar" />
        <StackLayout>
            <Button :text="textPicture" class="btn btn-primary" marginTop="20" @tap="takePicture"></Button>
            <Image :src="pictureFromCamera"></Image>
            <Button :text="wtf" class="btn btn-primary" marginTop="20" @tap="apiCall"></Button>
        </StackLayout>
	</Page>
</template>


<script>
import * as http from "http";
import * as axios from "axios/dist/axios";
import * as imageSource from "tns-core-modules/image-source";
import * as camera from "nativescript-camera";
import * as Toast from 'nativescript-toast';
const enums = require("ui/enums");
export default {
    data() {
        return {
            pictureFromCamera: null,
            textPicture: "Take a Picture",
            pictureBase64String : null,
            pictureAxios : null,
            wtf: "api call",
            facePPURL: 'https://api-us.faceplusplus.com/facepp/v3/detect?',
            api_key: 'api_key=vJxq_XE6sSKG-0OtbZRIR5Mqr4Z8kKQs&',
            api_secret: 'api_secret=kxjFcEfF-dDV6-MGaEE6nYI5tKtCBvva&image_base64='
           
        };
    },
    methods: {
        takePicture(){
        camera.requestPermissions();
            camera                
                .takePicture({ width: 25, height: 25, keepAspectRatio: false })
                .then(imageAsset => {
                    this.pictureAxios = imageAsset;
                    let source = new imageSource.ImageSource();
                    source.fromAsset(imageAsset).then(source => {
                        this.pictureBase64String = source.toBase64String("jpeg", 20);
                        console.log(this.pictureBase64String);
                //HTTP request HERE
                console.log("http here");
                console.log(source.toBase64String("jpeg", 20));
           
                http.request({
                //url: "https://api.faceid.com/faceid/v1/detect?" + "api_key=TEHWc-8gNFqinV-470D3Uh0Z-3teYxxL&api_secret=CrziqRzjXTVuhU4vjV7IxFNij2HNhE8i&image=" +source,
                url: this.facePPURL + this.api_key + this.api_secret + source.toBase64String("jpeg", 20),                           
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
        
                })
                    }).then(response => {
                        var result = response.content.toJSON();
                        console.log("results starts here");``
                        console.log(result);
                        console.log("results ends here");
                        Toast.makeText(result, "long").show();
                    }, error => {
                        console.error(error);
                    }); 
            //ENDS HERE    
                    });
                })    
        },
        apiCall(){
            //HTTP request HERE
                console.log("http here");
                console.log(this.pictureBase64String);
           
                http.request({
                url: "https://api.faceid.com/faceid/v1/detect?" + "api_key=TEHWc-8gNFqinV-470D3Uh0Z-3teYxxL&api_secret=CrziqRzjXTVuhU4vjV7IxFNij2HNhE8i&image=" +source,
                //url: this.facePPURL + this.api_key + this.api_secret + this.image_base64 + this.pictureBase64String,                           
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({})
                    }).then(response => {
                        var result = response.content.toJSON();
                        console.log("results starts here");
                        console.log(result);
                        console.log("results ends here");
                        Toast.makeText(result, "long").show();
                    }, error => {
                        console.error(error);
                    }); 
            //ENDS HERE         
            }
        }  
    }

        

    
      

</script>
