/**
 * Created by yjq on 2018/10/13.
 */
var $table = $("#table");
var editor;
var addContent;
var $form = $("#nowForm");
var $addform = $("#addForm");
$(function () {
    initPage();
});
function initPage() {
    $table.bootstrapTable({
        height: getHeight,
        toolbar: "#toolbar",
        url: '/carousel',//异步请求的链接
        method: 'get',
        // sortOrder: 'desc',//排序方式
        responseHandler: responseHandler,//对回调数据进行处理
        queryParams: queryParams,//异步请求的传参
        striped: true,  // 隔行换色
        showRefresh: true,
        showColumns: true,
        showToggle: true,
        detailView: true,
        minimumCountColumns: 2,
        pagination: true,
        pageList: "[15, 20, 25, 50, 100]",
        pageNumber: 1,
        pageSize: 15,
        showFooter: false,
        sidePagination: "server",
        clickToSelect:true
    });
}
//参数初始化
function queryParams(params) {
    var postData = {
        page: params.offset/params.limit + 1,
        pagesize: params.limit
    }
    return postData;
}
//返回数据初始化
function responseHandler(res) {
    var data = res.data;
    for(var i = 0;i<data.length;i++) {
        data[i].in_date = data[i].in_date.replace('T','-');
        data[i].href = '<a href="/admin/articleDetail?id='+data[i].id+'" target="_blank">'+data[i].title+'</a>'
    }
    return {
        "total": res.total,
        "rows": data
    }
}
//提交表单
function submitInfo(flag) {
    if(flag){
        $("#content").val(editor.getData());
        $form.data('bootstrapValidator').validate();//表单验证
        var isValid = $form.data('bootstrapValidator').isValid();
        if(!isValid) {
            return;
        }
        layer.msg('表单提交中...', { // 提交加载动画
            icon: 16,
            shade: 0.01,
            time: 8000
        });
        var postData = {};
        var array = $form.serializeArray();
        $.each(array, function(){
            // 如果该字段存在
            if(postData[this.name]) {
                if(!postData[this.name].push) {
                    postData[this.name] = [postData[this.name]];
                }
                postData[this.name].push(this.value || null);
            } else {
                postData[this.name] = this.value || null;
            }
        });
        postData['uid'] = uid;
        console.log(postData);
        $.ajax({
            url:'/news',
            type:'PUT',
            data:postData,
            success:function (res) {
                layer.closeAll();
                $("#infoDetail").modal('hide');
                $table.bootstrapTable('refresh');
            },
            error:function (e) {
                console.log(e);
            }
        })
    } else {
        $("#addContent").val(addContent.getData());
        $addform.data('bootstrapValidator').validate();//表单验证
        var isValid = $addform.data('bootstrapValidator').isValid();
        if(!isValid) {
            return;
        }
        layer.msg('表单提交中...', { // 提交加载动画
            icon: 16,
            shade: 0.01,
            time: 8000
        });
        var postData = {};
        var array = $addform.serializeArray();
        $.each(array, function(){
            // 如果该字段存在
            if(postData[this.name]) {
                if(!postData[this.name].push) {
                    postData[this.name] = [postData[this.name]];
                }
                postData[this.name].push(this.value || null);
            } else {
                postData[this.name] = this.value || null;
            }
        });
        postData['uid'] = uid;
        console.log(postData);
        $.ajax({
            url:'/news',
            type:'post',
            data:JSON.stringify(postData),
            dataType:'application/json',
            success:function (res) {
                layer.closeAll();
                $("#addDetail").modal('hide');
                $table.bootstrapTable('refresh');
            },
            error:function (e) {
                console.log(e);
            }
        })
    }
}
//删除通知
function deleteInfo() {
    var selection = $table.bootstrapTable('getSelections');
    if(selection.length == 0 ||selection.length > 1){
        layer.msg('请选择一个',function(){});
        return;
    }
    layer.confirm('您确认要删除选中记录？', {
        btn: ['确认','取消'] //按钮
    }, function(){
        //确认删除执行的动作
        layer.msg('删除中，请稍候', {icon: 1});
        $.ajax({
            url: '/news?news_id='+selection[0].news_id,
            contentType: 'application/x-www-form-urlencoded',
            type: 'DELETE',
            success: function (res) {
                layer.msg('删除成功！',  {icon: 1});
                layer.closeAll();
                $table.bootstrapTable('refresh');
            },
            error:function(){
                layer.alert('删除失败！',  {icon: 2});
            }
        });
    }, function(){
        layer.msg('重新考虑', {
            time: 20000 //20s后自动关闭
        });
    });
}
function getHeight() {
    var searchHeight = 0;
    if($("#search-part").css('display') !== 'none') {
        searchHeight = $('#search-part').height();
    }
    return $(window).height() - 20 - searchHeight;
}
//查看信息详情
$table.on('expand-row.bs.table', function (e, index, row, $detail) {
    var html = [];
    $.each(row, function (key, value) {
        html.push('<p><b>' + key + ':</b> ' + value + '</p>');
    });
    return $detail.html(html);
});
//添加题库
function showAddArticle() {
    var index = layer.open({
        type: 2,
        title: '新增',
        shadeClose: false,
        shade: 0.8,
        area: ['800px', '90%'],
        content: '/admin/articleDetail'
    });
    layer.full(index);
}
//父级刷新
function refreshAndShowMessage(options){
    layer.msg(options);
    $('#table').bootstrapTable('refresh');
}
//删除文章
function deleteArticle() {
    var selector = $table.bootstrapTable('getSelections');
    if(selector.length > 1 || !selector.length) {
        layer.msg('请选择一项删除项');
        return ;
    }
    $.ajax({
        url: '/carousel?id='+selector[0].id,
        type: 'DELETE',
        contentType: 'application/json;charset=utf-8',
        success: function (res) {
            if(res.success === true) {
                layer.msg('删除成功');
                $table.bootstrapTable('refresh');
                return ;
            } else{
                layer.msg('删除失败，请稍后再试');
            }
        }
    })
}