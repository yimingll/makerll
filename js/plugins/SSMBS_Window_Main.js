var SSMBS_Window_Main = SSMBS_Window_Main||{};

SSMBS_Window_Main.windowImg = 'mainBackGround'; //窗口图片名称 20220509后保留请勿修改
SSMBS_Window_Main.windowImg_default = 'mainBackGround'; //默认窗口背景
SSMBS_Window_Main.windowImg_equipPage = 'mainBackGround'; //收集物图片名称
SSMBS_Window_Main.windowImg_itemPage = 'mainBackGround'; //背包图片名称
SSMBS_Window_Main.windowImg_bookPage = 'mainBackGround'; //图鉴图片名称
SSMBS_Window_Main.windowImg_systemPage = 'mainBackGround'; //系统图片名称
SSMBS_Window_Main.windowImg_bookInner = 'mainBackGround' //图鉴图片名称（内页）
SSMBS_Window_Main.width = 480; //菜单宽度
SSMBS_Window_Main.height = 320; //菜单高度
SSMBS_Window_Main.nowChoiceColor = 12;

SSMBS_Window_Main.choice = ['收集物','背包','图鉴','系统']; //TAB条的分类
SSMBS_Window_Main.choiceStartX = 12 ; //选项的起始X
SSMBS_Window_Main.choiceStartY = 12 ; //选项的起始Y
SSMBS_Window_Main.choiceHeight = 24 ; //选项的高度
SSMBS_Window_Main.mainfontSize = 16; //默认字体大小
SSMBS_Window_Main.nowChoice = 0; //保留 现在选择的选项

//装备页面选项--------------------------------------------------------------------------------------------------------
SSMBS_Window_Main.emptyIcon = 16; //空物品的图标ID
SSMBS_Window_Main.equipSize = 48; //装备ID的尺寸
//装备界面每个格子的坐标，需要有多少格子就写多少个
SSMBS_Window_Main.equipSlotPostions = [
	{x:37,y:96},
	{x:87,y:96},
	{x:137,y:96},
	{x:287,y:96},
	{x:337,y:96},
	{x:387,y:96},
];
SSMBS_Window_Main.pic = ImageManager.loadSystem('enhance_upperLayer');//装备界面可置换图片

//背包页面选项--------------------------------------------------------------------------------------------------------

SSMBS_Window_Main.characterSize = 72; //角色行走图尺寸
SSMBS_Window_Main.backpackStartY = 50; //背包页面起始Y
SSMBS_Window_Main.backpackPerLine = 10; //背包每行道具数量
SSMBS_Window_Main.backpackTotalLine = 7; //背包页面总共行数
SSMBS_Window_Main.backpacKSpace = 6; //每个图标之间的空隙
SSMBS_Window_Main.backpacKGridSize = 32; //图标尺寸
SSMBS_Window_Main.lockedIcon = 540; //锁上的图标的ID
SSMBS_Window_Main.gridIcon = 4879; //空格子的图标的ID
SSMBS_Window_Main.gridsItemNumFontSize = 12; //物品栏的字体大小
SSMBS_Window_Main.scrollWidth = 3;//滚动条宽度
SSMBS_Window_Main.scrollColor = '#999999'; //滚动条颜色
SSMBS_Window_Main.goldIcon = 314; //金币图标ID

SSMBS_Window_Main.listFirstLine = 0; //保留 起始行数

//图鉴页面选项--------------------------------------------------------------------------------------------------------
SSMBS_Window_Main.handbookTypes = [ '敌人', '人物' , '地图']; //图鉴分类
SSMBS_Window_Main.handbookTypesMaxPage =  [2,2,2] //每个分类的最大页数
SSMBS_Window_Main.handbookStartY = 50; //图鉴的起始Y
SSMBS_Window_Main.handbookChoiceWidth = 128; //图鉴选项的宽度
SSMBS_Window_Main.handbookChoiceHeight = 24; //图鉴选项的高度
SSMBS_Window_Main.handbookChoiceHeightSpace = 6; //图鉴选项之间的空隙
SSMBS_Window_Main.handbookTitleFontSize = SSMBS_Window_Main.mainfontSize + 4; //图鉴详情页面标题的字体大小
SSMBS_Window_Main.handbookFaceSize = 72; //图鉴脸图尺寸
SSMBS_Window_Main.handbookFaceSpace = 12; //图鉴之间的空隙X
SSMBS_Window_Main.handbookFaceSpaceY = 18; //图鉴脸图之间的空隙Y
SSMBS_Window_Main.handbookBackButtonPic = 'back'; //返回按钮的图片名称
SSMBS_Window_Main.handbookBackButtonPicTouching = 'back_2'; //返回按钮的图片名称触摸
SSMBS_Window_Main.handbookBackPicX = 0; //返回按钮的X偏移
SSMBS_Window_Main.handbookBackPicY = 0; //返回按钮的Y偏移
SSMBS_Window_Main.handbookPageLeftImg = 'page_left'; //上一页图片名称
SSMBS_Window_Main.handbookPageLeftImgTouching = 'page_left_2'; //上一页图片名称触摸
SSMBS_Window_Main.handbookPageRightImg = 'page_right'; //下一页图片名称
SSMBS_Window_Main.handbookPageRightImgTouching = 'page_right_2'; //下一页图片名称触摸
SSMBS_Window_Main.handbookPageXoffset = 64 ; //翻页按钮X偏移（对称移动）
SSMBS_Window_Main.handbookPageXoffsetWhole = -6 //翻页按钮X偏移（整体移动）

SSMBS_Window_Main.handbookPerLine = 4; //图鉴每行显示的脸图
SSMBS_Window_Main.handbookTotalLine = 2; //图鉴总共的行数
SSMBS_Window_Main.handbookNowChoice = 0; //保留 现在选择选项
SSMBS_Window_Main.handbookNowChoiceEntry = 1; //保留 现在选择的详情
SSMBS_Window_Main.nowPage = 1;  //保留 现在所在的页面

//系统页面选项--------------------------------------------------------------------------------------------------------
SSMBS_Window_Main.optionStartX = 72; //系统界面的起始X
SSMBS_Window_Main.optionStartY = 50; //系统界面的起始Y
SSMBS_Window_Main.optionLineHeight = 25; //系统界面的行高
SSMBS_Window_Main.optionVolumeHeight = 12; //系统界面音量条的高度
SSMBS_Window_Main.optionVolumeWidth = 192 //系统界面音量条的宽度
SSMBS_Window_Main.optionVolumeXoffset = 92; //系统界面音量条的X偏移
SSMBS_Window_Main.optionvolumeYoffset = 8; //系统界面音量条的Y偏移
SSMBS_Window_Main.optionFontSize = 16; //系统界面的字体大小
SSMBS_Window_Main.backTitleImg = 'backTitle'; //返回标题界面图片名称
SSMBS_Window_Main.backTitleImgTouching = 'backTitle_2';//返回标题界面图片名称触摸
SSMBS_Window_Main.exitButtonImg = 'exit'; //退出游戏图片名称
SSMBS_Window_Main.exitButtonImgTouching = 'exit_2';//退出游戏图片名称触摸



const SSMBS_Window_Main_mapload = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	SSMBS_Window_Main_mapload.call(this);
	SSMBS_Window_Main.scene = this;
	SSMBS_Window_Main.isOpen = false;
	this.createMainWindow();
	// 装备位置
	if(!$gameParty.itemsPosition){
		$gameParty.itemsPosition = [];
	}
	if(!$gameParty.weaponsPosition){
		$gameParty.weaponsPosition = [];
	}
	if(!$gameParty.armorsPosition){
		$gameParty.armorsPosition = [];
	}
	for( let i = 0; i<$dataItems.length ; i++ ){
		$gameParty.itemsPosition.push(null);
	}
	for( let i = 0; i<$dataWeapons.length ; i++ ){
		$gameParty.weaponsPosition.push(null);
	}
	for( let i = 0; i<$dataArmors.length ; i++ ){
		$gameParty.armorsPosition.push(null);
	}
	//创建图鉴
	if(!$gameParty.handbook){
		$gameParty.handbook = [];
	};

};

const SSMBS_Window_Main_mapUpdate = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	SSMBS_Window_Main_mapUpdate.call(this);
	if(Input.isTriggered( 'escape')){
		SoundManager.playCursor();
		SSMBS_Window_Main.isOpen = !SSMBS_Window_Main.isOpen;
	}
	if(SSMBS_Window_Main.isOpen){
		this.masterWindowBKG.opacity = 255;
		this.masterWindow.opacity = 192;
		this.masterWindowWord.opacity = 255;
		this.refreshMainWindow();
	}else{
		this.masterWindow.opacity = 0;
		this.masterWindowWord.opacity = 0;
		this.masterWindowBKG.opacity = 0;
	}
};

Scene_Map.prototype.createMainWindow = function(){
	this.masterWindowBKG = new Sprite( new Bitmap(SSMBS_Window_Main.width,SSMBS_Window_Main.height) );
	this.masterWindowBKG.x = Graphics.width/2-SSMBS_Window_Main.width/2;
	this.masterWindowBKG.y = Graphics.height/2-SSMBS_Window_Main.height/2;
	this.addChild(this.masterWindowBKG);

	this.masterWindow = new Sprite( new Bitmap(SSMBS_Window_Main.width,SSMBS_Window_Main.height) );
	this.masterWindow.x = Graphics.width/2-SSMBS_Window_Main.width/2;
	this.masterWindow.y = Graphics.height/2-SSMBS_Window_Main.height/2;
	this.addChild(this.masterWindow);

	this.masterWindowWord = new Sprite( new Bitmap(SSMBS_Window_Main.width,SSMBS_Window_Main.height) );
	this.masterWindowWord.x = Graphics.width/2-SSMBS_Window_Main.width/2;
	this.masterWindowWord.y = Graphics.height/2-SSMBS_Window_Main.height/2;
	this.addChild(this.masterWindowWord);
};

