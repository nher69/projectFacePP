<template>
    <!-- <Page class="page">
        <ActionBar title="Home" class="action-bar" />
            <ScrollView>
                <StackLayout class="home-panel">
            
                    <Button text="login" class="loginBtn" marginTop="20" @tap="onTakePictureTap"></Button>
                    <Button text="Get from URL" @tap="callAPI"/>
                    <Button text="Post JSON" @tap="axss" />
                </StackLayout>
            </ScrollView>
    </Page> -->

    <Page class="page">
        <ActionBar class="action-bar" title="FacePlusPlus"></ActionBar>
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
    </Page>
</template>


<script>
  import axios from "axios";
  export default {
    data() {
      return {
        dataResults: []
      };
    },
    mounted() {
      axios({ 
          method: "POST", 
          url: "https://api-us.faceplusplus.com/facepp/v3/detect",
          data:{

                api_key: "rI18RJ9w1VEfy5inc1WSLzwRDefmKJAb",
                api_secret: "xi7A2zpmMJmDb0jKsb2H5o-8-V4OMij2",
                image_url:"https://www.usaoncanvas.com/images/effects/effects_drybrush_t.jpg"
                // idcard_name: "Altisource",
                // idcard_number: "01",
                // uuid: "1",
                // delta: "0",
                // face_token: "sasa",

          }
           }).then(result => {
        this.dataResults = result.data.results;
        console.log(dataResults);
      }, error => {
        console.error(error);
      });
    }
  };


</script>
