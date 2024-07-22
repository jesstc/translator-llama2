    
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
        <div class="grid grid-nogutter mt-2 align-items-start" v-if="translateText">
          <TextareaBox class="col" label="Original Content" 
                      :hasModel="translateModel != ''"
                      @updated="onUpdateTextareaContent" />
          <div class="col-1 text-center align-self-center">
            <i class="pi pi-arrow-right" style="color: 'var(--p-primary-color)'"></i>
          </div>
          <TextareaBox class="col" label="Translated Content"
                      :isTranslated="true"
                      :transltedContent="transltedContent"  />
        </div>
        <!-- <div class="grid grid-nogutter mt-2 align-items-start" v-else>
          <TextareaBox class="col" label="Original Content" />
          <div class="col-1 text-center align-self-center">
            <i class="pi pi-arrow-right" style="color: 'var(--p-primary-color)'">aaa</i>
          </div>
          <TextareaBox class="col" label="Translated Content" :isTranslated="true" />
        </div> -->
      </StepPanel>
    </StepItem>
  </Stepper>
</div>

</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import ButtonList from './ButtonList.vue';
import Selection from './Selection.vue';
import TextareaBox from './TextareaBox.vue';
import { translateText } from '@/services/ollamaService'

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
    const transltedContent = ref<string>('');
    // translateText(chatInput.value, 'English');

    function onUpdateSelect(selectedVal: string):void {
      console.log("father(type): ", selectedVal);
      if (selectedVal != null) {
        selectedVal == 'Text' && (translateText.value = true);
        selectedVal == 'Excel File' && (translateText.value = false);
      }
    }

    function onUpdateModel(selectedVal: string):void {
      console.log("father(model): ", selectedVal);
      translateModel.value = selectedVal;
    }

    function onUpdateTextareaContent(updatedContent: string):void {
      console.log("father(textarea): ", updatedContent);
      translateModel.value = updatedContent;
    }

    return {
      translateText,  // true: translate text, false: translate file
      onUpdateSelect,
      onUpdateModel,
      onUpdateTextareaContent,
      transltedContent,
      translateModel,
    };
  }
});
</script>