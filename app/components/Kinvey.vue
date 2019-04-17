<template>
    <Page class="page">
        <ActionBar title="Home" class="action-bar" />
            <ScrollView>
                <StackLayout class="home-panel">
            
                    <Button text="login" class="loginBtn" marginTop="20" @tap="onTakePictureTap"></Button>
                    <Button text="Get from URL" @tap="request"/>
                    <Button text="Post JSON" @tap="postHTTP" />
                </StackLayout>
            </ScrollView>
    </Page>

    <!-- <Page class="page">
        <ActionBar class="action-bar" title="axios"></ActionBar>
        <GridLayout>
            <ListView for="p in dataResults" class="list-group">
                <v-template>
                    <StackLayout class="list-group-item">
                        <Label :text="p.name" />
                        <Button text="Get from URL" @tap="callAPI"/>
                    </StackLayout>
                </v-template>
            </ListView>
        </GridLayout>
    </Page> -->
</template>


<script>


import * as Toast from 'nativescript-toast';
import * as http from "http";
import axios from "axios";
  export default {
    data() {
      return {
        dataResults: []
      };
    },
    methods:{
        request(){

        axios({method: "POST", "url": "https://api.faceid.com/faceid/v1/detect?"+ "api_key=TEHWc-8gNFqinV-470D3Uh0Z-3teYxxL&api_secret=CrziqRzjXTVuhU4vjV7IxFNij2HNhE8i"}).then(result => {
                this.dataResults = result.data.results;
                console.log(dataResults);
            }, error => {
                console.error(error);
            });
        },
        postHTTP(){
            http.request({
                url: "https://api.faceid.com/faceid/v1/detect?" + "api_key=TEHWc-8gNFqinV-470D3Uh0Z-3teYxxL&api_secret=CrziqRzjXTVuhU4vjV7IxFNij2HNhE8i",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                   
            })
        }).then(response => {
            var result = response.content.toJSON();
            console.log(result);
        }, error => {
            console.error(error);
        });
        }
    

    },

    mounted() {
        
  }};


</script>