Scene_Map.prototype.refreshMainWindow = function(){
	this.masterWindowWord.bitmap.fontSize = SSMBS_Window_Main.mainfontSize;
	this.masterWindowWord.bitmap.fontFace = $gameSystem.mainFontFace();
	this.masterWindow.bitmap.clear();
	this.masterWindowWord.bitmap.clear();
	this.masterWindowBKG.bitmap.clear();

	this.masterWindow.opacity = 192;
	this.masterWindowWord.opacity = 255;
	this.masterWindowBKG.opacity = 255;
	if(SSMBS_Window_Main.windowImg ){
		if(SSMBS_Window_Main.handBookNowEntry){
			SSMBS_Window_Main.windowImg = SSMBS_Window_Main.windowImg_bookInner;
		}else{
			switch(SSMBS_Window_Main.choice[SSMBS_Window_Main.nowChoice]){
				case '收集物':
					SSMBS_Window_Main.windowImg = SSMBS_Window_Main.windowImg_equipPage;
					break;
				case '背包':
					SSMBS_Window_Main.windowImg = SSMBS_Window_Main.windowImg_itemPage;
					break;
				case '图鉴':
					SSMBS_Window_Main.windowImg = SSMBS_Window_Main.windowImg_bookPage;
					break;
				case '系统':
					SSMBS_Window_Main.windowImg = SSMBS_Window_Main.windowImg_systemPage;
					break;
				default:
					SSMBS_Window_Main.windowImg = SSMBS_Window_Main.windowImg_default;
			}
		}
		
		this.masterWindowBKG.bitmap.blt(
			ImageManager.loadSystem(SSMBS_Window_Main.windowImg),
			0,0, //切割坐标
			SSMBS_Window_Main.width,SSMBS_Window_Main.height,//切割尺寸
			0, 0,// 绘制坐标
			SSMBS_Window_Main.width,SSMBS_Window_Main.height  //最终大小
		)
	}else{
		this.masterWindow.bitmap.fillRect( 0,0, SSMBS_Window_Main.width,SSMBS_Window_Main.height,'#000000');
	}
	if(ssmbsBasic.isTouching(
		this.masterWindow.x,
		this.masterWindow.y,
		this.masterWindow.x+SSMBS_Window_Main.width,
		this.masterWindow.y+SSMBS_Window_Main.height)
	){
		$gamePlayer.battler()._tp = 98;
	}
	
	let singleWidth = (SSMBS_Window_Main.width-SSMBS_Window_Main.choiceStartX*2)/SSMBS_Window_Main.choice.length;
	var choice_stX;
	var choice_stY;
	var choice_edX;
	var choice_edY;
	for( i = 0 ; i<SSMBS_Window_Main.choice.length ; i ++ ){
		this.masterWindowWord.bitmap.textColor = ColorManager.textColor(0);
		if(SSMBS_Window_Main.nowChoice == i){
			this.masterWindowWord.bitmap.textColor = ColorManager.textColor(SSMBS_Window_Main.nowChoiceColor);
		}
		//绘制选项
		this.masterWindowWord.bitmap.drawText( SSMBS_Window_Main.choice[i], i * singleWidth+SSMBS_Window_Main.choiceStartX, SSMBS_Window_Main.choiceStartY, singleWidth,SSMBS_Window_Main.choiceHeight,'center' );
		choice_stX = this.masterWindow.x+SSMBS_Window_Main.choiceStartX+i*singleWidth;
		choice_stY = this.masterWindow.y+SSMBS_Window_Main.choiceStartY;
		choice_edX = choice_stX+singleWidth;
		choice_edY = choice_stY+SSMBS_Window_Main.choiceHeight;
		//触摸选项
		if(ssmbsBasic.isTouching(choice_stX,choice_stY,choice_edX,choice_edY)){
			this.masterWindow.bitmap.fillRect( i * singleWidth+SSMBS_Window_Main.choiceStartX, SSMBS_Window_Main.choiceStartY, singleWidth, SSMBS_Window_Main.choiceHeight,'#ffffff');
			//点击选项
			if(TouchInput.isTriggered()){
				SoundManager.playCursor();
				SSMBS_Window_Main.nowChoice = i;
			}
		}
	};
	switch(SSMBS_Window_Main.nowChoice){
		case 0 :
			this.refreshEquipsWindow();
			break;
		case 1 :
			this.refreshBackpackWindow();
			break;
		case 2 :
			this.refresHhandbookWindow();
			break;
		case 3 :
			this.refreshSystemWindow();
			break;
	};
};

Scene_Map.prototype.refreshEquipsWindow = function(){
	//动态行走图帧数
	if(SSMBS_Window_Main.frameSet === undefined){
		SSMBS_Window_Main.frameSet = 0 ;
		SSMBS_Window_Main.count = 0;
	}
	if(SSMBS_Window_Main.count<16){
		SSMBS_Window_Main.count++
	};
	if(SSMBS_Window_Main.count==16){
		SSMBS_Window_Main.count=0;
		if(SSMBS_Window_Main.frameSet<=4){
			SSMBS_Window_Main.frameSet ++;
		}
		if(SSMBS_Window_Main.frameSet==4){
			SSMBS_Window_Main.frameSet = 0;
		}
	};
	switch(SSMBS_Window_Main.frameSet){
		case 0 :
			SSMBS_Window_Main.frameShow = 0;
			break;
		case 1 :
			SSMBS_Window_Main.frameShow = 1;
			break;
		case 2 :
			SSMBS_Window_Main.frameShow = 2;
			break;
		case 3 :
			SSMBS_Window_Main.frameShow = 1;
			break;
	};
	if(SSMBS_Window_Main.pic){
		this.masterWindowWord.bitmap.blt(
			SSMBS_Window_Main.pic,
			0,0, //切割坐标
			SSMBS_Window_Main.pic.width,SSMBS_Window_Main.pic.height,//切割尺寸
			SSMBS_Window_Main.width/2-SSMBS_Window_Main.pic.width/2, SSMBS_Window_Main.height/2-SSMBS_Window_Main.pic.height/2,// 绘制坐标
			SSMBS_Window_Main.pic.width,SSMBS_Window_Main.pic.height  //最终大小
		)
		let char = ImageManager.loadCharacter($gamePlayer.spriteIndex()._characterName);
		this.masterWindowWord.bitmap.blt(
			char,
			SSMBS_Window_Main.frameShow*char.width/3,0, //切割坐标
			char.width/3,char.height/4,//切割尺寸
			SSMBS_Window_Main.width/2 - SSMBS_Window_Main.characterSize/2,SSMBS_Window_Main.height/2 - SSMBS_Window_Main.characterSize/2,
			SSMBS_Window_Main.characterSize,SSMBS_Window_Main.characterSize //最终大小
		)

	}
	for( let i = 0 ; i < SSMBS_Window_Main.equipSlotPostions.length ; i ++ ){
		this.masterWindowWord.bitmap.blt(
			ImageManager.loadSystem('IconSet'),
			SSMBS_Window_Main.emptyIcon% 16*32,Math.floor(SSMBS_Window_Main.emptyIcon / 16)*32, //切割坐标
			32,	32,//切割尺寸
			SSMBS_Window_Main.equipSlotPostions[i].x, SSMBS_Window_Main.equipSlotPostions[i].y,// 绘制坐标
			SSMBS_Window_Main.equipSize ,	SSMBS_Window_Main.equipSize  //最终大小
		)
		if($gamePlayer.battler().equips()[i]){
			var equip = $gamePlayer.battler().equips()[i];
			this.masterWindowWord.bitmap.blt(
				ImageManager.loadSystem('IconSet'),
				equip.iconIndex% 16*32,Math.floor(equip.iconIndex / 16)*32, //切割坐标
				32,	32,//切割尺寸
				SSMBS_Window_Main.equipSlotPostions[i].x, SSMBS_Window_Main.equipSlotPostions[i].y,// 绘制坐标
				SSMBS_Window_Main.equipSize ,	SSMBS_Window_Main.equipSize  //最终大小
			)
		}
		let eq_stx = this.masterWindow.x+SSMBS_Window_Main.equipSlotPostions[i].x;
		let eq_sty = this.masterWindow.y+SSMBS_Window_Main.equipSlotPostions[i].y;
		let eq_edx = eq_stx+SSMBS_Window_Main.equipSize;
		let eq_edy = eq_sty+SSMBS_Window_Main.equipSize;
		if(ssmbsBasic.isTouching(eq_stx,eq_sty,	eq_edx,	eq_edy)){
			this.itemInform = equip;
		}
	}
};

