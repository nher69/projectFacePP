<template>
	<Page xmlns:Cam="@nstudio/nativescript-camera-plus">
  <Page.actionBar>
    <ActionBar title="Camera Plus Demo" icon=""></ActionBar>
  </Page.actionBar>
    <StackLayout>
      <Cam:CameraPlus id="camPlus"
        saveToGallery="true"      
        showCaptureIcon="true"
        showGalleryIcon="true"
        showToggleIcon="true"       
        showFlashIcon="true"
        debug="true">
      </Cam:CameraPlus>
    </StackLayout>
</Page>
</template>

<script>
import { topmost } from 'tns-core-modules/ui/frame';
import { fromAsset } from 'tns-core-modules/image-source';
import { CameraPlus } from '@nstudio/nativescript-camera-plus';

 
cam.on(CameraPlus.photoCapturedEvent, args => {
  fromAsset(args.data).then(result => {
    // result is an ImageSource that we got by using fromAsset in the image-source module.
  });
});
</script>