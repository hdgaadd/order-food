# 扫一扫点餐系统

#### 介绍
一套用户餐厅点餐的系统，用户扫码点餐，自动打单

## 1.0版本（演示版本为2.0，请直接看最下面的2.0版本）
#### 软件架构
springboot + jpa + mysql


#### 安装教程

1.  clone代码下来
2.  使用maven更新依赖包
3.  在数据库中创建好数据库（不用建表）
4.  修改源码中的application-dev.properties文件里的数据库配置信息
5.  启动程序（SpringbootApplication）

#### 使用说明

操作文档：https://shimo.im/docs/XKKwCjWpwcrjQqPr/read

演示：http://qc.fangwei6.com

联系电话和微信：13710124580

#### 相关文档

1.功能结构：暂无

2.操作说明文档：https://shimo.im/docs/XKKwCjWpwcrjQqPr/read

3.技术架构图：暂无


## 2.0版本

（注：拜托各位高台贵手，不要修改密码，不要修改密码，不要修改密码,有事好商量）

#### 介绍
经过对1.0版本的代码重构，对系统进行了重构开发，将大量功能转为插件模块化，使二开更加容易。同时使用了uniapp开发客户端，实现快速打包各种客户端出来直接使用。
功能上面增加了分店的权限控制，订单统计等功能

#### 软件架构

1.技术框架：
后端：spring boot + jpa  
后台管理前端：vue.js + elementUI
员工端(H5+app)：uni-app
客户端(H5+微信小程序)：  uni-app

2.技术架构
采用前后端分离，完全使用restful风格编写的接口。


#### 安装教程

1.  安装好java环境并配置
2.  安装好数据库，创建好数据库（无需建表）
3.  修改程序中的application-prod.properties中的数据库连接配置
4.  运行程序即可（jpa会自动建表）

#### 使用说明
   要购买或开通帐号请联系电话或微信：13710124580
   
   测试帐号
   总店后台：http://qc.fangwei6.com/admin/index.html?#/mainStore/login
   testAdmin2  888888
   
   分店后台：http://qc.fangwei6.com/admin/index.html?#/store/login
   sysAdmin2 888888
   
   员工端：
   android端:  http://static.fangwei6.com/orderFoodStaff.apk
   h5端：http://qc.fangwei6.com/staff/index.html
   
   服务员帐号：systest1   888888
   厨师帐号： systest2  888888
   
   用户h5端：在分店后台，店内管理->餐桌管理->二维码展示->微信扫码

   ![如果提示要关注公众号，请先扫码关注我的测试号](https://images.gitee.com/uploads/images/2021/0317/103444_58b8074a_1773004.jpeg "微信图片_20210317103433.jpg")
   
   #### 相关文档
   
   1.功能结构：https://www.processon.com/view/link/5ed19a3d7d9c08070283529d
   
   2.操作说明文档：暂无
   
   3.技术架构图：https://www.processon.com/view/link/5ed19bc663768906e2cdc056