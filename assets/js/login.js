$(function () {
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  layui.form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (pwd2) {
      // 获取密码框的密码
      let pwd1 = $(".reg-box [name=password]").val();
      // 判断2个密码是否相同
      if (pwd1 != pwd2) return "两次密码好像不一样噢";
    },
  });
  // 监听注册表单的提交事件
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    let dataStr = $(this).serialize();
    $.ajax({
      method: "post",
      url: "/api/reguser",
      data: dataStr,
      success(res) {
        if (res.status != 0) return layui.layer.msg(res.message);
        layui.layer.msg(res.message);
        let uname = $(".reg-box [name=username]").val().trim();
        $(".login-box [name=username]").val(uname);
        let upwd = $(".reg-box [name=password]").val().trim();
        $(".login-box [name=password]").val(upwd);
        $("#form_reg")[0].reset();
        $("#link_login").click();
      },
    });
  });

  $("#form_login").submit(function (e) {
    e.preventDefault();
    let dataStr = $(this).serialize();
    $.ajax({
      method: "post",
      url: "/api/login",
      data: dataStr,
      success(res) {
        if (res.status != 0) return layui.layer.msg(res.message);
        layui.layer.msg(
          res.message,
          {
            icon: 6,
            time: 1500,
          },
          function () {
            localStorage.setItem("token", res.token);
            location.href = "index.html";
          }
        );
      },
    });
  });
  $(".login-box [name=username]").val("xiaofeizi");
  $(".login-box [name=password]").val(123456);
});
