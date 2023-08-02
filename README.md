# rmmv-titleswitcher

#### 介绍
一个让游戏标题画面背景图片和背景音乐跟随周目切换的RPGmakerMV插件

#### 注意
本插件遵循MPL开源协议，若修改了源代码，则修改后必须开源且做版权声明

#### 使用说明

1.  请按照插件本体中的帮助说明配置插件
2.  定制模式在Windows和Linux环境下经测试正常运行
3.  如果无法正常生成GameStage.json，请在www/data/中手动创建该文件，内容如下:

```
{"Stage":"1"}
```

4.  如果配置了定制模式但没有效果，可以尝试删除www/data/CTIS.json文件

#### 更新日志

**Release1.0** 
修复了CTIS无法正常更新的问题

**Alpha0.1.2** 
加入了真正可以用的“定制模式”

 **Alpha0.1.1** 
修复了可能无法正常创建GameStage.json的问题
