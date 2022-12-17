//=============================================================================
// RPG Maker MZ - Sxl Simple Map Battle System - Simple Quest
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 简易的任务窗口
 * @author 神仙狼
 *
 * @help
 * SSMBS_Window_Quest.addNewQuest( 任务标题, 任务副标题, 任务描述, 任务步骤, 步骤进程, 步骤目标, 奖励, 奖励数量, 任务类型, 任务颜色 )  //接受新任务
 * SSMBS_Window_Quest.removeQuest( 任务标题 ) //删除任务
 * SSMBS_Window_Quest.hasQuest( 任务标题 ) //判定是否有该任务
 * SSMBS_Window_Quest.completeQuset( 任务标题, 获取金币 ) //完成任务，自动获取任务中的道具
 */

var SSMBS_Window_Quest = SSMBS_Window_Quest||{};

SSMBS_Window_Quest.width = 298;
SSMBS_Window_Quest.height = 498;
SSMBS_Window_Quest.defaultX = 800;
SSMBS_Window_Quest.defaultY = 100;
SSMBS_Window_Quest.hotkey = 'u';

SSMBS_Window_Quest.titleFontSize = 16;
SSMBS_Window_Quest.title = '任 务'+' ( '+SSMBS_Window_Quest.hotkey.toUpperCase()+' ) ';


SSMBS_Window_Quest.backButtonLine =  18
SSMBS_Window_Quest.questTypes =  '主线任务,支线任务';
SSMBS_Window_Quest.pageQuestAmount = 10;
SSMBS_Window_Quest.lineHeight = 24;
SSMBS_Window_Quest.padding = 24;
SSMBS_Window_Quest.paddingTitle = 48;
SSMBS_Window_Quest.drawWindowY = 32;
SSMBS_Window_Quest.defaultFontSize = 12;

SSMBS_Window_Quest.questTypeArray = SSMBS_Window_Quest.questTypes.split(',');
SSMBS_Window_Quest.questTypeArray.unshift('所有任务');
SSMBS_Window_Quest.questTypeArray.push('已完成');
SSMBS_Window_Quest.nowQuestType = 0;
SSMBS_Window_Quest.nowPage = 0;



const _SSMBS_Window_QuestLoad = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	_SSMBS_Window_QuestLoad.call(this);		
	this.createQuestWindow();
};

const _SSMBS_Window_QuestUpdate = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_SSMBS_Window_QuestUpdate.call(this);
	if(!SSMBS_Window_Option.changeKeyMode.state && Input.isTriggered( SSMBS_Window_Quest.hotkey )){
		SoundManager.playCursor();
		SSMBS_Window_Quest.isOpen = !SSMBS_Window_Quest.isOpen;
	}
	if(SSMBS_Window_Quest.isOpen){
		//同步任务
		if(!SSMBS_Window_Quest.nowQuests||(SSMBS_Window_Quest.nowQuests.length != $gameParty.quests.length)){
			SSMBS_Window_Quest.refreshNowQuests();
		}
		this.refreshQuestWindow();
	}else{
		this.questWindow.opacity = 0;
		this.questWindowBackground.opacity = 0;
		this.questSelectbar.opacity = 0;
	};
	if(!$gameParty.quests){
		$gameParty.quests = [];
	}
	
};

Scene_Map.prototype.createQuestWindow = function() {
	this.questWindow = new Sprite(new Bitmap(SSMBS_Window_Quest.width,SSMBS_Window_Quest.height));
	this.questWindow.x = $gameSystem.windowQuestX?$gameSystem.windowQuestX:SSMBS_Window_Quest.defaultX;
	this.questWindow.y = $gameSystem.windowQuestY?$gameSystem.windowQuestY:SSMBS_Window_Quest.defaultY;
	
	this.addChild(this.questWindow);
	this.questWindowBackground = new Sprite(new Bitmap(SSMBS_Window_Quest.width,this.lineHeight));
	this.questWindowBackground.opacity = 0;
	this.addChild(this.questWindowBackground);
	this.questSelectbar = new Sprite( new Bitmap(SSMBS_Window_Quest.width,SSMBS_Window_Quest.height) );
	this.questSelectbar.blendMode = 1;
	this.questSelectbar.opacity = 72;
	this.addChild(this.questSelectbar);
};

