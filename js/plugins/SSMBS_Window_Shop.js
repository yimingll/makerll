
//=============================================================================
// RPG Maker MZ - Sxl Simple Map Battle System - window - Shop
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 商店界面
 * @author 神仙狼
 * 
 * @help
 * 商店事件范本（事件脚本中输入）
 * 
 * //商店名称
 * SSMBS_Window_Shop.title = '创始者的商店';
 * 
 * //商店头像
 * SSMBS_Window_Shop.face = {
 * faceName:'Actor2', //商店头像图片名称，记得引号
 * faceIndex:6        //商店头像序号，从0开始
 * };
 * 
 * //商店文字
 * SSMBS_Window_Shop.text='欢迎来到创始者的商店/NL请随意挑选/NL将物品拖入物品商店窗口出售/NL鼠标右键购买，按住shift购买10个';
 * 
 * //商品分组
 * SSMBS_Window_Shop.shops = ['武器','防具','特殊','猩红石'];
 * 
 * //商品
 * SSMBS_Window_Shop.items = [
 * //第一组商品
 * [$dataWeapons[2],$dataWeapons[3],
 * $dataWeapons[4],$dataWeapons[5],
 * $dataWeapons[6],$dataWeapons[7],
 * $dataWeapons[8],$dataWeapons[9],
 * $dataWeapons[10],$dataWeapons[11],
 * $dataWeapons[12],$dataWeapons[13],
 * $dataWeapons[17],$dataWeapons[15]],
 * //第二组商品
 * [$dataArmors[8],$dataArmors[9],
 * $dataArmors[10],$dataArmors[11],
 * $dataArmors[12],$dataArmors[13],
 * $dataArmors[14],$dataArmors[15],
 * $dataArmors[16],$dataArmors[17]],
 * //第三组商品
 * [$dataItems[7],$dataItems[8],
 * $dataItems[9],$dataItems[49],
 * $dataItems[50],$dataItems[48]],
 * //第四组物品
 * [$dataWeapons[16]]
 * ];
 * 
 * //开启商店窗口
 * SSMBS_Window_Shop.isOpen = true;
 */

var SSMBS_Window_Shop = SSMBS_Window_Shop||{};
SSMBS_Window_Shop.width = 298;
SSMBS_Window_Shop.height = 498;
SSMBS_Window_Shop.titleFontSize = 16;
SSMBS_Window_Shop.title = '商 店';


SSMBS_Window_Shop.defaultFontSize = 12;
SSMBS_Window_Shop.drawWindowY = 32;

SSMBS_Window_Shop.defaultY = 100 ;
SSMBS_Window_Shop.defaultX = 200 ;

SSMBS_Window_Shop.showItemName = true;
SSMBS_Window_Shop.itemPadding = 6;

SSMBS_Window_Shop.itemPerLine = 2;
SSMBS_Window_Shop.lines = 7;
SSMBS_Window_Shop.shopButtonHeight = 32;
SSMBS_Window_Shop.iconSize = 32;
SSMBS_Window_Shop.wordStartX = 12;
SSMBS_Window_Shop.wordStartY = 128;
SSMBS_Window_Shop.startX = 18;
SSMBS_Window_Shop.startY = SSMBS_Window_Shop.wordStartY+SSMBS_Window_Shop.shopButtonHeight+SSMBS_Window_Shop.itemPadding;
SSMBS_Window_Shop.itemSpacingX = (SSMBS_Window_Shop.width-SSMBS_Window_Shop.startX-SSMBS_Window_Shop.wordStartX)/2;
SSMBS_Window_Shop.itemSpacingY = 40;
SSMBS_Window_Shop.itemPaddingHeight = SSMBS_Window_Shop.itemSpacingY*SSMBS_Window_Shop.lines+6;

SSMBS_Window_Shop.goldIcon = 314;
SSMBS_Window_Shop.emptyIcon = 544;

SSMBS_Window_Shop.buySound = 'Shop1';
SSMBS_Window_Shop.sellSound = 'Coin';

const _SSMBS_Window_ShopLoad = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	_SSMBS_Window_ShopLoad.call(this);
	SSMBS_Window_Shop.nowShop = 0;
	this.createShopWindow();
};


