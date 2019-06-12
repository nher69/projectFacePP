<template>
	<Page class="page" actionBarHidden="true">
		<ActionBar title="" class="action-bar" />
        <StackLayout>
            <Image class="logo" style="margin-top: 10%;" src="~/res/logo.png" />
            <Label style="text-align: center; margin-top: 50px; margin-bottom: 50px;">
                <Span text="Powered by: " style="color: yellow; font-size:15px; margin-left: 100px; font-style: italic;"/>
                <Span text="K A I R O S" style="color: white; font-size: 20px; font-weight: bold;" />
           </Label>
            
            <Button :text="enroll" class="enrollBtn"  @tap="Enroll"></Button>
            <!-- <Image :src="pictureFromCamera"></Image> -->
            <Button :text="detect" class="enrollBtn"  @tap="Detect"></Button>
        </StackLayout>

	</Page>
</template>

<script>
import * as Toast from 'nativescript-toast';
import Enroll from "./Enroll.vue";
import Detect from "./Detect.vue";
import { Page } from 'tns-core-modules/ui/page/page';
export default {
    data() {
        return {
            enroll: "Enroll Image",
            detect: "Detect Image",
        }
    },
    methods: {
        Enroll(){
            this.$navigateTo(Enroll, {clearHistory: true})
        },
        Detect(){
            this.$navigateTo(Detect, {clearHistory: true})
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
.enrollBtn{
    background-color: whitesmoke;
    width: 60%;
    color: black;
    margin-top: 10px;
}
</style>