Scene_Map.prototype.refreshQuestWindow = function(){
	this.questWindow.bitmap.clear();
	this.questWindowBackground.bitmap.clear();
	this.questSelectbar.bitmap.clear();
	this.questWindow.opacity = 255;
	this.questWindowBackground.opacity = 0;
	this.questSelectbar.opacity = 72;
	this.questWindow.bitmap.fontFace = $gameSystem.mainFontFace();
	this.questWindow.bitmap.blt(
		ImageManager.loadSystem('window_black'),
		0, 0, //切割坐标
		SSMBS_Window_Quest.width ,SSMBS_Window_Quest.height,//切割尺寸
		0, 0,// 绘制坐标
		SSMBS_Window_Quest.width ,SSMBS_Window_Quest.height //最终大小
	)
	this.questWindow.bitmap.fontSize = SSMBS_Window_Quest.titleFontSize;
	this.questWindow.bitmap.drawText( SSMBS_Window_Quest.title,0,0,SSMBS_Window_Quest.width,36,'center' );
	this.questWindow.bitmap.textColor = ColorManager.textColor(0);
	if( TouchInput.x > this.questWindow.x + SSMBS_Window_Quest.width-32
		&& TouchInput.x < this.questWindow.x + SSMBS_Window_Quest.width-32+SSMBS_Window_Quest.defaultFontSize
		&& TouchInput.y > this.questWindow.y + SSMBS_Window_Quest.drawWindowY/2-SSMBS_Window_Quest.defaultFontSize/2
		&& TouchInput.y < this.questWindow.y + SSMBS_Window_Quest.drawWindowY/2-SSMBS_Window_Quest.defaultFontSize/2+SSMBS_Window_Quest.defaultFontSize){
		this.questWindow.bitmap.textColor = ColorManager.textColor(8);
		if(TouchInput.isClicked()){
			SSMBS_Window_Quest.isOpen = false;
			SoundManager.playCursor();
		}
	}
	this.questWindow.bitmap.drawText( 'x', SSMBS_Window_Quest.width-32,SSMBS_Window_Quest.drawWindowY/2-SSMBS_Window_Quest.defaultFontSize/2 ,SSMBS_Window_Quest.defaultFontSize,SSMBS_Window_Quest.defaultFontSize,'right' )
	
	this.questWindow.bitmap.textColor = '#ffffff';
	this.questWindow.bitmap.fontBold = false;
	this.questWindow.bitmap.fontSize = 14;
	this.questWindowBackground.bitmap.fillRect(0,0,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,24,'#000000');
	

	this.questWindowBackground.x = this.questWindow.x;
	this.questWindowBackground.y = this.questWindow.y;
	this.questSelectbar.x = this.questWindow.x;
	this.questSelectbar.y = this.questWindow.y;


	
	if(!this.questWindowPage || this.questWindowPage == 'title'){
		this.questWindowQuest = null;
	}
	if(!this.questWindowQuest){
		this.questWindowPage = 'title';
	}
	var line = 0;
	var lineHeight = SSMBS_Window_Quest.lineHeight;
	//任务列表
	if(this.questWindowPage == 'title'){
		this.questWindow.bitmap.textColor = ColorManager.textColor(0);
		this.questWindow.bitmap.fontSize = 14;
		//任务类型
		this.questWindow.bitmap.drawText(SSMBS_Window_Quest.questTypeArray[SSMBS_Window_Quest.nowQuestType],SSMBS_Window_Quest.padding,line*lineHeight+SSMBS_Window_Quest.paddingTitle,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,lineHeight,'center')
		line ++ ;
		this.questWindow.bitmap.fontSize = 14;
		//任务页数
		this.questWindow.bitmap.drawText(SSMBS_Window_Quest.nowPage+1,SSMBS_Window_Quest.padding,SSMBS_Window_Quest.backButtonLine*lineHeight,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,lineHeight,'center')
		if(SSMBS_Window_Quest.nowPage+1 == 1){
			this.questWindow.bitmap.textColor = ColorManager.textColor(7);
		}else{
			this.questWindow.bitmap.textColor = ColorManager.textColor(0);
		}
		this.questWindow.bitmap.fontBold = false;
		this.questWindow.bitmap.fontSize = 14;
		this.questWindow.bitmap.drawText('上一页',SSMBS_Window_Quest.padding,SSMBS_Window_Quest.backButtonLine*lineHeight,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,lineHeight,'left');
		this.questWindow.bitmap.fontSize = 14;
		if(SSMBS_Window_Quest.nowPage+1 == SSMBS_Window_Quest.maxPage){
			this.questWindow.bitmap.textColor = ColorManager.textColor(7);
		}else{
			this.questWindow.bitmap.textColor = ColorManager.textColor(0);
		}
		this.questWindow.bitmap.fontBold = false;
		this.questWindow.bitmap.fontSize = 14;
		this.questWindow.bitmap.drawText('下一页',SSMBS_Window_Quest.padding,SSMBS_Window_Quest.backButtonLine*lineHeight,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,lineHeight,'right');
		this.questWindow.bitmap.fontSize = 14;
		for( i in $gameParty.quests){
			$gameParty.quests[i].id = i;
			$gameParty.quests[i].page = Math.floor($gameParty.quests[i].id / SSMBS_Window_Quest.pageQuestAmount) + 1;
			if( ((SSMBS_Window_Quest.questTypeArray[SSMBS_Window_Quest.nowQuestType] == '所有任务' && $gameParty.quests[i].type != '已完成') 
				|| $gameParty.quests[i].type == SSMBS_Window_Quest.questTypeArray[SSMBS_Window_Quest.nowQuestType])
				&& $gameParty.quests[i].page == SSMBS_Window_Quest.nowPage+1){
				var questALL = $gameParty.quests[i]
				var title = questALL.title;
				var subtitle = questALL.subtitle;
				var description = questALL.description;
				var descSplit = description.split('/NL')
				var nowVariables = $gameVariables.value(questALL.progress);
				var needVariables = questALL.maxProgress;
				var award = questALL.award;
				this.questWindow.bitmap.fontBold = true;

				this.questWindow.bitmap.fontSize = 14;
				this.questWindow.bitmap.fontFace = $gameSystem.mainFontFace();
				this.questWindow.bitmap.textColor = '#ffffff';
				if(questALL.color){
					this.questWindow.bitmap.textColor = ColorManager.textColor(Number(questALL.color))
				}
				if(questALL.type2){
					this.questWindow.bitmap.drawText('['+questALL.type+']'+'['+questALL.type2+']'+title,SSMBS_Window_Quest.padding,line*lineHeight+SSMBS_Window_Quest.paddingTitle,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,lineHeight,'left')	
				}else{
					this.questWindow.bitmap.drawText('['+questALL.type+']'+title,SSMBS_Window_Quest.padding,line*lineHeight+SSMBS_Window_Quest.paddingTitle,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,lineHeight,'left')	
				}
				this.questWindow.bitmap.textColor = '#ffffff';
				this.questWindow.bitmap.fontBold = false;

				$gameParty.quests[i].line = line;
				$gameParty.quests[i].y = line*lineHeight+SSMBS_Window_Quest.paddingTitle;
				$gameParty.quests[i].x = SSMBS_Window_Quest.padding;
				$gameParty.quests[i].maxY = $gameParty.quests[i].y + lineHeight;
				$gameParty.quests[i].maxX = $gameParty.quests[i].x + SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2;
				line ++ ;

				this.questWindow.bitmap.textColor = '#ffffff'
				this.questWindow.bitmap.fontBold = false;
				this.questWindow.bitmap.fontSize = 14;
				this.questWindow.bitmap.drawText(subtitle,SSMBS_Window_Quest.padding,line*lineHeight+SSMBS_Window_Quest.paddingTitle,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,lineHeight,'left')
				this.questWindow.bitmap.fontSize = 14;
				this.questWindow.bitmap.fontBold = false;

				this.questWindow.bitmap.textColor = '#ffffff';

				line ++ ;
			}
		}
	}else{
		//任务内容
		var questALL = this.questWindowQuest;
		var title = questALL.title;
		var subtitle = questALL.subtitle;
		var description = questALL.description;
		var descSplit = description.split('/NL')
		var nowVariables = questALL.progress;
		var needVariables = questALL.maxProgress;
		var award = questALL.award;
		
		this.questWindow.bitmap.fontSize = 18;
		this.questWindow.bitmap.textColor = '#ffffff';
		if(questALL.color){
			this.questWindow.bitmap.textColor = ColorManager.textColor(Number(questALL.color))
		}
		this.questWindow.bitmap.fontBold = true;
		this.questWindow.bitmap.drawText(title,SSMBS_Window_Quest.padding,line*lineHeight+SSMBS_Window_Quest.paddingTitle,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,lineHeight,'center')
		this.questWindow.bitmap.textColor = '#ffffff';
		this.questWindow.bitmap.fontBold = false;
		this.questWindow.bitmap.fontSize = 14;
		line ++ ;
		this.questWindow.bitmap.fontBold = false;
		this.questWindow.bitmap.fontSize = 14;
		this.questWindow.bitmap.textColor = '#ffffff';
		if(questALL.type2){
			this.questWindow.bitmap.drawText(questALL.type+'('+questALL.type2+')',SSMBS_Window_Quest.padding,line*lineHeight+SSMBS_Window_Quest.paddingTitle,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,lineHeight,'center')
		}else{
			this.questWindow.bitmap.drawText(questALL.type,SSMBS_Window_Quest.padding,line*lineHeight+SSMBS_Window_Quest.paddingTitle,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,lineHeight,'center')
		}
		line ++ ;
		this.questWindow.bitmap.fontBold = false;
		this.questWindow.bitmap.fontSize = 14;
		this.questWindow.bitmap.textColor = '#ffffff';
		this.questWindow.bitmap.drawText(subtitle,SSMBS_Window_Quest.padding,line*lineHeight+SSMBS_Window_Quest.paddingTitle,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,lineHeight,'center')
		line ++ ;
		line ++ ;
		for( j in descSplit){
			this.questWindow.bitmap.drawText(descSplit[j],SSMBS_Window_Quest.padding,line*lineHeight+SSMBS_Window_Quest.paddingTitle,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,lineHeight,'left')
			line ++ ;
		}
		if(nowVariables>=needVariables){
			this.questWindow.bitmap.textColor = ColorManager.textColor(24);
		}
		// line ++ ;
		// this.questSelectbar.bitmap.gradientFillRect(2,line*lineHeight+SSMBS_Window_Quest.paddingTitle,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding,lineHeight,'#FFFFFF','#000000');
		this.questWindow.bitmap.textColor = ColorManager.textColor(0);
		this.questWindow.bitmap.drawText('进度: ',SSMBS_Window_Quest.padding,line*lineHeight+SSMBS_Window_Quest.paddingTitle,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,lineHeight,'left')
		this.questWindow.bitmap.textColor = '#ffffff'
		line ++ ;
		for( a in questALL.targets){
			this.questWindow.bitmap.drawText(questALL.targets[a]+': '+$gameVariables.value(nowVariables[a])+' / '+needVariables[a],SSMBS_Window_Quest.padding,line*lineHeight+SSMBS_Window_Quest.paddingTitle,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,lineHeight,'left')
			line ++ ;
		}
		// line ++ ;
		// this.questSelectbar.bitmap.gradientFillRect(2,line*lineHeight+SSMBS_Window_Quest.paddingTitle,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding,lineHeight,'#FFFFFF','#000000');
		this.questWindow.bitmap.textColor = ColorManager.textColor(0);
		this.questWindow.bitmap.drawText('奖励: ',SSMBS_Window_Quest.padding,line*lineHeight+SSMBS_Window_Quest.paddingTitle,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,lineHeight,'left')
		line ++ ;
		for( a in award){
			let theAward = award[a];
			if(theAward.itypeId || theAward.etypeId){
				this.questWindow.bitmap.textColor = '#ffffff'
				if(theAward.meta.textColor){
					this.questWindow.bitmap.textColor = ColorManager.textColor(Number(theAward.meta.textColor));
				}
				this.questWindow.bitmap.blt(
					ImageManager.loadSystem('IconSet'),
					theAward.iconIndex% 16*32,Math.floor(theAward.iconIndex / 16)*32, //切割坐标
					32,	32,//切割尺寸
					SSMBS_Window_Quest.padding, line*lineHeight+SSMBS_Window_Quest.paddingTitle+4,// 绘制坐标
					16,	16 //最终大小
				)
				if( TouchInput.x > this.questWindowBackground.x + SSMBS_Window_Quest.padding && TouchInput.y > this.questWindowBackground.y + line*lineHeight+SSMBS_Window_Quest.paddingTitle+4 && 
					TouchInput.x < this.questWindowBackground.x + SSMBS_Window_Quest.padding+16 && TouchInput.y < this.questWindowBackground.y + line*lineHeight+SSMBS_Window_Quest.paddingTitle+4+16 ){
					this.itemInform = theAward;
				}
				this.questWindow.bitmap.drawText(theAward.name+' * '+questALL.awardAmounts[a],SSMBS_Window_Quest.padding+20,line*lineHeight+SSMBS_Window_Quest.paddingTitle,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,lineHeight,'left')
			}else{
				this.questWindow.bitmap.drawText(theAward,SSMBS_Window_Quest.padding+20,line*lineHeight+SSMBS_Window_Quest.paddingTitle,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,lineHeight,'left')
			}
			this.questWindow.bitmap.textColor = '#ffffff'
			line ++ ;
		}
		this.questWindow.bitmap.drawText('点击返回',SSMBS_Window_Quest.padding,SSMBS_Window_Quest.backButtonLine*lineHeight,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,lineHeight,'center')
	}
		
	//选择
	//任务类型
	if(TouchInput.isClicked() ){
		SSMBS_Window_Quest.refreshNowQuests();
	}
	if( this.questWindowPage == 'title' &&
		TouchInput.x > this.questWindowBackground.x+SSMBS_Window_Quest.padding&&
		TouchInput.x < this.questWindowBackground.x+SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2&&
		TouchInput.y > this.questWindowBackground.y+SSMBS_Window_Quest.paddingTitle&&
		TouchInput.y < this.questWindowBackground.y+SSMBS_Window_Quest.lineHeight+SSMBS_Window_Quest.paddingTitle){
		this.questSelectbar.bitmap.fillRect(SSMBS_Window_Quest.padding,SSMBS_Window_Quest.paddingTitle,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,SSMBS_Window_Quest.lineHeight,'#FFFFFF');
		if( TouchInput.isClicked() ){
			if(SSMBS_Window_Quest.nowQuestType==SSMBS_Window_Quest.questTypeArray.length-1){
				SSMBS_Window_Quest.nowQuestType = 0;
			}else{
				SSMBS_Window_Quest.nowQuestType ++;
			}
		}
	}
	//页数
	if(this.questWindowPage == 'title'){
		if( TouchInput.x > this.questWindowBackground.x + SSMBS_Window_Quest.padding &&
			TouchInput.x < this.questWindowBackground.x + SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2&&
			TouchInput.y > this.questWindowBackground.y + lineHeight*(SSMBS_Window_Quest.backButtonLine) &&
		 	TouchInput.y < this.questWindowBackground.y + lineHeight*(SSMBS_Window_Quest.backButtonLine+1)){
			if(TouchInput.x < this.questWindowBackground.x + (SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2)/2){
				
				this.questSelectbar.bitmap.gradientFillRect(SSMBS_Window_Quest.padding/2, lineHeight*SSMBS_Window_Quest.backButtonLine,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding,lineHeight,'#FFFFFF','#000000');
				if( TouchInput.isClicked() ){
					if(SSMBS_Window_Quest.nowPage+1 > 1){
						SSMBS_Window_Quest.nowPage --;
					}
				}
			}else{
				this.questSelectbar.bitmap.gradientFillRect(SSMBS_Window_Quest.padding/2, lineHeight*SSMBS_Window_Quest.backButtonLine,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding,lineHeight,'#000000','#FFFFFF');
				if( TouchInput.isClicked() ){
					SSMBS_Window_Quest.nowPage ++;
				}
			}
			
		}
	}
	//返回界面
	if(this.questWindowPage == 'content'){
		if( TouchInput.x > this.questWindowBackground.x + SSMBS_Window_Quest.padding &&
			TouchInput.x < this.questWindowBackground.x + SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2&&
			TouchInput.y > this.questWindowBackground.y + lineHeight*(SSMBS_Window_Quest.backButtonLine) &&
		 	TouchInput.y < this.questWindowBackground.y + lineHeight*(SSMBS_Window_Quest.backButtonLine+1)){
			this.questSelectbar.bitmap.fillRect(SSMBS_Window_Quest.padding, lineHeight*SSMBS_Window_Quest.backButtonLine,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,lineHeight,'#FFFFFF');
			if( TouchInput.isClicked() ){
				this.questWindowPage = 'title';
				this.questWindowQuest = null;
			}
		}
	}

	//选择任务
	for( let i in SSMBS_Window_Quest.nowQuests){
		if( this.questWindowPage == 'title' &&
			TouchInput.x > this.questWindowBackground.x + SSMBS_Window_Quest.nowQuests[i].x &&
			TouchInput.x < this.questWindowBackground.x + SSMBS_Window_Quest.nowQuests[i].maxX&&
			TouchInput.y > this.questWindowBackground.y + SSMBS_Window_Quest.nowQuests[i].y &&
			TouchInput.y < this.questWindowBackground.y + SSMBS_Window_Quest.nowQuests[i].maxY){
			this.questSelectbar.bitmap.fillRect(SSMBS_Window_Quest.nowQuests[i].x,SSMBS_Window_Quest.nowQuests[i].y,SSMBS_Window_Quest.width-SSMBS_Window_Quest.padding*2,lineHeight,'#FFFFFF');
			if( TouchInput.isClicked() ){
				this.questWindowPage = 'content';
				this.questWindowQuest = SSMBS_Window_Quest.nowQuests[i];
			}
		}
	}
	if(TouchInput.x > this.questWindowBackground.x &&
		TouchInput.x < this.questWindowBackground.x + SSMBS_Window_Enhance.width &&
		TouchInput.y > this.questWindowBackground.y &&
		TouchInput.y < this.questWindowBackground.y + SSMBS_Window_Enhance.height){
		$gameParty.members()[0]._tp = 0 ;
	}
	//拖动窗口
	if( TouchInput.isPressed() && !this.isDrawing && !this.drawingWindow &&
		TouchInput.x > this.questWindow.x
		&& TouchInput.x < this.questWindow.x+SSMBS_Window_Quest.width
		&& TouchInput.y > this.questWindow.y
		&& TouchInput.y < this.questWindow.y+SSMBS_Window_Quest.drawWindowY){
		this.isDrawing = true;
		this.drawingWindow = 'Quest';
		if(!SSMBS_Window_Quest.xDelta) SSMBS_Window_Quest.xDelta = TouchInput.x - this.questWindow.x;
		if(!SSMBS_Window_Quest.yDelta) SSMBS_Window_Quest.yDelta = TouchInput.y - this.questWindow.y;
	}else if (TouchInput.isHovered()) {
		this.isDrawing = false;
		this.drawingWindow = null;
		SSMBS_Window_Quest.xDelta = 0;
		SSMBS_Window_Quest.yDelta = 0;
	}
	if(TouchInput.isPressed() && !this.nowPickedItem && this.drawingWindow == 'Quest'){
		this.questWindow.x += (TouchInput.x - this.questWindow.x)-SSMBS_Window_Quest.xDelta;
		this.questWindow.y += (TouchInput.y - this.questWindow.y)-SSMBS_Window_Quest.yDelta;
		//防止出屏
		if(this.questWindow.x <= 0 ){
			this.questWindow.x = 0;
		}
		if(this.questWindow.y <= 0 ){
			this.questWindow.y = 0;
		}
		if(this.questWindow.x + SSMBS_Window_Quest.width >= Graphics.width ){
			this.questWindow.x = Graphics.width - SSMBS_Window_Quest.width;
		}
		if(this.questWindow.y + SSMBS_Window_Quest.drawWindowY >= Graphics.height ){
			this.questWindow.y = Graphics.height - SSMBS_Window_Quest.drawWindowY;
		}
		this.questWindowBackground.x = this.questWindow.x;
		this.questWindowBackground.y = this.questWindow.y;
		this.questSelectbar.x = this.questWindow.x;
		this.questSelectbar.y = this.questWindow.y;
		$gameSystem.windowQuestX = this.questWindow.x;
		$gameSystem.windowQuestY = this.questWindow.y;
		
	}
};

