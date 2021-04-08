/**
 *
 * @param {String} title 标题
 * @param {String} body 内容
 * @param {Function} fun 点击方法
 */
const notification = (title, body, fun) => {
  if (!("Notification" in window)) {
    console.log("不支持通知!");
  }

  // 检查用户是否同意接受通知
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    let a = new Notification(title, {
      body: body
    });
    a.onclick = () => {
      if (fun) fun();
    };
  }

  // 否则我们需要向用户获取权限
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function(permission) {
      // 如果用户同意，就可以向他们发送通知
      if (permission === "granted") {
        new Notification(title, {
          body: body
        });
      }
    });
  }
};

export default notification;
