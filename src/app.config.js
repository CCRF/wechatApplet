export default defineAppConfig({
    // 在这里写跳转路径
    pages: [
        'pages/index/index',
        'pages/mber/renewal/renewal',
        'pages/mber/member',
        'pages/mber/membercenter/membercenter',
        'pages/mber/detailrules/index',
        'pages/mber/cardvouchercenter/index',
        'pages/mber/phonelibrary/index',
        'pages/mber/integralcenter/index',
        'pages/mber/phonelibrary/phonenumber/index',
        'pages/order/index',
        'pages/order/theCurrentOrder',
        'pages/order/theHistoryOrder',
        'pages/ordering/index',
        'pages/personal/index',

    ],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '返回',
        navigationBarTextStyle: 'black'
    },
    tabBar: {
        color: "#626567",
        selectedColor: "#2A8CE5",
        backgroundColor: "#FBFBFB",
        borderStyle: "white",
        list: [{
            pagePath: "pages/index/index",
            text: "首页",
            iconPath: "./image/members/index.png",
            selectedIconPath: "./image/members/index_focus.png"
        },
            {
                pagePath: "pages/ordering/index",
                text: "点餐",
                iconPath: "./image/members/discovery.png",
                selectedIconPath: "./image/members/discovery_focus.png"
            },
            {
                pagePath: "pages/order/index",
                text: "订单",
                iconPath: "./image/members/discovery.png",
                selectedIconPath: "./image/members/discovery_focus.png"
            },
            {
                pagePath: "pages/mber/member",
                text: "我的",
                iconPath: "./image/members/burger.png",
                selectedIconPath: "./image/members/burger_focus.png"
            }]
    },
    // subPackages: [
    //     {
    //         "root": "pages/order/",
    //         "pages": []
    //     },
    //     {
    //         "root": "pages/ordering/",
    //         "pages": []
    //     },
    //     {
    //         "root": "pages/personal/",
    //         "pages": []
    //     }
    // ]
})
