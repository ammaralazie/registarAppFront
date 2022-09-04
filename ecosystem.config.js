module.exports = {
    apps: [
      {
        name: 'register',
        exec_mode: 'cluster',
        instances: 1, // Or a number of instances
        script: './node_modules/nuxt/bin/nuxt.js',
        args: 'start'
      }
    ]
  }