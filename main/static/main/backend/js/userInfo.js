/**
 * Created by yjq on 2018/10/14.
 */
$(function () {
    var $save = $('#save');
    var $form = $('#newForm');
    getUserInfo();
    function getUserInfo() {
        $.ajax({
            url:'/user/info',
            type: 'get',
            success: function (res) {
                var data = res.data
                $('.user-avatar').attr('src',data.avatar_url);
                $('#avatar').val(data.avatar_url);
                $('#domain_name').val(data.domain_name);
                $('#nick').val(data.nick);
                $('#qq').val(data.qq);
                $('#weibo').val(data.weibo);
                $('#wechat').val(data.wechat);
                $('#introduction').val(data.introduction);
            }
        })
    }
    formValidator();
    $(document).on('change','input[type="file"]',function (e) {
        e.stopPropagation();
        var fileList = $(this).get(0).files;
        if(fileList.length == 0)return ;
        if(fileList[0].type.indexOf("image") < 0) {
            layer.msg("请上传图片格式文件");
            return;
        }
        var formData = new FormData();
        formData.append('file',fileList[0]);
        var xhr = getRequestObject();
        xhr.onload = function () {
            var data=JSON.parse(xhr.responseText);
            if(xhr.status===200){
                $('.user-avatar').attr('src',data.data);
                $('#avatar').val(data.data);
            }else{
                layer.msg('文件上传失败');
            }
        }
    //    上传加载
        xhr.upload.onprogress= function(event) {

        }
        // 打开链接
        xhr.open('POST', '/user/upload_avatar', true);
        // 发送请求
        xhr.send(formData);
    })
    $save.on('click',submitForm);
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
        console.log(postData);
        var json = {
            "params": postData
        }
        $.ajax({
            url: '/user/info',
            type: 'PUT',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(json),
            success: function (res) {
                layer.closeAll();
                layer.msg("修改成功");
            }
        })
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