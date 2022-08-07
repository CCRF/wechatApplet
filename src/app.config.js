export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/mber/renewal/renewal',
    'pages/mber/member',
    'pages/mber/membercenter/membercenter',
    'pages/mber/detailrules/index',
    'pages/mber/cardvouchercenter/index',
    'pages/mber/phonelibrary/index',
    'pages/mber/integralcenter/index',
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
        "index"
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
