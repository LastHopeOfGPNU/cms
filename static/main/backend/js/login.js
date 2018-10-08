var stack_bottomright = {"dir1": "up", "dir2": "left", "firstpos1": 25, "firstpos2": 25};
var $loginBtn = $('#login-btn');
var $accountInput = $('#account-input');
var $passwordInput = $('#password-input');
$(function () {
    $accountInput.bind('keydown', enterSubmit);
    $passwordInput.bind('keydown', enterSubmit);
    $loginBtn.bind('click', formSubmit);
});

function enterSubmit(ev) {
    if(ev.keyCode == 13){
        formSubmit(ev);
    }
}

function formSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    var username = $accountInput.val();
    var password = $passwordInput.val();
    // 判空
    if(username === '') {
        showMessage('账号不能为空！', '#account-input', 1);
        return;
    } else if(password === '') {
        showMessage('密码不能为空！', '#password-input', 1);
        return;
    }
    var postData = {
        username: username,
        password: password
    }
    $.ajax({
        type:'post',
        url:'users/login/',
        contentType:'application/x-www-form-urlencoded',
        dataType:'json',
        data: postData,
        success:function(res){
            switch(res.success){
                case 'false':
                    new PNotify({
                        title: '登录失败',
                        text: res.msg,
                        type: 'error',
                        delay: 3000,
                        addclass: "stack-bottomright",
                        stack: stack_bottomright
                    });
                    break;
                case 'true':
                    if(res.data.user_info.identity == '3' || res.data.user_info.identity == '4'){
                        new PNotify({
                            title: '登录成功',
                            text: res.msg,
                            type: 'success',
                            delay: 3000,
                            addclass: "stack-bottomright",
                            stack: stack_bottomright
                        });
                        sessionStorage.setItem("uid", res.data.user_info.uid);
                        sessionStorage.setItem("nick", res.data.user_info.nick);
                        sessionStorage.setItem("identity", res.data.user_info.identity);
                        window.location.href = '/mgr_index';
                    } else {
                        new PNotify({
                            title: '登录失败',
                            text: '该账号非管理员',
                            type: 'error',
                            delay: 3000,
                            addclass: "stack-bottomright",
                            stack: stack_bottomright
                        });
                    }
                    break;
            }
        },error:function(XMLHttpRequest, textStatus, errorThrown){
            new PNotify({
                title: '登录失败',
                text: '服务器内部出错，或网络出错！',
                type: 'error',
                delay: 3000,
                addclass: "stack-bottomright",
                stack: stack_bottomright
            });
        }
    });
}
// 不能为空的提示
function showMessage(msg, selector, type) {
    layer.tips(msg, selector, {
        tips: type
    });
}
