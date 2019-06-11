<template>
	<Page class="page">
		<ActionBar title="Kairos" class="action-bar" />
        
        <StackLayout>
            
            <Button :text="enroll" class="btn btn-primary" marginTop="20" @tap="Enroll"></Button>
            <!-- <Image :src="pictureFromCamera"></Image> -->
            <!-- <Button :text="detect" class="btn btn-primary" marginTop="20" @tap="Detect"></Button> -->
        </StackLayout>
	</Page>
</template>

<script>
import * as Toast from 'nativescript-toast';
import Login from "./Login.vue";
export default {
    data() {
        return {
            enroll: "Enroll Image to Kairos",
            detect: "Detect Image to Kairos",
        }
    },
    methods: {
        Enroll(){
             this.$navigateTo(Login, {clearHistory: true})
        },
        Detect(){
             this.$navigateTo(Cam, {clearHistory: true})
        }
    }
}


</script>
