declare namespace mw {
}

declare namespace mw {
}

declare namespace mw {
    /**
     * @author jie.wu
     * @groups 基础类型
     * @description 设置对象是否序列化到场景
     * @effect 只在MobileEditor调用生效
     * @param target usage:设置对象
     * @param flag usage:是否序列化
     */
    function setSerializable(target: mw.GameObject, flag: boolean): void;
    function setLocalRotationEuler(target: mw.GameObject, rotation: mw.Rotation): void;
    /**
     * @author jie.wu
     * @groups 基础类型
     * @description 获取展示的旋转角度
     * @effect 只在MobileEditor调用生效
     * @param target usage:设置对象
     * @returns 旋转角度
     */
    function getLocalRotationEuler(target: mw.GameObject): mw.Rotation;
    /**
     * @author jie.wu
     * @groups 基础类型
     * @description 更新展示的旋转角度
     * @effect 只在MobileEditor调用生效
     * @param target usage:设置对象
     * @param rotation usage:旋转角度
     */
    function setWorldRotationEuler(target: mw.GameObject, rotation: mw.Rotation): void;
    /**
     * @author jie.wu
     * @groups 基础类型
     * @description 获取展示的旋转角度
     * @effect 只在MobileEditor调用生效
     * @param target usage:设置对象
     * @returns 旋转角度
     */
    function getWorldRotationEuler(target: mw.GameObject): mw.Rotation;
    /**
     * @author jie.wu
     * @param target 修改目标脚本
     * @param status 状态
     */
    function setScriptNetStatus(target: mw.Script, status: mw.NetStatus): void;
    /**
     * @author jie.wu
     * @param target 获取目标脚本
     * @return 状态
     */
    function getScriptNetStatus(target: mw.Script): mw.NetStatus;
}

