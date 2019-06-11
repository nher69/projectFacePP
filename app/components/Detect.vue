<template>
	<Page class="page" actionBarHidden="true">
		<ActionBar title="Kairos" class="action-bar" />
        <ActionBar title="Kairos" class="action-bar"/>
        <StackLayout>
            <Image class="logo" style="margin-top: 10%;" src="https://illimitadoinc.gallerycdn.vsassets.io/extensions/illimitadoinc/durusthr-shared-codes/0.0.8/1556787561097/Microsoft.VisualStudio.Services.Icons.Default" />
            <Label style="text-align: center; margin-top: 50px; margin-bottom: 50px;">
                <Span text="Powered by: " style="color: yellow; font-size:15px; margin-left: 100px; font-style: italic;"/>
                <Span text="K A I R O S" style="color: white; font-size: 20px; font-weight: bold;" />
            </Label>
            <!-- <TextField class="txtField" v-model="gallery" hint="Enter Gallery Name or Company" /> -->
            <!-- <TextView v-model="userId"/> -->
            <Button text="Login" class="loginBtn" style="margin-top:50px;" @tap="detect"></Button>
            <Button text="Back" class="loginBtn" style="margin-top:20px; width: 200px;" @tap="Home"></Button>
            <!-- <Image :src="pictureFromCamera"></Image> -->
            <!-- <Button text="wtf" class="btn btn-primary" marginTop="20" @tap="verify"></Button> -->

            
        </StackLayout>
	</Page>
</template>

<script>
import * as FormData from 'form-data';
import * as http from "http";
import * as imageSource from "tns-core-modules/image-source";
import * as camera from "nativescript-camera";
import * as Toast from 'nativescript-toast';
import Dashboard from "./Dashboard.vue";
import Home from "./Home.vue";
import { Page } from 'tns-core-modules/ui/page/page';
const { alert, confirm, prompt, login, action, inputType } = require("tns-core-modules/ui/dialogs");

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
        Home(){
            this.$navigateTo(Home, {clearHistory: true})
        },
        detect(){   
            camera.requestPermissions();
            camera.takePicture({ width: 500, height: 500, keepAspectRatio: false, saveToGallery: false, cameraFacing: 'front' })
                .then(imageAsset => {
                    this.image = imageAsset.android;
                    let source = new imageSource.ImageSource();
                    source.fromAsset(imageAsset).then(source => {
                    this.pictureBase64String = source.toBase64String('jpeg', 100);
                
                            http.request({
                            url: "https://api.kairos.com/recognize",
                            method: "POST",
                            headers: { 
                                "Content-Type": 'application/json',
                                "app_id":"463f439a",
                                "app_key":"759f75c766278af536fbeb4f3dc64363"
                            },
                            content: JSON.stringify({
                                image: this.pictureBase64String,
                                gallery_name: "testGallery"
                            })
                            }).then(response => {
                                console.log("starts");
                                var result = JSON.stringify(response.content);
                                var sample = JSON.parse(result);
                                var status = sample["images"][0].transaction.status;
                                console.log(sample["images"][0].transaction.subject_id);
                                console.log(status);
                                this.userId = sample["images"][0].transaction.subject_id;
                                // Toast.makeText("Hi!, "+ sample["images"][0].transaction.subject_id, "long").show();
                                if(status == 'success'){
                                    alert({
                                        title: "Successfully Login!",
                                        message: "Welcome! " + this.userId,
                                        okButtonText: "OK"
                                    }).then(() => {
                                        console.log("The user closed the alert.");
                                        this.$navigateTo(Dashboard, {clearHistory: true})
                                    });
                                }
                                else{
                                    alert({
                                        title: "Login Failed!",
                                        message: "Face Detection Failed!",
                                        okButtonText: "OK"
                                    }).then(() => {
                                        console.log("The user closed the alert.");
                                        
                                    });
                                }
                            }, error => {
                                console.error(error);
                            }); 

                        //ENDS HERE  
                    });
               })    
        }
    }
}
</script>
<style scoped>
.action-bar{
    background-color: darkblue;
}
.page{
    background-color: darkblue;
    padding-top: 20%;
    color:white;
}
.logo{
    
    text-align: center;
    height: 700px;
    width: 700px;
}
.loginBtn{
    background-color: whitesmoke;
    width: 60%;
    color: black;
    margin-top: 10px;
}
</style>
