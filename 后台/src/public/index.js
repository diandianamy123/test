import excel from '@/libs/excel';

var Public = new Object();

// 百分数转小数
Public.toPoint = function(percent) {
    var str = percent.replace("%", "");
    str = str / 100;
    return str;
};
// 时间戳转化
Public.timestampToTimeYMDhms = function(timestamp) {
    if (timestamp.length == 10) {
        var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    } else {
        var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    };
    var Y, M, D, h, m, s;
    Y = date.getFullYear() + '-';
    M = (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
    s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
    return Y + M + D + h + m + s;
}
// 时间戳转化
Public.timestampToTimehms = function(timestamp) {
    if (timestamp.length == 10) {
        var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    } else {
        var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    };
    var Y, M, D, h, m, s;
    Y = date.getFullYear() + '-';
    M = (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
    s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
    return h + m + s;
}
//时间转换
Public.timestampToTimeYMD = function(timestamp) {
    if (timestamp.length < 13) {
        timestamp = timestamp * 1000;
    };
    var date = new Date(timestamp);
    var Y, M, D, h, m, s;
    Y = date.getFullYear() + '年';
    M = (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
    D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '日';
    return Y + M + D;
}
//时间转换
Public.timestampToTime = function() {
    return new Date().getTime();
}
// 手机正则
Public.checkMobile = function(sMobile) {
    var phone = $.trim(sMobile);
    var reg = /^1\d{10}$/;
    return reg.test(phone);
};
// 手机正则
Public.yanzhziduan = function(sMobile) {
    for (var variable in sMobile) {
        if (typeof sMobile[variable] == "undefined" || sMobile[variable] == null) {
            return false;
        }
    }
    return true;
};
Public.UEconfig = {
    // 编辑器不自动被内容撑高
    autoHeightEnabled: false,
    // 初始容器高度
    initialFrameHeight: 200,
    // 初始容器宽度
    initialFrameWidth: '100%',
    // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
    UEDITOR_HOME_URL: './static/UEditor/',
    toolbars: [
        ['undo', //撤销
            'redo', //重做
            'formatmatch', //格式刷
            '|', 'fontfamily', //字体
            'fontsize', //字号
            'forecolor', //字体颜色
            'backcolor', //背景色
            'bold', //加粗
            'italic', //斜体
            'underline', //下划线
            'strikethrough', //删除线
            'subscript', //下标
            'superscript', //上标
            'horizontal', //分隔线
            'removeformat', //清除格式
            '|', 'pasteplain', //纯文本粘贴模式
            'preview', //预览
            '|', 'time', //时间
            'date', //日期
            'inserttitle', //插入标题
            'link', //超链接
            'emotion', //表情
            'spechars', //特殊字符
            '|', 'indent', //首行缩进
            'justifyleft', //居左对齐
            'justifyright', //居右对齐
            'justifycenter', //居中对齐
            'justifyjustify', //两端对齐
            'paragraph', //段落格式
            'insertorderedlist', //有序列表
            'insertunorderedlist', //无序列表
            'fullscreen', //全屏
            'rowspacingtop', //段前距
            'rowspacingbottom', //段后距
            '|', 'imagenone', //默认
            'imageleft', //左浮动
            'imageright', //右浮动
            'attachment', //附件
            'imagecenter', //居中
            'wordimage', //图片转存
            'lineheight', //行间距
            'edittip ', //编辑提示
        ]
    ],
}

Public.deriveddata = function(getdata , Headerdata , titleheader) {//导出数据，（数据，表头数据，表名）

    let paramstitle = new Array();
    let paramskey = new Array();
    for(var j = 0, length2 = Headerdata.length; j < length2; j++){
          paramstitle[j] = Headerdata[j].title;
          paramskey[j] = Headerdata[j].key;
    };
    var params = {
        title: paramstitle,
        key:  paramskey,
        data: getdata,
        autoWidth: true,
        filename: titleheader, 
    };
    excel.export_array_to_excel(params)
};



export default Public;