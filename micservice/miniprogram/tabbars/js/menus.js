/* 背景颜色一览：
red:嫣红  orange:桔橙 yellow:明黄 olive:橄榄  green:森绿；
cyan:天青  blue:海蓝  purple:姹紫  mauve:木槿 pink:桃粉；
brown:棕褐 grey:玄灰  gray:草灰  black:墨黑 white:雅白 */
var staffMenus = {
  activeUrl: 'netindex',
  list:[{
    currentUrl:"netindex",
    unCheckImgUrl:"/assets/images/tabbar/index.png",
    checkedImgUrl:"/assets/images/tabbar/index_cur.png",
    btnType: 0,
    title:"主页"
  },{
    currentUrl:"maintenance",
    unCheckImgUrl:"/assets/images/tabbar/add.png",
    checkedImgUrl:"/assets/images/tabbar/add_cur.png",
    btnType: 0,
    title:"添加"
  },{
    currentUrl:"mine",
    unCheckImgUrl:"/assets/images/tabbar/mime.png",
    checkedImgUrl:"/assets/images/tabbar/mime_cur.png",
    btnType: 0,
    title:"我的"
  }]
}

var agentMenus = {
  activeUrl: 'todo',
  list:[{
    currentUrl:"todo",
    unCheckImgUrl:"/assets/images/tabbar/todo.png",
    checkedImgUrl:"/assets/images/tabbar/todo_cur.png",
    btnType: 0,
    title:"待办"
  },{
      currentUrl: "done",
      unCheckImgUrl: "/assets/images/tabbar/done.png",
      checkedImgUrl: "/assets/images/tabbar/done_cur.png",
      btnType: 0,
      title: "已办"
    }]
}

var masterMenus = {
  activeUrl: 'datas',
  list:[{
    currentUrl:"datas",
    unCheckImgUrl:"/assets/images/tabbar/index.png",
    checkedImgUrl:"/assets/images/tabbar/index_cur.png",
    btnType:0,
    title:"主页"
  },{
    currentUrl:"monitor",
    unCheckImgUrl:"/assets/images/tabbar/staff.png",
    checkedImgUrl:"/assets/images/tabbar/staff_cur.png",
    btnType: 0,
    title:"统计"
  }]
}

module.exports = {
  staffMenuData: staffMenus,
  agentMenuData: agentMenus,
  masterMenuData: masterMenus
}
