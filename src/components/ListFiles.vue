<template>
  <div class="list-file">
    <div v-for="(item, index) in listFiles" :key="index" class="file-item">
      <div class="item-logo">
        <img
          v-if="item.type === 'text/plain'"
          src="../assets/images/excel.png"
          alt=""
        />
        <img
          v-else-if="item.type === 'application/pdf'"
          src="../assets/images/pdf.png"
          alt=""
        />
        <img
          v-else-if="item.type === 'image/png' || 'image/jpg'"
          src="../assets/images/word.png"
          alt=""
        />
      </div>
      <div class="item-detail">
        <p>{{ item.name }}</p>
        <p>{{ item.size.toLocaleString() }}kb</p>
      </div>
      <div class="delete-icon">
        <img
          @click="handleIdDelete(index)"
          src="../assets/images/delete.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListFile',
  props: {
    listFiles: {
      type: [Array, Object],
    },
  },
  methods: {
    handleIdDelete(index) {
      this.$emit('onDelete', { index });
    },
  },
};
</script>

<style scoped>
.list-file {
  display: flex;
  width: 50%;
  margin: 0 auto;
  margin-top: 25px;
  column-gap: 17px;
}
.file-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  column-gap: 4px;
  width: 244px;
}
.file-item .item-detail {
  max-width: 162px;
  overflow: hidden;
}
.file-item .delete-icon img {
  cursor: pointer;
}
.file-item .item-logo img {
  max-width: 32px;
  max-height: 40px;
}
</style>