declare namespace mw {
    /**
    * @author tangbin.zhang
    * @description 上传预制体返回状态
    * @groups 数据处理
    */
    enum UploadPrefabResultType {
        /**
        * 上传成功
        */
        Success = 0,
        /**
         * 上传因未知原因失败
         */
        Failure = 1,
        /**
         * 未找到id对应的预制体
         */
        PrefabNotFound = 2,
        /**
         * 非法名称
         */
        IllegalName = 3,
        /**
         * 图片未找到
         */
        ImageNotFound = 4,
        /**
         * 图片大小不匹配
         */
        ImageNotMatch = 5,
        /**
        * 预制体非法文件名
        */
        PrefabIllegalFileName = 6,
        /**
        * 服务器已经存在这个资源
        */
        ExistingAsset = 7
    }
    /**
    * @author yingjie.zhong
    * @description 上传自定义数据包返回状态
    * @groups DATATYPE
    */
    enum UploadCustomResultType {
        /**
        * 上传成功
        */
        Success = 0,
        /**
         * 上传因未知原因失败
         */
        Failure = 1,
        /**
         * 未找到id对应的自定义数据包
         */
        CustomNotFound = 2,
        /**
         * 非法名称
         */
        IllegalName = 3,
        /**
         * 图片未找到
         */
        ImageNotFound = 4,
        /**
         * 图片大小不匹配
         */
        ImageNotMatch = 5,
        /**
        * 预制体非法文件名
        */
        CustomIllegalFileName = 6,
        /**
        * 服务器已经存在这个资源
        */
        ExistingAsset = 7
    }
    /**
    * @author boxin.liu
    * @description 上传贴图资源类型
    * @groups 数据处理
    */
    enum UploadTextureType {
        /**
         * 场景贴图
         */
        Local_SceneTexture = 0,
        /**
         * 角色贴图
         */
        Local_CharacterTexture = 1,
        /**
         * UI贴图
         */
        Local_UITexture = 2
    }
    /**
    * @author boxin.liu
    * @description 上传贴图返回状态
    * @groups 数据处理
    */
    enum UploadTextureResultType {
        /**
         * 上传成功
         */
        Success = 0,
        /**
         * 上传因未知原因失败
         */
        Failure = 1,
        /**
        * 服务器已经存在这个资源
        */
        ExistingAsset = 2,
        /**
         * 未找到
         */
        TextureNotFound = 10,
        /**
         * 大小不是2的N次幂
         */
        SizeNotPowerOfTwo = 11,
        /**
         * 大小超限
         */
        TextureOversized = 12,
        /**
         * 非法名称
         */
        IllegalName = 13,
        /**
        * 贴图非法文件名
        */
        TextureIllegalFileName = 14,
        /**
         * 缩略图未找到
         */
        ThumbnailNotFound = 20,
        /**
         * 缩略图大小超限
         */
        ThumbnailOversized = 21,
        /**
         * 文件格式不支持
         */
        UnsupportedFormat = 30
    }
    /**
    * @author tangbin.zhang
    * @description 上传GIF返回状态
    * @groups 数据处理
    */
    enum UploadGIFResultType {
        /**
         * 上传成功
         */
        Success = 0,
        /**
         * 上传因未知原因失败
         */
        Failure = 1,
        /**
        * 服务器已经存在这个资源
        */
        ExistingAsset = 2,
        /**
         * 未找到
         */
        GIFNotFound = 3,
        /**
         * 非法名称
         */
        IllegalName = 4,
        /**
        * 非法文件名
        */
        IllegalFileName = 5,
        /**
        * 大小超限
        */
        GIFOversized = 6,
        /**
         * 文件格式不支持
         */
        UnsupportedFormat = 7
    }
    /**
    * @author fuqiang.yang
    * @description 上传音频文件返回状态
    * @groups 数据处理
    */
    enum UploadRTFSoundResultType {
        /**
         * 上传成功
         */
        Success = 0,
        /**
         * 上传因未知原因失败
         */
        Failure = 1,
        /**
         * 需要上传的文件不存在
         */
        FileNotFound = 2,
        /**
         * 文件名称中存在非法字符
         */
        IllegalFileName = 3,
        /**
         * 服务器已经存在这个资源
         */
        ExistingAsset = 4,
        /**
         * 生成RTFSound失败
         */
        GenerateRTFFailed = 5,
        /**
         * 同一时间只允许一个音频上传任务
         */
        OnlyOneSessionAllowed = 6,
        /**
         * Server端不支持该功能
         */
        UnsupportedOnServer = 7
    }
}

declare namespace mw {
}