const _SSMBS_Window_ShopUpdate = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_SSMBS_Window_ShopUpdate.call(this);
	if(SSMBS_Window_Shop.isOpen){
		this.shopWindow.opacity = 255;
		this.shopWindowBlackRect.opacity = 72;
		this.shopWindowBlackRect2.opacity = 72;
		this.shopWindowIcons.opacity = 255;
		this.refreshShopWindow();
	}else{
		this.shopWindow.opacity = 0;
		this.shopWindowBlackRect.opacity = 0;
		this.shopWindowBlackRect2.opacity = 0;
		this.shopWindowIcons.opacity = 0;
	}
	
};

Scene_Map.prototype.createShopWindow = function(){
	this.shopWindow = new Sprite(new Bitmap(SSMBS_Window_Shop.width,SSMBS_Window_Shop.height));
	this.shopWindow.x = $gameSystem.windowShopX?$gameSystem.windowShopX:SSMBS_Window_Shop.defaultX;
	this.shopWindow.y = $gameSystem.windowShopY?$gameSystem.windowShopY:SSMBS_Window_Shop.defaultY;
	this.addChild(this.shopWindow);
	this.shopWindowBlackRect = new Sprite(new Bitmap(SSMBS_Window_Shop.width,SSMBS_Window_Shop.height));
	this.shopWindowBlackRect.opacity = 72;
	this.addChild(this.shopWindowBlackRect);
	this.shopWindowBlackRect2 = new Sprite(new Bitmap(SSMBS_Window_Shop.width,SSMBS_Window_Shop.height));
	this.shopWindowBlackRect2.opacity = 72;
	this.addChild(this.shopWindowBlackRect2);
	this.shopWindowIcons = new Sprite(new Bitmap(SSMBS_Window_Shop.width,SSMBS_Window_Shop.height));
	this.addChild(this.shopWindowIcons);
};

