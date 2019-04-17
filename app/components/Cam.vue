<template>
	<Page class="page">
		<ActionBar title="Camera" class="action-bar" />
        <StackLayout>
            <Button :text="textPicture" class="btn btn-primary" marginTop="20" @tap="takePicture"></Button>
            <Image :src="pictureFromCamera"></Image>
            <Button :text="APICALL" @tap="callAPI"></Button>
        </StackLayout>
	</Page>
</template>



<script>
import * as camera from "nativescript-camera";
import * as http from "http";

export default {
    data() {
        return {
            pictureFromCamera: null,
            textPicture: "Take a Picture"
        };
    },
    methods: {

        takePicture() {
            // See the options at https://github.com/NativeScript/nativescript-camera#using-the-options-to-take-memory-efficient-picture
            // for more information on how to customize the pictures you take.
            camera
                .takePicture({ width: 300, height: 300, keepAspectRatio: true})
                .then(imageAsset => {
                    console.log("Image Asset starts here");
                    console.log(JSON.stringify(imageAsset));
                    this.pictureFromCamera = imageAsset;
                            //HTTP request HERE
                            http.request({
                            //url: "https://api.faceid.com/faceid/v1/detect?" + "api_key=TEHWc-8gNFqinV-470D3Uh0Z-3teYxxL&api_secret=CrziqRzjXTVuhU4vjV7IxFNij2HNhE8i&image=" +image ,
                            url: "https://api-us.faceplusplus.com/facepp/v3/detect?" + "api_key=ahVOfW_zOTjoqcFbIAAonLCdTREeyBBS&api_secret=hF8WGxU6x2mRxm6JQ8GrPUeDWXAAAerf&image_base64=" + imageAsset,
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            content: JSON.stringify({
                            })
                            }).then(response => {
                                var result = response.content.toJSON();
                                console.log("results starts here");
                                console.log(result);
                                console.log("results ends here");
                            }, error => {
                                console.error(error);
                            });
                            
                            //ENDS HERE            
                })
                .catch(err => {
                    console.log("Error -> " + err.message);
                });
        },
        callAPI(){
                                        
        }
    }
};
</script>
