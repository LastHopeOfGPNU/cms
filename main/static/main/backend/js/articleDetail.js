/**
 * Created by mu-HUN on 2018/10/11.
 */
$(function () {
    var id;
    var content;
    var ajaxType = 'post';
    var url = '/article/detail';
    var $save = $('#save');
    var $form = $('#newForm');
    initPage();
    $save.on('click',submitForm);
    //提交表单
    function submitForm(e) {
        e.stopPropagation();
        $form.data('bootstrapValidator').validate();
        var isValid = $form.data('bootstrapValidator').isValid();
        if(!isValid) {
            return ;
        }
        layer.msg('表单提交中...',{
            icon: 16,
            shade: 0.01,
            time: 8000
        });
        var postData = {};
        var array = $form.serializeArray();
        $.each(array, function () {
            if(postData[this.name]) {
                if(!postData[this.name].push) {
                    postData[this.name] = [postData[this.name]];
                }
                postData[this.name].push(this.value || null);
            } else {
                postData[this.name] = this.value || null;
            }
        });
        postData['detail'] = content.getData();
        postData['coverPicture'] = '';
        if(ajaxType === 'put') {
            postData['id'] = id
        }
        var json = {
            "params": postData
        }
        $.ajax({
            url: url,
            type: ajaxType,
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(json),
            success: function (res) {
                layer.closeAll();
                if(ajaxType === 'post') {} else {
                    if(res.success === true) {
                        layer.msg("修改成功");
                    }
                }
            }
        })
    }
    function initPage() {
        content = CKEDITOR.replace('content', {
            filebrowserImageUploadUrl:'/adjuncts/ckeditor/file_upload',
            resize_enabled : true,
            autoUpdateElement : true,
            height:200,
            toolbarCanCollapse: false,
            toolbarStartupExpanded:false
        })
        id=getIds()
        if(!!id) {
            ajaxType = 'put';
            getArticleDetail()
        }
        formValidator();
    }
    //获取文章详情
    function getArticleDetail() {
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
        $('#tagid').val(data.tagid);
        $('#introduction').val(data.introduction);
        content.setData(data.content);
    }
    //获取页面id参数
    function getIds() {
        var urlStr = window.location.search;
        if(!urlStr) { return null}
        return urlStr.split('=')[1];
    }
    //表单验证
    function formValidator() {
        $form.bootstrapValidator({
            message: '这个值无效',
            feedbackIcons: {/*输入框不同状态，显示图片的样式*/
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            excluded: [':disabled', ':hidden', 'select']
        })
    }
})
//触发上传
function upLoading(selector){
    $(selector).click();
}