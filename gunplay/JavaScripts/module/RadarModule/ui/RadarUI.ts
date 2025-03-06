
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2023.12.12-22.44.44
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import { RadarModuleC } from "../RadarModuleC";

export default class RadarUI extends UIScript {
	public mCutCanvas: mw.Canvas = undefined;
	public mRadarCanvas: mw.Canvas = undefined;
	public currentPlayer: mw.Player = undefined;
	public playerPointMap: Map<mw.Player, mw.TextBlock> = new Map<mw.Player, mw.TextBlock>();
	public enemyPointMap: Map<string, mw.TextBlock> = new Map<string, mw.TextBlock>();
	public enemyLocMap: Map<string, mw.Vector> = new Map<string, mw.Vector>();
	public characterPointMap: Map<mw.Character, mw.TextBlock> = new Map<mw.Character, mw.TextBlock>();

	private radarModuleC: RadarModuleC = null;

	protected async onAwake(): Promise<void> {
		this.radarModuleC = ModuleService.getModule(RadarModuleC);
		this.currentPlayer = await Player.asyncGetLocalPlayer();
		let windowSize = WindowUtil.getViewportSize();

		this.rootCanvas.size = windowSize;
		this.rootCanvas.zOrder = mw.UILayerTop;
		let _margin = new mw.Margin(0);

		/**外框裁剪容器 */
		this.mCutCanvas = mw.Canvas.newObject(this.rootCanvas, "MyCanvas");
		this.mCutCanvas.size = new Vector2(400, 400);
		this.mCutCanvas.zOrder = 2;
		this.mCutCanvas.autoLayoutRule = new mw.UILayout(0, _margin, mw.UILayoutType.Vertical, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
		this.mCutCanvas.clipEnable = true;

		/**雷达背景图片 */
		let bgp = mw.Image.newObject(this.rootCanvas, "bgp");
		bgp.imageGuid = "86650";
		bgp.imageColor = LinearColor.black;
		bgp.renderOpacity = 0.2;
		bgp.size = this.mCutCanvas.size.clone();

		//背景框
		let fgp = mw.Image.newObject(this.rootCanvas, "fgp");
		fgp.imageGuid = "166605";
		fgp.imageColor = LinearColor.white;
		fgp.renderOpacity = 1;
		fgp.size = this.mCutCanvas.size.clone();

		/**中心点图片 */
		let selfImage = mw.Image.newObject(this.rootCanvas, "selfImage");
		selfImage.imageGuid = "130054";
		selfImage.size = new Vector2(64, 64);
		selfImage.zOrder = 1;

		/**雷达图谱容器 */
		this.mRadarCanvas = mw.Canvas.newObject(this.rootCanvas, "RadarCanvas");
		this.mRadarCanvas.size = this.mCutCanvas.size.clone();
		this.mRadarCanvas.position = Vector2.zero;
		this.mCutCanvas.addChild(this.mRadarCanvas);

		TimeUtil.setInterval(() => {
			windowSize = WindowUtil.getViewportSize();
			this.mCutCanvas.position = mw.Vector.zero;
			bgp.position = this.mCutCanvas.position;
			fgp.position = this.mCutCanvas.position;
			selfImage.position = this.mCutCanvas.position.add(this.mCutCanvas.size.clone().multiply(0.5).clone().subtract(selfImage.size.clone().multiply(0.5)));

			this.mRadarCanvas.renderTransformAngle = -1 * Camera.currentCamera.worldTransform.clone().rotation.z;

			Player.getAllPlayers().forEach((otherPlayer: mw.Player) => {
				if (otherPlayer != this.currentPlayer) {
					if (this.playerPointMap.get(otherPlayer)) {
						let otherPlayerPoint = this.playerPointMap.get(otherPlayer);

						if (otherPlayer.character.ragdollEnabled) {
							otherPlayerPoint.text = "×";
							if (this.radarModuleC.isFriendly(this.currentPlayer, otherPlayer)) {
								otherPlayerPoint.fontColor = LinearColor.green;
								otherPlayerPoint.visibility = 4;
							} else {
								otherPlayerPoint.visibility = 4;
								otherPlayerPoint.fontColor = LinearColor.red;
							}
						}
						else {
							otherPlayerPoint.text = "◆";
							if (this.radarModuleC.isFriendly(this.currentPlayer, otherPlayer)) {
								otherPlayerPoint.fontColor = LinearColor.green;
								otherPlayerPoint.visibility = 4;
							} else {
								otherPlayerPoint.fontColor = LinearColor.red;
								if (this.radarModuleC.playerExposeTempMap.get(otherPlayer)) {
									otherPlayerPoint.visibility = 4;
								}
								else {
									otherPlayerPoint.visibility = 1;
								}
							}
						}
						let loc = this.radarModuleC.Loc2RadarPos(otherPlayer.character.worldTransform.position);
						let offset = otherPlayerPoint.size;
						let retP = new Vector2(loc.x - (offset.x / 2), loc.y - (offset.y / 2));
						if (retP.x < 0 || retP.x > 400 || retP.y < 0 || retP.y > 400) {
							otherPlayerPoint.visibility = 1;
						} else {
							otherPlayerPoint.position = retP;
							otherPlayerPoint.visibility = 4;
						}
					}
					else {
						let otherPlayerPoint = mw.TextBlock.newObject(this.rootCanvas, otherPlayer.userId);
						otherPlayerPoint.fontSize = 32;
						otherPlayerPoint.text = "";
						otherPlayerPoint.outlineColor = LinearColor.black;
						otherPlayerPoint.zOrder = 1;
						otherPlayerPoint.outlineSize = 1;
						otherPlayerPoint.fontColor = LinearColor.green;
						otherPlayerPoint.textHorizontalLayout = 2;
						otherPlayerPoint.textJustification = 0;
						otherPlayerPoint.textVerticalJustification = 0;
						otherPlayerPoint.textAlign = 0;
						otherPlayerPoint.textVerticalAlign = 0;
						otherPlayerPoint.size = new Vector2(32, 32);
						otherPlayerPoint.visibility = 1;
						this.mRadarCanvas.addChild(otherPlayerPoint);
						this.playerPointMap.set(otherPlayer, otherPlayerPoint);
					}
				}
			});

			if (this.enemyLocMap.size > 0) {
				this.enemyLocMap.forEach((value, key) => {
					let loc = this.radarModuleC.Loc2RadarPos(value);
					let offset = this.enemyPointMap.get(key).size;
					let retP = new Vector2(loc.x - (offset.x / 2), loc.y - (offset.y / 2));
					if (retP.x < 0 || retP.x > 400 || retP.y < 0 || retP.y > 400) {
						this.enemyPointMap.get(key).visibility = 1;
					} else {
						this.enemyPointMap.get(key).position = retP;
						this.enemyPointMap.get(key).visibility = 4;
					}
				});
			}

			if (this.characterPointMap.size > 0) {
				this.characterPointMap.forEach((value, key) => {
					if (key.ragdollEnabled) {
						value.text = "×";
					} else {
						value.text = "◆";
					}
					let loc = this.radarModuleC.Loc2RadarPos(key.worldTransform.position);
					let offset = value.size;

					let retP = new Vector2(loc.x - (offset.x / 2), loc.y - (offset.y / 2));
					if (retP.x < 0 || retP.x > 400 || retP.y < 0 || retP.y > 400) {
						value.visibility = 1;
					} else {
						value.position = retP;
						value.visibility = 4;
					}
				});
			}
		}, 0.1);

		Player.onPlayerLeave.add((otherPlayer: mw.Player) => {
			if (this.playerPointMap.get(otherPlayer)) {
				this.playerPointMap.get(otherPlayer).destroyObject();
			}
			this.playerPointMap.delete(otherPlayer);
		});
	}

	public setEnemyPoint(enemyLoc: mw.Vector, enemyId: string): void {
		let enemyPoint = mw.TextBlock.newObject(this.rootCanvas, enemyId.toString());
		enemyPoint.fontSize = 48;
		enemyPoint.text = "◆";
		enemyPoint.outlineColor = LinearColor.black;
		enemyPoint.zOrder = 1;
		enemyPoint.outlineSize = 1;
		enemyPoint.fontColor = LinearColor.red;
		enemyPoint.textHorizontalLayout = 2;
		enemyPoint.textJustification = 0;
		enemyPoint.textVerticalJustification = 0;
		enemyPoint.textAlign = 0;
		enemyPoint.textVerticalAlign = 0;
		enemyPoint.size = new Vector2(48, 48);
		enemyPoint.visibility = 4;
		this.mRadarCanvas.addChild(enemyPoint);
		this.enemyPointMap.set(enemyId, enemyPoint);
		this.enemyLocMap.set(enemyId, enemyLoc);
		let loc = this.radarModuleC.Loc2RadarPos(enemyLoc);
		let offset = enemyPoint.size;
		enemyPoint.position = new Vector2(loc.x - (offset.x / 2), loc.y - (offset.y / 2));
	}

	public setEnemyState(enemyId: string, isDie: boolean): void {
		if (this.enemyPointMap.get(enemyId)) {
			if (isDie) {
				this.enemyPointMap.get(enemyId).text = "x";
			} else {
				this.enemyPointMap.get(enemyId).text = "◆";
			}
		}
	}

	public setCharacterPoint(character: mw.Character): void {
		let characterPoint = mw.TextBlock.newObject(this.rootCanvas, character.gameObjectId);
		characterPoint.fontSize = 32;
		characterPoint.text = "";
		characterPoint.outlineColor = LinearColor.black;
		characterPoint.zOrder = 1;
		characterPoint.outlineSize = 1;
		characterPoint.fontColor = LinearColor.red;
		characterPoint.textHorizontalLayout = 2;
		characterPoint.textJustification = 0;
		characterPoint.textVerticalJustification = 0;
		characterPoint.textAlign = 0;
		characterPoint.textVerticalAlign = 0;
		characterPoint.size = new Vector2(32, 32);
		characterPoint.visibility = 4;
		this.mRadarCanvas.addChild(characterPoint);
		this.characterPointMap.set(character, characterPoint);
	}

	public show(...param): void {
		mw.UIService.showUI(this, this.layer, ...param);
	}

	public hide(): void {
		mw.UIService.hideUI(this);
	}
}