Scene_Map.prototype.refreshBackpackWindow = function(){
	//绘制格子
	for( let i = 0 ; i < SSMBS_Window_Main.backpackPerLine*SSMBS_Window_Main.backpackTotalLine ; i ++ ){
		// this.masterWindow.bitmap.fillRect( 
		// SSMBS_Window_Main.choiceStartX + (i%SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace) , 
		// SSMBS_Window_Main.backpackStartY + Math.floor(i/SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace),
		// SSMBS_Window_Main.backpacKGridSize, 
		// SSMBS_Window_Main.backpacKGridSize, 
		// '#555555' );
		this.masterWindowWord.bitmap.blt(
			ImageManager.loadSystem('IconSet'),
			SSMBS_Window_Main.gridIcon  % 16*32,Math.floor(SSMBS_Window_Main.gridIcon  / 16)*32, //切割坐标
			32,	32,//切割尺寸
			SSMBS_Window_Main.choiceStartX + (i%SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace), 
			SSMBS_Window_Main.backpackStartY + Math.floor(i/SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace),// 绘制坐标
			SSMBS_Window_Main.backpacKGridSize,	SSMBS_Window_Main.backpacKGridSize 
		)//最终大小
		if( !this.gridsHasItem[i+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine] ){
			this.masterWindowWord.bitmap.blt(
			ImageManager.loadSystem('IconSet'),
			SSMBS_Window_Main.lockedIcon % 16*32,Math.floor(SSMBS_Window_Main.lockedIcon / 16)*32, //切割坐标
			32,	32,//切割尺寸
			SSMBS_Window_Main.choiceStartX + (i%SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace), 
			SSMBS_Window_Main.backpackStartY + Math.floor(i/SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace),// 绘制坐标
			SSMBS_Window_Main.backpacKGridSize,	SSMBS_Window_Main.backpacKGridSize //最终大小
			)
		}
	}

	let hasItem;
	if(hasItem!= $gameParty.allItems().length){
		//清空不拥有物品的位置信息
		for( let i = 0 ; i < $dataItems.length ; i ++ ){
			let item =  $dataItems[i];
			if(item && !item.meta.hide && !$gameParty.hasItem(item,true)){
				SSMBS_Window_Main.saveItemPositon(item,null);
			}
		}
		for( let i = 0 ; i < $dataWeapons.length ; i ++ ){
			let weapon = $dataWeapons[i];
			if(weapon && !weapon.meta.hide && !$gameParty.hasItem(weapon,true)){
				SSMBS_Window_Main.saveItemPositon(weapon,null);
			}
		}
		for( let i = 0 ; i < $dataArmors.length ; i++ ){
			let armor = $dataArmors[i];
			if(armor && !armor.meta.hide && !$gameParty.hasItem(armor,true)){
				SSMBS_Window_Main.saveItemPositon(armor,null);
			}
		}
		for( let grid = 0 ; grid < this.gridsHasItem.length ; grid ++ ){
			if( this.gridsHasItem[grid] && this.gridsHasItem[grid] != 'empty' && SSMBS_Window_Main.loadPosition(this.gridsHasItem[grid])!=grid){
				this.gridsHasItem[grid] = 'empty';
			}
		}
		hasItem= $gameParty.allItems().length;
	};
	//导入物品
	for( let i = 0 ; i < $gameParty.allItems().length ; i ++ ){
		let item = $gameParty.allItems()[i];
		if(this.gridsHasItem[SSMBS_Window_Main.firstEmptyGrid]!='empty'){
			SSMBS_Window_Main.findFirstEmpty();
		}
		if(item && !item.meta.hide){
			if(!SSMBS_Window_Main.loadPosition(item) && SSMBS_Window_Main.loadPosition(item)!= 0 ){
				SSMBS_Window_Main.saveItemPositon(item,SSMBS_Window_Main.firstEmptyGrid);
			};
			// console.log(SSMBS_Window_Main.loadPosition(item))
			this.gridsHasItem[SSMBS_Window_Main.loadPosition(item)]=item;
			//绘制图标
			if(Math.floor(SSMBS_Window_Main.loadPosition(item)/SSMBS_Window_Main.backpackPerLine-SSMBS_Window_Main.listFirstLine)>=0 
				&& SSMBS_Window_Main.loadPosition(item)<SSMBS_Window_Main.backpackPerLine *SSMBS_Window_Main.backpackTotalLine + SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine ){
					if(item.meta.bkgIcon){
						var bkgIcon = Number(item.meta.bkgIcon)
					}else{
						for( color in sxlSimpleItemList.rareColorIcon){
							if(Number(item.meta.textColor) == sxlSimpleItemList.rareColor[color]){
								var bkgIcon = sxlSimpleItemList.rareColorIcon[color];
							}
							if(!item.meta.textColor){
								var bkgIcon = sxlSimpleItemList.rareColorIcon[0];
							}
						}
					}
				
					this.masterWindowWord.bitmap.blt(
						ImageManager.loadSystem('IconSet'),
						Number(bkgIcon)% 16*32,Math.floor(Number(bkgIcon) / 16)*32, //切割坐标
						32,32,
						SSMBS_Window_Main.choiceStartX + (SSMBS_Window_Main.loadPosition(item)%SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace), 
						SSMBS_Window_Main.backpackStartY + Math.floor(SSMBS_Window_Main.loadPosition(item)/SSMBS_Window_Main.backpackPerLine-SSMBS_Window_Main.listFirstLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace),// 绘制坐标
						SSMBS_Window_Main.backpacKGridSize,	SSMBS_Window_Main.backpacKGridSize //最终大小
					)
					this.masterWindowWord.bitmap.blt(
					ImageManager.loadSystem('IconSet'),
					item.iconIndex % 16*32,Math.floor(item.iconIndex / 16)*32, //切割坐标
					32,	32,//切割尺寸
					SSMBS_Window_Main.choiceStartX + (SSMBS_Window_Main.loadPosition(item)%SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace), 
					SSMBS_Window_Main.backpackStartY + Math.floor(SSMBS_Window_Main.loadPosition(item)/SSMBS_Window_Main.backpackPerLine-SSMBS_Window_Main.listFirstLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace),// 绘制坐标
					SSMBS_Window_Main.backpacKGridSize,	SSMBS_Window_Main.backpacKGridSize //最终大小
				)
			}
		}
	}
	//拖动物品
	for( i = 0 ;i < this.gridsHasItem.length ; i ++ ){
		if( SSMBS_Window_Main.isOpen && this.gridsHasItem[i+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine] && this.gridsHasItem[i+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine] != 'empty' &&
			TouchInput.x > this.masterWindowWord.x + SSMBS_Window_Main.choiceStartX + (i%SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace)
			&& TouchInput.x < this.masterWindowWord.x + SSMBS_Window_Main.choiceStartX + (i%SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace)+SSMBS_Window_Main.backpacKGridSize
			&& TouchInput.y > this.masterWindowWord.y + SSMBS_Window_Main.backpackStartY + Math.floor(i/SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace)
			&& TouchInput.y < this.masterWindowWord.y + SSMBS_Window_Main.backpackStartY + Math.floor(i/SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace) + SSMBS_Window_Main.backpacKGridSize){
			//显示物品信息
			if(!this.isDrawing){
				this.itemInform = this.gridsHasItem[i+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine];
			}
			//拖动物品
			if( TouchInput.isPressed() && !this.nowPickedItem && !this.isDrawing){
				this.isDrawing = true;
				this.nowPickedItem = this.gridsHasItem[i+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine];
				this.touchIcon.item = this.nowPickedItem;
				this.isHandledItem = this.touchIcon;
				this.item = this.touchIcon.item;
				this.itemTypeDrawing = 'item';
				this.isDrawingItem = true;
			}
			if(TouchInput.isHovered()){
				// if(SSMBS_Window_Main.nowPickedItem){
				// 	SSMBS_Window_Main.nowPickedItemStore = SSMBS_Window_Main.nowPickedItem;
				// }
				// this.isDrawing = false;
				// this.isHandledItem = null;
				// this.touchIcon.item = null;
				// this.item = null;
				// this.isDrawingItem = false;
				// this.nowPickedItem = null;
			}
			//使用物品
			if( TouchInput.isCancelled() && !this.nowPickedItem && !this.isDrawing ){
				let item = this.gridsHasItem[i+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine];
				if( item!='empty' && (!item.itypeId||item.cd==0) ){
					sxlSimpleABS.useItem(item,$gamePlayer)
					if(!$gameParty.hasItem(item)){
						SSMBS_Window_Main.saveItemPositon(item,null);
					}
					//修正装备后消失
					// for(let e = 0 ; e < $gamePlayer.battler().equips().length ; e++){
					// 	if(!$gameParty.hasItem($gamePlayer.battler().equips()[e])){
					// 		$gameParty.gainItemHide($gamePlayer.battler().equips()[e],1)
					// 	}
					// }
				}
			}
		}
		if(this.isDrawingItem && this.touchIcon.item && TouchInput.isReleased()){
			SoundManager.playEquip();
			this.isDrawingItem = false;
		}
		
	}
	//放置物品
	for( j = 0 ;j < this.gridsHasItem.length ; j ++ ){
		if( SSMBS_Window_Main.isOpen &&
			TouchInput.isReleased() && this.nowPickedItem && (this.itemTypeDrawing == 'item' || this.itemTypeDrawing == 'equiped') &&
			TouchInput.x > this.masterWindowWord.x + SSMBS_Window_Main.choiceStartX + (j%SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace)
			&& TouchInput.x < this.masterWindowWord.x + SSMBS_Window_Main.choiceStartX + (j%SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace)+SSMBS_Window_Main.backpacKGridSize
			&& TouchInput.y > this.masterWindowWord.y + SSMBS_Window_Main.backpackStartY + Math.floor(j/SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace)
			&& TouchInput.y < this.masterWindowWord.y + SSMBS_Window_Main.backpackStartY + Math.floor(j/SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace) + SSMBS_Window_Main.backpacKGridSize ){
			if(this.gridsHasItem[j+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine] ){
				if( this.gridsHasItem[j+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine]!='emtpy'){
					//替换
					this.gridsHasItem[SSMBS_Window_Main.loadPosition(this.nowPickedItem)] = this.gridsHasItem[j+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine];
					// this.gridsHasItem[j+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine].positionInInventory = SSMBS_Window_Main.nowPickedItem.positionInInventory+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine;
					SSMBS_Window_Main.saveItemPositon(this.gridsHasItem[j+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine],SSMBS_Window_Main.loadPosition(this.nowPickedItem));
				}
				this.gridsHasItem[j+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine]=this.nowPickedItem;
				// this.gridsHasItem[j+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine].positionInInventory = j+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine;
				SSMBS_Window_Main.saveItemPositon(this.gridsHasItem[j+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine],j+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine);
				//装备拖动则卸下装备
				if( this.itemTypeDrawing == 'equiped'/*  && this.isDrawingItem */ && this.nowPickedItem.etypeId){
					let type = this.nowPickedItem.wtypeId?'weapon':'armor';
					console.log(this.itemTypeDrawing)
					if (type == 'weapon'){
						$gameParty.members()[0].changeEquip( 0 , $dataWeapons[1] ) ;
					}
					if (type == 'armor'){
						$gameParty.members()[0].changeEquip( this.nowPickedItem.etypeId - 1 , $dataArmors[this.nowPickedItem.etypeId-1]) ;
					}
				}
				this.nowPickedItem = null;
			}
			
		}
		//绘制物品数量
		this.masterWindowWord.bitmap.fontSize = SSMBS_Window_Main.gridsItemNumFontSize;
		this.masterWindowWord.bitmap.fontFace = $gameSystem.mainFontFace();
		if( this.gridsHasItem[j+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine] && this.gridsHasItem[j+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine]!='empty'){
			
			
			if( Math.floor(SSMBS_Window_Main.loadPosition(this.gridsHasItem[j+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine])/SSMBS_Window_Main.backpackPerLine-SSMBS_Window_Main.listFirstLine)>=0 
			&& (SSMBS_Window_Main.loadPosition(this.gridsHasItem[j+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine])<(SSMBS_Window_Main.backpackPerLine *SSMBS_Window_Main.backpackTotalLine + SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine))){
			let item = this.gridsHasItem[j+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine];
			if( $gameParty.numItems(item)>0 ){
				this.masterWindowWord.bitmap.textColor = ColorManager.textColor(0);
				
				this.masterWindowWord.bitmap.drawText(
				'x'+$gameParty.numItems(this.gridsHasItem[j+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine]),
				SSMBS_Window_Main.choiceStartX + (j%SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace),
				SSMBS_Window_Main.backpackStartY + (SSMBS_Window_Main.backpacKGridSize-SSMBS_Window_Main.gridsItemNumFontSize) + Math.floor(j/SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace),
				SSMBS_Window_Main.backpacKGridSize,
				SSMBS_Window_Main.gridsItemNumFontSize,
				'right'
				)
			}else if($gameParty.numItems(this.gridsHasItem[j+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine])==0 
				&& $gameParty.hasItem(this.gridsHasItem[j+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine],true)){
				this.masterWindowWord.bitmap.textColor = ColorManager.textColor(4);
				let item = this.gridsHasItem[j+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine];
				if(item.meta.bkgIcon){
					var bkgIcon = Number(item.meta.bkgIcon)
				}else{
					for( color in sxlSimpleItemList.rareColorIcon){
						if(Number(item.meta.textColor) == sxlSimpleItemList.rareColor[color]){
							var bkgIcon = sxlSimpleItemList.rareColorIcon[color];
						}
						if(!item.meta.textColor){
							var bkgIcon = sxlSimpleItemList.rareColorIcon[0];
						}
					}
				}
			
				this.masterWindowWord.bitmap.blt(
					ImageManager.loadSystem('IconSet'),
					Number(bkgIcon)% 16*32,Math.floor(Number(bkgIcon) / 16)*32, //切割坐标
					32,32,
					SSMBS_Window_Main.choiceStartX + (SSMBS_Window_Main.loadPosition(item)%SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace), 
					SSMBS_Window_Main.backpackStartY + Math.floor(SSMBS_Window_Main.loadPosition(item)/SSMBS_Window_Main.backpackPerLine-SSMBS_Window_Main.listFirstLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace),// 绘制坐标
					SSMBS_Window_Main.backpacKGridSize,	SSMBS_Window_Main.backpacKGridSize //最终大小
				)
				//绘制图标
				if(Math.floor(SSMBS_Window_Main.loadPosition(item)/SSMBS_Window_Main.backpackPerLine-SSMBS_Window_Main.listFirstLine)>=0 
					&& SSMBS_Window_Main.loadPosition(item)<SSMBS_Window_Main.backpackPerLine *SSMBS_Window_Main.backpackTotalLine + SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine ){
					this.masterWindowWord.bitmap.blt(
					ImageManager.loadSystem('IconSet'),
					item.iconIndex % 16*32,Math.floor(item.iconIndex / 16)*32, //切割坐标
					32,	32,//切割尺寸
					SSMBS_Window_Main.choiceStartX + (SSMBS_Window_Main.loadPosition(item)%SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace), 
					SSMBS_Window_Main.backpackStartY + Math.floor(SSMBS_Window_Main.loadPosition(item)/SSMBS_Window_Main.backpackPerLine-SSMBS_Window_Main.listFirstLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace),// 绘制坐标
					SSMBS_Window_Main.backpacKGridSize,	SSMBS_Window_Main.backpacKGridSize //最终大小
					)
				}
				this.masterWindowWord.bitmap.drawText(
					'E',
					SSMBS_Window_Main.choiceStartX + (j%SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace),
					SSMBS_Window_Main.backpackStartY + (SSMBS_Window_Main.backpacKGridSize-SSMBS_Window_Main.gridsItemNumFontSize) + Math.floor(j/SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace),
					SSMBS_Window_Main.backpacKGridSize,
					SSMBS_Window_Main.gridsItemNumFontSize,
					'right'
					)
				}
				//绘制冷却
				if( this.gridsHasItem[j+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine].cd>0 ){
					this.masterWindowWord.bitmap.drawText(
					ssmbsBasic.convertNumber(this.gridsHasItem[j+SSMBS_Window_Main.listFirstLine*SSMBS_Window_Main.backpackPerLine].cd,'second'),
					SSMBS_Window_Main.choiceStartX + (j%SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace),
					SSMBS_Window_Main.backpackStartY + (SSMBS_Window_Main.backpacKGridSize-SSMBS_Window_Main.gridsItemNumFontSize)/2 + Math.floor(j/SSMBS_Window_Main.backpackPerLine)*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace),
					SSMBS_Window_Main.backpacKGridSize,
					SSMBS_Window_Main.gridsItemNumFontSize,
					'center'
					)
				}
			}
		}
	}
	this.masterWindowWord.bitmap.fillRect(
		SSMBS_Window_Main.choiceStartX + SSMBS_Window_Main.backpackPerLine*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace),
		SSMBS_Window_Main.backpackStartY,
		SSMBS_Window_Main.scrollWidth,
		SSMBS_Window_Main.backpackTotalLine*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace)-SSMBS_Window_Main.backpacKSpace,
		'#555555' );
		if(TouchInput.isPressed() && !this.isDrawing ){
			this.isDrawing = true;
			this.isDrawingScroll = true;
		}
	this.masterWindowWord.bitmap.fillRect(
		SSMBS_Window_Main.choiceStartX + SSMBS_Window_Main.backpackPerLine*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace),
		SSMBS_Window_Main.backpackStartY + (SSMBS_Window_Main.backpackTotalLine*(SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace)-SSMBS_Window_Main.backpacKSpace)*((SSMBS_Window_Main.listFirstLine)/$gameParty.inventorySize),
		SSMBS_Window_Main.scrollWidth,
		((SSMBS_Window_Main.backpackTotalLine) * (SSMBS_Window_Main.backpacKGridSize+SSMBS_Window_Main.backpacKSpace)-SSMBS_Window_Main.backpacKSpace)*Math.min((((SSMBS_Window_Main.backpackTotalLine)/$gameParty.inventorySize)),1),
		SSMBS_Window_Main.scrollColor );
	if( SSMBS_Window_Main.isOpen &&
		TouchInput.x>this.masterWindowWord.x && TouchInput.x<this.masterWindowWord.x+SSMBS_Window_Main.width
		&& TouchInput.y>this.masterWindowWord.y && TouchInput.y<this.masterWindowWord.y+SSMBS_Window_Main.height){
		if(TouchInput.wheelY < 0 && SSMBS_Window_Main.listFirstLine>0){
			SSMBS_Window_Main.listFirstLine -= 1;
		}
		if(TouchInput.wheelY > 0 && SSMBS_Window_Main.listFirstLine<$gameParty.inventorySize-SSMBS_Window_Main.backpackTotalLine ){
			SSMBS_Window_Main.listFirstLine ++;
		}
	}
	//显示金币
	this.masterWindowWord.bitmap.drawText( ssmbsBasic.convertNumber($gameParty.gold(),'thousand'), SSMBS_Window_Main.width-64-32-12, SSMBS_Window_Main.height - 36,64,32,'right' )
	this.masterWindowWord.bitmap.blt(
		ImageManager.loadSystem('IconSet'),
		SSMBS_Window_Main.goldIcon % 16*32,Math.floor(SSMBS_Window_Main.goldIcon / 16)*32, //切割坐标
		32,	32,//切割尺寸
		SSMBS_Window_Main.width - SSMBS_Window_Main.choiceStartX - 32, 
		SSMBS_Window_Main.height - 36,// 绘制坐标
		32,	32 //最终大小
	)
};

