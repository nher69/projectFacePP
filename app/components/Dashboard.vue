<template>
    <Page class="page"  actionBarHidden="true"> 
        <ActionBar title="Dashboard" class="action-bar" />
            <ScrollView>
                <StackLayout class="home-panel">
                    <Image class="logo" style="margin-top: 10%;" src="~/res/logo.png" />
                    <Button text="Back" class="loginBtn" style="margin-top:20px; width: 200px;" @tap="Home"></Button>
                    
                </StackLayout>
            </ScrollView>
    </Page>

   
</template>
<script>
import Home from "./Home.vue";
export default {
    data() {
        return {
            
        };
    },
    methods:{
        Home(){
            this.$navigateTo(Home, {clearHistory: true})
        }
    }
    
}
</script>

<style scoped>
.logo{
    text-align: center;
    height: 700px;
    width: 700px;
}
.action-bar{
    background-color: darkblue;
}
.page{
    background-color: darkblue;
    padding-top: 20%;
    color:white;
}

</style>

