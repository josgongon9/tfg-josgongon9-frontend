/*const path = require('path',)

module.exports = {
  /*axios: {
    proxy: true,
    host: "localhost",
    prefix: "/api/"
  },
  proxy: {
    "/api/": process.env.PROXY_API || "http://localhost:8080/"
  },*/
/*devServer: {
  proxy: {
    "/api/":{
      target: process.env.PROXY_API || "http://localhost:8080/"
    } 
  }
}

}*/

module.exports = {
  devServer: {
    // 'auto' | 'all' [string] here
    allowedHosts: 'all',
    proxy: {
      "/api/": {
        target: "https://tfg-josgongon9-backend.herokuapp.com/",
        secure: false,
      }
    }
  },
};