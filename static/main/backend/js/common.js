// 消息框位置控制
var stack_bottomright = {"dir1": "up", "dir2": "left", "firstpos1": 25, "firstpos2": 25};
var $table = $("#table");
//题目类型
var problemType = ["","填空题","选择题","编程题","代码填空题","判断题"];
//用户信息
var userInfo;
//查看信息详情
$table.on('expand-row.bs.table', function (e, index, row, $detail) {
    var html = [];
    $.each(row, function (key, value) {
        html.push('<p><b>' + key + ':</b> ' + value + '</p>');
    });
    return $detail.html(html);
});
$(window).resize(function () {
    $('#table').bootstrapTable('resetView', {
        height: getHeight()
    });
});
function getHeight() {
    var searchHeight = 0;
    if($("#search-part").css('display') !== 'none') {
        searchHeight = $('#search-part').height();
    }
    return $(window).height() - 20 - searchHeight;
}
// 报表勾选获取信息通用接口  -- 接收参数类型，空值、字符串、字符串数组
function getSelectionMessage(option) {
    if(typeof option === 'undefined') {
        return [];
    } else if(typeof option === 'string') {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            var obj = {};
            var tempName = row[option] + '';
            if(tempName.indexOf('<a') !== -1) {
                tempName = $(tempName).text();
            }
            obj[option] = tempName;
            return obj;
        });
    } else {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            var obj = {};
            for(var i = 0, len = option.length; i < len; i++) {
                var tempName = row[option[i]] + '';
                if(tempName.indexOf('<a') !== -1) {
                    tempName = $(tempName).text();
                }
                obj[option[i]] = tempName;
            }
            return obj;
        });
    }
}
//xmlhttprequest初始化
function getRequestObject() {
    var xhr = null;
    if (window.XMLHttpRequest) {
        try {
            xhr = new XMLHttpRequest();
        } catch (e) {
            xhr = null;
        }
    } else if (window.ActiveXObject) {
        try {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (e) {
            try {
                xhr = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (e) {
                xhr = null;
            }
        }
    }
    return xhr;
}