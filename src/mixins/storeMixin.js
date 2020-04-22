import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('user', {
      '$md5SaltedPwd': 'md5SaltedPwd',
      '$villageId': 'villageId',
      '$villageName': 'villageName',
      '$userId': 'userId',
      '$userName': 'userName'
    }),
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    closeCurrentTag() {
      // this.$store.dispatch('tagsView/delView', this.$route)
      const view = this.$route
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView)
      } else {
        this.$router.push('/')
      }
    }
  }
}
