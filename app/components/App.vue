<template>
    <Page class="page">
        <ActionBar title="Home" class="action-bar" />
            <ScrollView>
                <StackLayout class="home-panel">
                <ListView for="p in pokemon" class="list-group">
                    <v-template>
                        <StackLayout class="list-group-item">
                            <Label :text="p.name" />
                        </StackLayout>
                    </v-template>
                </ListView>
                    <Button text="login" class="loginBtn" marginTop="20" @tap="onTakePictureTap"></Button>
                    <Button text="Get from URL" @tap="callAPI"/>
                    <Button text="Post JSON" @tap="axss" />
                </StackLayout>
            </ScrollView>
    </Page>
</template>

<script>
import * as Toast from 'nativescript-toast';
import {
    EventData,
    Observable,
    fromObject
} from "tns-core-modules/data/observable";
import {
    Page
} from "tns-core-modules/ui/page";
import {
    View
} from "tns-core-modules/ui/core/view";
import {
    takePicture,
    requestPermissions
} from "nativescript-camera";

import * as http from "http";
export default {
            data() {
         
    return {
        saveToGallery: false,
        allowsEditing: false,
        keepAspectRatio: true,
        width: 320,
        height: 240,
        cameraImage: null,
        labelText: ""

    };
        },
        methods:{
            callAPI(){
                console.log("POST");
                http.request({
                url: "https://api.faceid.com/faceid/v1/detect",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                api_key: "TEHWc-8gNFqinV-470D3Uh0Z-3teYxxL",
                api_secret: "xi7A2zpmMJmDb0jKsb2H5o-8-V4OMij2",
                image:"https://dxs1x0sxlq03u.cloudfront.net/sites/default/files/article-image/eminence-organics-acne-face-mapping.jpg"
            })
            }).then(response => {
            var result = response.content.toJSON();
            console.log("Response from FacePP");
            console.log(result)
            Toast.makeText(JSON.stringify(result.error)).show();
            }, error => {
                console.error(error);
                });
            },
                apiPost(){
                http.request({
                url: "https://api.megvii.com/faceid/v3/sdk/verify",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                    content: JSON.stringify({
                        api_key: "TEHWc-8gNFqinV-470D3Uh0Z-3teYxxL",
                        api_secret: "CrziqRzjXTVuhU4vjV7IxFNij2HNhE8i",
                        image:"https://dxs1x0sxlq03u.cloudfront.net/sites/default/files/article-image/eminence-organics-acne-face-mapping.jpg"
                    })
                }).then(response => {
                    var result = response.content.toJSON();
                    }, error => {
            console.error(error);
            });
        },
                onTakePictureTap: function(args) {
                    let page = args.object.page;
                    let that = this;
                requestPermissions().then(() => {
                            takePicture({
                                width: that.width,
                                height: that.height,
                                keepAspectRatio: that.keepAspectRatio,
                                saveToGallery: that.saveToGallery,
                                allowsEditing: that.allowsEditing
                                }).then(
                                imageAsset => {
                                    that.cameraImage = imageAsset;
                                    imageAsset.getImageAsync(function(nativeImage) {
                                        let scale = 1;
                                        let actualWidth = 0;
                                        let actualHeight = 0;
                                        console.log(imageAsset.android);

                                        //API Starts here
                                        http.request({
                                        url: "https://api.faceid.com/faceid/v1/detect",
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        content: JSON.stringify({
                                            api_key: "TEHWc-8gNFqinV-470D3Uh0Z-3teYxxL",
                                            api_secret: "CrziqRzjXTVuhU4vjV7IxFNij2HNhE8i",
                                            image: imageAsset}) //Image from camera > to API
                                        }).then(response => {
                                        var result = response.content.toJSON();
                                        
                                        console.log("after saving start for photo verify");
                                        console.log(result); 
                                        Toast.makeText(JSON.stringify(result.error),"long").show();
                                        }, error => {
                                console.error(error);
                                });
                                        //ENDS HERE


                                        if (imageAsset.android) {
//get the current density of the screen (dpi) and divide it by the default one to get the scale
                                    scale = nativeImage.getDensity() /android.util.DisplayMetrics.DENSITY_DEFAULT;
                                    actualWidth = nativeImage.getWidth();
                                    actualHeight = nativeImage.getHeight();
                                                                    } else {
                                    scale = nativeImage.scale;
                                    actualWidth = nativeImage.size.width * scale;
                                    actualHeight = nativeImage.size.height * scale;
                                }
                                    that.labelText = `Displayed Size: ${actualWidth}x${actualHeight} with scale ${scale}\n` +
                                    `Image Size: ${Math.round(actualWidth / scale)}x${Math.round(actualHeight / scale)}`;
                                    console.log(`${labelText}`);
                                });
                            },
                                    err => {
                                    console.log("Error -> " + err.message);
                                });
                            },
                        () => alert("permissions rejected")
                    );
                }

        },
            mounted() { 
                console.log("POST from Mounted");
                http.request({
                url: "https://api-us.faceplusplus.com/facepp/v3/detect",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                api_key: "rI18RJ9w1VEfy5inc1WSLzwRDefmKJAb",
                api_secret: "xi7A2zpmMJmDb0jKsb2H5o-8-V4OMij2",
                image:"https://dxs1x0sxlq03u.cloudfront.net/sites/default/files/article-image/eminence-organics-acne-face-mapping.jpg",
                multi_oriented_detection: 1
                })
            }).then(response => {
                var result = response.content.toJSON();
            }, error => {
                console.error(error);
            });
        }
    };

    
    // export default {
        // data() {
// return {
        // 
    // };
// }
            
</script>
<style scoped>
.home-panel {
vertical-align: center;
font-size: 20;
margin: 15;
}
.description-label {
margin-bottom: 15;
}
</style>