Scene_Map.prototype.refresHhandbookWindow = function(){
	let lineHeight = SSMBS_Window_Main.handbookChoiceHeight;
	let choosedLines = 0;
	//动态行走图帧数
	if(SSMBS_Window_Main.frameSet === undefined){
		SSMBS_Window_Main.frameSet = 0 ;
		SSMBS_Window_Main.count = 0;
	}
	if(SSMBS_Window_Main.count<16){
		SSMBS_Window_Main.count++
	};
	if(SSMBS_Window_Main.count==16){
		SSMBS_Window_Main.count=0;
		if(SSMBS_Window_Main.frameSet<=4){
			SSMBS_Window_Main.frameSet ++;
		}
		if(SSMBS_Window_Main.frameSet==4){
			SSMBS_Window_Main.frameSet = 0;
		}
	};
	switch(SSMBS_Window_Main.frameSet){
		case 0 :
			SSMBS_Window_Main.frameShow = 0;
			break;
		case 1 :
			SSMBS_Window_Main.frameShow = 1;
			break;
		case 2 :
			SSMBS_Window_Main.frameShow = 2;
			break;
		case 3 :
			SSMBS_Window_Main.frameShow = 1;
			break;
	};
	
	//判断是否显示详情
	if(!SSMBS_Window_Main.handBookNowEntry){
		//描绘种类
		for(let i = 0 ; i < SSMBS_Window_Main.handbookTypes.length ; i ++ ){
			this.masterWindowWord.bitmap.drawText( SSMBS_Window_Main.handbookTypes[i], SSMBS_Window_Main.choiceStartX, SSMBS_Window_Main.handbookStartY+i*(lineHeight+SSMBS_Window_Main.handbookChoiceHeightSpace),SSMBS_Window_Main.handbookChoiceWidth,lineHeight,'center' )
			let hbChoice_stx = this.masterWindowWord.x + SSMBS_Window_Main.choiceStartX;
			let hbChoice_sty = this.masterWindowWord.y + SSMBS_Window_Main.handbookStartY+i*(lineHeight+SSMBS_Window_Main.handbookChoiceHeightSpace);
			let hbChoice_edx = hbChoice_stx+SSMBS_Window_Main.handbookChoiceWidth;
			let hbChoice_edy = hbChoice_sty+lineHeight;
			if(ssmbsBasic.isTouching(hbChoice_stx,hbChoice_sty,hbChoice_edx,hbChoice_edy)){
				this.masterWindow.bitmap.fillRect( SSMBS_Window_Main.choiceStartX, SSMBS_Window_Main.handbookStartY+i*(lineHeight+SSMBS_Window_Main.handbookChoiceHeightSpace), SSMBS_Window_Main.handbookChoiceWidth, lineHeight,'#ffffff');
				if(TouchInput.isTriggered()){
					SoundManager.playCursor();
					SSMBS_Window_Main.handbookNowChoice = i ;
					SSMBS_Window_Main.nowPage = 1;
				}
			}
		};
		//赋值页面和种类ID
		for(let j = 0 ; j < $gameParty.handbook.length ; j ++){
			if($gameParty.handbook[j].type == SSMBS_Window_Main.handbookTypes[SSMBS_Window_Main.handbookNowChoice]){
				choosedLines ++ ;
				$gameParty.handbook[j].typeId = choosedLines-1;
				$gameParty.handbook[j].page = Math.floor($gameParty.handbook[j].typeId / (SSMBS_Window_Main.handbookPerLine*SSMBS_Window_Main.handbookTotalLine))+1;
			}
		}
		//描绘翻页
		// this.masterWindowWord.bitmap.drawText( '上一页  ', SSMBS_Window_Main.choiceStartX+SSMBS_Window_Main.handbookChoiceWidth+6, SSMBS_Window_Main.height - SSMBS_Window_Main.handbookStartY,SSMBS_Window_Main.width - SSMBS_Window_Main.handbookChoiceWidth-6-SSMBS_Window_Main.choiceStartX*2, 24 ,'left' );
		// this.masterWindowWord.bitmap.drawText( '下一页  ', SSMBS_Window_Main.choiceStartX+SSMBS_Window_Main.handbookChoiceWidth+6, SSMBS_Window_Main.height - SSMBS_Window_Main.handbookStartY,SSMBS_Window_Main.width - SSMBS_Window_Main.handbookChoiceWidth-6-SSMBS_Window_Main.choiceStartX*2, 24 ,'right' );
		let back_stx = this.masterWindowWord.x + SSMBS_Window_Main.choiceStartX+SSMBS_Window_Main.handbookChoiceWidth+6+SSMBS_Window_Main.handbookPageXoffset+SSMBS_Window_Main.handbookPageXoffsetWhole;
		let back_sty = this.masterWindowWord.y+( SSMBS_Window_Main.height - SSMBS_Window_Main.handbookStartY );
		let back_edx = back_stx + ImageManager.loadSystem(SSMBS_Window_Main.handbookPageLeftImgTouching).width;
		let back_edy = back_sty + ImageManager.loadSystem(SSMBS_Window_Main.handbookPageLeftImgTouching).height;

		let next_stx = this.masterWindowWord.x + SSMBS_Window_Main.width - 6 - ImageManager.loadSystem(SSMBS_Window_Main.handbookPageRightImg).width-SSMBS_Window_Main.handbookPageXoffset+SSMBS_Window_Main.handbookPageXoffsetWhole;
		let next_sty = this.masterWindowWord.y+( SSMBS_Window_Main.height - SSMBS_Window_Main.handbookStartY );
		let next_edx = next_stx + ImageManager.loadSystem(SSMBS_Window_Main.handbookPageRightImgTouching).width;
		let next_edy = next_sty + ImageManager.loadSystem(SSMBS_Window_Main.handbookPageRightImgTouching).height;

		if(ssmbsBasic.isTouching(back_stx,back_sty,back_edx,back_edy)){
			this.masterWindowWord.bitmap.blt( 
				ImageManager.loadSystem(SSMBS_Window_Main.handbookPageLeftImgTouching),
				0,0,
				ImageManager.loadSystem(SSMBS_Window_Main.handbookPageLeftImgTouching).width,ImageManager.loadSystem(SSMBS_Window_Main.handbookPageLeftImgTouching).height,
				SSMBS_Window_Main.choiceStartX+SSMBS_Window_Main.handbookChoiceWidth+6+SSMBS_Window_Main.handbookPageXoffset+SSMBS_Window_Main.handbookPageXoffsetWhole, SSMBS_Window_Main.height - SSMBS_Window_Main.handbookStartY , 
				ImageManager.loadSystem(SSMBS_Window_Main.handbookPageLeftImgTouching).width,ImageManager.loadSystem(SSMBS_Window_Main.handbookPageLeftImgTouching).height,
				'center' 
			);
			if(TouchInput.isTriggered()){
				if(SSMBS_Window_Main.nowPage>1){
					SSMBS_Window_Main.nowPage --;
				}
			}
		}else{
			this.masterWindowWord.bitmap.blt( 
				ImageManager.loadSystem(SSMBS_Window_Main.handbookPageLeftImg),
				0,0,
				ImageManager.loadSystem(SSMBS_Window_Main.handbookPageLeftImg).width,ImageManager.loadSystem(SSMBS_Window_Main.handbookPageLeftImg).height,
				SSMBS_Window_Main.choiceStartX+SSMBS_Window_Main.handbookChoiceWidth+6+SSMBS_Window_Main.handbookPageXoffset+SSMBS_Window_Main.handbookPageXoffsetWhole, SSMBS_Window_Main.height - SSMBS_Window_Main.handbookStartY , 
				ImageManager.loadSystem(SSMBS_Window_Main.handbookPageLeftImg).width,ImageManager.loadSystem(SSMBS_Window_Main.handbookPageLeftImg).height,
				'center' 
			);
		}
		if(ssmbsBasic.isTouching(next_stx,next_sty,next_edx,next_edy)){
			this.masterWindowWord.bitmap.blt( 
				ImageManager.loadSystem(SSMBS_Window_Main.handbookPageRightImgTouching),
				0,0,
				ImageManager.loadSystem(SSMBS_Window_Main.handbookPageRightImgTouching).width,ImageManager.loadSystem(SSMBS_Window_Main.handbookPageRightImgTouching).height,
				SSMBS_Window_Main.width - 6 - ImageManager.loadSystem(SSMBS_Window_Main.handbookPageRightImg).width-SSMBS_Window_Main.handbookPageXoffset+SSMBS_Window_Main.handbookPageXoffsetWhole, SSMBS_Window_Main.height - SSMBS_Window_Main.handbookStartY , 
				ImageManager.loadSystem(SSMBS_Window_Main.handbookPageRightImgTouching).width,ImageManager.loadSystem(SSMBS_Window_Main.handbookPageRightImgTouching).height,
				'center' 
			);
			if(TouchInput.isTriggered()){
				if(SSMBS_Window_Main.nowPage<SSMBS_Window_Main.handbookTypesMaxPage[SSMBS_Window_Main.handbookNowChoice]){
					SSMBS_Window_Main.nowPage ++;
				}
			}
		}else{
			this.masterWindowWord.bitmap.blt( 
				ImageManager.loadSystem(SSMBS_Window_Main.handbookPageRightImg),
				0,0,
				ImageManager.loadSystem(SSMBS_Window_Main.handbookPageRightImg).width,ImageManager.loadSystem(SSMBS_Window_Main.handbookPageRightImg).height,
				SSMBS_Window_Main.width - 6 - ImageManager.loadSystem(SSMBS_Window_Main.handbookPageRightImg).width-SSMBS_Window_Main.handbookPageXoffset+SSMBS_Window_Main.handbookPageXoffsetWhole, SSMBS_Window_Main.height - SSMBS_Window_Main.handbookStartY , 
				ImageManager.loadSystem(SSMBS_Window_Main.handbookPageRightImg).width,ImageManager.loadSystem(SSMBS_Window_Main.handbookPageRightImg).height,
				'center' 
			);
		}
		//描绘页数
		this.masterWindowWord.bitmap.drawText( SSMBS_Window_Main.nowPage + ' / '+SSMBS_Window_Main.handbookTypesMaxPage[SSMBS_Window_Main.handbookNowChoice], SSMBS_Window_Main.choiceStartX+SSMBS_Window_Main.handbookChoiceWidth+6, SSMBS_Window_Main.height - SSMBS_Window_Main.handbookStartY,SSMBS_Window_Main.width - SSMBS_Window_Main.handbookChoiceWidth-6-SSMBS_Window_Main.choiceStartX*2, 24 ,'center' );
		if($gameParty.handbook){
			for( let i = 0 ; i < $gameParty.handbook.length ; i ++ ){
				if( $gameParty.handbook[i].type == SSMBS_Window_Main.handbookTypes[SSMBS_Window_Main.handbookNowChoice] &&( $gameParty.handbook[i].page == SSMBS_Window_Main.nowPage)){
					//描绘图鉴图像 脸图
					if( $gameParty.handbook[i].face ){
						let index = 0;
						if($gameParty.handbook[i].faceIndex){
							index = Number($gameParty.handbook[i].faceIndex)
						}
						this.masterWindowWord.bitmap.blt(
							ImageManager.loadFace($gameParty.handbook[i].face),
							index % 4*144,Math.floor(index / 4)*144, //切割坐标
							144,144,//切割尺寸
							SSMBS_Window_Main.choiceStartX+SSMBS_Window_Main.handbookChoiceWidth+6 + ($gameParty.handbook[i].typeId % SSMBS_Window_Main.handbookPerLine)* (SSMBS_Window_Main.handbookFaceSize +SSMBS_Window_Main.handbookFaceSpace), 
							SSMBS_Window_Main.handbookStartY+6 + (Math.floor($gameParty.handbook[i].typeId / SSMBS_Window_Main.handbookPerLine)-($gameParty.handbook[i].page-1)*SSMBS_Window_Main.handbookTotalLine)* (SSMBS_Window_Main.handbookFaceSize +SSMBS_Window_Main.handbookFaceSpace+SSMBS_Window_Main.handbookFaceSpaceY),// 绘制坐标
							SSMBS_Window_Main.handbookFaceSize,SSMBS_Window_Main.handbookFaceSize //最终大小
						)
					}
					//描绘角色图像 行走图
					if( $gameParty.handbook[i].character ){
						let char = ImageManager.loadCharacter($gameParty.handbook[i].character);
						this.masterWindowWord.bitmap.blt(
							char,
							SSMBS_Window_Main.frameShow*char.width/3,0, //切割坐标
							char.width/3,char.height/4,//切割尺寸
							SSMBS_Window_Main.choiceStartX+SSMBS_Window_Main.handbookChoiceWidth+6 + ($gameParty.handbook[i].typeId % SSMBS_Window_Main.handbookPerLine)* (SSMBS_Window_Main.handbookFaceSize +SSMBS_Window_Main.handbookFaceSpace), 
							SSMBS_Window_Main.handbookStartY+6 + (Math.floor($gameParty.handbook[i].typeId / SSMBS_Window_Main.handbookPerLine)-($gameParty.handbook[i].page-1)*SSMBS_Window_Main.handbookTotalLine)* (SSMBS_Window_Main.handbookFaceSize +SSMBS_Window_Main.handbookFaceSpace+SSMBS_Window_Main.handbookFaceSpaceY),// 绘制坐标
							SSMBS_Window_Main.handbookFaceSize,SSMBS_Window_Main.handbookFaceSize //最终大小
						)
						
					}
					//描绘图鉴名称
					if(!$gameParty.handbook[i].titleColor){
						$gameParty.handbook[i].titleColor = 0;
					}
					this.masterWindowWord.bitmap.textColor = ColorManager.textColor(Number($gameParty.handbook[i].titleColor));
					this.masterWindowWord.bitmap.drawText(
						$gameParty.handbook[i].title,
						SSMBS_Window_Main.choiceStartX+SSMBS_Window_Main.handbookChoiceWidth+6 + ($gameParty.handbook[i].typeId % SSMBS_Window_Main.handbookPerLine)* (SSMBS_Window_Main.handbookFaceSize +SSMBS_Window_Main.handbookFaceSpace), 
						SSMBS_Window_Main.handbookStartY+6 + (Math.floor($gameParty.handbook[i].typeId / SSMBS_Window_Main.handbookPerLine)-($gameParty.handbook[i].page-1)*SSMBS_Window_Main.handbookTotalLine)* (SSMBS_Window_Main.handbookFaceSize +SSMBS_Window_Main.handbookFaceSpace+SSMBS_Window_Main.handbookFaceSpaceY)+SSMBS_Window_Main.handbookFaceSize/2+12,// 绘制坐标
						SSMBS_Window_Main.handbookFaceSize,SSMBS_Window_Main.handbookFaceSize, //最终大小
						'center'
					)
					this.masterWindowWord.bitmap.textColor = ColorManager.textColor(0);
					let face_stx = this.masterWindowWord.x + SSMBS_Window_Main.choiceStartX+SSMBS_Window_Main.handbookChoiceWidth+6 + ($gameParty.handbook[i].typeId % SSMBS_Window_Main.handbookPerLine)* (SSMBS_Window_Main.handbookFaceSize +SSMBS_Window_Main.handbookFaceSpace);
					let face_sty = this.masterWindowWord.y + SSMBS_Window_Main.handbookStartY+6 + (Math.floor($gameParty.handbook[i].typeId / SSMBS_Window_Main.handbookPerLine)-($gameParty.handbook[i].page-1)*SSMBS_Window_Main.handbookTotalLine)* (SSMBS_Window_Main.handbookFaceSize +SSMBS_Window_Main.handbookFaceSpace+SSMBS_Window_Main.handbookFaceSpaceY);
					let face_edx = face_stx + SSMBS_Window_Main.handbookFaceSize;
					let face_edy = face_sty + SSMBS_Window_Main.handbookFaceSize + SSMBS_Window_Main.handbookFaceSize/2;
					//点击图像进入详情
					if(ssmbsBasic.isTouching(face_stx,face_sty,face_edx,face_edy)){
						if(TouchInput.isTriggered()){
							SoundManager.playCursor();
							SSMBS_Window_Main.handBookNowEntry = $gameParty.handbook[i];
						}
					}
				}
			}
		}
	}else{
		//详情页面
		//描绘图片
		if(SSMBS_Window_Main.handBookNowEntry.img){
			if(!SSMBS_Window_Main.handBookNowEntry.imgScale){
				SSMBS_Window_Main.handBookNowEntry.imgScale = 1;
			}
			this.masterWindowWord.bitmap.blt(
				ImageManager.loadPicture(SSMBS_Window_Main.handBookNowEntry.img),
				 0,0,//切割坐标
				ImageManager.loadPicture(SSMBS_Window_Main.handBookNowEntry.img).width,ImageManager.loadPicture(SSMBS_Window_Main.handBookNowEntry.img).height,//切割尺寸
				SSMBS_Window_Main.choiceStartX,SSMBS_Window_Main.handbookStartY+6,//绘制坐标
				ImageManager.loadPicture(SSMBS_Window_Main.handBookNowEntry.img).width*SSMBS_Window_Main.handBookNowEntry.imgScale,ImageManager.loadPicture(SSMBS_Window_Main.handBookNowEntry.img).height*SSMBS_Window_Main.handBookNowEntry.imgScale //最终大小
			)
		}
		if(!SSMBS_Window_Main.handBookNowEntry.titleColor){
			SSMBS_Window_Main.handBookNowEntry.titleColor = 0;
		}
		//描绘名称
		if(!SSMBS_Window_Main.handBookNowEntry.informationNoTitle){
			this.masterWindowWord.bitmap.textColor = ColorManager.textColor(Number(SSMBS_Window_Main.handBookNowEntry.titleColor));
			this.masterWindowWord.bitmap.fontSize = SSMBS_Window_Main.mainfontSize+4;
			this.masterWindowWord.bitmap.fontFace = $gameSystem.mainFontFace();
			this.masterWindowWord.bitmap.fontBold = true;
			this.masterWindowWord.bitmap.drawText(
				SSMBS_Window_Main.handBookNowEntry.title,
				SSMBS_Window_Main.choiceStartX+ImageManager.loadPicture(SSMBS_Window_Main.handBookNowEntry.img).width*SSMBS_Window_Main.handBookNowEntry.imgScale+6, 
				SSMBS_Window_Main.handbookStartY+6,// 绘制坐标
				SSMBS_Window_Main.width-(ImageManager.loadPicture(SSMBS_Window_Main.handBookNowEntry.img).width*SSMBS_Window_Main.handBookNowEntry.imgScale+6),24, //最终大小
				'left'
			)
		}
		this.masterWindowWord.bitmap.fontSize = SSMBS_Window_Main.mainfontSize;
		this.masterWindowWord.bitmap.fontBold = false;
		this.masterWindowWord.bitmap.textColor = ColorManager.textColor(0);
		//描绘介绍文字
		if(SSMBS_Window_Main.handBookNowEntry.desc){
			let allDesc = SSMBS_Window_Main.handBookNowEntry.desc;
			for(let l = 0 ; l < allDesc.split('/NL').length ; l ++ ){
				this.masterWindowWord.bitmap.drawText(
					allDesc.split('/NL')[l],
					SSMBS_Window_Main.choiceStartX+ImageManager.loadPicture(SSMBS_Window_Main.handBookNowEntry.img).width*SSMBS_Window_Main.handBookNowEntry.imgScale+6, 
					SSMBS_Window_Main.handbookStartY+6+36+ l * SSMBS_Window_Main.handbookChoiceHeight,// 绘制坐标
					SSMBS_Window_Main.width-(ImageManager.loadPicture(SSMBS_Window_Main.handBookNowEntry.img).width*SSMBS_Window_Main.handBookNowEntry.imgScale+6),SSMBS_Window_Main.handbookChoiceHeight, //最终大小
					'left'
				)
			}
		}
		//描绘返回按钮
	
		let turnback_stx = this.masterWindowWord.x+SSMBS_Window_Main.choiceStartX+SSMBS_Window_Main.handbookBackPicX;
		let turnback_sty = this.masterWindowWord.y+SSMBS_Window_Main.handbookStartY+6+SSMBS_Window_Main.handbookBackPicY;
		let turnback_edx = turnback_stx+ImageManager.loadSystem(SSMBS_Window_Main.handbookBackButtonPic).width;
		let turnback_edy = turnback_sty+ImageManager.loadSystem(SSMBS_Window_Main.handbookBackButtonPic).height;
		if(ssmbsBasic.isTouching(turnback_stx,turnback_sty,turnback_edx,turnback_edy)){
			this.masterWindowWord.bitmap.blt(
				ImageManager.loadSystem(SSMBS_Window_Main.handbookBackButtonPicTouching),
				0,0,
				ImageManager.loadSystem(SSMBS_Window_Main.handbookBackButtonPicTouching).width,ImageManager.loadSystem(SSMBS_Window_Main.handbookBackButtonPicTouching).height,
				SSMBS_Window_Main.choiceStartX+SSMBS_Window_Main.handbookBackPicX, SSMBS_Window_Main.handbookStartY+6+SSMBS_Window_Main.handbookBackPicY,// 绘制坐标
				ImageManager.loadSystem(SSMBS_Window_Main.handbookBackButtonPicTouching).width,ImageManager.loadSystem(SSMBS_Window_Main.handbookBackButtonPicTouching).height, //最终大小
			);
			if(TouchInput.isTriggered()){
				SoundManager.playCursor();
				SSMBS_Window_Main.handBookNowEntry = null;
			}
		}else{
			this.masterWindowWord.bitmap.blt(
				ImageManager.loadSystem(SSMBS_Window_Main.handbookBackButtonPic),
				0,0,
				ImageManager.loadSystem(SSMBS_Window_Main.handbookBackButtonPic).width,ImageManager.loadSystem(SSMBS_Window_Main.handbookBackButtonPic).height,
				SSMBS_Window_Main.choiceStartX+SSMBS_Window_Main.handbookBackPicX, SSMBS_Window_Main.handbookStartY+6+SSMBS_Window_Main.handbookBackPicY,// 绘制坐标
				ImageManager.loadSystem(SSMBS_Window_Main.handbookBackButtonPic).width,ImageManager.loadSystem(SSMBS_Window_Main.handbookBackButtonPic).height, //最终大小
			);
		}
	}
};

