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
    $(document).on('change','input[type="file"]',function (e) {
        e.stopPropagation();
        var fileList = $(this).get(0).files;
        if($('.file-item').length === 1) {
            layer.msg('仅能上传一张封面图');
        }
        if(fileList.length == 0)return ;
        if(fileList[0].type.indexOf("image") < 0) {
            layer.msg("请上传图片格式文件");
            return;
        }
        var target=$(this).parent().find(".file-list");
        var targetInput=$(this).next().children('input');
        var formData = new FormData();
        formData.append('upload',fileList[0]);
        var xhr = getRequestObject();
        xhr.onload = function () {
            var data=JSON.parse(xhr.responseText);
            if(xhr.status===200){
                var iconSrc = '/static/main/backend/assets/photo.png';
                target.append('<div class="file-item" data-url="'+data.url+'"><img class="file-icon pull-left" src="' + iconSrc + '"/><div class="file-name" title="' + data.fileName + '" data-url="'+data.url+'">' + data.fileName + '</div><i class="icon-remove-sign pull-right file-remove" title="删除"></i></div>');
                targetInput.val("已选择"+target.children('.file-item').length+"个文件");
                target.next().hide();
            }else{
                layer.msg('文件上传失败');
            }
        }
    //    上传加载
        xhr.upload.onprogress= function(event) {
            if(event.lengthComputable) {
                var percentComplete = event.loaded / event.total;
                if(parseInt(percentComplete*100) === 100) {
                    // 进度条消失显示
                    target.next().hide();
                } else {
                    target.next().show();
                    target.next().find('.progress-bar').first().css('width', parseInt(percentComplete*100)+'%')
                }
            } else {
                // Unable to compute progress information since the total size is unknown.
            }
        }
        // 打开链接
        xhr.open('POST', '/adjuncts/ckeditor/file_upload', true);
        // 发送请求
        xhr.send(formData);
    }).on('click','.file-remove',function (e) {
        e.stopPropagation();
        var $self = $(this);
        layer.confirm('你确定删除该文件',{
            btn:['确定','取消']
        },function(){
            var fileListDom=$self.parent();
            var inputDom=fileListDom.parents('.file-content').prev('.input-group').children('input[type="text"]');
            fileListDom.remove();
            inputDom.val('');
            layer.closeAll();
        },function () {
            layer.closeAll();
        });
    })
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
        postData['tagid'] = parseInt(postData['tagid']);
        postData['coverPicture'] = $('.file-item').eq(0).data('url');
        console.log(postData);
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
                if(ajaxType === 'post') {
                    if(res.success === true) {
                        var index = parent.layer.getFrameIndex(window.name)
                        parent.layer.close(index);
                        parent.refreshAndShowMessage('添加成功');
                    }
                } else {
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
//xmlhttprequest初始化
function getRequestObject(){
    var xhr=null;
    if(window.XMLHttpRequest){
        try{
            xhr = new XMLHttpRequest();
        }catch(e){
            xhr=null;
        }
    }else if(window.ActiveXObject){
        try{
            xhr=new ActiveXObject('Microsoft.XMLHTTP');
        }catch(e){
            try{
                xhr=new ActiveXObject('Msxml2.XMLHTTP');
            }catch(e){
                xhr=null;
            }
        }
    }
    return xhr;
}