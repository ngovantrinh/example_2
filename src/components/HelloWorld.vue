<template>
  <div>
    <!-- <input type="file" name="" id="" @change="onChangeFile" /> -->
    <h1>hello</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup() {
    function onChangeFile(e) {
      console.log('HelloWorld', e);
    }
    return {
      onChangeFile,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
