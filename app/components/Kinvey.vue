<template>
    <Page class="page">
        <ActionBar title="Home" class="action-bar" />
            <ScrollView>
                <StackLayout class="home-panel">
            
                    <Button text="login" class="loginBtn" marginTop="20" @tap="onTakePictureTap"></Button>
                    <Button text="Get from URL" @tap="callAPI"/>
                    <Button text="Post JSON" @tap="axss" />
                </StackLayout>
            </ScrollView>
    </Page>
</template>

<script>

</script>