SSMBS_Window_Quest.refreshNowQuests = function(){
	SSMBS_Window_Quest.nowQuests = [];
	for( i in $gameParty.quests){
		if( ((SSMBS_Window_Quest.questTypeArray[SSMBS_Window_Quest.nowQuestType] == '所有任务' && $gameParty.quests[i].type != '已完成') 
		|| $gameParty.quests[i].type == SSMBS_Window_Quest.questTypeArray[SSMBS_Window_Quest.nowQuestType])
		&& $gameParty.quests[i].page == SSMBS_Window_Quest.nowPage+1){
			SSMBS_Window_Quest.nowQuests.push($gameParty.quests[i])
		}
	}
};

SSMBS_Window_Quest.addNewQuest = function( questTitle, questSubtitle, questDescription, targets, questProgress, questMaxProgress, questAward, awardAmounts, type, color ){
	if(!$gameParty.quests){
		$gameParty.quests = [];
	}
	$gameParty.quests.push(
		{
		 title:questTitle,
		 subtitle:questSubtitle,
		 description:questDescription,
		 targets:targets,
		 progress:questProgress,
		 maxProgress:questMaxProgress,
		 award:questAward,
		 awardAmounts:awardAmounts,
		 type:type,
		 color:color
		}
	)
	SSMBS_Window_Quest.refreshNowQuests();
};