declare namespace mw {
    /**
     * @author wu.hao
     * @groups 输入
     * @description 手势代理类
     * @networkStatus usage:客户端
     */
    class GestureDelegate {
        /**
         * @description 点击事件代理
         */
        static tapGestureDelegate: mw.MulticastDelegate<(SelectType: mw.SelectTapType, location: mw.Vector2) => void>;
        /**
         * @description 单指滑动代理
         */
        static oneFingerMoveGestureDelegate: mw.MulticastDelegate<(location: mw.Vector2) => void>;
        /**
         * @description 双指滑动代理
         */
        static twoFingerMoveGestureDelegate: mw.MulticastDelegate<(location: mw.Vector2) => void>;
        /**
         * @description 挤压手势代理
         */
        static pinchGestureDelegate: mw.MulticastDelegate<(Distance: number) => void>;
        /**
         * @description 手指按下代理
         */
        static touchBeganGestureDelegate: mw.MulticastDelegate<(FingerIndex: number, Position: mw.Vector2) => void>;
        /**
         * @description 手指滑动代理
         */
        static touchMoveGestureDelegate: mw.MulticastDelegate<(FingerIndex: number, Position: mw.Vector2) => void>;
        /**
         * @description 手指抬起代理
         */
        static touchEndGestureDelegate: mw.MulticastDelegate<(FingerIndex: number) => void>;
    }
    /**
     * @author jie.wu
     * @description 获取点击事件的代理
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @returns 返回的代理
     */
    function getTapGestureDelegate(): mw.MulticastDelegate<(SelectType: mw.SelectTapType, location: mw.Vector2) => void>;
    /**
     * @author jie.wu
     * @description 获取单指滑动的代理
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @returns 返回单指滑动的代理
     */
    function getOneFingerMoveGestureDelegate(): mw.MulticastDelegate<(location: mw.Vector2) => void>;
    /**
     * @author jie.wu
     * @description 获取双指滑动的代理
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @returns 返回双指滑动的代理
     */
    function getTwoFingerMoveGestureDelegate(): mw.MulticastDelegate<(location: mw.Vector2) => void>;
    /**
     * @author jie.wu
     * @description 获取挤压手势的代理
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @returns  返回挤压手势的代理
     */
    function getPinchGestureDelegate(): mw.MulticastDelegate<(Distance: number) => void>;
    /**
     * @author jie.wu
     * @description 获取手指按下代理
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @returns 返回手指按下时的代理
     */
    function getTouchBeganGestureDelegate(): mw.MulticastDelegate<(FingerIndex: number, Position: mw.Vector2) => void>;
    /**
     * @author jie.wu
     * @description 获取手指滑动代理
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @returns  返回手指滑动的代理
     */
    function getTouchMoveGestureDelegate(): mw.MulticastDelegate<(FingerIndex: number, Position: mw.Vector2) => void>;
    /**
     * @author jie.wu
     * @description 获取手指抬起代理
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @returns  返回抬起手指时候的代理
     */
    function getTouchEndGestureDelegate(): mw.MulticastDelegate<(FingerIndex: number) => void>;
    /**
     * @author jie.wu
     * @description tap点击的时间间隔- 如果在这个时间以内算tap，大于这个时间则是move
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @param time usage: tap限定的时间
     */
    function setTapTime(time: number): void;
    /**
     * @author jie.wu
     * @description 单指移动的时间- 必须大于这个时间才会开始执行单指移动
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @param time usage: 单指移动的限定时间
     */
    function setSingleSwipeTime(time: number): void;
    /**
     * @author jie.wu
     * @description 挤压手势的偏差角度
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @param time usage: 偏差角度
     */
    function setPinchAngleTolerance(time: number): void;
    /**
     * @author jie.wu
     * @description 双指移动的时间- 必须大于这个时间才执行双指移动事件
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @param time usage: 双指移动限定的时间
     */
    function setMultiSwipeTime(time: number): void;
    /**
     * @author jie.wu
     * @description 双指移动的偏差量- 值越大误差则可以越大
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @param time usage: 偏差值
     */
    function setSwipeTolerance(time: number): void;
    /**
     * @author jie.wu
     * @description 获取touch的数组
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @returns 返回一个10维数组Vector, x,y点击的位置,z代表点击的状态 只会出现0,1的情况
     */
    function getTouchData(): Array<mw.Vector>;
    /**
     * @author jie.wu
    * @description 将二维屏幕位置转换为世界空间三维位置和方向
    * @groups 基础类型
    * @effect 调用端生效
    * @param ScreenX usage: 屏幕X轴坐标值 default:
    * @param ScreenY usage: 屏幕Y轴坐标值
    * @returns 屏幕坐标转换结果
    */
    function convertScreenLocationToWorldSpace(ScreenX: number, ScreenY: number): mw.ConvertScreenResult;
    /**
     * @author jie.wu
     * @description 获取角色在世界中的位置，投射到屏幕上
     * @groups 基础类型
     * @effect 调用端生效
     * @param worldLocation usage: 世界坐标
     * @param playerViewportRelative usage: 这是否应该相对于播放器视口子区域（在分割屏幕中使用播放器附加的小部件或纵横比受限时有用）default:false
     * @returns 屏幕坐标转换结果，无WorldDirection，为默认值Type.Vector.ZERO
     */
    function projectWorldPositionToWidgetPosition(worldLocation: mw.Vector, playerViewportRelative?: boolean): mw.ConvertScreenResult;
    /**
     * @author jie.wu
     * @description 获取角色在世界中的位置，投射到屏幕上
     * @deprecated info:该接口已废弃，在该接口被删除前会仍保持可用，请尽快使用替换方案以免出现问题 since:027 reason:接口废弃 replacement:projectWorldPositionToWidgetPosition()
     * @groups 基础类型
     * @effect 调用端生效
     * @param worldLocation usage: 世界坐标
     * @param playerViewportRelative usage: 这是否应该相对于播放器视口子区域（在分割屏幕中使用播放器附加的小部件或纵横比受限时有用）default:false
     * @returns 屏幕坐标转换结果，无WorldDirection，为默认值Type.Vector.ZERO
     */
    function projectWorldLocationToWidgetPosition(worldLocation: mw.Vector, playerViewportRelative?: boolean): mw.ConvertScreenResult;
}

