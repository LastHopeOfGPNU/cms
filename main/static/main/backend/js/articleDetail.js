/**
 * Created by mu-HUN on 2018/10/11.
 */
$(function () {
    var id;
    var content;
    initPage();
    function initPage() {
        id=getIds()
        if(!!id) {
            getArticleDetail()
        }
        content = CKEDITOR.replace('content', {
            filebrowserImageUploadUrl:'/adjuncts/ckeditor/file_upload',
            resize_enabled : true,
            autoUpdateElement : true,
            height:200,
            toolbarCanCollapse: false,
            toolbarStartupExpanded:false
        })
    }
    //获取文章详情
    function getArticleDetail() {
        // var id = getIds();
        /*var postData = {
            'params': {
                'id': id
            }
        }*/
        $.ajax({
            url: '/article/detail?id='+ id,
            type: 'get',
            dataType:'json',
            success:function (res) {
                echoData(res.data)
            },
            error: function (e) {
                console.log(e);
            }
        })
    }
    function echoData(data) {
        $('#title').val(data.title);
        content.setData(data.content);
    }
    //获取页面id参数
    function getIds() {
        var urlStr = window.location.search;
        if(!urlStr) { return null}
        return urlStr.split('=')[1];
    }
    //触发上传
    function upLoading(selector){
        $(selector).click();
    }
})