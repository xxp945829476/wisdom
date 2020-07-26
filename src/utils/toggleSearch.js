let toggleSearch = {
  data() {
    return {
      advanced: false
    }
  },
  methods: {
    toggleSearch(){
      this.advanced = !this.advanced
    }
  }
}
export default toggleSearch;