declare namespace mw {
    /**
    * @author tangbin.zhang
    * @description 上传GIF返回结果
    * @groups 数据处理
    * @param uploadGIFResultType usage: 上传GIF返回状态
    * @param assetId usage: 资源标识  range: 字符串长度依据资源 ID 长度而定
    */
    type UploadGIFResult = {
        uploadGIFResultType: mw.UploadGIFResultType;
        assetId: string;
    };
    /**
     * @author tangbin.zhang
     * @groups 基础类型
     * @description 上传GIF
     * @effect 调用端生效
     * @precautions 异步请求
     * @param gifPath usage: 第一帧小于等于1024*1024得gif路径
     * @param name usage:名字
     * @param comment usage:资源描述
     * @returns {Promise<UploadGIFResult>} 上传GIF返回结果
     * @example
     * 使用示例：调用方法 新建一个脚本 NewScript
     * ```
     * @Component
     * export default class NewScript extent Script {
     * //当脚本被实例后，会在第一帧更新前调用此函数
     * protected onStart(): void {
     *     //gifPath=C:/Texture.gif，name=我的GIF，comment=这是个GIF;
     *     mw.uploadGIF('C:/Texture.gif','我的GIF','这是个GIF').then(item =>{
     *        console.log(item.AssetId)
     *     });
     *   }
     * }
     * ```
     */
    function uploadGIF(gifPath: string, name: string, comment: string): Promise<UploadGIFResult>;
    /**
    * @author tangbin.zhang
    * @description 上传贴图返回结果
    * @groups 数据处理
    * @param UploadTextureResultType usage: 上传贴图返回状态
    * @param assetId usage: 上传贴图返回UUId
    * @param onlineGuid usage: 资源库Guid
    */
    type FastUploadTextureResult = {
        uploadTextureResultType: mw.UploadTextureResultType;
        assetId: string;
        onlineGuid: string;
    };
    /**
     * @author tangbin.zhang
     * @groups 基础类型
     * @description 上传贴图(场景贴图、角色贴图、UI贴图)
     * @effect 调用端生效
     * @precautions 异步请求
     * @param texturePath usage:小于等于2048*2048(如果不是UI贴图，必须符合2的N次幂)的贴图
     * @param name usage:名字
     * @param comment usage:资源描述
     * @param uploadTextureType usage:上传的贴图类型
     * @returns {Promise<FastUploadTextureResult>} 上传贴图返回结果
     * @example
     * 使用示例：调用方法 新建一个脚本 NewScript
     * ```
     * @Component
     * export default class NewScript extent Script {
     * //当脚本被实例后，会在第一帧更新前调用此函数
     * protected onStart(): void {
     *     //贴图=C:/Texture.png，贴图的名字=我的贴图，贴图的描述=这是个贴图，贴图类型= mw.UploadTextureType.Local_CharacterTexture;
     *     mw.fastUploadTexture('C:/Texture.png','我的贴图','这是个贴图', mw.UploadTextureType.Local_CharacterTexture).then(item =>{
     *        console.log(item.AssetId)
     *     });
     *   }
     * }
     * ```
     */
    function fastUploadTexture(texturePath: string, name: string, comment: string, uploadTextureType: mw.UploadTextureType): Promise<FastUploadTextureResult>;
    /**
    * @author boxin.liu
    * @description 上传贴图返回结果
    * @groups 数据处理
    * @param UploadTextureResultType usage: 上传贴图返回状态
    */
    type UploadTextureResult = {
        UploadTextureResultType: mw.UploadTextureResultType;
        assetId: string;
    };
    /**
     * @author boxin.liu
     * @groups 基础类型
     * @description 上传贴图(场景贴图、角色贴图、UI贴图)
     * @effect 调用端生效
     * @precautions 异步请求
     * @param texturePath usage:小于等于2048*2048(如果不是UI贴图，必须符合2的N次幂)的贴图
     * @param name usage:名字
     * @param comment usage:资源描述
     * @param uploadTextureType usage:上传的贴图类型
     * @returns {Promise<UploadTextureResult>} 上传贴图返回结果
     * @example
     * 使用示例：调用方法 新建一个脚本 NewScript
     * ```
     * @Component
     * export default class NewScript extent Script {
     * //当脚本被实例后，会在第一帧更新前调用此函数
     * protected onStart(): void {
     *     //贴图=C:/Texture.png，贴图的名字=我的贴图，贴图的描述=这是个贴图，贴图类型= mw.UploadTextureType.Local_CharacterTexture;
     *     mw.uploadTexture('C:/Texture.png','我的贴图','这是个贴图', mw.UploadTextureType.Local_CharacterTexture).then(item =>{
     *        console.log(item.AssetId)
     *     });
     *   }
     * }
     * ```
     */
    function uploadTexture(texturePath: string, name: string, comment: string, uploadTextureType: mw.UploadTextureType): Promise<UploadTextureResult>;
    /**
    * @author tangbin.zhang
    * @description 上传预制体返回结果
    * @groups 数据处理
    * @param uploadPrefabResultType usage: 上传预制体返回状态
    * @param assetId usage: 资源标识  range: 字符串长度依据资源 ID 长度而定
    */
    type UploadPrefabResult = {
        uploadPrefabResultType: mw.UploadPrefabResultType;
        assetId: string;
    };
    /**
     * @author tangbin.zhang
     * @groups 基础类型
     * @description 上传预制体
     * @effect 调用端生效
     * @precautions 异步请求
     * @param assetId usage:预制体资源Id  range: 字符串长度依据资源 ID 长度而定
     * @param name usage:名字
     * @param comment usage:资源描述
     * @param imagePath usage:512*512的透明png缩略图
     * @returns {Promise<UploadPrefabResult>} 上传预制体返回结果
     * @example
     * 使用示例:调用方法 新建一个脚本 NewScript
     * ```
     * @Component
     * export default class NewScript extends Script {
     *   //当脚本被实例后，会在第一帧更新前调用此函数
     *   protected onStart(): void {
     *     //把guid='23C1ED241027B9E0'的预制体上传到服务器上，预制体的名字=我的预制体，，预制体的描述=这是个预制体，缩略图=C:/icon.png
     *     mw.uploadPrefab('23C1ED241027B9E0','我的预制体','C:/icon.png','这是个预制体').then(item =>{
     *        console.log(item.AssetId)
     *     });
     *   }
     * }
     * ```
     */
    function uploadPrefab(assetId: string, name: string, imagePath: string, comment?: string): Promise<UploadPrefabResult>;
    /**
     * @author tangbin.zhang
     * @groups 基础类型
     * @description 上传预制体
     * @effect 调用端生效
     * @precautions 异步请求
     * @param assetId usage:预制体资源Id  range: 字符串长度依据资源 ID 长度而定
     * @param name usage:名字
     * @param comment usage:资源描述
     * @param imagePath usage:512*512的透明png缩略图
     * @param isReplaceGameThumb usage:替换当前游戏的缩略图记录为最新的imagePath
     * @param price usage:价格
     * @param tabId usage:标签ID
     * @param extraData usage:额外数据
     * @param bizLine usage:业务线
     * @param commonReqVO usage:拓展字段
     * @param tags usage:tags
     * @returns {Promise<UploadPrefabResult>} 上传预制体返回结果
     * @example
     * 使用示例:调用方法 新建一个脚本 NewScript
     * ```
     * @Component
     * export default class NewScript extends Script {
     *   //当脚本被实例后，会在第一帧更新前调用此函数
     *   protected onStart(): void {
     *     //把guid='23C1ED241027B9E0'的预制体上传到服务器上，预制体的名字=我的预制体，，预制体的描述=这是个预制体，缩略图=C:/icon.png
     *     mw.fastUploadPrefab('23C1ED241027B9E0','C:/icon.png','我的预制体','这是个预制体').then(item =>{
     *        console.log(item.AssetId)
     *     });
     *   }
     * }
     * ```
     */
    function fastUploadPrefab(assetId: string, imagePath: string, name: string, comment: string, isReplaceGameThumb?: boolean, price?: number, tabId?: number[], extraData?: string, bizLine?: string, commonReqVO?: string, tags?: string): Promise<UploadPrefabResult>;
    /**
     * @author yingjie.zhong
     * @description 上传自定义数据包返回结果
     * @groups DATATYPE
     * @param uploadCustomResultType usage: 上传自定义数据包返回状态
     * @param assetId usage: 资源标识
     */
    type UploadCustomResult = {
        uploadCustomResultType: mw.UploadCustomResultType;
        assetId: string;
    };
    /**
     * @author yingjie.zhong
     * @groups 基础类型
     * @description 上传自定义数据包
     * @effect 调用端生效
     * @precautions 异步请求
     * @param assetId usage:自定义数据包资源Id  range: 字符串长度依据资源 ID 长度而定
     * @param name usage:名字
     * @param comment usage:资源描述
     * @param imagePath usage:512*512的透明png缩略图
     * @param isReplaceGameThumb usage:替换当前游戏的缩略图记录为最新的imagePath
     * @param price usage:价格
     * @param tabId usage:标签ID
     * @param extraData usage:额外数据
     * @param bizLine usage:业务线
     * @param commonReqVO usage:拓展字段
     * @param tags usage:tags
     * @returns {Promise<UploadCustomResult>} 上传预制体返回结果
     * @example
     * 使用示例:调用方法 新建一个脚本 NewScript
     * ```
     * @Component
     * export default class NewScript extends Script {
     *   //当脚本被实例后，会在第一帧更新前调用此函数
     *   protected onStart(): void {
     *     //把guid='23C1ED241027B9E0'的自定义数据包上传到服务器上，自定义数据包的名字=我的自定义数据包，自定义数据包的描述=这是个自定义数据包，缩略图=C:/icon.png
     *     UGC.fastUploadCustom('23C1ED241027B9E0','C:/icon.png','我的自定义数据包','这是个自定义数据包').then(item =>{
     *        console.log(item.AssetId)
     *     });
     *   }
     * }
     * ```
     */
    function fastUploadCustom(assetId: string, imagePath: string, name: string, comment: string, isReplaceGameThumb?: boolean, price?: number, tabId?: number[], extraData?: string, bizLine?: string, commonReqVO?: string, tags?: string): Promise<UploadCustomResult>;
    /**
     * @author yingjie.zhong
     * @groups SCRIPTING
     * @description 保存自定义数据包,作为上传资源fastUploadCustom()的前置
     * @effect 只在客调用端生效
     * @param  packFilePaths:usage: 目标文件/目录对项目根目录的相对路径 range: 目标文件要求在项目根目录下
     * @param  rootName:usage: 自定义数据包的名字
     * @returns {string} 返回生成自定义数据包的本地资源ID
     */
    function saveCustom(packFilePaths: string[], rootName: string): string;
    /**
     * @author tangbin.zhang
     * @groups 基础类型
     * @description 获取资源状态(是否入库)
     * @effect 调用端生效
     * @precautions 异步请求
     * @param assetId usage:资源Guid
     * @param startTime usage:设置开始时间,必须小于timeout,默认值1.5秒后请求
     * @param timeout usage:设置超时时间,startTime,默认5秒
     * @returns {Promise<bool>} 资源是否入库成功
     * @example
     * 使用示例:调用方法 新建一个脚本 NewScript
     * ```
     * @Component
     * export default class NewScript extends Script {
     *   //当脚本被实例后，会在第一帧更新前调用此函数
     *   protected onStart(): void {
     *     mw.getAssetStatus('23C1ED241027B9E0',1.5,5).then(item =>{
     *        console.log(item)
     *     });
     *   }
     * }
     * ```
     */
    function getAssetStatus(assetId: string, startTime?: number, timeout?: number): Promise<boolean>;
    /**
     * @author xiangkun.sun,mengyuan.hao
     * @description  获取当前CPU画质等级
     * @groups 设置
     * @effect 只在客户端调用生效
     * @returns 画质等级。如果返回值为undefined，请检查是否在客户端调用
     */
    function getCPULevel(): mw.GraphicsLevel;
    /**
     * @author xiangkun.sun,mengyuan.hao
     * @description  获取当前GPU画质等级
     * @groups 设置
     * @effect 只在客户端调用生效
     * @returns 画质等级。如果返回值为undefined，请检查是否在客户端调用
     */
    function getGPULevel(): mw.GraphicsLevel;
    /**
     * @author xiangkun.sun,mengyuan.hao
     * @description 获取默认CPU画质等级
     * @groups 设置
     * @effect 只在客户端调用生效
     * @returns 默认画质等级。如果返回值为undefined，请检查是否在客户端调用
     */
    function getDefaultCPULevel(): mw.GraphicsLevel;
    /**
     * @author xiangkun.sun,mengyuan.hao
     * @description 获取默认GPU画质等级
     * @groups 设置
     * @effect 只在客户端调用生效
     * @returns 默认画质等级。如果返回值为undefined，请检查是否在客户端调用
     */
    function getDefaultGPULevel(): mw.GraphicsLevel;
    /**
     * @author xiangkun.sun,mengyuan.hao
     * @description 设置CPU和GPU的画质等级
     * @effect 只在客户端调用生效
     * @param CPULevel usage:CPU画质等级
     * @param GPULevel usage:GPU画质等级
     */
    function setGraphicsLevel(CPULevel: mw.GraphicsLevel, GPULevel: mw.GraphicsLevel): void;
    /**
     * @author xiangkun.sun
     * @description 设置当前CPU画质等级
     * @groups 设置
     * @effect 只在客户端调用生效
     * @param CPULevel usage:CPU画质等级
     */
    function setGraphicsCPULevel(CPULevel: mw.GraphicsLevel): void;
    /**
     * @author xiangkun.sun
     * @description 设置当前GPU画质等级
     * @groups 设置
     * @effect 只在客户端调用生效
     * @param GPULevel usage:GPU画质等级
     */
    function setGraphicsGPULevel(GPULevel: mw.GraphicsLevel): void;
    /**
     * @author fuqiang.yang
     * @description 选择本地文件，返回结果
     * @groups 基础类型
     */
    type SelectLocalFilesResult = {
        /** 成功与否 */
        bSuccess: boolean;
        /** (bSuccess=true:data表示本地文件路径列表，以分号';
'分隔 | bSuccess=false:发生错误，data记录错误信息) */
        data: string;
    };
    /**
     * @author fuqiang.yang
     * @description 获取本地的音频文件列表
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @param timeoutDurationInSecond 超时时长，单位 秒
     * @param filters 文件过滤器
     * @returns 选择本地音频文件的结果
     */
    function selectLocalAudioFiles(timeoutDurationInSecond: number, filters: string): Promise<SelectLocalFilesResult>;
    /**
     * @author fuqiang.yang
     * @description 播放本地音频文件
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @param localAudioFilePath 本地音频文件路径
     */
    function playLocalAudioFile(localAudioFilePath: string): void;
    /**
    * @author fuqiang.yang
    * @description 上传音频文件返回结果
    * @groups 数据处理
    * @param uploadResultType usage: 上传音频返回状态
    * @param assetId usage: 上传音频返回UUId
    * @param onlineGuid usage: 资源库Guid
    */
    type FastUploadRTFSoundResult = {
        uploadResultType: mw.UploadRTFSoundResultType;
        assetId: string;
        onlineGuid: string;
    };
    /**
     * @author fuqiang.yang
     * @description 上传本地音频文件，生成RTFSoundWave资源
     * @groups 基础类型
     * @effect 只在客户端调用生效
     * @param inRawSoundFilePath usage:本地音频文件
     * @param name usage:名字
     * @param comment usage:资源描述
     * @returns {Promise<FastUploadRTFSoundResult>} 上传音频返回结果
     * @example
     * 使用示例：调用方法 新建一个脚本 NewScript
     * ```
     * @Component
     * export default class NewScript extent Script {
     * //当脚本被实例后，会在第一帧更新前调用此函数
     * protected onStart(): void {
     *     //音频文件=/user/path/to/sample.mp3，音频的名字=我的音频，音频的描述=这是个音频
     *     mw.fastUploadRTFSound('/user/path/to/sample.mp3','我的音频','这是个音频').then(item =>{
     *        console.log(item.assetId)
     *     });
     *   }
     * }
     * ```
     */
    function fastUploadRTFSound(rawSoundFilePath: string, name: string, comment: string): Promise<FastUploadRTFSoundResult>;
    /**
     * @author yingjie.zhong
     * @description 获取新的Guid8
     * @groups 基础类型
     * @effect 调用端生效
     * @returns 新的Guid8
     */
    function getNewGuid8(): string;
}

