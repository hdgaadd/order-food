webpackJsonp([1],{"3gbL":function(t,e){},"7fJB":function(t,e){},E51W:function(t,e){},ETvQ:function(t,e){},"Kc/n":function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("7+uW"),n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var s=a("VU/8")({name:"App"},n,!1,function(t){a("s347")},null,null).exports,i=a("/ocq"),r=a("mvHQ"),c=a.n(r),l="/api",u="",d="//qc.fangwei6.com";u="//static.fangwei6.com";var m={data:function(){return{baseUrl:l,baseImgPath:u,websocketUrl:d,loading:!1,tableData:[],tagsData:[],table_id:3,clos:2,socket:null,drawer:{open:!1,docked:!1},addCartBottomSheet:{open:!1},chooseGoods:{id:0,note:"",cart_num:0},tag_name:"全部菜品",cartNum:0,cartNumStr:"0",callLog:{content:""},callTags:[],callLogDialog:!1,mainBtnColor:"#FF0099",menu:[{id:2,icon:"event_note",title:"查看订单",color:"#ee9390"}]}},created:function(){this.table_id=this.$route.query.table_id;var t=window.localStorage;t.access_token=this.$route.query.token,t.table_id=this.table_id,this.initPlugin(),this.initData()},methods:{initPlugin:function(){var t=this;this.loading=!0;var e=this;e.$api.get("/consumer/plugins",null,function(a){if(a.status>=200&&a.status<300){var o=a.data;0==o.code&&(e.plugins=o.data.plugins,e.plugins.forEach(function(t,a){"228add581e703d931dd08d8edd8283d9"==t.uuid?e.menu.push({id:3,icon:"money",title:"钱包",color:"#ee9390"}):"28a605845f825b7bd950e423ea90c6d8"==t.uuid&&e.menu.push({id:1,icon:"phone_in_talk",title:"呼叫服务员",color:"#ff9900"})}))}t.loading=!1})},initData:function(){var t=this,e=document.body.clientWidth;this.clos=parseInt(e/200);window.localStorage.share_pwd;this.loading=!0;var a=this;a.$api.get("/consumer/cart/table/"+this.table_id,null,function(e){if(e.status>=200&&e.status<300){var o=e.data;if(0==o.code){if(null!=o.data.share_cart)window.localStorage.user=c()(o.data.user),null==t.socket&&t.initWebsocket();else null!=t.socket&&(t.socket.close(),t.socket=null);if(null!=o.data.share_cart)window.localStorage.share_consumer_count=o.data.share_cart.consumerList.length;if("全部菜品"==a.tag_name)a.tableData=o.data.goods,a.tagsData=[],a.tagsData.push("全部菜品"),a.tableData.forEach(function(t,e){a.tableData[e].mainPic=a.baseImgPath+"/api"+t.pics[0].url,t.goodsTags.forEach(function(t,e){a.in_array(t.name,a.tagsData)||a.tagsData.push(t.name)})});else{var n=o.data.goods;a.tagsData=[],a.tagsData.push("全部菜品"),a.tableData=[],n.forEach(function(t,e){n[e].mainPic=a.baseImgPath+"/api"+t.pics[0].url,t.goodsTags.forEach(function(e,o){a.in_array(e.name,a.tagsData)||a.tagsData.push(e.name),e.name!=a.tag_name||a.in_array(t,a.tableData)||a.tableData.push(t)})})}console.log("======="),console.log(a.tagsData);var s=o.data.carts;t.cartNum=0,s.forEach(function(t,e){a.cartNum+=t.num}),t.cartNumStr=""+t.cartNum}}t.loading=!1})},sureAddCart:function(){var t=this;this.addCartBottomSheet.open=!1;this.$api.post("/consumer/cart/table/"+this.table_id+"/goods/"+this.chooseGoods.id,{num:this.chooseGoods.cart_num,note:this.chooseGoods.note},function(e){if(e.status>=200&&e.status<300){var a=e.data;0==a.code?(t.cartNum++,t.cartNumStr=""+t.cartNum):t.$message({message:a.msg,type:"warning"})}else t.$message({message:"服务器维护中",type:"error"});t.loading=!1})},chooseTagGoods:function(t){this.tag_name=t,this.drawer.open=!1,this.initData()},openAddCartBottomSheet:function(t){t.cart_num++,this.chooseGoods.id=t.id,this.chooseGoods.note=null==t.note?"":t.note,this.chooseGoods.cart_num=t.cart_num,0==t.cart_num?this.addCartBottomSheet.open=!0:this.sureAddCart()},addNoteTag:function(t){this.chooseGoods.note+=" "+t},addNCallTag:function(t){this.callLog.content+=" "+t},goCart:function(){this.$router.push("/carts")},goOrders:function(){this.$router.push("/orders")},goBalance:function(){this.$router.push("/balance")},clickItem:function(t){console.log("idx: "+t.id),1==t.id?this.openCallDialog():2==t.id?this.goOrders():3==t.id&&this.goBalance()},clickMainBtn:function(){console.log("clickMainBtn")},openCallDialog:function(){var t=this;this.callLogDialog=!1,this.loading=!0;this.$api.get("/consumer/call",null,function(e){if(e.status>=200&&e.status<300){var a=e.data;0==a.code?(t.callTags=a.data.callTags,t.callLog.content="",t.callLogDialog=!0):t.$message({message:"本功能即将上线",type:"warning"})}else t.$message({message:"服务器维护中",type:"error"});t.loading=!1})},saveCallLog:function(){var t=this;""==this.callLog.content&&this.$message({message:"请输入您要呼叫的服务内容",type:"warning"}),this.callLogDialog=!1;this.$api.post("/consumer/call/table/"+this.table_id,this.callLog,function(e){if(e.status>=200&&e.status<300){var a=e.data;0==a.code?t.$message({message:"呼叫成功",type:"success"}):t.$message({message:a.msg,type:"warning"})}else t.$message({message:"服务器维护中",type:"error"});t.loading=!1})},in_array:function(t,e){for(var a in e)if(e[a]==t)return!0;return!1},initWebsocket:function(){if("undefined"==typeof WebSocket)alert("您的浏览器不支持订单提醒推送");else{var t=window.localStorage,e=JSON.parse(t.user),a="ws:"+d+"/websocket/"+e.user.id;this.socket=new WebSocket(a),this.socket.onopen=this.open,this.socket.onerror=this.error,this.socket.onmessage=this.getMessage,console.log(a)}},open:function(){console.log("socket连接成功")},error:function(){console.log("连接错误")},getMessage:function(t){var e=t.data;e=JSON.parse(e),console.log(e),5==e.type&&(this.initData(),"add_goods"==e.params.action?this.$message({message:e.params.cart.goods.name,type:"success",duration:1500}):"join_share_cart"==e.params.action?this.$message({message:e.params.user.nickName+"通过暗号加入了点餐",type:"success",duration:1500}):"exit_share_cart"==e.params.action?this.$message({message:e.params.user.nickName+" 退出了点餐",type:"success",duration:1500}):"del_share_cart"==e.params.action&&(this.$message({message:"暗号点餐已解散",type:"success",duration:1500}),this.sureExitShareCart()))},send:function(){},close:function(){console.log("socket已经关闭")}},destroyed:function(){null!=this.socket&&(this.socket.onclose=this.close,this.socket.close(),this.socket=null)}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("mu-appbar",{staticStyle:{width:"100%"},attrs:{color:"primary"}},[a("mu-button",{attrs:{slot:"left",icon:""},nativeOn:{click:function(e){t.drawer.open=!t.drawer.open}},slot:"left"},[a("mu-icon",{attrs:{value:"menu"}})],1),t._v("\n        "+t._s(t.tag_name)+"\n      "),t._v(" "),a("mu-button",{attrs:{slot:"right",flat:""},on:{click:function(e){return t.goCart()}},slot:"right"},[t.cartNum>0?a("mu-badge",{attrs:{content:t.cartNumStr,circle:"",color:"secondary"}},[a("mu-icon",{attrs:{value:"shopping_cart"}})],1):a("mu-icon",{attrs:{value:"shopping_cart"}})],1)],1),t._v(" "),a("mu-drawer",{attrs:{open:t.drawer.open,docked:t.drawer.docked},on:{"update:open":function(e){return t.$set(t.drawer,"open",e)}}},[a("mu-sub-header",[t._v("选择菜品分类")]),t._v(" "),a("mu-list",t._l(t.tagsData,function(e,o){return a("mu-list-item",{key:o,attrs:{button:""},on:{click:function(a){return t.chooseTagGoods(e)}}},[a("mu-list-item-title",[t._v(t._s(e))])],1)}),1)],1),t._v(" "),a("br"),t._v(" "),a("mu-grid-list",{attrs:{cols:t.clos}},t._l(t.tableData,function(e,o){return a("mu-grid-tile",{key:o},[a("img",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e.mainPic}}),t._v(" "),a("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.name))]),t._v(" "),a("span",{attrs:{slot:"subTitle"},slot:"subTitle"},[t._v("￥"),a("b",[t._v(t._s(e.sell_price/100))]),e.cart_num>0?a("span",[t._v(" x "+t._s(e.cart_num))]):t._e()]),t._v(" "),a("mu-button",{attrs:{slot:"action",large:"",color:"red",icon:""},on:{click:function(a){return t.openAddCartBottomSheet(e)}},slot:"action"},[e.cart_num>0?a("mu-icon",{attrs:{value:"shopping_cart"}}):a("mu-icon",{attrs:{value:"remove_shopping_cart"}})],1)],1)}),1),t._v(" "),a("mu-bottom-sheet",{attrs:{open:t.addCartBottomSheet.open},on:{"update:open":function(e){return t.$set(t.addCartBottomSheet,"open",e)}}},[a("mu-sub-header",[t._v("您有什么要特别交待的可以写在下面")]),t._v(" "),a("div",{staticStyle:{padding:"20px","text-align":"center"}},[a("el-input",{attrs:{type:"textarea",rows:4,placeholder:"请输入备注内容"},model:{value:t.chooseGoods.note,callback:function(e){t.$set(t.chooseGoods,"note",e)},expression:"chooseGoods.note"}}),t._v(" "),a("br"),t._v(" "),a("p",[a("el-tag",{attrs:{type:"success"},on:{click:function(e){return t.addNoteTag("大辣")}}},[t._v("大辣")]),t._v(" "),a("el-tag",{attrs:{type:"success"},on:{click:function(e){return t.addNoteTag("中辣")}}},[t._v("中辣")]),t._v(" "),a("el-tag",{attrs:{type:"success"},on:{click:function(e){return t.addNoteTag("小辣")}}},[t._v("小辣")]),t._v(" "),a("el-tag",{attrs:{type:"success"},on:{click:function(e){return t.addNoteTag("少盐")}}},[t._v("少盐")]),t._v(" "),a("el-tag",{attrs:{type:"success"},on:{click:function(e){return t.addNoteTag("多盐")}}},[t._v("多盐")]),t._v(" "),a("el-tag",{attrs:{type:"success"},on:{click:function(e){return t.addNoteTag("少油")}}},[t._v("少油")]),t._v(" "),a("el-tag",{attrs:{type:"success"},on:{click:function(e){return t.addNoteTag("多油")}}},[t._v("多油")])],1),t._v(" "),a("br"),t._v(" "),a("mu-button",{attrs:{color:"success"},on:{click:t.sureAddCart}},[a("mu-icon",{attrs:{left:"",value:"shopping_cart"}}),t._v("\n        加入购物车\n      ")],1)],1)],1),t._v(" "),a("mu-bottom-sheet",{attrs:{open:t.callLogDialog},on:{"update:open":function(e){t.callLogDialog=e}}},[a("div",{staticStyle:{padding:"20px","text-align":"center"}},[a("el-input",{attrs:{type:"textarea",rows:4,placeholder:"请输入您想要呼叫的服务内容"},model:{value:t.callLog.content,callback:function(e){t.$set(t.callLog,"content",e)},expression:"callLog.content"}}),t._v(" "),a("br"),t._v(" "),a("p",t._l(t.callTags,function(e,o){return a("el-tag",{key:o,attrs:{type:"success"},on:{click:function(a){return t.addNCallTag(e.content)}}},[t._v(t._s(e.content))])}),1),t._v(" "),a("br"),t._v(" "),a("mu-button",{on:{click:function(e){t.callLogDialog=!1}}},[t._v("\n        取消\n      ")]),t._v(" "),a("mu-button",{attrs:{color:"success"},on:{click:t.saveCallLog}},[t._v("\n        确定\n      ")])],1)]),t._v(" "),a("vue-fab",{attrs:{mainBtnColor:t.mainBtnColor,icon:"face",fabAnimateBezier:"ease-in-out",fabItemAnimate:"alive",fabAliveAnimateBezier:"ease"},on:{clickMainBtn:t.clickMainBtn}},t._l(t.menu,function(e,o){return a("fab-item",{key:o,attrs:{size:"big",idx:e.id,title:e.title,color:e.color,icon:e.icon},on:{clickItem:function(a){return t.clickItem(e)}}})}),1)],1)},staticRenderFns:[]};var g=a("VU/8")(m,p,!1,function(t){a("7fJB")},null,null).exports,_={data:function(){return{baseUrl:l,baseImgPath:u,websocketUrl:d,loading:!1,deleteAlertDialog:!1,createOrderAlertDialog:!1,tableData:[],table_id:3,showShareCartBtn:!1,addCartBottomSheet:{open:!1},chooseGoods:{id:0,note:"",cart_num:0},tag_name:"全部菜品",cartNum:0,totalPrice:0,cartNumStr:"0",deleteCart:{},cart:{table_id:0,note:"",people_num:"1",share_pwd:""},cartPwdAlertDialog:!1,exitShareCartAlertDialog:!1,socket:null}},created:function(){var t=window.localStorage;this.table_id=t.table_id,this.initData(),this.initPlugin()},methods:{initData:function(){var t=this,e=document.body.clientWidth;this.clos=parseInt(e/255),this.loading=!0;var a=this;a.$api.get("/consumer/cart/table/"+this.table_id,{share_pwd:this.cart.share_pwd},function(e){if(e.status>=200&&e.status<300){var o,n=e.data;if(0==n.code)if(a.totalPrice=0,a.cartNum=0,a.tableData=n.data.carts,a.tagsData=[],a.tagsData.push("全部菜品"),a.tableData.forEach(function(t,e){a.cartNum+=t.num,a.totalPrice+=t.num*t.goods.sell_price,a.tableData[e].mainPic=a.baseImgPath+"/api"+t.goods.pics[0].url}),t.cartNumStr=""+t.cartNum,null!=n.data.share_cart)t.cart.share_pwd=n.data.share_cart.sharePassword,(o=window.localStorage).share_pwd=n.data.share_cart.sharePassword,t.cart.people_num=o.share_consumer_count=n.data.share_cart.consumerList.length,null==t.socket&&t.initWebsocket();else t.cart.share_pwd="",(o=window.localStorage).share_pwd="",null!=t.socket&&(t.socket.close(),t.socket=null);else t.$message({message:n.msg,type:"warning"})}else t.$message({message:"服务器维护中",type:"error"});t.loading=!1})},openSetSharePwdDialog:function(){this.cartPwdAlertDialog=!0},exitSharePwdDialog:function(){this.exitShareCartAlertDialog=!0},sureExitShareCart:function(){var t=this;this.loading=!0;this.$api.delete("/consumer/cart/table/"+this.table_id+"/share_cart",null,function(e){if(e.status>=200&&e.status<300){var a=e.data;if(0==a.code)window.localStorage.share_pwd=t.cart.share_pwd="",t.initData(),t.exitShareCartAlertDialog=!1;else t.$message({message:a.msg,type:"warning"})}else t.$message({message:"服务器维护中",type:"error"});t.loading=!1})},setSharePwd:function(){window.localStorage.share_pwd=this.cart.share_pwd,this.initData(),this.cartPwdAlertDialog=!1},sureAddCart:function(){var t=this;this.addCartBottomSheet.open=!1;this.$api.post("/consumer/cart/table/"+this.table_id+"/goods/"+this.chooseGoods.id,{num:this.chooseGoods.cart_num,note:this.chooseGoods.note},function(e){if(e.status>=200&&e.status<300){var a=e.data;0==a.code?t.initData():t.$message({message:a.msg,type:"warning"})}else t.$message({message:"服务器维护中",type:"error"});t.loading=!1})},createOrder:function(){var t=this;this.cart.table_id=this.table_id,this.loading=!0;this.createOrderAlertDialog=!1,this.$api.post("/consumer/orders/"+this.cart.table_id,this.cart,function(e){if(e.status>=200&&e.status<300){var a=e.data;0==a.code?t.$router.push({path:"/orderDetail",query:{order_id:a.data.order.id}}):t.$message({message:a.msg,type:"warning"})}else t.$message({message:"服务器维护中",type:"error"});t.loading=!1})},chooseTagGoods:function(t){this.tag_name=t,this.drawer.open=!1,this.initData()},openCreateOrderDialog:function(){this.cart.note="",this.createOrderAlertDialog=!0},openAddCartBottomSheet:function(t){this.chooseGoods.id=t.goods.id,this.chooseGoods.note=null==t.note?"":t.note,this.chooseGoods.cart_num=t.num,this.addCartBottomSheet.open=!0},removeNum:function(t){this.chooseGoods.id=t.goods.id,this.chooseGoods.note=null==t.note?"":t.note,1==t.num?this.deleteAlertDialog=!0:(t.num--,this.chooseGoods.cart_num=t.num,this.sureAddCart())},sureDeleteNum:function(t){this.chooseGoods.cart_num=0,this.deleteAlertDialog=!1,this.sureAddCart()},addNum:function(t){t.num++,this.chooseGoods.id=t.goods.id,this.chooseGoods.note=null==t.note?"":t.note,this.chooseGoods.cart_num=t.num,this.sureAddCart()},addNoteTag:function(t){this.chooseGoods.note+=" "+t},in_array:function(t,e){for(var a in e)if(e[a]==t)return!0;return!1},initPlugin:function(){var t=this;this.loading=!0;var e=this;e.$api.get("/consumer/plugins",null,function(a){if(a.status>=200&&a.status<300){var o=a.data;if(0==o.code)o.data.plugins.forEach(function(t,a){"2e3fddb1f64800a7172119086b6d6687"==t.uuid&&(e.showShareCartBtn=!0)})}t.loading=!1})},initWebsocket:function(){if("undefined"==typeof WebSocket)alert("您的浏览器不支持订单提醒推送");else{var t=window.localStorage,e=JSON.parse(t.user),a="ws:"+d+"/websocket/"+e.user.id;this.socket=new WebSocket(a),this.socket.onopen=this.open,this.socket.onerror=this.error,this.socket.onmessage=this.getMessage,console.log(a)}},open:function(){console.log("socket连接成功")},error:function(){console.log("连接错误")},getMessage:function(t){var e=t.data;if(5==(e=JSON.parse(e)).type){if("add_goods"==e.params.action)this.$message({message:e.params.cart.goods.name,type:"success",duration:1500});else if("join_share_cart"==e.params.action)this.$message({message:e.params.user.nickName+" 通过暗号加入了点餐",type:"success",duration:1500});else if("exit_share_cart"==e.params.action)this.$message({message:e.params.user.nickName+" 退出了点餐",type:"success",duration:1500});else if("del_share_cart"==e.params.action){window.localStorage.share_pwd=this.cart.share_pwd="",this.$message({message:"暗号点餐已解散",type:"success",duration:1500})}this.initData()}console.log(e)},send:function(){},close:function(){console.log("socket已经关闭")}},destroyed:function(){null!=this.socket&&(this.socket.onclose=this.close(),this.socket.close(),this.socket=null)}},h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("mu-appbar",{staticStyle:{width:"100%"},attrs:{color:"primary"}},[a("mu-button",{attrs:{slot:"left",icon:""},on:{click:function(e){return t.$router.back(-1)}},slot:"left"},[a("mu-icon",{attrs:{value:"keyboard_arrow_left"}})],1),t._v("\n        购物车\n    "),t.cartNum>0?a("mu-button",{attrs:{slot:"right",color:"red"},on:{click:t.openCreateOrderDialog},slot:"right"},[t._v("\n      确定下单\n    ")]):t._e()],1),t._v(" "),a("br"),t._v(" "),a("mu-list",{attrs:{textline:"two-line"}},[a("mu-sub-header",[a("span",{staticStyle:{"font-size":"25px",color:"red"}},[t._v("共点:"+t._s(t.cartNumStr)+"份菜品,共计:￥"+t._s(t.totalPrice/100))]),t._v(" "),a("br"),t._v(" "),t.showShareCartBtn?a("div",[""==t.cart.share_pwd?a("mu-button",{attrs:{slot:"right",color:"green"},on:{click:t.openSetSharePwdDialog},slot:"right"},[t._v("\n          暗号点餐\n        ")]):a("mu-button",{attrs:{slot:"right",color:"red"},on:{click:t.exitSharePwdDialog},slot:"right"},[t._v("\n          退出暗号点餐("+t._s(t.cart.people_num)+"人)\n        ")])],1):t._e()]),t._v(" "),t._l(t.tableData,function(e,o){return a("div",[a("mu-divider"),t._v(" "),a("mu-list-item",{staticStyle:{"padding-top":"10px","padding-bottom":"10px"},attrs:{avatar:"",button:"",ripple:!1}},[a("mu-list-item-action",{on:{click:function(a){return t.openAddCartBottomSheet(e)}}},[a("mu-avatar",{attrs:{size:"68"}},[a("img",{attrs:{src:e.mainPic}})])],1),t._v(" "),a("mu-list-item-content",{staticStyle:{"margin-left":"10px"}},[a("mu-list-item-title",[a("span",{staticStyle:{"font-size":"20px"}},[t._v(t._s(e.goods.name))])]),t._v(" "),a("mu-list-item-sub-title",[a("span",{staticStyle:{"font-size":"15px"}},[t._v("单价:￥"+t._s(e.goods.sell_price/100))])]),t._v(" "),a("mu-list-item-sub-title",[a("span",{staticStyle:{color:"red","font-size":"15px"}},[t._v("总价:￥"+t._s(e.goods.sell_price*e.num/100))])])],1),t._v(" "),a("mu-list-item-action",[e.num>0?a("mu-button",{attrs:{fab:"",color:"indigo",small:""},on:{click:function(a){return t.removeNum(e)}}},[a("mu-icon",{attrs:{value:"remove"}})],1):t._e()],1),t._v(" "),a("span",{staticStyle:{width:"30px","font-size":"15px"}},[t._v(t._s(e.num))]),t._v(" "),a("mu-list-item-action",[a("mu-button",{attrs:{fab:"",color:"teal",small:""},on:{click:function(a){return t.addNum(e)}}},[a("mu-icon",{attrs:{value:"add"}})],1)],1)],1)],1)})],2),t._v(" "),a("mu-bottom-sheet",{attrs:{open:t.addCartBottomSheet.open},on:{"update:open":function(e){return t.$set(t.addCartBottomSheet,"open",e)}}},[a("mu-sub-header",[t._v("您有什么要特别交待的可以写在下面")]),t._v(" "),a("div",{staticStyle:{padding:"20px","text-align":"center"}},[a("el-input",{attrs:{type:"textarea",rows:4,placeholder:"请输入备注内容"},model:{value:t.chooseGoods.note,callback:function(e){t.$set(t.chooseGoods,"note",e)},expression:"chooseGoods.note"}}),t._v(" "),a("br"),t._v(" "),a("p",[a("el-tag",{attrs:{type:"success"},on:{click:function(e){return t.addNoteTag("大辣")}}},[t._v("大辣")]),t._v(" "),a("el-tag",{attrs:{type:"success"},on:{click:function(e){return t.addNoteTag("中辣")}}},[t._v("中辣")]),t._v(" "),a("el-tag",{attrs:{type:"success"},on:{click:function(e){return t.addNoteTag("小辣")}}},[t._v("小辣")]),t._v(" "),a("el-tag",{attrs:{type:"success"},on:{click:function(e){return t.addNoteTag("少盐")}}},[t._v("少盐")]),t._v(" "),a("el-tag",{attrs:{type:"success"},on:{click:function(e){return t.addNoteTag("多盐")}}},[t._v("多盐")]),t._v(" "),a("el-tag",{attrs:{type:"success"},on:{click:function(e){return t.addNoteTag("少油")}}},[t._v("少油")]),t._v(" "),a("el-tag",{attrs:{type:"success"},on:{click:function(e){return t.addNoteTag("多油")}}},[t._v("多油")])],1),t._v(" "),a("br"),t._v(" "),a("mu-button",{attrs:{color:"success"},on:{click:t.sureAddCart}},[a("mu-icon",{attrs:{left:"",value:"shopping_cart"}}),t._v("\n        加入购物车\n      ")],1)],1)],1),t._v(" "),a("mu-dialog",{attrs:{title:"删除提示",width:"360",open:t.deleteAlertDialog},on:{"update:open":function(e){t.deleteAlertDialog=e}}},[t._v("\n      您确定要移除它吗？\n      "),a("mu-button",{attrs:{slot:"actions",flat:"",color:"danger"},on:{click:function(e){return t.sureDeleteNum()}},slot:"actions"},[t._v("确定")]),t._v(" "),a("mu-button",{attrs:{slot:"actions",flat:"",color:"primary"},on:{click:function(e){t.deleteAlertDialog=!1}},slot:"actions"},[t._v("取消")])],1),t._v(" "),a("mu-dialog",{attrs:{title:"下单确认",width:"360",open:t.createOrderAlertDialog},on:{"update:open":function(e){t.createOrderAlertDialog=e}}},[t._v("\n    就餐人数："),a("el-input-number",{attrs:{min:1,max:1e4,label:"人数"},model:{value:t.cart.people_num,callback:function(e){t.$set(t.cart,"people_num",e)},expression:"cart.people_num"}}),t._v(" "),a("el-input",{staticStyle:{"margin-top":"10px"},attrs:{type:"textarea",rows:4,placeholder:"有悄悄话想告诉我们吗"},model:{value:t.cart.note,callback:function(e){t.$set(t.cart,"note",e)},expression:"cart.note"}}),t._v(" "),a("mu-button",{attrs:{slot:"actions",flat:"",color:"primary"},on:{click:function(e){t.createOrderAlertDialog=!1}},slot:"actions"},[t._v("取消")]),t._v(" "),a("mu-button",{attrs:{slot:"actions",flat:"",color:"danger"},on:{click:function(e){return t.createOrder()}},slot:"actions"},[t._v("确定")])],1),t._v(" "),a("mu-dialog",{attrs:{title:"一起点餐",width:"360",open:t.cartPwdAlertDialog},on:{"update:open":function(e){t.cartPwdAlertDialog=e}}},[a("el-input",{attrs:{placeholder:"大家输入相同暗号即可一起点餐"},model:{value:t.cart.share_pwd,callback:function(e){t.$set(t.cart,"share_pwd",e)},expression:"cart.share_pwd"}}),t._v(" "),a("mu-button",{attrs:{slot:"actions",flat:"",color:"primary"},on:{click:function(e){t.cartPwdAlertDialog=!1}},slot:"actions"},[t._v("取消")]),t._v(" "),a("mu-button",{attrs:{slot:"actions",flat:"",color:"danger"},on:{click:t.setSharePwd},slot:"actions"},[t._v("确定")])],1),t._v(" "),a("mu-dialog",{attrs:{title:"退出提示",width:"360",open:t.exitShareCartAlertDialog},on:{"update:open":function(e){t.exitShareCartAlertDialog=e}}},[1==t.cart.people_num?a("span",[t._v("您是最后一位退出本次“暗号点餐”的客人，退出后将永久解散本次暗号点餐，您确定要这样做吗？")]):a("span",[t._v("您确定不和大家一起点餐了吗？")]),t._v(" "),a("mu-button",{attrs:{slot:"actions",flat:"",color:"danger"},on:{click:function(e){return t.sureExitShareCart()}},slot:"actions"},[t._v("确定")]),t._v(" "),a("mu-button",{attrs:{slot:"actions",flat:"",color:"primary"},on:{click:function(e){t.exitShareCartAlertDialog=!1}},slot:"actions"},[t._v("取消")])],1)],1)},staticRenderFns:[]};var f=a("VU/8")(_,h,!1,function(t){a("ETvQ")},null,null).exports,v={data:function(){return{baseUrl:l,baseImgPath:u,loading:!1,tableData:[],table_id:3}},created:function(){var t=window.localStorage;this.table_id=t.table_id,this.initData()},methods:{initData:function(){var t=this,e=document.body.clientWidth;this.clos=parseInt(e/255),this.loading=!0;var a=this;a.$api.get("/consumer/orders",{table_id:this.table_id},function(e){if(e.status>=200&&e.status<300){var o=e.data;0==o.code?(a.tableData=o.data.orders.content,a.tableData.forEach(function(t,e){t.createTime=a.dateTimeFormat(t.createTime)})):t.$message({message:o.msg,type:"warning"})}else t.$message({message:"服务器维护中",type:"error"});t.loading=!1})},dateTimeFormat:function(t){var e=new Date(t);return e.getFullYear()+"-"+(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-"+(e.getDate()<10?"0"+e.getDate():e.getDate())+" "+(e.getHours()<10?"0"+e.getHours():e.getHours())+":"+(e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())+":"+(e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds())},goOrderDetail:function(t){this.$router.push({path:"/orderDetail",query:{order_id:t.id}})},in_array:function(t,e){for(var a in e)if(e[a]==t)return!0;return!1}}},b={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("mu-appbar",{staticStyle:{width:"100%"},attrs:{color:"primary"}},[a("mu-button",{attrs:{slot:"left",icon:""},on:{click:function(e){return t.$router.back(-1)}},slot:"left"},[a("mu-icon",{attrs:{value:"keyboard_arrow_left"}})],1),t._v("\n        订单列表\n  ")],1),t._v(" "),a("br"),t._v(" "),a("mu-list",{attrs:{textline:"two-line"}},t._l(t.tableData,function(e,o){return a("div",[a("mu-divider"),t._v(" "),a("mu-list-item",{staticStyle:{"padding-top":"10px","padding-bottom":"10px"},attrs:{avatar:"",button:"",ripple:!1}},[a("mu-list-item-content",[a("mu-list-item-title",[a("span",{staticStyle:{"font-size":"20px"}},[t._v("单号："+t._s(e.orderNo))])]),t._v(" "),a("mu-list-item-sub-title",[a("span",{staticStyle:{color:"red","font-size":"15px"}},[t._v("总价：￥"+t._s(e.realPrice/100))]),t._v(" ("+t._s(e.payStatusStr)+")")]),t._v(" "),a("mu-list-item-sub-title",[a("span",{staticStyle:{"font-size":"15px"}},[t._v("创建时间："+t._s(e.createTime))])])],1),t._v(" "),a("mu-list-item-action",[a("mu-button",{attrs:{fab:"",color:"indigo",small:""},on:{click:function(a){return t.goOrderDetail(e)}}},[a("mu-icon",{attrs:{value:"info"}})],1)],1)],1)],1)}),0)],1)},staticRenderFns:[]};var y=a("VU/8")(v,b,!1,function(t){a("rAbf")},null,null).exports,w={data:function(){return{baseUrl:l,baseImgPath:u,loading:!1,tableData:[],order_id:0,table_id:0,orderGoods:[],order:[],payTypeDialog:!1,payNow:!1,paymentConfigs:[],token:null}},created:function(){this.order_id=this.$route.query.order_id;var t=window.localStorage;this.table_id=t.table_id,this.token=t.access_token,this.initData("init")},methods:{initData:function(t){var e=this;this.loading=!0;var a=this;a.$api.get("/consumer/orders",{order_id:this.order_id,table_id:this.table_id},function(o){if(o.status>=200&&o.status<300){var n=o.data;0==n.code&&(a.order=n.data.order,a.order.createTime=a.dateTimeFormat(a.order.createTime),null!=a.order.payTime&&(a.order.payTime=a.dateTimeFormat(a.order.payTime)),1==a.order.type&&(e.orderGoods=n.data.orderGoods,a.orderGoods.forEach(function(t,e){a.orderGoods[e].mainPic=a.baseImgPath+"/api"+t.goods.pics[0].url}),"init"==t&&e.goPay("init")))}e.loading=!1})},goPay:function(t){var e=this;if(!(this.order.payStatus>1)){this.loading=!0;var a=this;a.$api.get("/consumer/payment_config/can_used",null,function(o){if(o.status>=200&&o.status<300){var n=o.data;0==n.code&&(a.payNow=n.data.pay_now,a.paymentConfigs=n.data.paymentsConfigs,"init"==t&&a.payNow?a.payTypeDialog=!0:"open"==t&&(a.payTypeDialog=!0),console.log(o))}e.loading=!1})}},pay:function(t){var e=window.localStorage.access_token;location.href=this.baseUrl+"/payment/pay/"+t.id+"?order_id="+this.order_id+"&token="+e+"&t="+(new Date).getTime()},closePayPop:function(){this.initData("close")},dateTimeFormat:function(t){var e=new Date(t);return e.getFullYear()+"-"+(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-"+(e.getDate()<10?"0"+e.getDate():e.getDate())+" "+(e.getHours()<10?"0"+e.getHours():e.getHours())+":"+(e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())+":"+(e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds())},in_array:function(t,e){for(var a in e)if(e[a]==t)return!0;return!1}}},k={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("mu-appbar",{staticStyle:{width:"100%"},attrs:{color:"primary"}},[a("mu-button",{attrs:{slot:"left",icon:""},on:{click:function(e){return t.$router.back(-1)}},slot:"left"},[a("mu-icon",{attrs:{value:"keyboard_arrow_left"}})],1),t._v("\n    订单详情\n  ")],1),t._v(" "),a("br"),t._v(" "),a("mu-paper",{attrs:{"z-depth":1}},[a("mu-list",[a("mu-sub-header",[a("span",{staticStyle:{"font-size":"20px"}},[t._v("基本信息")])]),t._v(" "),a("mu-list-item",{attrs:{avatar:"",button:"",ripple:!1}},[a("mu-list-item-action",[t._v("\n          订单号:\n        ")]),t._v(" "),a("mu-list-item-title",[t._v(t._s(t.order.orderNo))])],1),t._v(" "),a("mu-list-item",{attrs:{avatar:"",button:"",ripple:!1}},[a("mu-list-item-action",[t._v("\n          时间:\n        ")]),t._v(" "),a("mu-list-item-title",[t._v(t._s(t.order.createTime))])],1),t._v(" "),a("mu-list-item",{attrs:{avatar:"",button:"",ripple:!1}},[a("mu-list-item-action",[t._v("\n          人数:\n        ")]),t._v(" "),a("mu-list-item-title",[t._v(t._s(t.order.peopleNum)+"人")])],1),t._v(" "),a("mu-list-item",{attrs:{avatar:"",button:"",ripple:!1}},[a("mu-list-item-action",[t._v("\n          总价:\n        ")]),t._v(" "),a("mu-list-item-title",[t._v("￥"+t._s(t.order.totalPrice/100)+"元")])],1),t._v(" "),t.order.totalPrice!=t.order.realPrice?a("mu-list-item",{attrs:{avatar:"",button:"",ripple:!1}},[a("mu-list-item-action",[t._v("\n          实付价:\n        ")]),t._v(" "),a("mu-list-item-title",[t._v("￥"+t._s(t.order.realPrice)+"元")])],1):t._e()],1),t._v(" "),a("mu-divider"),t._v(" "),a("mu-list",[a("mu-sub-header",[a("span",{staticStyle:{"font-size":"20px"}},[t._v("支付信息")])]),t._v(" "),a("mu-list-item",{attrs:{avatar:"",button:"",ripple:!1}},[a("mu-list-item-action",[t._v("\n          状态:\n        ")]),t._v(" "),a("mu-list-item-title",[t._v("\n          "+t._s(t.order.payStatusStr)+"\n        ")]),t._v(" "),1==t.order.payStatus?a("mu-list-item-title",{staticStyle:{height:"50px"}},[a("mu-button",{attrs:{color:"success"},on:{click:function(e){return t.goPay("open")}}},[t._v("立即支付")])],1):t._e()],1),t._v(" "),t.order.payStatus>1?a("mu-list-item",{attrs:{avatar:"",button:"",ripple:!1}},[a("mu-list-item-action",[t._v("\n          时间:\n        ")]),t._v(" "),a("mu-list-item-title",[t._v(t._s(t.order.payTime))])],1):t._e(),t._v(" "),t.order.payStatus>1?a("mu-list-item",{attrs:{avatar:"",button:"",ripple:!1}},[a("mu-list-item-action",[t._v("\n          方式:\n        ")]),t._v(" "),a("mu-list-item-title",[t._v(t._s(t.order.payTypeStr))])],1):t._e()],1),t._v(" "),a("mu-divider"),t._v(" "),1==t.order.type?a("mu-list",[a("mu-sub-header",[a("span",{staticStyle:{"font-size":"20px"}},[t._v("菜品列表")])]),t._v(" "),t._l(t.orderGoods,function(e,o){return a("div",[a("mu-divider"),t._v(" "),a("mu-list-item",{staticStyle:{"margin-top":"10px","padding-top":"20px","padding-bottom":"20px"},attrs:{avatar:"",button:"",ripple:!1}},[a("mu-list-item-action",{on:{click:function(a){return t.openAddCartBottomSheet(e)}}},[a("mu-avatar",{attrs:{size:"68"}},[a("img",{attrs:{src:e.mainPic}})])],1),t._v(" "),a("mu-list-item-content",{staticStyle:{"margin-left":"10px"}},[a("mu-list-item-title",[a("span",{staticStyle:{"font-size":"20px"}},[t._v(t._s(e.goods.name))])]),t._v(" "),a("mu-list-item-sub-title",[a("span",{staticStyle:{"font-size":"15px"}},[t._v("单价:￥"+t._s(e.goods.sell_price/100))])]),t._v(" "),a("mu-list-item-sub-title",[a("span",{staticStyle:{color:"red","font-size":"15px"}},[t._v("数量:"+t._s(e.count))])]),t._v(" "),null!=e.note&&""!=e.note?a("mu-list-item-sub-title",[a("span",{staticStyle:{"font-size":"15px"}},[t._v("备注："+t._s(e.note))])]):t._e()],1),t._v(" "),a("span",{staticStyle:{"font-size":"15px"}},[t._v("总价:￥"+t._s(e.count*e.goods.sell_price/100))])],1)],1)})],2):t._e()],1),t._v(" "),a("mu-dialog",{attrs:{title:"支付方式",width:"360",open:t.payTypeDialog},on:{"update:open":function(e){t.payTypeDialog=e},close:t.closePayPop}},[0==t.paymentConfigs.length?a("span",{staticStyle:{"font-size":"30px"}},[t._v("请前往收银台付款")]):t._e(),t._v(" "),t._l(t.paymentConfigs,function(e,o){return a("a",{key:o,attrs:{href:t.baseUrl+"/payment/pay/"+e.id+"?order_id="+t.order.id+"&token="+t.token,target:"_blank",color:"success"}},[a("mu-chip",{staticClass:"demo-chip"},[t._v("\n      "+t._s(e.name)+"\n    ")])],1)})],2)],1)},staticRenderFns:[]};var D=a("VU/8")(w,k,!1,function(t){a("3gbL")},null,null).exports,S={data:function(){return{baseUrl:l,baseImgPath:u,loading:!1,tableData:[],payTypeDialog:!1,payNow:!1,paymentConfigs:[],token:null,order_id:0,balance:0}},created:function(){var t=window.localStorage;this.token=t.access_token,this.initData()},methods:{initData:function(){var t=this;this.loading=!0;var e=this;e.$api.get("/consumer/charge_item",null,function(a){if(a.status>=200&&a.status<300){var o=a.data;0==o.code&&(e.tableData=o.data.charge_items,e.balance=o.data.balance/100)}t.loading=!1})},goPay:function(){var t=this;this.loading=!0;var e=this;e.$api.get("/consumer/payment_config/can_used",null,function(a){if(a.status>=200&&a.status<300){var o=a.data;0==o.code&&(e.paymentConfigs=o.data.paymentsConfigs,e.payTypeDialog=!0,console.log(a))}t.loading=!1})},closePayPop:function(){this.initData()},createdOrder:function(t){var e=this;this.loading=!0;this.$api.post("/consumer/charge_item/"+t.id,null,function(t){if(t.status>=200&&t.status<300){var a=t.data;0==a.code&&(e.order_id=a.data.order_id,e.goPay())}e.loading=!1})},dateTimeFormat:function(t){var e=new Date(t);return e.getFullYear()+"-"+(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-"+(e.getDate()<10?"0"+e.getDate():e.getDate())+" "+(e.getHours()<10?"0"+e.getHours():e.getHours())+":"+(e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())+":"+(e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds())},in_array:function(t,e){for(var a in e)if(e[a]==t)return!0;return!1}}},x={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("mu-appbar",{staticStyle:{width:"100%"},attrs:{color:"primary"}},[a("mu-button",{attrs:{slot:"left",icon:""},on:{click:function(e){return t.$router.back(-1)}},slot:"left"},[a("mu-icon",{attrs:{value:"keyboard_arrow_left"}})],1),t._v("\n    我的钱包\n  ")],1),t._v(" "),a("br"),t._v(" "),a("el-row",{staticStyle:{height:"100px","text-align":"center","margin-top":"30px"}},[a("span",{staticStyle:{"font-size":"30px"}},[t._v("钱包余额： ￥"),a("span",[t._v(t._s(t.balance))])])]),t._v(" "),a("mu-divider"),t._v(" "),a("mu-sub-header",[a("span",{staticStyle:{"font-size":"20px"}},[t._v("充值")])]),t._v(" "),a("el-row",t._l(t.tableData,function(e,o){return a("el-button",{key:o,staticStyle:{"margin-top":"10px",width:"100px",height:"80px"},attrs:{type:"success"},on:{click:function(a){return t.createdOrder(e)}}},[t._v("\n        充￥"+t._s(e.chargePrice)),e.chargePrice!=e.totalPrice?a("span",[t._v("得￥"+t._s(e.totalPrice))]):t._e(),t._v(" "),null!=e.tag?a("div",[a("br"),t._v("\n          "+t._s(e.tag)+"\n        ")]):t._e()])}),1),t._v(" "),a("mu-dialog",{attrs:{title:"支付方式",width:"360",open:t.payTypeDialog},on:{"update:open":function(e){t.payTypeDialog=e},close:t.closePayPop}},[0==t.paymentConfigs.length?a("span",{staticStyle:{"font-size":"30px"}},[t._v("请前往收银台付款")]):t._e(),t._v(" "),t._l(t.paymentConfigs,function(e,o){return a("a",{key:o,attrs:{href:t.baseUrl+"/payment/pay/"+e.id+"?order_id="+t.order_id+"&token="+t.token,target:"_blank",color:"success"}},[a("mu-chip",{staticClass:"demo-chip"},[t._v("\n        "+t._s(e.name)+"\n      ")])],1)})],2)],1)},staticRenderFns:[]},T=a("VU/8")(S,x,!1,null,null,null).exports;o.default.use(i.a);var $=new i.a({routes:[{path:"/",name:"测试",component:g,children:[]},{path:"/carts",name:"购物车",component:f},{path:"/orders",name:"订单列表",component:y},{path:"/orderDetail",name:"购物车",component:D},{path:"/balance",name:"我的钱包",component:T}]}),P=a("mtWM"),C=a.n(P),N=(a("OAwv"),C.a.create({baseURL:l,headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"},transformRequest:[function(t){var e="";for(var a in t)!0===t.hasOwnProperty(a)&&(e+=encodeURIComponent(a)+"="+encodeURIComponent(t[a])+"&");return e}]}));function A(t,e,a,o){N({method:t,url:e,data:"POST"===t||"PUT"===t?a:null,params:"GET"===t||"DELETE"===t?a:null}).then(function(t){console.log(t.data),200!=t.status||5001!=t.data.code&&5002!=t.data.code&&5003!=t.data.code||alert("登录授权失效,请重新登录"),o(t)}).catch(function(t){alert("服务器异常,请重新登录"),o(t)})}function G(t){var e=window.localStorage.access_token;return t=-1==(t=-1==t.indexOf("?")?t+"?access_token="+e:t+"&access_token="+e).indexOf("?")?t+"?t="+(new Date).getTime():t+"&t="+(new Date).getTime()}var B={get:function(t,e,a){return A("GET",t=G(t),e,a)},post:function(t,e,a){return A("POST",t=G(t),e,a)},put:function(t,e,a){return A("PUT",t=G(t),e,a)},delete:function(t,e,a){return A("DELETE",t=G(t),e,a)}},M=a("aFc6"),E=(a("E51W"),a("Kc/n"),a("sXio")),O=a("3oJs"),z=a.n(O),L=a("zL8q");a("tvR6");o.default.use(M.a),o.default.use(L.Input),o.default.use(L.Tag),o.default.use(L.InputNumber),o.default.use(L.Row),o.default.use(L.Col),o.default.use(L.Button),o.default.use(E.a,{position:"top-end",time:2e3,close:!1}),o.default.use(z.a,{iconType:"MaterialDesign"}),L.Message.install=function(t,e){t.prototype.$message=L.Message},o.default.use(L.Message),o.default.prototype.$api=B,o.default.config.productionTip=!1,new o.default({el:"#app",router:$,components:{App:s},template:"<App/>"})},rAbf:function(t,e){},s347:function(t,e){},tvR6:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.7698a716aed5aab9f979.js.map