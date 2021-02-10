export default {
  methods: {
    async deleteDocument (document) {
      await this.$api.getService('documents').remove(document._id)
    }
  }
}