declare namespace mw {
    /**
     * @author jie.wu
    * @description UGC 选中的单选或者多选
    * @groups 基础类型
    */
    enum SelectTapType {
        /** 未选中 */
        None = 0,
        /** 单选 */
        Single = 1,
        /** 多选 */
        Multi = 2
    }
    /**
    * @author jie.wu
    * @description UGC 发布的状态
    * @groups 基础类型
    */
    enum ReleaseStatus {
        /** 发布失败 */
        Failed = 0,
        /** 发布成功 */
        Success = 1,
        /** 由于保存数据问题导致的发布失败 */
        SaveError = 2
    }
    /**
     * @author hao.wu
     * @description  已发布的游戏数据，用于继承服务器数据。
     * @groups 基础类型
     */
    type ReleaseGameData = {
        /** 游戏名称 */
        gameName: string;
        /** (bDownloaded=true:本地文件路径|bDownloaded=false:服务器URL) */
        gameCover: string;
        /** 是否已下载到本地 */
        bDownloaded: boolean;
    };
    /**
     * @author xiangkun.sun
     * @description 日志等级
     * @groups 基础类型
     */
    enum LogLevel {
        /** 普通 */
        Log = 0,
        /** 警告 */
        Warning = 1,
        /** 错误 */
        Error = 2
    }
}

/// <reference types="engine" />
declare namespace mw {
    // @ts-ignore
    import * as UE from "ue";
    class StagingScreenShotHandle {
        constructor(Handle: UE.StagingScreenShotHandle);
        private handle;
        get autoSave(): boolean;
        get requested(): boolean;
        set autoSave(value: boolean);
        previewTextureCallback: mw.MulticastDelegate<(preview: UE.Texture2DDynamic) => void>;
        saveComplelted: mw.MulticastDelegate<(bsuccess: boolean, path: string) => void>;
    }
}

declare namespace mw {
    /**
     * @hidden
     * @author changzun.li
     * @description 获取web地址列表
     * @returns 所有配置key
     */
    function getUrlConfigList(): string[];
    /**
     * @hidden
     * @author changzun.li
     * @description 应用web配置地址
     * @param key
     */
    function useUrlConfig(key: string): void;
}
