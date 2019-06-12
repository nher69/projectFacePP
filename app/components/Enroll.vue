<template>
	<Page class="page" actionBarHidden="true">
		<ActionBar title="Kairos" class="action-bar"/>
        <StackLayout>
            <Image class="logo" style="margin-top: 10%;" src="~/res/logo.png" />
            <Label style="text-align: center; margin-top: 50px">
                <Span text="Powered by: " style="color: yellow; font-size:15px; margin-left: 100px; font-style: italic;"/>
                <Span text="K A I R O S" style="color: white; font-size: 20px; font-weight: bold;" />
            </Label>
            
            <TextField class="txtField" v-model="name" hint="Enter Name" style="margin-top: 100px;"/>
            <!-- <TextField class="txtField" v-model="gallery" hint="Enter Gallery Name or Company" /> -->
            <!-- <TextView v-model="userId"/> -->
            <Button text="Register Image" class="btn btn-primary" style="margin-top:50px;" @tap="enrollFace"></Button>
            <Button text="Back" class="btn btn-primary" style="margin-top:20px; width: 200px;" @tap="Home"></Button>
            <!-- <Image :src="pictureFromCamera"></Image> -->
            

            
        </StackLayout>
	</Page>
</template>

<script>
import Home from "./Home.vue";
import * as FormData from 'form-data';
import * as http from "http";
import * as imageSource from "tns-core-modules/image-source";
import * as camera from "nativescript-camera";
import * as Toast from 'nativescript-toast';
const { alert, confirm, prompt, login, action, inputType } = require("tns-core-modules/ui/dialogs");

export default {
    data() {
        return {
            name: null,
            userId: '',
            pictureFromCamera: null,
            pictureBase64String : null,
            subjectName :null,
            imageFile : null,
            file: null,
            textFieldPicture: '',
            image:'',
        };
    },
    computed:{
       
    },
    methods: {
        Home(){
            this.$navigateTo(Home, {clearHistory: true})
        },
        enrollFace(){
        if(this.name == null || this.name == ''){
            alert({
                title: "Alert!",
                message: "Please fill out all the fields",
                okButtonText: "OK"
            }).then(() => {
                console.log("The user closed the alert.");
            });
        }
        else{ 
        camera.requestPermissions();
            camera.takePicture({ width: 300, height: 300, keepAspectRatio: false, saveToGallery: false, cameraFacing: 'front' })
                .then(imageAsset => {
                    //Original
                    this.image = imageAsset.android;
                    let source = new imageSource.ImageSource();
                    source.fromAsset(imageAsset).then(source => {
                    this.pictureBase64String = source.toBase64String('jpeg', 50);
                    console.log(this.pictureBase64String);
                    console.log(imageAsset);
                    // Toast.makeText(this.pictureBase64String, "long").show();
                   
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
                                
                                if(status == 'success'){
                                    alert({
                                        title: "Face ID Created!",
                                        message: "User: " + this.userId ,
                                        okButtonText: "OK"
                                    }).then(() => {
                                        console.log("The user closed the alert.");
                                        // this.$navigateTo(Dashboard, {clearHistory: true})
                                    });
                                }
                                else{
                                    alert({
                                        title: "Alert!",
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
}  


</script>
<style scoped>
    .page{
        background-color: darkblue;
        padding-top: 20%;
        color: white;
    }
    .logo{
        text-align: center;
        height: 600px;
        width: 600px;
}
    .txtField{
        width: 70%;
        color: white!important;
        text-align: center;
        font-style: normal;
        placeholder-color: #e6e8da;
      
    }
    .btn{
        background-color: whitesmoke;
        width: 60%;
        color: black;
    }
 

</style>

