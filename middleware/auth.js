export default function ({ $auth, router, next }) {
    router.beforeEach((to, from, next) => {
        if (to.path !== '/login' && !$auth.loggedIn) next('/login')
        else next()
    })
}