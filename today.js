$(function () {
  //一:在按下回车键把title表单的完整数据存储到本地储存里面
  //本地数据存储格式 var todaylist=[{title:"xxx",done:false}]
  load();
  $(".btn-success").on("click", function () {
    if ($("input").val() !== "") {
      var local = getDate(); //获取本地的数据
      //把data数组进行数据更新，根据表单内容追加给data数组
      local.push({ title: $("input").val(), done: false });
      //把新的数组存到本地存储
      saveDate(local);
      //渲染到页面
      load();
      $("input").val("");
    } else {
      alert("请输入今天的目标！");
    }
  });
  //   $("#title").on("keydown", function (event) {
  //     //判断是否是回车键被按下
  //     if (event.keyCode === 13) {
  //       var local = getDate(); //获取本地的数据
  //       // console.log(local);
  //       // console.log(typeof local);//object
  //       //把data数组进行数据更新，根据表单内容追加给data数组
  //       local.push({ title: $(this).val(), done: false });
  //       //把新的数组存到本地存储
  //       saveDate(local);
  //       //渲染到页面
  //       load();
  //       $(this).val("");
  //     }
  // });

  //二:点击删除会删除本地存储的数据
  $("ol,ul").on("click", "a", function () {
    /* 
    先获取本地存储
    然后获取点击的a进行本地存储数据删除
    然后保存到本地储存
    重新渲染页面
    */
    var data = getDate();
    // console.log(data);
    var index = $(this).attr("id"); //获取点击的a的id进行索引标记
    // console.log(index);
    data.splice(index, 1); //从索引号开始的位置删除一个
    saveDate(data);
    load();
  });

  // 三:正在完成和已经完成操作
  /* 
     复选框被选中则已经完成,没选中则在正在完成中
     通过复选框状态修改对应数据属性done的值
  */
  $("ol,ul").on("click", "input", function () {
    /* 
    先获取本地存储
    然后修改数据
    然后保存到本地储存
    重新渲染页面,done为ture放ul,为false放ol
    */
    var data = getDate();
    var index = $(this).siblings("a").attr("id"); //借助兄弟a的id
    // console.log(index);
    data[index].done = $(this).prop("checked");
    // console.log(data);
    saveDate(data);
    load(data);
  });

  //:创建一个函数,读取本地存储数据
  function getDate() {
    var data = localStorage.getItem("todolist");
    // console.log(JSON.parse(data));
    if (data !== null) {
      //取出数据,本地存储的是字符串格式，但需要对象格式
      data = JSON.parse(data);
      return data;
    } else {
      return [];
    }
  }
  //:创建一个函数,保存本地存储数据
  function saveDate(data) {
    localStorage.setItem("todolist", JSON.stringify(data)); //往本地储存数据需要存储字符串格式
  }
  //创建一个函数,渲染到页面，首先要拿到数据
  function load() {
    var data = getDate(); //读取本地数据,是一个数组
    // console.log(data);
    // 由于页面加载和按下回车键都会调用渲染函数，所以会重复渲染本地存储的内容
    // 所以需要在调用前清除掉ol和ul内容
    $("ol,ul").empty();
    var todoCount = 0; //正在进行的个数
    var doneCount = 0; //已经完成的个数
    //遍历数据
    $.each(data, function (i, n) {
      //i是索引,n是数据
      // console.log(n);
      //然后ol中生成li
      if (n.done) {
        $("ul").prepend(
          "<li><input type='checkbox' checked='checked'><p>" +
            n.title +
            "</p><a href='javascript:;' id=" + //给每个动态生成的a编号
            i +
            ">删除</a></li>"
        );
        doneCount++;
      } else {
        $("ol").prepend(
          "<li><input type='checkbox'><p>" +
            n.title +
            "</p><a href='javascript:;' id=" + //给每个动态生成的a编号
            i +
            ">删除</a></li>"
        );
        todoCount++;
      }
    });
    $("#todocount").text(todoCount);
    $("#donecount").text(doneCount);
  }
});
