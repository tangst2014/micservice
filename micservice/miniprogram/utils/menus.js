var agentMenus = {
  activeUrl: 'datas',
  list:[{
    "pagePath": "pages/addtasks/addtasks",
    "text": "添加",
    "iconPath": "images/tabbar/add2.png",
    "selectedIconPath": "images/tabbar/add1.png"
  },{
    "pagePath": "pages/mime/mime",
    "text": "我的",
    "iconPath": "images/tabbar/mime2.png",
    "selectedIconPath": "images/tabbar/mime1.png"
  }]
}

var masterMenus = {
  activeUrl: 'datas',
  list:[{
    "pagePath": "pages/stacis/stacis",
    "text": "统计",
    "iconPath": "images/tabbar/mime2.png",
    "selectedIconPath": "images/tabbar/mime1.png"
  }]
}

module.exports = {
  agentMenuData: agentMenus,
  masterMenuData: masterMenus
}