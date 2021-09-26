# 扫一扫点餐系统

    **要购买或开通帐号请联系电话或微信：19970784580** 
（偶尔出现打开不了的情况，有可能是我在更新上传新版本，请稍等1个小时再试）
（所有端的体验演示在下面有说明，有兴趣的请务必仔细看一下）

#### 介绍
一套用户餐厅点餐的系统

![输入图片说明](https://images.gitee.com/uploads/images/2021/0805/110738_63c720a1_1773004.png "1.png")

![输入图片说明](https://images.gitee.com/uploads/images/2021/0805/110751_72ff779c_1773004.png "2.png")

场景（可以通过配置实现以下多种场景模式）：

场景1：用户扫码点餐付款，商家后厨自动打单（适用于先付款后用餐）

商家将餐桌二维码贴在餐桌上，用户扫码下单并支付订单，商家配置的前台和后厨打印机会自动打单或电子接单。

场景2：用户扫码点餐，商家后厨自动打单（适用于先用餐后付款）

商家将餐桌二维码贴在餐桌上，用户扫码下单,前台和后厨打印机自动打单或电子接单，用完餐后可以直接在手机上支付，或者到收银台进行买单（微信或支付宝收款）

场景3：用户扫码点餐，支付后获取聚餐码（适用于使用编号聚餐）

商家将餐桌二维码贴在指定位置，用户扫码下单并支付后，可以获得一个聚餐编号，商家配置的前台和后厨打印机自动打单。

场景4：员工点餐，商家后厨自动打单（适用于由服务员点餐，可同时支持扫码点餐）

服务员使用员工端给用户点餐下单，商家配置的前台和后厨打印机自动打单。




操作说明文档：

链接：https://pan.baidu.com/s/18EbWs1SIQYH_m2z9GGckuA 
提取码：1234


## 2.5版本
#### 介绍
修复了2.4版本的部分bug，优化了部分功能，同时也增加和完善了一些实用功能。

后台管理端（vue+elementUI开发）：

1.增加了下载二维码功能

2.增加了扫码盒子插件

3.增加了支付宝登录插件

4.优化了购物车逻辑（打通了员工端和用户端的点菜数据共享）

5.优化了下单逻辑

6.优化了websocket推送逻辑

7.优化了打印逻辑及制作队列的逻辑

8.增加了下单日志记录

9.修复了一些已知bug



员工端（uniapp开发）：

1.优化了点菜菜单界面

2.订单详情增加了加菜功能

3.优化了团队点餐功能（打通了员工端和用户端的点菜数据共享）

4.优化了做菜队列，增加了多种状态

5.修复了一些已知bug




用户端（uniapp开发）：

1.优化了团队点餐功能（打通了员工端和用户端的点菜数据共享）

2.增加了扫码后进入已经点了的菜品列表

3.优化了菜品规格逻辑

4.修复了一些已知bug


#### 使用说明

   
   测试帐号
   总店后台：https://qc.fangwei6.com/web/mainStore
   tadmin  888888
   
   分店后台：https://qc.fangwei6.com/web/store
   ttest2 888888
   
   员工端（可打包成h5版本，app版本，小程序版本等）：
   h5版本：https://qc.fangwei6.com/staff/index.html

扫码体验：

![输入图片说明](https://images.gitee.com/uploads/images/2021/0630/182021_e185e521_1773004.png "屏幕截图.png")
   

   服务员|厨师 帐号：ttest2   888888
   
   用户（可打包成h5版本，微信小程序版本等）
   h5端：在分店后台，店内管理->餐桌管理->二维码展示->微信扫码

下面是三张演示用的餐桌码。

![输入图片说明](https://images.gitee.com/uploads/images/2021/0630/181705_5246ec97_1773004.png "屏幕截图.png")

(如果提示要关注公众号，请先扫下面二维码关注测试公众号再去扫餐桌码，如果关注后还是提示，那说明测试号已经有超过100人关注了，请联系我，我去删除一些，再重新关注后就可以了)

   ![如果提示要关注公众号，请先扫码关注我的测试号](https://images.gitee.com/uploads/images/2021/0317/103444_58b8074a_1773004.jpeg "微信图片_20210317103433.jpg")
   


体验预点单功能请直接扫码

![输入图片说明](https://images.gitee.com/uploads/images/2021/0512/191804_446858ce_1773004.png "屏幕截图.png")

   #### 相关文档
   
   1.功能结构：https://www.processon.com/view/link/5ed19a3d7d9c08070283529d
   
   2.操作说明文档：暂无
   
   3.技术架构图：https://www.processon.com/view/link/5ed19bc663768906e2cdc056


#####################################################################################################################
## 以下为旧版本说明（可以不用看了）

## 2.4版本
#### 介绍
修复了2.2版本的部分bug，优化了部分功能，同时也增加和完善了一些实用功能。

后台管理端（vue+elementUI开发）：

1.增加了排队功能

2.增加了阿里大余短信通知功能

3.优化了后端的代码逻辑

4.修复了一些已知bug

5.增加了一个适用于各种域名校验合法性的万能接口（如微信对域名的合法性校验需要上传一个校验文件等）



员工端（uniapp开发）：

1.优化了点菜菜单界面

2.订单详情增加了备注信息

3.修复了一些已知bug




用户端（uniapp开发）：

1.优化了订单详情和支付界面

2.增加了排队功能

3.修复了一些已知bug


#### 使用说明

（注：拜托各位高台贵手，不要修改密码，不要修改密码，不要修改密码,有事好商量,联系电话和微信：19970784580）

   
   测试帐号
   总店后台：https://qc.fangwei6.com/web/mainStore
   tadmin  888888
   
   分店后台：https://qc.fangwei6.com/web/store
   ttest2 888888
   
   员工端（可打包成h5版本，app版本，小程序版本等）：
   h5版本：https://qc.fangwei6.com/staff/index.html

扫码体验：

![输入图片说明](https://images.gitee.com/uploads/images/2021/0630/182021_e185e521_1773004.png "屏幕截图.png")
   

   服务员|厨师 帐号：ttest2   888888
   
   用户（可打包成h5版本，微信小程序版本等）
   h5端：在分店后台，店内管理->餐桌管理->二维码展示->微信扫码

下面是三张演示用的餐桌码。

![输入图片说明](https://images.gitee.com/uploads/images/2021/0630/181705_5246ec97_1773004.png "屏幕截图.png")

(如果提示要关注公众号，请先扫下面二维码关注测试公众号再去扫餐桌码，如果关注后还是提示，那说明测试号已经有超过100人关注了，请联系我，我去删除一些，再重新关注后就可以了)

   ![如果提示要关注公众号，请先扫码关注我的测试号](https://images.gitee.com/uploads/images/2021/0317/103444_58b8074a_1773004.jpeg "微信图片_20210317103433.jpg")
   


体验预点单功能请直接扫码

![输入图片说明](https://images.gitee.com/uploads/images/2021/0512/191804_446858ce_1773004.png "屏幕截图.png")

   #### 相关文档
   
   1.功能结构：https://www.processon.com/view/link/5ed19a3d7d9c08070283529d
   
   2.操作说明文档：暂无
   
   3.技术架构图：https://www.processon.com/view/link/5ed19bc663768906e2cdc056


## 以下为旧版本说明


## 2.2版本
#### 介绍
对2.1版本的部分功能重构，优化了部分功能，同时也增加和完善了一些实用功能。

后台管理端（vue+elementUI开发）：

1.平台后台加入订单查询功能

2.总店加入员工和权限功能

3.加入总店对门店的插件，主题，设置的控制及设置

4.门店后台加入优惠券功能

5.门店后台菜品标签改为支持两层级

6.团队点餐支持自动启动，设置有效期

7.增加了文件缓存和redis缓存的支持




员工端（uniapp开发）：

1.增加了绑定会员卡功能

2.优化了商品多属性选择下单

3.优化了订单详情界面

4.优化了订单支付界面

5.优化了推送逻辑，推送更加稳定



用户端（uniapp开发）：

1.优化了订单详情界面

2.优化了H5模式下的授权逻辑

3.优化了订单支付界面

4.优化会员卡界面

5.优化了商品多属性选择下单

6.优化团队点餐






## 2.1版本
#### 介绍
对2.0版本的部分功能重构，优化了部分功能，同时也增加和完善了一些实用功能。

后台管理端（vue+elementUI开发）：

1.取消了总店的插件管理，让总店只对分店及所有店的订单进行管理

2.分店概念改为门店

3.增加门店会员卡管理功能

4.增加商品积分功能

5.增加了一些个性化设置项

6.商品增加了一些个性化字段

7.优化了部分界面


员工端（uniapp开发）：

1.增加了确单功能

2.增加了预点单的确认功能

3.增加了收款功能

4.商品增加了规格选择功能

5.客户呼叫信息增加语音提醒

6.制作队列增加语音提醒


用户端（uniapp开发）：

1.增加了预点单功能

2.优化了H5模式和微信小程序模式下的授权逻辑

3.优化了付款功能

4.优化会员卡领取功能，微信小程序模式化可以获取手机号

5.增加了团队点餐的消息展示

6.小程序端增加了直接扫餐桌码功能（适用于公众号+小程序模式）

7.商品增加了规格选择功能






部分界面截图：

![输入图片说明](https://images.gitee.com/uploads/images/2021/0512/113357_b6da2e83_1773004.png "屏幕截图.png")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0512/143136_20004406_1773004.png "屏幕截图.png")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0512/143230_882b7ac5_1773004.png "屏幕截图.png")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0512/143255_520b0a28_1773004.png "屏幕截图.png")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0512/143323_2120b477_1773004.png "屏幕截图.png")







## 2.0版本
#### 介绍
经过对1.0版本的代码重构，对系统进行了重构开发，将大量功能转为插件模块化，使二开更加容易。同时使用了uniapp开发客户端，实现快速打包各种客户端出来直接使用。
功能上面增加了分店的权限控制，订单统计等功能


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


#### 相关文档

1.功能结构：暂无

2.操作说明文档：https://shimo.im/docs/XKKwCjWpwcrjQqPr/read

3.技术架构图：暂无



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