Scene_Map.prototype.refreshSystemWindow = function(){
	this.masterWindowWord.bitmap.fontFace = $gameSystem.mainFontFace();
	this.masterWindowWord.bitmap.textColor = ColorManager.textColor(0);
	let line = 0;
	this.masterWindowWord.bitmap.fontSize = SSMBS_Window_Main.optionFontSize+2;
	this.masterWindowWord.bitmap.drawText( '音量设置', SSMBS_Window_Main.optionStartX, SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight , SSMBS_Window_Main.width - SSMBS_Window_Main.optionStartX*2 ,SSMBS_Window_Main.optionLineHeight,'center' );
	line += 1.2 ;
	this.masterWindowWord.bitmap.fontSize = SSMBS_Window_Main.optionFontSize;
	this.masterWindowWord.bitmap.drawText( TextManager.bgmVolume, SSMBS_Window_Main.optionStartX, SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight , SSMBS_Window_Main.width - SSMBS_Window_Main.optionStartX*2 ,SSMBS_Window_Main.optionLineHeight,'left' );
	this.masterWindowWord.bitmap.fillRect( SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset, SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight +SSMBS_Window_Main.optionvolumeYoffset , SSMBS_Window_Main.optionVolumeWidth  , SSMBS_Window_Main.optionVolumeHeight,'#111111' );
	SSMBS_Window_Main.bgmRate = Number(ConfigManager['bgmVolume']) / 100;
	this.masterWindowWord.bitmap.fillRect( SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset, SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight +SSMBS_Window_Main.optionvolumeYoffset , (SSMBS_Window_Main.optionVolumeWidth)*SSMBS_Window_Main.bgmRate, SSMBS_Window_Main.optionVolumeHeight,'#ffffff' );
	this.masterWindowWord.bitmap.drawText( ConfigManager['bgmVolume'] + '%', SSMBS_Window_Main.optionStartX, SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight , SSMBS_Window_Main.width - SSMBS_Window_Main.optionStartX*2 ,SSMBS_Window_Main.optionLineHeight,'right' );
	
	if( TouchInput.x >= this.masterWindowWord.x + SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset &&
		TouchInput.y >= this.masterWindowWord.y + SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight +SSMBS_Window_Main.optionvolumeYoffset &&
		TouchInput.x <= this.masterWindowWord.x + SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset + SSMBS_Window_Main.width - SSMBS_Window_Main.optionStartX*2 && 
		TouchInput.y <= this.masterWindowWord.y + SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight +SSMBS_Window_Main.optionvolumeYoffset + SSMBS_Window_Main.optionLineHeight ){
		if(TouchInput.isPressed() && !this.isDrawing && !this.drawingWindow ){
			if(TouchInput.x - (this.masterWindowWord.x + SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset)>SSMBS_Window_Main.bgmRate*SSMBS_Window_Main.optionVolumeWidth){
				ConfigManager['bgmVolume'] ++ ;
			}
			if(TouchInput.x - (this.masterWindowWord.x + SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset)<SSMBS_Window_Main.bgmRate*SSMBS_Window_Main.optionVolumeWidth){
				ConfigManager['bgmVolume'] -- ;
			}
			ConfigManager['bgmVolume'] = ConfigManager['bgmVolume'].clamp(0,100);
		}
	};
	
	line ++ ;
	this.masterWindowWord.bitmap.drawText( TextManager.bgsVolume, SSMBS_Window_Main.optionStartX, SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight, SSMBS_Window_Main.width - SSMBS_Window_Main.optionStartX*2 ,SSMBS_Window_Main.optionLineHeight,'left' );
	this.masterWindowWord.bitmap.fillRect( SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset, SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight +SSMBS_Window_Main.optionvolumeYoffset , SSMBS_Window_Main.optionVolumeWidth  , SSMBS_Window_Main.optionVolumeHeight,'#111111' );
	SSMBS_Window_Main.bgsRate = Number(ConfigManager['bgsVolume']) / 100;
	this.masterWindowWord.bitmap.fillRect( SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset, SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight +SSMBS_Window_Main.optionvolumeYoffset , (SSMBS_Window_Main.optionVolumeWidth)*SSMBS_Window_Main.bgsRate, SSMBS_Window_Main.optionVolumeHeight,'#ffffff' );
	this.masterWindowWord.bitmap.drawText( ConfigManager['bgsVolume'] + '%', SSMBS_Window_Main.optionStartX, SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight , SSMBS_Window_Main.width - SSMBS_Window_Main.optionStartX*2 ,SSMBS_Window_Main.optionLineHeight,'right' );
	
	if( TouchInput.x >= this.masterWindowWord.x + SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset &&
		TouchInput.y >= this.masterWindowWord.y + SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight +SSMBS_Window_Main.optionvolumeYoffset &&
		TouchInput.x <= this.masterWindowWord.x + SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset + SSMBS_Window_Main.width - SSMBS_Window_Main.optionStartX*2 && 
		TouchInput.y <= this.masterWindowWord.y + SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight +SSMBS_Window_Main.optionvolumeYoffset + SSMBS_Window_Main.optionLineHeight ){
		if(TouchInput.isPressed() && !this.isDrawing && !this.drawingWindow ){
			if(TouchInput.x - (this.masterWindowWord.x + SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset)>SSMBS_Window_Main.bgsRate*SSMBS_Window_Main.optionVolumeWidth){
				ConfigManager['bgsVolume'] ++ ;
			}
			if(TouchInput.x - (this.masterWindowWord.x + SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset)<SSMBS_Window_Main.bgsRate*SSMBS_Window_Main.optionVolumeWidth){
				ConfigManager['bgsVolume'] -- ;
			}
			ConfigManager['bgsVolume'] = ConfigManager['bgsVolume'].clamp(0,100);
		}
	};

	line ++ ;
	this.masterWindowWord.bitmap.drawText( TextManager.meVolume, SSMBS_Window_Main.optionStartX, SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight, SSMBS_Window_Main.width - SSMBS_Window_Main.optionStartX*2 ,SSMBS_Window_Main.optionLineHeight,'left' );
	this.masterWindowWord.bitmap.fillRect( SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset, SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight +SSMBS_Window_Main.optionvolumeYoffset , SSMBS_Window_Main.optionVolumeWidth  , SSMBS_Window_Main.optionVolumeHeight,'#111111' );
	SSMBS_Window_Main.meRate = Number(ConfigManager['meVolume']) / 100;
	this.masterWindowWord.bitmap.fillRect( SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset, SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight +SSMBS_Window_Main.optionvolumeYoffset , (SSMBS_Window_Main.optionVolumeWidth)*SSMBS_Window_Main.meRate, SSMBS_Window_Main.optionVolumeHeight,'#ffffff' );
	this.masterWindowWord.bitmap.drawText( ConfigManager['meVolume'] + '%', SSMBS_Window_Main.optionStartX, SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight , SSMBS_Window_Main.width - SSMBS_Window_Main.optionStartX*2 ,SSMBS_Window_Main.optionLineHeight,'right' );
	
	if( TouchInput.x >= this.masterWindowWord.x + SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset &&
		TouchInput.y >= this.masterWindowWord.y + SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight +SSMBS_Window_Main.optionvolumeYoffset &&
		TouchInput.x <= this.masterWindowWord.x + SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset + SSMBS_Window_Main.width - SSMBS_Window_Main.optionStartX*2 && 
		TouchInput.y <= this.masterWindowWord.y + SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight +SSMBS_Window_Main.optionvolumeYoffset + SSMBS_Window_Main.optionLineHeight ){
		if(TouchInput.isPressed() && !this.isDrawing && !this.drawingWindow ){
			if(TouchInput.x - (this.masterWindowWord.x + SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset)>SSMBS_Window_Main.meRate*SSMBS_Window_Main.optionVolumeWidth){
				ConfigManager['meVolume'] ++ ;
			}
			if(TouchInput.x - (this.masterWindowWord.x + SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset)<SSMBS_Window_Main.meRate*SSMBS_Window_Main.optionVolumeWidth){
				ConfigManager['meVolume'] -- ;
			}
			ConfigManager['meVolume'] = ConfigManager['meVolume'].clamp(0,100);
		}
	};
	
	line ++ ;
	this.masterWindowWord.bitmap.drawText( TextManager.seVolume, SSMBS_Window_Main.optionStartX, SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight, SSMBS_Window_Main.width - SSMBS_Window_Main.optionStartX*2 ,SSMBS_Window_Main.optionLineHeight,'left' );
	this.masterWindowWord.bitmap.fillRect( SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset, SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight +SSMBS_Window_Main.optionvolumeYoffset , SSMBS_Window_Main.optionVolumeWidth  , SSMBS_Window_Main.optionVolumeHeight,'#111111' );
	SSMBS_Window_Main.seRate = Number(ConfigManager['seVolume']) / 100;
	this.masterWindowWord.bitmap.fillRect( SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset, SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight +SSMBS_Window_Main.optionvolumeYoffset , (SSMBS_Window_Main.optionVolumeWidth)*SSMBS_Window_Main.seRate, SSMBS_Window_Main.optionVolumeHeight,'#ffffff' );
	this.masterWindowWord.bitmap.drawText( ConfigManager['seVolume'] + '%', SSMBS_Window_Main.optionStartX, SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight , SSMBS_Window_Main.width - SSMBS_Window_Main.optionStartX*2 ,SSMBS_Window_Main.optionLineHeight,'right' );
	
	if( TouchInput.x >= this.masterWindowWord.x + SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset &&
		TouchInput.y >= this.masterWindowWord.y + SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight +SSMBS_Window_Main.optionvolumeYoffset &&
		TouchInput.x <= this.masterWindowWord.x + SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset + SSMBS_Window_Main.width - SSMBS_Window_Main.optionStartX*2 && 
		TouchInput.y <= this.masterWindowWord.y + SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight +SSMBS_Window_Main.optionvolumeYoffset + SSMBS_Window_Main.optionLineHeight ){
		if(TouchInput.isPressed() && !this.isDrawing && !this.drawingWindow ){
			if(TouchInput.x - (this.masterWindowWord.x + SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset)>SSMBS_Window_Main.seRate*SSMBS_Window_Main.optionVolumeWidth){
				ConfigManager['seVolume'] ++ ;
			}
			if(TouchInput.x - (this.masterWindowWord.x + SSMBS_Window_Main.optionStartX + SSMBS_Window_Main.optionVolumeXoffset)<SSMBS_Window_Main.seRate*SSMBS_Window_Main.optionVolumeWidth){
				ConfigManager['seVolume'] -- ;
			}
			ConfigManager['seVolume'] = ConfigManager['seVolume'].clamp(0,100);
		}
	};
	
	line +=2.5 ;

	
	let backTitle_stx = this.masterWindowWord.x + SSMBS_Window_Main.width/2-ImageManager.loadSystem('backTitle').width/2;
	let backTitle_sty = this.masterWindowWord.y + SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight;
	let backTitle_edx = backTitle_stx + ImageManager.loadSystem(SSMBS_Window_Main.backTitleImg).width;
	let backTitle_edy = backTitle_sty + ImageManager.loadSystem(SSMBS_Window_Main.backTitleImg).height;
	if(ssmbsBasic.isTouching(backTitle_stx,backTitle_sty,backTitle_edx,backTitle_edy)){
		this.masterWindowWord.bitmap.blt( 
			ImageManager.loadSystem(SSMBS_Window_Main.backTitleImgTouching),
			0,0,
			ImageManager.loadSystem(SSMBS_Window_Main.backTitleImgTouching).width,ImageManager.loadSystem(SSMBS_Window_Main.backTitleImgTouching).height,
			SSMBS_Window_Main.width/2-ImageManager.loadSystem(SSMBS_Window_Main.backTitleImgTouching).width/2, SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight , 
			ImageManager.loadSystem(SSMBS_Window_Main.backTitleImgTouching).width,ImageManager.loadSystem(SSMBS_Window_Main.backTitleImgTouching).height,
			'center' 
		);
		if(TouchInput.isTriggered()){
			SceneManager.push(Scene_Title);
		}
	}else{
		this.masterWindowWord.bitmap.blt( 
			ImageManager.loadSystem(SSMBS_Window_Main.backTitleImg),
			0,0,
			ImageManager.loadSystem(SSMBS_Window_Main.backTitleImg).width,ImageManager.loadSystem(SSMBS_Window_Main.backTitleImg).height,
			SSMBS_Window_Main.width/2-ImageManager.loadSystem(SSMBS_Window_Main.backTitleImg).width/2, SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight , 
			ImageManager.loadSystem(SSMBS_Window_Main.backTitleImg).width,ImageManager.loadSystem(SSMBS_Window_Main.backTitleImg).height,
			'center' 
		);
	}
	line +=1.5 ;
	let exit_stx = this.masterWindowWord.x + SSMBS_Window_Main.width/2-ImageManager.loadSystem(SSMBS_Window_Main.backTitleImg).width/2;
	let exit_sty = this.masterWindowWord.y + SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight;
	let exit_edx = exit_stx + ImageManager.loadSystem(SSMBS_Window_Main.exitButtonImg).width;
	let exit_edy = exit_sty + ImageManager.loadSystem(SSMBS_Window_Main.exitButtonImg).height;
	if(ssmbsBasic.isTouching(exit_stx,exit_sty,exit_edx,exit_edy)){
		this.masterWindowWord.bitmap.blt( 
			ImageManager.loadSystem(SSMBS_Window_Main.exitButtonImgTouching),
			0,0,
			ImageManager.loadSystem(SSMBS_Window_Main.exitButtonImgTouching).width,ImageManager.loadSystem(SSMBS_Window_Main.exitButtonImgTouching).height,
			SSMBS_Window_Main.width/2-ImageManager.loadSystem(SSMBS_Window_Main.exitButtonImgTouching).width/2, SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight , 
			ImageManager.loadSystem(SSMBS_Window_Main.exitButtonImgTouching).width,ImageManager.loadSystem(SSMBS_Window_Main.exitButtonImgTouching).height,
			'center' 
		);
		if(TouchInput.isTriggered()){
			SceneManager.pop();
		}
	}else{
		this.masterWindowWord.bitmap.blt( 
			ImageManager.loadSystem(SSMBS_Window_Main.exitButtonImg),
			0,0,
			ImageManager.loadSystem(SSMBS_Window_Main.exitButtonImg).width,ImageManager.loadSystem(SSMBS_Window_Main.exitButtonImg).height,
			SSMBS_Window_Main.width/2-ImageManager.loadSystem(SSMBS_Window_Main.exitButtonImg).width/2, SSMBS_Window_Main.optionStartY + line * SSMBS_Window_Main.optionLineHeight , 
			ImageManager.loadSystem(SSMBS_Window_Main.exitButtonImg).width,ImageManager.loadSystem(SSMBS_Window_Main.exitButtonImg).height,
			'center' 
		);
	}
};

