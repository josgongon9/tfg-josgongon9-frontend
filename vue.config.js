module.exports = {
  /*axios: {
    proxy: true,
    host: "localhost",
    prefix: "/api/"
  },
  proxy: {
    "/api/": process.env.PROXY_API || "http://localhost:8080/"
  },*/
  devServer: {
    proxy: `${process.env.PROXY_API}`,

  }

}