Scene_Map.prototype.refreshShopWindow = function(){
	this.shopWindow.bitmap.clear();
	this.shopWindowBlackRect.bitmap.clear();
	this.shopWindowBlackRect2.bitmap.clear()
	this.shopWindowIcons.bitmap.clear();
	
	this.shopWindowBlackRect.x = this.shopWindow.x;
	this.shopWindowBlackRect.y = this.shopWindow.y;
	this.shopWindowBlackRect2.x = this.shopWindow.x;
	this.shopWindowBlackRect2.y = this.shopWindow.y;
	this.shopWindowIcons.x = this.shopWindow.x;
	this.shopWindowIcons.y = this.shopWindow.y;
	this.shopWindow.bitmap.blt(
		ImageManager.loadSystem('window_black'),
		0, 0, //切割坐标
		SSMBS_Window_Shop.width ,SSMBS_Window_Shop.height,//切割尺寸
		0, 0,// 绘制坐标
		SSMBS_Window_Shop.width ,SSMBS_Window_Shop.height //最终大小
	);
	this.shopWindow.bitmap.fontSize = SSMBS_Window_Shop.titleFontSize;
	this.shopWindow.bitmap.fontFace = $gameSystem.mainFontFace();
	this.shopWindowIcons.bitmap.fontFace = $gameSystem.mainFontFace();
	this.shopWindow.bitmap.drawText( SSMBS_Window_Shop.title,0,0,SSMBS_Window_Shop.width,36,'center' );
	//限制角色攻击
	if(	TouchInput.x > this.shopWindow.x
		&& TouchInput.x < this.shopWindow.x+SSMBS_Window_Shop.width
		&& TouchInput.y > this.shopWindow.y
		&& TouchInput.y < this.shopWindow.y+SSMBS_Window_Shop.height){
		$gamePlayer.battler()._tp = 99;
	}
	//描绘关闭按钮
	if( TouchInput.x > this.shopWindow.x + SSMBS_Window_Shop.width-32
		&& TouchInput.x < this.shopWindow.x + SSMBS_Window_Shop.width-32+SSMBS_Window_Shop.defaultFontSize
		&& TouchInput.y > this.shopWindow.y + SSMBS_Window_Shop.drawWindowY/2-SSMBS_Window_Shop.defaultFontSize/2
		&& TouchInput.y < this.shopWindow.y + SSMBS_Window_Shop.drawWindowY/2-SSMBS_Window_Shop.defaultFontSize/2+SSMBS_Window_Shop.defaultFontSize){
		this.shopWindow.bitmap.textColor = ColorManager.textColor(8);
		if(TouchInput.isClicked()){
			SSMBS_Window_Shop.isOpen = false;
			SoundManager.playCursor();
		}
	};
	this.shopWindow.bitmap.drawText( 'x', SSMBS_Window_Shop.width-32,SSMBS_Window_Shop.drawWindowY/2-SSMBS_Window_Shop.defaultFontSize/2 ,SSMBS_Window_Shop.defaultFontSize,SSMBS_Window_Shop.defaultFontSize,'right' )
	this.shopWindow.bitmap.textColor = ColorManager.textColor(0);
	//拖动窗口
	if( TouchInput.isPressed() && !this.isDrawing && !this.drawingWindow &&
		TouchInput.x > this.shopWindow.x
		&& TouchInput.x < this.shopWindow.x+SSMBS_Window_Shop.width
		&& TouchInput.y > this.shopWindow.y
		&& TouchInput.y < this.shopWindow.y+SSMBS_Window_Shop.drawWindowY){
		this.isDrawing = true;
		this.drawingWindow = 'Shop';
		if(!SSMBS_Window_Shop.xDelta) SSMBS_Window_Shop.xDelta = TouchInput.x - this.shopWindow.x;
		if(!SSMBS_Window_Shop.yDelta) SSMBS_Window_Shop.yDelta = TouchInput.y - this.shopWindow.y;
	}else if (TouchInput.isHovered()) {
		this.isDrawing = false;
		this.drawingWindow = null;
		SSMBS_Window_Shop.xDelta = 0;
		SSMBS_Window_Shop.yDelta = 0;
	};
	if(TouchInput.isPressed() && !this.nowPickedItem && this.drawingWindow == 'Shop'){
		this.shopWindow.x += (TouchInput.x - this.shopWindow.x)-SSMBS_Window_Shop.xDelta;
		this.shopWindow.y += (TouchInput.y - this.shopWindow.y)-SSMBS_Window_Shop.yDelta;
		//防止出屏
		if(this.shopWindow.x <= 0 ){
			this.shopWindow.x = 0;
		}
		if(this.shopWindow.y <= 0 ){
			this.shopWindow.y = 0;
		}
		if(this.shopWindow.x + SSMBS_Window_Shop.width >= Graphics.width ){
			this.shopWindow.x = Graphics.width - SSMBS_Window_Shop.width;
		}
		if(this.shopWindow.y + SSMBS_Window_Shop.drawWindowY >= Graphics.height ){
			this.shopWindow.y = Graphics.height - SSMBS_Window_Shop.drawWindowY;
		}
		this.shopWindowBlackRect.x = this.shopWindow.x;
		this.shopWindowBlackRect.y = this.shopWindow.y;
		this.shopWindowBlackRect2.x = this.shopWindow.x;
		this.shopWindowBlackRect2.y = this.shopWindow.y;
		this.shopWindowIcons.x = this.shopWindow.x;
		this.shopWindowIcons.y = this.shopWindow.y;
		$gameSystem.windowShopX = this.shopWindow.x;
		$gameSystem.windowShopY = this.shopWindow.y;
	};
	//背景黑底
	let padWidth = (SSMBS_Window_Shop.width-SSMBS_Window_Shop.startX*2)+SSMBS_Window_Shop.itemPadding*2;
	let maxWidth = SSMBS_Window_Shop.itemSpacingX;
	this.shopWindowBlackRect.bitmap.fillRect( SSMBS_Window_Shop.startX-SSMBS_Window_Shop.itemPadding,SSMBS_Window_Shop.startY-SSMBS_Window_Shop.itemPadding,padWidth,SSMBS_Window_Shop.itemPaddingHeight,'#000000' );
	for(let i = 0 ; i < SSMBS_Window_Shop.itemPerLine * SSMBS_Window_Shop.lines ; i ++ ){
		this.shopWindowBlackRect2.bitmap.fillRect(  SSMBS_Window_Shop.startX + i % SSMBS_Window_Shop.itemPerLine * maxWidth, 
													SSMBS_Window_Shop.startY + Math.floor(i / SSMBS_Window_Shop.itemPerLine ) * SSMBS_Window_Shop.itemSpacingY,
													maxWidth-6,SSMBS_Window_Shop.iconSize,'#000000' );
		this.shopWindowBlackRect2.bitmap.blt(
			ImageManager.loadSystem('IconSet'),
			SSMBS_Window_Shop.emptyIcon% 16*32,Math.floor(SSMBS_Window_Shop.emptyIcon / 16)*32, //切割坐标
			32,	32,//切割尺寸
			SSMBS_Window_Shop.startX + i % SSMBS_Window_Shop.itemPerLine * maxWidth, SSMBS_Window_Shop.startY + Math.floor(i / SSMBS_Window_Shop.itemPerLine ) * SSMBS_Window_Shop.itemSpacingY,// 绘制坐标
			SSMBS_Window_Shop.iconSize,	SSMBS_Window_Shop.iconSize //最终大小
		)
	}
	//头像
	if(SSMBS_Window_Shop.face && SSMBS_Window_Shop.face.faceName){
		let faceName = SSMBS_Window_Shop.face.faceName;
		let faceIndex = SSMBS_Window_Shop.face.faceIndex?Number(SSMBS_Window_Shop.face.faceIndex):0;
		this.shopWindow.bitmap.blt(
			ImageManager.loadFace(faceName),
			faceIndex% 4*144,Math.floor(faceIndex / 4)*144, //切割坐标
			144,144,//切割尺寸
			SSMBS_Window_Shop.wordStartX, SSMBS_Window_Shop.wordStartY-80,// 绘制坐标
			72,	72 //最终大小
		)
	}
	//商店文字
	if(SSMBS_Window_Shop.text){
		let color = ColorManager.textColor(0);
		let drawLine = 0;
		let drawLineHeight = 18;
		let width = SSMBS_Window_Shop.width-SSMBS_Window_Shop.wordStartX*2-72;
		for( let line = 0 ; line < SSMBS_Window_Shop.text.split('/NL').length ; line ++ ){
			this.shopWindowIcons.bitmap.drawTextGradient( SSMBS_Window_Shop.text.split('/NL')[line],SSMBS_Window_Shop.wordStartX+80,SSMBS_Window_Shop.wordStartY-80+drawLine*drawLineHeight,width,drawLineHeight,'left',color,color);
			drawLine++;
		}
	}
	this.shopWindowIcons.bitmap.fontSize = SSMBS_Window_Shop.defaultFontSize;
	this.shopWindowIcons.bitmap.drawText( ssmbsBasic.convertNumber($gameParty.gold(),'thousand'), SSMBS_Window_Shop.width-64-32-12, SSMBS_Window_Shop.height - 32 - SSMBS_Window_Shop.defaultFontSize/2-10,64,32,'right' )
	this.shopWindowIcons.bitmap.blt(
		ImageManager.loadSystem('IconSet'),
		SSMBS_Window_Shop.goldIcon % 16*32,Math.floor(SSMBS_Window_Shop.goldIcon / 16)*32, //切割坐标
		32,	32,//切割尺寸
		SSMBS_Window_Shop.width - 10 - 32, 
		SSMBS_Window_Shop.height - 32 - SSMBS_Window_Shop.defaultFontSize/2-10,// 绘制坐标
		32,	32 //最终大小
	)
	//切换商店分组按钮
	if(SSMBS_Window_Shop.shops){
		let maxWidth = (SSMBS_Window_Shop.width-SSMBS_Window_Shop.startX*2)+SSMBS_Window_Shop.itemPadding*2;
		let widthPerShopName = maxWidth/SSMBS_Window_Shop.shops.length
		this.shopWindowIcons.bitmap.fontSize = SSMBS_Window_Shop.defaultFontSize;
		for( let i = 0 ; i < SSMBS_Window_Shop.shops.length ; i ++ ){
			this.shopWindowIcons.bitmap.drawTextGradient( SSMBS_Window_Shop.shops[i],SSMBS_Window_Shop.wordStartX+i*widthPerShopName,SSMBS_Window_Shop.wordStartY,widthPerShopName,SSMBS_Window_Shop.shopButtonHeight,'center','#ffffff','#ffffff');
			if(SSMBS_Window_Shop.nowShop == i){
				this.shopWindowBlackRect.bitmap.fillRect( SSMBS_Window_Shop.wordStartX+i*widthPerShopName,SSMBS_Window_Shop.wordStartY,widthPerShopName,SSMBS_Window_Shop.shopButtonHeight,'#000000' );
			}
			let shopButton_stX = this.shopWindow.x + SSMBS_Window_Shop.wordStartX+i*widthPerShopName;
			let shopButton_stY = this.shopWindow.y + SSMBS_Window_Shop.wordStartY;
			let shopButton_edX = shopButton_stX+widthPerShopName;
			let shopButton_edY = shopButton_stY+SSMBS_Window_Shop.shopButtonHeight;
			if(ssmbsBasic.isTouching(shopButton_stX,shopButton_stY,shopButton_edX,shopButton_edY)){
				this.shopWindowBlackRect.bitmap.fillRect( SSMBS_Window_Shop.wordStartX+i*widthPerShopName,SSMBS_Window_Shop.wordStartY,widthPerShopName,SSMBS_Window_Shop.shopButtonHeight,'#555555' );
				if(TouchInput.isClicked()){
					SSMBS_Window_Shop.nowShop = i;
				};
			};
		};
	};
	//描绘物品
	if( SSMBS_Window_Shop.items && SSMBS_Window_Shop.items[SSMBS_Window_Shop.nowShop] ){
		for( let i = 0 ; i < SSMBS_Window_Shop.items[SSMBS_Window_Shop.nowShop].length ; i ++ ){
			let item = SSMBS_Window_Shop.items[SSMBS_Window_Shop.nowShop][i];
			let psX = SSMBS_Window_Shop.startX+i%(SSMBS_Window_Shop.itemPerLine)*SSMBS_Window_Shop.itemSpacingX;
			let psY = Math.floor(i/SSMBS_Window_Shop.itemPerLine)*SSMBS_Window_Shop.itemSpacingY+SSMBS_Window_Shop.startY;
			if(item){
				// 图标背景
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
				this.shopWindowIcons.bitmap.blt(
					ImageManager.loadSystem('IconSet'),
					Number(bkgIcon)% 16*32,
					Math.floor(Number(bkgIcon) / 16)*32, //切割坐标
					32,	32,//切割尺寸
					psX, 
					psY,// 绘制坐标
					SSMBS_Window_Shop.iconSize, SSMBS_Window_Shop.iconSize //最终大小
				)
				//描绘装备图标
				this.shopWindowIcons.bitmap.blt(
					ImageManager.loadSystem('IconSet'),
					item.iconIndex% 16*32,Math.floor(item.iconIndex / 16)*32, //切割坐标
					32,	32,//切割尺寸
					psX, psY,// 绘制坐标
					SSMBS_Window_Shop.iconSize,	SSMBS_Window_Shop.iconSize //最终大小
				)
				//描绘商店物品名称
				if(SSMBS_Window_Shop.showItemName){
					let color1=0;
					let color2=color1;
					let maxWidth =(SSMBS_Window_Shop.itemSpacingX/2)-SSMBS_Window_Shop.iconSize;
					if(item.meta.textColor){
						color1 = Number(item.meta.textColor);
					}
					if(item.meta.textColor2){
						color2 = Number(item.meta.textColor2);
					}else{
						color2=color1;
					}
					let currencyAmount = 0;
					
					color1 = ColorManager.textColor(color1);
					color2 = ColorManager.textColor(color2);
					this.shopWindowIcons.bitmap.fontSize = SSMBS_Window_Shop.defaultFontSize;
					this.shopWindowIcons.bitmap.drawTextGradient(item.name,psX+SSMBS_Window_Shop.iconSize+6,psY,SSMBS_Window_Shop.itemSpacingX-12,SSMBS_Window_Shop.iconSize/2,'left',color1,color2);
					if(item.price>0){
						this.shopWindowIcons.bitmap.blt(
							ImageManager.loadSystem('IconSet'),
							SSMBS_Window_Shop.goldIcon% 16*32,Math.floor(SSMBS_Window_Shop.goldIcon / 16)*32, //切割坐标
							32,	32,//切割尺寸
							psX+SSMBS_Window_Shop.iconSize+currencyAmount*(maxWidth/2)+6, psY+SSMBS_Window_Shop.iconSize/2,// 绘制坐标
							14,	14 //最终大小
						)
						let colorMoney;
						if($gameParty.gold<item.price){
							colorMoney = ColorManager.textColor(7);
						}else{
							colorMoney = ColorManager.textColor(0);
						}
						this.shopWindowIcons.bitmap.drawTextGradient(item.price,psX+currencyAmount*(maxWidth/2)+SSMBS_Window_Shop.iconSize+6+16,psY+SSMBS_Window_Shop.iconSize/2,maxWidth/(currencyAmount+1),SSMBS_Window_Shop.iconSize/2,'left',colorMoney,colorMoney);
						currencyAmount=1;
					}
					if(item.meta.currency){
						let icon = $dataItems[item.meta.currency.split(',')[0]].iconIndex;
						let amount = Number(item.meta.currency.split(',')[1]);
						this.shopWindowIcons.bitmap.blt(
							ImageManager.loadSystem('IconSet'),
							icon% 16*32,Math.floor(icon / 16)*32, //切割坐标
							32,	32,//切割尺寸
							psX+SSMBS_Window_Shop.iconSize+currencyAmount*(maxWidth/2)+6, psY+SSMBS_Window_Shop.iconSize/2,// 绘制坐标
							14,	14 //最终大小
						)
						let color;
						if($gameParty.numItems($dataItems[item.meta.currency.split(',')[0]])<amount){
							color = ColorManager.textColor(7);
						}else{
							color = ColorManager.textColor(0);
						}
						this.shopWindowIcons.bitmap.drawTextGradient(amount,psX+currencyAmount*(maxWidth/2)+SSMBS_Window_Shop.iconSize+6+16,psY+SSMBS_Window_Shop.iconSize/2,maxWidth/(currencyAmount+1),SSMBS_Window_Shop.iconSize/2,'left',color,color);
						//触摸到特殊货币
						let currency_stX = this.shopWindow.x+psX+SSMBS_Window_Shop.iconSize+currencyAmount*(maxWidth/2)+6;
						let currency_stY = this.shopWindow.y+psY+SSMBS_Window_Shop.iconSize/2;
						let currency_edX = currency_stX + 14;
						let currency_edY = currency_stY + 14;
						if(ssmbsBasic.isTouching(currency_stX,currency_stY,currency_edX,currency_edY)){
							if(!this.isDrawing){
								this.itemInform = $dataItems[item.meta.currency.split(',')[0]];
							}
						}
					}
				}
				//触摸到物品
				let icon_stX = this.shopWindow.x+psX;
				let icon_stY = this.shopWindow.y+psY;
				let icon_edX = icon_stX + SSMBS_Window_Shop.iconSize;
				let icon_edY = icon_stY + SSMBS_Window_Shop.iconSize;
				if(ssmbsBasic.isTouching(icon_stX,icon_stY,icon_edX,icon_edY)){
					if(!this.isDrawing){
						this.itemInform = item;
					}
					if(TouchInput.isCancelled()){
						//购买物品
						let buyItem = item;
						let buyAmount = 1;
						let costGold = item.price;
						let costItem = item.meta.currency?$dataItems[Number(item.meta.currency.split(',')[0])]:null;
						let costItemAmount = item.meta.currency?item.meta.currency.split(',')[1]:0;
						if(Input.isTriggered('shift')){
							costGold*=10;
							costItemAmount*=10;
							buyAmount*=10;
						}
						let canBuy = false;
						if($gameParty.gold()>=costGold&&$gameParty.numItems(costItem)>=costItemAmount){
							canBuy = true;
						}
						if(canBuy){
							$gameParty.loseGold(costGold);
							$gameParty.loseItem(costItem,costItemAmount);
							$gameParty.gainItem(buyItem,buyAmount);
							AudioManager.playSe({name:SSMBS_Window_Shop.buySound,volume:90,pitch:100,pan:0})
								
						}else{
							SSMBS_Window_Notification.addNotification('购买失败',10,null);
							if($gameParty.gold()<costGold){
								SSMBS_Window_Notification.addNotification('缺少金币'+Number(costGold-$gameParty.gold())+$dataSystem.currencyUnit,10,null);
							}
							if($gameParty.numItems(costItem)<costItemAmount){
								SSMBS_Window_Notification.addNotification('缺少'+$dataItems[Number(item.meta.currency.split(',')[0])].name+'x'+Number(costItemAmount-$gameParty.numItems(costItem)),10,$dataItems[Number(item.meta.currency.split(',')[0])]);
							}
						}
					}
				}
				
			}
		}
	}
	//出售物品
	if(	TouchInput.x > this.shopWindow.x
		&& TouchInput.x < this.shopWindow.x+SSMBS_Window_Shop.width
		&& TouchInput.y > this.shopWindow.y
		&& TouchInput.y < this.shopWindow.y+SSMBS_Window_Shop.height){
		this.isTouchingEnhanceWindow = true;
		if(TouchInput.isReleased() ){
			if(this.item && this.item.price && this.itemTypeDrawing == 'item'){
				AudioManager.playSe({name:SSMBS_Window_Shop.sellSound,volume:90,pitch:100,pan:0})
				$gameParty.gainGold((this.item.price/2)*$gameParty.numItems(this.item));
				$gameParty.loseItem(this.item,$gameParty.numItems(this.item),true);
			}else{
				if(this.item && !this.item.price){
					SSMBS_Window_Notification.addNotification('无法出售 '+this.item.name,10,this.item);
				}
			}
		}
	}
};
