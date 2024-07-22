    
<template>
  <div class="card flex justify-center">
    <Select v-model="selectedOption" :options="options" optionLabel="name" placeholder="Select the translate model" class="w-full md:w-56" @update:model-value="handleUpdate" />
  </div>
</template>

  
<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'Selection',
  emits: ['updated'],
  setup(_, { emit }) {
    interface ModelOpt {
      name: String;
      code: String;
    }
    const options = ref<ModelOpt[]>([
      { name: 'llama2-zh-to-en (Chinese to English)', code: 'English' },
      { name: 'llama2-en-to-zh (English to Chinese)', code: 'Chinese' },
    ]);
    const selectedOption = ref<string>();

    function handleUpdate(val: ModelOpt):void {
      console.log(val.code)
      emit('updated', val.code);
    }

    return {
      selectedOption,
      options,
      handleUpdate,
    };
  },
})
</script>