//背包栏函数---------------------------------------------------------------------------------------------------------------
SSMBS_Window_Main.saveItemPositon = function(item,position){
	if(item.wtypeId){
		$gameParty.weaponsPosition[item.id] = position;
	}
	if(item.atypeId){
		$gameParty.armorsPosition[item.id] = position;
	}
	if(item.itypeId){
		$gameParty.itemsPosition[item.id] = position;
	}
};

SSMBS_Window_Main.loadPosition = function(item){
	if(item.wtypeId){
		return $gameParty.weaponsPosition[item.id];
	}
	if(item.atypeId){
		return $gameParty.armorsPosition[item.id];
	}
	if(item.itypeId){
		return $gameParty.itemsPosition[item.id];
	}

};

SSMBS_Window_Main.addSize = function(amount){
	amont = Number(amount)
	if(amount>0){
		for( let i = 0 ; i < amount ; i ++ ){
			SSMBS_Window_Main.scene.gridsHasItem.push('empty');
			$gameParty.inventorySize ++ ;
		}
	}
	if(amount<0){
		if(Math.abs(amount)>$gameParty.inventorySize){
			amount = -$gameParty.inventorySize+1;
		}
		for( let i = 0 ; i < $gameParty.allItems().length ; i ++ ){
			let item = $gameParty.allItems()[i];
			if( item && SSMBS_Window_Main.loadPosition(item)>=($gameParty.inventorySize+amount)*SSMBS_Window_Main.backpackPerLine ){
				if($gameParty.hasItem(item)){
					if(item.itypeId){			
						var type = 'item';
					} 
					if(item.wtypeId){
						var type = 'weapon';
					} 
					if(item.atypeId){
						var type = 'armor';
					} 
					for( let e = 0 ; e < $gameParty.members()[0].equips().length ; e ++  ){
						let equip = $gameParty.members()[0].equips()[e];
						if(equip == item){
							if (type == 'weapon'){
								$gameParty.members()[0].changeEquip( 0 , $dataWeapons[1] ) ;
							}
							if (type == 'armor'){
								$gameParty.members()[0].changeEquip( item.etypeId - 1 ,$dataArmors[item.etypeId-1]) ;
							}
						}
					}
					let amount = $gameParty.numItems(item);
					$gameParty.loseItem(item,amount,true);
					ssmbsLoot.loot('aroundPlayer',type,item.id,amount);
				}
			}
		}
		$gameParty.inventorySize += amount;
	}
	SSMBS_Window_Main.scene.refreshGridsHasItem();
};

SSMBS_Window_Main.findFirstEmpty = function(){
	//计算第一个空格
	for( let j = 0 ; j < SSMBS_Window_Main.scene.gridsHasItem.length ; j ++ ){
		if(SSMBS_Window_Main.scene.gridsHasItem[j]=='empty'){
			SSMBS_Window_Main.firstEmptyGrid = j;
			break;
		}
	}
}