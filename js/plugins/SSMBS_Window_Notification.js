//=============================================================================
// RPG Maker MZ - Sxl Simple Map Battle System - Notification
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 消息推送
 * @author 神仙狼
 *
 */

var SSMBS_Window_Notification = SSMBS_Window_Notification||{};
SSMBS_Window_Notification.width = 300;
SSMBS_Window_Notification.defaultX = 0;
SSMBS_Window_Notification.defaultY = 420;
SSMBS_Window_Notification.fontSize = 14;
SSMBS_Window_Notification.maxLines = 10; //每一页显示最多条目
SSMBS_Window_Notification.lineSpace = 6;
SSMBS_Window_Notification.lineHeight = SSMBS_Window_Notification.fontSize+SSMBS_Window_Notification.lineSpace;
SSMBS_Window_Notification.maxTextLength = 50; //最多储存的条目，早期条目将被清理
SSMBS_Window_Notification.opacity = 100;
SSMBS_Window_Notification.displayPosition = 'right' //显示地图名称的位置，'right'为右侧，'left'为左侧

SSMBS_Window_Notification.drawingY = 24;

SSMBS_Window_Notification.padding = 6;

SSMBS_Window_Notification.nowLine = 0;

SSMBS_Window_Notification.text = [];

const _SSMBS_Window_Notification_mapLoad = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	_SSMBS_Window_Notification_mapLoad.call(this);
	if( $gameSystem.lockNotificationWindow == undefined){
		$gameSystem.lockNotificationWindow = true;
	}
	if( !$gameSystem.notificationAlign){
		$gameSystem.notificationAlign = 'left';
	}
	this.createNotificationWindow();
}

const _SSMBS_Window_Notification_mapUpdate = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_SSMBS_Window_Notification_mapUpdate.call(this);
	this.refreshNotificationWindow();
}
SSMBS_Window_Notification.addNotification = function(text,color,item){
	let theText = {
		text: text,
		color: color?color:0,
		item: item?item:null
	}
	SSMBS_Window_Notification.nowLine=0;
	this.text.unshift(theText);
}

Scene_Map.prototype.createNotificationWindow = function() {
	this.notificationWindow = new Sprite( new Bitmap( SSMBS_Window_Notification.width, SSMBS_Window_Notification.maxLines * SSMBS_Window_Notification.lineHeight ) );
	this.notificationWindow.x=SSMBS_Window_Notification.defaultX;
	this.notificationWindow.y=SSMBS_Window_Notification.defaultY;
	this.notificationWindow.opacity = SSMBS_Window_Notification.opacity;
	if(($gameSystem.windowNotificationX||$gameSystem.windowNotificationX==0) 
	&& ($gameSystem.windowNotificationY||$gameSystem.windowNotificationY==0 ))
	{
		this.notificationWindow.x = $gameSystem.windowNotificationX;
		this.notificationWindow.y = $gameSystem.windowNotificationY;
	}
	this.addChild(this.notificationWindow);
	this.notificationWord = new Sprite( new Bitmap( SSMBS_Window_Notification.width, SSMBS_Window_Notification.maxLines * SSMBS_Window_Notification.lineHeight ) );
	this.addChild(this.notificationWord);
	this.mapNameDisplay = new Sprite( new Bitmap( Graphics.width, Graphics.height ) );
	this.mapNameDisplay.lineHeight = 18;
	this.mapNameDisplay.fontSize = 14;
	this.addChild(this.mapNameDisplay);
};

