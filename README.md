# 智能垃圾分类小程序


##  1、先上图


<img src="https://img-blog.csdnimg.cn/51c3a534044b4ee9b41c0eb519bf9b15.jpg"   width="600px" height:=100px; />

<img src="https://img-blog.csdnimg.cn/5fb1bdd49f9e4092a41e1b9793627f20.jpg"   width="600px" height:=100px; />


<img src="https://img-blog.csdnimg.cn/1495fd3b47244a48be096bf11c8c68e2.jpg"   width="600px" height:=100px; />

![在这里插入图片描述](https://img-blog.csdnimg.cn/4e5c5c1613b24dc18e2e28ab6a730c42.jpg#pic_center)



## 2、准备工作

一、申请一个小程序
申请地址：微信公众平台，
申请小程序的操作很简单，大家百度一下跟着步骤申请就行，某宝上还有认证小程序代申请代认证，老铁们可以自行选择。

二、下载微信开发者工具
下载地址：[https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210131164157184.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyMzQwODc3,size_16,color_FFFFFF,t_70#pic_center)

三、下载解压HBuilderX

下载地址：[https://www.dcloud.io/hbuilderx.html](https://www.dcloud.io/hbuilderx.html)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210131164122814.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyMzQwODc3,size_16,color_FFFFFF,t_70#pic_center)



## 3、搭建开始
`请确保 HBuilderX 更新到最新版`


一、[小程序源码地址](https://ext.dcloud.net.cn/plugin?id=6711)，点击购买普通授权版本，只需要8.88

二、我这里云空间叫`demo`,如果没有新建个阿里云空间即可（[创建 uniCloud 服务空间](https://uniapp.dcloud.io/uniCloud/quickstart?id=%e5%88%9b%e5%bb%ba%e5%92%8c%e7%bb%91%e5%ae%9a%e6%9c%8d%e5%8a%a1%e7%a9%ba%e9%97%b4)），右键uniCloud目录关联到与管理后台同一个服务空间，全部勾选，点击直接部署服务空间，导入HBuilderX 
![在这里插入图片描述](https://img-blog.csdnimg.cn/937a454e3b3d43d4b59ee2cdf6e29253.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5LiA5Liq5a2X5bCx5piv5bmy,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
打开文件 `uniCloud => cloudfunctions => common =>  wx-auth => index.js`  
配置 wxConfigMp 内的 appid 和 secret（在微信小程序官方的后台获取）

三、项目安装依赖

项目根目录 `npm install` 安装依赖


四、配置项目
1、打开微信微信开发者工具，在安全设置中打开服务端口
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021013117151419.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyMzQwODc3,size_16,color_FFFFFF,t_70#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210131171524170.png#pic_center)

2、打开HBuilderX，点击“运行-运行到小程序模拟器-运行配置”中设置你安装微信开发者工具的路径。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210131171947775.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyMzQwODc3,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210131171956811.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyMzQwODc3,size_16,color_FFFFFF,t_70#pic_center)
## 四、发布小程序
1、右键项目文件夹，点击“发行-小程序-微信（仅适用于uniapp）”
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210131172532426.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyMzQwODc3,size_16,color_FFFFFF,t_70#pic_center)

2、填写小程序名称和小程序appid即可唤起微信开发者工具。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210131172604321.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyMzQwODc3,size_16,color_FFFFFF,t_70#pic_center)


3、在小程序后台，开发管理中配置服务器request合法域名：`https://api.bspapp.com; https://zy-api.wxthe.com`

4、在微信开发者工具点击上传，在小程序后台提交审核，审核通过后即可正常运营

![在这里插入图片描述](https://img-blog.csdnimg.cn/df9cedb6ad294e10947b2f9442712d35.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA44CK5oqA5pyv6LWa5a6i5ZCn44CL,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)




 
#### 作者相关文章

[反编译获取任何微信小程序源码——看这篇就够了](https://blog.csdn.net/qq_32340877/article/details/110993362) 

[抽签小程序，妈妈再也不用担心谁洗碗（分配任务）了，so easy](https://blog.csdn.net/qq_32340877/article/details/105540569)

[5分钟实现微信云小程序支付功能（含源码）](https://blog.csdn.net/qq_32340877/article/details/111595124)

