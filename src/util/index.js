// 生成websocket uid
let guid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// 获取图片的getBase64
let getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

let surprise = () => {
  // eslint-disable-next-line no-console
  console.log(
    [
      `%c
██╗   ██╗ █████╗  ██████╗ ███████╗███████╗██╗  ██╗███████╗     ██╗██╗
╚██╗ ██╔╝██╔══██╗██╔═══██╗██╔════╝██╔════╝██║ ██╔╝██╔════╝     ██║██║
 ╚████╔╝ ███████║██║   ██║███████╗█████╗  █████╔╝ █████╗       ██║██║
  ╚██╔╝  ██╔══██║██║   ██║╚════██║██╔══╝  ██╔═██╗ ██╔══╝  ██   ██║██║
   ██║   ██║  ██║╚██████╔╝███████║███████╗██║  ██╗███████╗╚█████╔╝██║
   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝ ╚════╝ ╚═╝`
    ].join("\n"),
    "color: #008cff;font-size: 20px"
  );
};

// 下载
let downloadFile = url => {
  const iframe = document.createElement("iframe");
  iframe.style.display = "none"; // 防止影响页面
  iframe.style.height = 0; // 防止影响页面
  iframe.src = url;
  document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
  // 1分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
  setTimeout(() => {
    iframe.remove();
  }, 60 * 1000);
};
//获取文件大小
function getfilesize(size) {
  if (!size) return "";

  var num = 1024.0; //byte

  if (size < num) return size + "B";
  if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + "K"; //kb
  if (size < Math.pow(num, 3))
    return (size / Math.pow(num, 2)).toFixed(2) + "M"; //M
  if (size < Math.pow(num, 4))
    return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
  return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
}
export { guid, getBase64, surprise, downloadFile, getfilesize };

export function checkId(id) {
  // 1 "验证通过!", 0 //校验不通过 // id为身份证号码
  var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
  //号码规则校验
  if (!format.test(id)) {
    return { status: 0, msg: "身份证号码不合规" };
  }
  //区位码校验
  //出生年月日校验  前正则限制起始年份为1900;
  var year = id.substr(6, 4), //身份证年
    month = id.substr(10, 2), //身份证月
    date = id.substr(12, 2), //身份证日
    time = Date.parse(month + "-" + date + "-" + year), //身份证日期时间戳date
    now_time = Date.parse(new Date()), //当前时间戳
    dates = new Date(year, month, 0).getDate(); //身份证当月天数
  if (time > now_time || date > dates) {
    return { status: 0, msg: "出生日期不合规" };
  }
  //校验码判断
  var c = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //系数
  var b = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"); //校验码对照表
  var id_array = id.split("");
  var sum = 0;
  for (var k = 0; k < 17; k++) {
    sum += parseInt(id_array[k]) * parseInt(c[k]);
  }
  if (id_array[17].toUpperCase() != b[sum % 11].toUpperCase()) {
    return { status: 0, msg: "身份证校验码不合规" };
  }
  return { status: 1, msg: "校验通过" };
}

/**
 * 对日期进行格式化， yyyy-MM-dd hh:mm:ss
 * @param date 要格式化的日期
 * @param format 进行格式化的模式字符串
 *     支持的模式字母有：
 *     y:年,
 *     M:年中的月份(1-12),
 *     d:月份中的天(1-31),
 *     h:小时(0-23),
 *     m:分(0-59),
 *     s:秒(0-59),
 *     S:毫秒(0-999),
 *     q:季度(1-4)
 * @return String
 * @author yanis.wang
 * @see http://yaniswang.com/frontend/2013/02/16/dateformat-performance/
 */
export function dateFormat(date, format) {
  if (typeof date === "string") {
    var mts = date.match(/(\/Date\((\d+)\)\/)/);
    if (mts && mts.length >= 3) {
      date = parseInt(mts[2]);
    }
  }
  date = new Date(date);
  if (!date || date.toUTCString() == "Invalid Date") {
    return "";
  }
  var map = {
    M: date.getMonth() + 1, //月份
    d: date.getDate(), //日
    h: date.getHours(), //小时
    m: date.getMinutes(), //分
    s: date.getSeconds(), //秒
    q: Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };

  format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
    var v = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = "0" + v;
        v = v.substr(v.length - 2);
      }
      return v;
    } else if (t === "y") {
      return (date.getFullYear() + "").substr(4 - all.length);
    }
    return all;
  });
  return format;
}