Scene_Map.prototype.refreshNotificationWindow = function() {
	this.notificationWindow.bitmap.clear();
	this.notificationWord.bitmap.clear();
	this.mapNameDisplay.bitmap.clear();
	this.notificationWord.x = this.notificationWindow.x;
	this.notificationWord.y = this.notificationWindow.y;
	this.mapNameDisplay.line = 0;
	this.mapNameDisplay.bitmap.drawText($dataMap.displayName,0,0,Graphics.width,this.mapNameDisplay.lineHeight,SSMBS_Window_Notification.displayPosition);
	this.mapNameDisplay.line++;
	if($gameVariables.value(sxlSimpleABS.difficultyParam)>0) {
		this.mapNameDisplay.bitmap.drawText('难度:'+$gameVariables.value(sxlSimpleABS.difficultyParam),0,this.mapNameDisplay.line*this.mapNameDisplay.lineHeight,Graphics.width,this.mapNameDisplay.lineHeight,SSMBS_Window_Notification.displayPosition);
		this.mapNameDisplay.line++;
	}
	this.mapNameDisplay.bitmap.drawText('('+$gamePlayer.x+','+$gamePlayer.y+')',0,this.mapNameDisplay.line*this.mapNameDisplay.lineHeight,Graphics.width,this.mapNameDisplay.lineHeight,SSMBS_Window_Notification.displayPosition);
	this.mapNameDisplay.line++;
	this.notificationWord.bitmap.fontFace = $gameSystem.mainFontFace();
	let stX = this.notificationWindow.x;
	let stY = this.notificationWindow.y;
	let edX = stX+SSMBS_Window_Notification.width;
	let edY = stY+SSMBS_Window_Notification.maxLines*SSMBS_Window_Notification.lineHeight;
	if(SSMBS_Window_Notification.hideAll === true){
		this.notificationWindow.opacity = 0;
		this.notificationWord.opacity = 0;
	}else{
		this.notificationWindow.opacity = SSMBS_Window_Notification.opacity;
		this.notificationWord.opacity = 255;
	}
	let line = 0;
	for( let i = 0 ; i < SSMBS_Window_Notification.text.length ; i ++ ){
		if(SSMBS_Window_Notification.text[i] && i>=SSMBS_Window_Notification.nowLine && i<SSMBS_Window_Notification.nowLine+SSMBS_Window_Notification.maxLines){
			let text = SSMBS_Window_Notification.text[i].text;
			let x = SSMBS_Window_Notification.padding;
			let y = SSMBS_Window_Notification.maxLines*SSMBS_Window_Notification.lineHeight-line*SSMBS_Window_Notification.lineHeight-SSMBS_Window_Notification.lineHeight;
			let width = SSMBS_Window_Notification.width-SSMBS_Window_Notification.padding;
			let height = SSMBS_Window_Notification.fontSize;
			this.notificationWord.bitmap.fontSize = SSMBS_Window_Notification.fontSize;
			this.notificationWord.bitmap.textColor = ColorManager.textColor( SSMBS_Window_Notification.text[i].color);
			
			this.notificationWord.bitmap.drawText(text,x,y,width,height,$gameSystem.notificationAlign);
			let stX = this.notificationWindow.x+x;
			let stY = this.notificationWindow.y+y;
			let edX = stX + this.notificationWord.bitmap.measureTextWidth(SSMBS_Window_Notification.text[i].text);;
			let edY = stY + height ;
			if(ssmbsBasic.isTouching( stX,stY,edX,edY ) ){
				if(SSMBS_Window_Notification.text[i].item && !this.isDrawing){
					this.itemInform = SSMBS_Window_Notification.text[i].item;
				}
			}
			line ++;
		}
	}
	if( SSMBS_Window_Notification.text.length > SSMBS_Window_Notification.maxTextLength){
		SSMBS_Window_Notification.text.splice(SSMBS_Window_Notification.maxTextLength,SSMBS_Window_Notification.text.length-SSMBS_Window_Notification.maxTextLength)
	};
	if(ssmbsBasic.isTouching( stX,stY,edX,edY ) ){
		if(TouchInput.wheelY < 0 ){
			SSMBS_Window_Notification.nowLine ++;
		}
		if(TouchInput.wheelY > 0 && SSMBS_Window_Notification.nowLine>0){
			SSMBS_Window_Notification.nowLine --;
		}
		if(TouchInput.isPressed() & !this.isDrawing){
			this.isDrawing = true;
			this.drawingWindow = 'notification';
			if(!SSMBS_Window_Notification.xDelta) SSMBS_Window_Notification.xDelta = TouchInput.x - this.notificationWindow.x;
			if(!SSMBS_Window_Notification.yDelta) SSMBS_Window_Notification.yDelta = TouchInput.y - this.notificationWindow.y;
		}else if (TouchInput.isHovered()) {
			this.isDrawing = false;
			this.drawingWindow = null;
			SSMBS_Window_Notification.xDelta = 0;
			SSMBS_Window_Notification.yDelta = 0;
		}
			

		this.notificationWindow.bitmap.fontSize = SSMBS_Window_Notification.fontSize;
		this.notificationWindow.bitmap.textColor = ColorManager.textColor( 0 );
		this.notificationWindow.bitmap.fillRect(0,0,SSMBS_Window_Notification.width,SSMBS_Window_Notification.maxLines*SSMBS_Window_Notification.lineHeight,'#000000');

		//按钮
		let line = 0;
		//固定按钮
		let lockedWord = $gameSystem.lockNotificationWindow?'解锁':'锁定';
		let stX_clear = this.notificationWindow.x+SSMBS_Window_Notification.width-this.notificationWindow.bitmap.measureTextWidth(lockedWord);
		let stY_clear = this.notificationWindow.y+line*SSMBS_Window_Notification.lineHeight;
		let edX_clear = stX_clear + this.notificationWindow.bitmap.measureTextWidth(lockedWord);
		let edY_clear = stY_clear + SSMBS_Window_Notification.lineHeight ;
		if(ssmbsBasic.isTouching( stX_clear,stY_clear,edX_clear,edY_clear )){
			this.isTouchingButton = true;
			this.notificationWindow.bitmap.fillRect(SSMBS_Window_Notification.width-this.notificationWindow.bitmap.measureTextWidth(lockedWord)-12,line*SSMBS_Window_Notification.lineHeight,this.notificationWindow.bitmap.measureTextWidth(lockedWord)+4,SSMBS_Window_Notification.lineHeight,'#ffffff');
			if(TouchInput.isClicked()){
				SoundManager.playCursor();
				$gameSystem.lockNotificationWindow = !$gameSystem.lockNotificationWindow;
			};
		}
		this.notificationWindow.bitmap.drawText(lockedWord,SSMBS_Window_Notification.padding,line*SSMBS_Window_Notification.lineHeight,SSMBS_Window_Notification.width-16,SSMBS_Window_Notification.lineHeight,'right');
		line ++;
		//清空按钮
		let stX_stay = this.notificationWindow.x+SSMBS_Window_Notification.width-this.notificationWindow.bitmap.measureTextWidth('清空');
		let stY_stay = this.notificationWindow.y+line*SSMBS_Window_Notification.lineHeight;
		let edX_stay = stX_stay + this.notificationWindow.bitmap.measureTextWidth('清空');
		let edY_stay = stY_stay + SSMBS_Window_Notification.lineHeight ;
		if(ssmbsBasic.isTouching( stX_stay,stY_stay,edX_stay,edY_stay )){
			this.isTouchingButton = true;
			this.notificationWindow.bitmap.fillRect(SSMBS_Window_Notification.width-this.notificationWindow.bitmap.measureTextWidth('清空')-12,line*SSMBS_Window_Notification.lineHeight,this.notificationWindow.bitmap.measureTextWidth('清空')+4,SSMBS_Window_Notification.lineHeight,'#ffffff');
			if(TouchInput.isClicked()){
				SoundManager.playCursor();
				SSMBS_Window_Notification.text = [];
			};
		}
		this.notificationWindow.bitmap.drawText('清空',SSMBS_Window_Notification.padding,line*SSMBS_Window_Notification.lineHeight,SSMBS_Window_Notification.width-16,SSMBS_Window_Notification.lineHeight,'right');
		this.notificationWindow.bitmap.fontSize = SSMBS_Window_Notification.fontSize;
		line ++;
		//清空按钮
		let stX_align = this.notificationWindow.x+SSMBS_Window_Notification.width-this.notificationWindow.bitmap.measureTextWidth('对齐');
		let stY_align = this.notificationWindow.y+line*SSMBS_Window_Notification.lineHeight;
		let edX_align = stX_align + this.notificationWindow.bitmap.measureTextWidth('对齐');
		let edY_align = stY_align + SSMBS_Window_Notification.lineHeight ;
		if(ssmbsBasic.isTouching( stX_align,stY_align,edX_align,edY_align )){
			this.isTouchingButton = true;
			this.notificationWindow.bitmap.fillRect(SSMBS_Window_Notification.width-this.notificationWindow.bitmap.measureTextWidth('对齐')-12,line*SSMBS_Window_Notification.lineHeight,this.notificationWindow.bitmap.measureTextWidth('对齐')+4,SSMBS_Window_Notification.lineHeight,'#ffffff');
			if(TouchInput.isClicked()){
				SoundManager.playCursor();
				if($gameSystem.notificationAlign == 'left'){
					$gameSystem.notificationAlign = 'center';
				}else
				if($gameSystem.notificationAlign == 'center'){
					$gameSystem.notificationAlign = 'right';
				}else
				if($gameSystem.notificationAlign == 'right'){
					$gameSystem.notificationAlign = 'left';
				}
				
			};
			
		}
		this.notificationWindow.bitmap.drawText('对齐',SSMBS_Window_Notification.padding,line*SSMBS_Window_Notification.lineHeight,SSMBS_Window_Notification.width-16,SSMBS_Window_Notification.lineHeight,'right');
		this.notificationWindow.bitmap.fontSize = SSMBS_Window_Notification.fontSize;
		//限制攻击
		if(!$gameSystem.lockNotificationWindow || this.isTouchingButton ){
			$gamePlayer.battler()._tp = 0;
		}
	};
	
	if(TouchInput.isPressed() && !this.nowPickedItem && this.drawingWindow == 'notification' && !$gameSystem.lockNotificationWindow){
		this.notificationWindow.x += (TouchInput.x - this.notificationWindow.x)-SSMBS_Window_Notification.xDelta;
		this.notificationWindow.y += (TouchInput.y - this.notificationWindow.y)-SSMBS_Window_Notification.yDelta;
		//防止出屏
		if(this.notificationWindow.x <= 0 ){
			this.notificationWindow.x = 0;
		}
		if(this.notificationWindow.y <= 0 ){
			this.notificationWindow.y = 0;
		}
		if(this.notificationWindow.x + SSMBS_Window_Notification.width >= Graphics.width ){
			this.notificationWindow.x = Graphics.width - SSMBS_Window_Notification.width;
		}
		if(this.notificationWindow.y + SSMBS_Window_Notification.maxLines * SSMBS_Window_Notification.lineHeight >= Graphics.height ){
			this.notificationWindow.y = Graphics.height - SSMBS_Window_Notification.maxLines * SSMBS_Window_Notification.lineHeight;
		}
		this.notificationWord.x = this.notificationWindow.x;
		this.notificationWord.y = this.notificationWindow.y;
		$gameSystem.windowNotificationX = this.notificationWindow.x;
		$gameSystem.windowNotificationY = this.notificationWindow.y;
	}
	if(TouchInput.isHovered()){
		this.drawingWindow = null;
		this.isTouchingButton = false;
	}
};