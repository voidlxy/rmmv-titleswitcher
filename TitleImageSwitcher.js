//=============================================================================
//TitleImageSwitcher
//标题跟随周目切换
//=============================================================================
//-----------------------------------------------------------------------------
//作者信息、帮助和插件参数
//-----------------------------------------------------------------------------
/*:
 * @plugindesc 标题跟随周目切换
 *
 * @author Liu_Xinye
 * 
 * @param MT1
 * @desc 一周目主标题
 * @default Castle
 * 
 * @param ST1
 * @desc 一周目副标题
 * 
 * @param BGM1
 * @desc 一周目标题背景音乐
 * @default Theme6
 * 
 * @param MT2
 * @desc 二周目主标题
 * @default Castle
 * 
 * @param ST2
 * @desc 二周目副标题
 * 
 * @param BGM2
 * @desc 二周目标题背景音乐
 * @default Theme6
 * 
 * @param Customized
 * @desc 开启定制模式(若不开启，则为一般模式)
 * @default false
 * @type boolean
 * 
 * @param CustomizedSettings
 * @desc 定制模式设置
 * @default ["{\"MT\":\"Castle\",\"ST\":\"\",\"BGM\":\"Theme6\"}","{\"MT\":\"Castle\",\"ST\":\"\",\"BGM\":\"Theme6\"}"]
 * @type struct<CostumeTitle>[]
 * 
 * @help
 *-----------------------------------------------------------------------------
 * 注意：
 * 本插件遵循MPL开源协议，若修改了源代码，则修改后必须开源且做版权声明
 *-----------------------------------------------------------------------------
 * 使用方法：
 * 一、准备阶段
 * 将欲加载的主标题png背景放到/img/titles1目录下
 * 将欲加载的副标题png背景放到/img/titles2目录下
 * 将欲加载的背景音乐ogg(若有需要可一并放入m4a)放到/audio/bgm目录下
 * 二、一般模式参数设置
 * 将Customized设置为false
 * 将MT1、ST1、BGM1设置为一周目的主标题、副标题、背景音乐的文件名
 * 将MT2、ST2、BGM2设置为二周目的主标题、副标题、背景音乐的文件名
 * 三、定制模式参数设置
 * 将Customized设置为true
 * CustomizedSettings条目的顺序决定其中的背景图片和音乐将在哪一周目被使用
 * MT为自定义主标题
 * ST为自定义副标题
 * BGM为自定义背景音乐
 * 四、游戏内切换周目
 * 使用命令switchGameStage可切换周目
 * 具体操作：高级→插件指令→输入"switchGameStage"+周目数
*/
//-----------------------------------------------------------------------------
//CostumeTitle参数结构
//-----------------------------------------------------------------------------
/*~struct~CostumeTitle:
  *
  * @param MT
  * @desc 自定义主标题
  * @default Castle
  *
  * @param ST
  * @desc 自定义副标题
  *
  * @param BGM
  * @desc 自定义背景音乐
  * @default Theme6
  *
*/
//-----------------------------------------------------------------------------
//读取插件参数
//-----------------------------------------------------------------------------
var MyParameters = PluginManager.parameters('TitleImageSwitcher');
//-----------------------------------------------------------------------------
//游戏内切换周目插件指令
//-----------------------------------------------------------------------------
Game_Interpreter.prototype.pluginCommand = function(command, args){
    if(command == "switchGameStage"){
        var gameStage = args[0];//获取输入的参数
        const fs = require('fs');//导入fs模块
        const data = {
            Stage: gameStage
        };//要保存的json数据
        const filePath = 'www/data/GameStage.json';//要保存的文件名和路径
        const jsonString = JSON.stringify(data);//将数据转换为json字符串
        fs.writeFile(filePath, jsonString);//保存json文件
    }
}
//-----------------------------------------------------------------------------
//将周目数添加到DataManager
//-----------------------------------------------------------------------------
var $gameStage       = null;
DataManager._databaseFiles = [
    { name: '$gameStage',        src: 'GameStage.json'    },
    { name: '$dataActors',       src: 'Actors.json'       },
    { name: '$dataClasses',      src: 'Classes.json'      },
    { name: '$dataSkills',       src: 'Skills.json'       },
    { name: '$dataItems',        src: 'Items.json'        },
    { name: '$dataWeapons',      src: 'Weapons.json'      },
    { name: '$dataArmors',       src: 'Armors.json'       },
    { name: '$dataEnemies',      src: 'Enemies.json'      },
    { name: '$dataTroops',       src: 'Troops.json'       },
    { name: '$dataStates',       src: 'States.json'       },
    { name: '$dataAnimations',   src: 'Animations.json'   },
    { name: '$dataTilesets',     src: 'Tilesets.json'     },
    { name: '$dataCommonEvents', src: 'CommonEvents.json' },
    { name: '$dataSystem',       src: 'System.json'       },
    { name: '$dataMapInfos',     src: 'MapInfos.json'     }
];
//-----------------------------------------------------------------------------
//重写标题场景
//-----------------------------------------------------------------------------
Scene_Title.prototype.createBackground = function() {
    //判断定制模式是否开启
    if(MyParameters.Customized == 'false'){
        //定制模式未开启，直接加载二周目标题
        if($gameStage.Stage == 2){
            this._backSprite1 = new Sprite(ImageManager.loadTitle1(MyParameters.MT2));
            this._backSprite2 = new Sprite(ImageManager.loadTitle2(MyParameters.ST2));
        }else{
            this._backSprite1 = new Sprite(ImageManager.loadTitle1(MyParameters.MT1));
            this._backSprite2 = new Sprite(ImageManager.loadTitle2(MyParameters.ST1));
        }
    }
    this.addChild(this._backSprite1);
    this.addChild(this._backSprite2);
};

Scene_Title.prototype.playTitleMusic = function() {
    //判断定制模式是否开启
    if(MyParameters.Customized == 'false'){
        //定制模式未开启，直接播放二周目音乐
        if($gameStage.Stage == 2){
            $dataSystem.titleBgm.name = MyParameters.BGM2
            AudioManager.playBgm($dataSystem.titleBgm);
        }else{
            $dataSystem.titleBgm.name = MyParameters.BGM1
            AudioManager.playBgm($dataSystem.titleBgm);
        }
    }
    AudioManager.stopBgs();
    AudioManager.stopMe();
};
