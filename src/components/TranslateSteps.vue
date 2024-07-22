    
<template>

<div class="mt-3">
  <Stepper value="1">
    <StepItem value="1">
      <Step><b class="text-lg">Select The Translate Type: </b></Step>
      <StepPanel>
        <ButtonList @updated="onUpdateSelect" />
      </StepPanel>
    </StepItem>
  </Stepper>
</div>

<div class="mt-3">
  <Stepper value="2" >
    <StepItem value="2">
      <Step><b class="text-lg">Select The Translate Model: </b></Step>
      <StepPanel>
        <Selection @updated="onUpdateModel" />
      </StepPanel>
    </StepItem>
  </Stepper>
</div>

<div class="mt-3">
  <Stepper value="3">
    <StepItem value="3">
      <Step><b class="text-lg">Enter / Upload the Content You Want to Translate: </b></Step>
      <StepPanel>
        <Message severity="success">* Please click " <i class="pi pi-arrow-right"></i> " to start the translation.</Message>
        <div class="grid grid-nogutter mt-3 align-items-start" v-if="translateText">
          <TextareaBox class="col" label="Original Content" 
                      :hasModel="translateModel != ''"
                      @updated="onUpdateTextareaContent" />
          <div class="col-1 text-center align-self-center">
            <Button icon="pi pi-arrow-right" text rounded aria-label="Translate" @click="translate" />
          </div>
          <TextareaBox class="col" label="Translated Content"
                      :isInProgress="isInProgress"
                      :isTranslated="true"
                      :transltedContent="transltedContent"  />
        </div>
      </StepPanel>
    </StepItem>
  </Stepper>
</div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ButtonList from './ButtonList.vue';
import Selection from './Selection.vue';
import TextareaBox from './TextareaBox.vue';
import { translateService } from '@/services/ollamaService'

export default defineComponent({
  name: 'TranslateSteps',
  components: {
    ButtonList,
    Selection,
    TextareaBox,
  },
  setup() {
    const translateText = ref<boolean>(true);
    const translateModel = ref<string>('');
    const originalContent = ref<string>('');
    const transltedContent = ref<string>('');
    const isInProgress = ref<boolean>(false);

    function onUpdateSelect(selectedVal: string):void {
      if (selectedVal != null) {
        selectedVal == 'Text' && (translateText.value = true);
        selectedVal == 'Excel File' && (translateText.value = false);
      }
    }

    function onUpdateModel(selectedVal: string):void {
      translateModel.value = selectedVal;
    }

    function onUpdateTextareaContent(updatedContent: string):void {
      originalContent.value = updatedContent;
    }

    async function translate() {
      if (originalContent.value) {
        console.log("model: " + translateModel.value)
        console.log("original content: " + originalContent.value)
        isInProgress.value = true;
        transltedContent.value = await translateService(originalContent.value, translateModel.value);
      }
    }

    return {
      translateText,  // true: translate text, false: translate file
      onUpdateSelect,
      onUpdateModel,
      onUpdateTextareaContent,
      transltedContent,
      translateModel,
      translate,
      isInProgress,
    };
  }
});
</script>