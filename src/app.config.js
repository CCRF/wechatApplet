export default defineAppConfig({
  pages: [
    'pages/index/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '返回',
    navigationBarTextStyle: 'black'
  },
  subPackages: [
    {
      "root": "pages/order/",
      "pages": [
        "index",
        "theCurrentOrder",
          "theHistoryOrder",
      ]
    },
    {
      "root": "pages/ordering/",
      "pages": [
        "index"
      ]
    },
    {
      "root": "pages/personal/",
      "pages": [
        "index"
      ]
    }
  ]
})