SSMBS_Window_Quest.removeQuest = function( questTitle ){
	for( i in $gameParty.quests ){
		if($gameParty.quests[i].title == questTitle){
			$gameParty.quests.splice(i,1);
		}
	}
	SSMBS_Window_Quest.refreshNowQuests();
};

SSMBS_Window_Quest.hasQuest = function( questTitle ){
	for( i in $gameParty.quests ){
		if($gameParty.quests[i].title == questTitle){
			return true;
		}
	}
	SSMBS_Window_Quest.refreshNowQuests();
};

SSMBS_Window_Quest.completeQuset = function( questTitle , goldGain, expGain){
	for( i in $gameParty.quests ){
		if($gameParty.quests[i].title == questTitle){
			$gameParty.quests[i].type2 = $gameParty.quests[i].type;
			$gameParty.quests[i].type = '已完成';
			for(let j = 0 ; j < $gameParty.quests[i].award.length; j++){
				if($gameParty.quests[i].awardAmounts[j] && $gameParty.quests[i].awardAmounts[j]>0){
					// $gameParty.gainItem($gameParty.quests[i].award[j],$gameParty.quests[i].awardAmounts[j],true);
					if($gameParty.quests[i].award[j].wtypeId){
						ssmbsLoot.loot('aroundPlayer','weapon',$gameParty.quests[i].award[j].id,$gameParty.quests[i].awardAmounts[j])
					}else if($gameParty.quests[i].award[j].atypeId){
						ssmbsLoot.loot('aroundPlayer','armor',$gameParty.quests[i].award[j].id,$gameParty.quests[i].awardAmounts[j])
					}else{
						ssmbsLoot.loot('aroundPlayer','item',$gameParty.quests[i].award[j].id,$gameParty.quests[i].awardAmounts[j])
					}
				}
			}
			if(goldGain){
				$gameParty.gainGold(goldGain);
			}
			if(expGain){
				$gamePlayer.battler().gainExp(expGain);
			}
			
		}
	}
	SSMBS_Window_Quest.refreshNowQuests();
};