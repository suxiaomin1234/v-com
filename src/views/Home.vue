<template>
  <div>
    <div id="date" style="position: relative;">
      <input type="text" id="inputdate" />
    </div>
  </div>
</template>

<script>
import DateJs from '../../src/assets/js/date.js'
import { onMounted } from '@vue/runtime-core'

export default {
  components: {
    
  },
  setup() {
    onMounted(() => {
      new DateJs({
        inputEl: '#inputdate',
        el: '#date'
      })
    })
    return
  }
}
</script>
