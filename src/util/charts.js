/*
 * @Author: Yangliwei
 * @Date: 2020-06-04 17:21:12
 * @LastEditTime: 2020-06-22 19:16:32
 * @LastEditors: Yangliwei
 * @FilePath: \express_platform_h5\src\util\charts.js
 * @Just Think
 * @Description:图表
 */
import { Chart } from "@antv/g2";
//横向柱状图
export const chartBar = (data, eleId) => {
  const chart = new Chart({
    container: eleId,
    autoFit: true,
    padding: [10, 50, 20, 50]
  });
  chart.data(data);
  chart.coordinate().transpose(); //翻转
  chart
    .interval()
    .position("time*value")
    .color("time", ["#9A61F7", "#FFD561", "#FF5A84", "#00C2AD", "#00B1FE"])
    .label("value", {
      style: {
        fill: "#8d8d8d"
      },
      offset: 10
    });
  //隐藏图例
  chart.legend(false);
  chart.render();
};
//圆形
export const roundChart = (data, eleId, center) => {
  const chart = new Chart({
    container: eleId,
    autoFit: true,
    padding: [10, 10, 20, 30]
  });
  chart.tooltip({
    showTitle: false,
    showMarkers: false
  });
  chart.data(data);
  //圆形
  chart.coordinate("theta", {
    radius: 0.75,
    innerRadius: 0.6
  });
  chart.annotation().text({
    position: ["50%", "50%"],
    content: center,
    style: {
      fill: "#262626",
      textAlign: "center"
    }
  });
  chart.legend(false);
  chart
    .interval()
    .adjust("stack")
    .position("value")
    .color("time", ["#9A61F7", "#FFD561", "#FF5A84", "#00C2AD", "#00B1FE"])
    .size(10)
    .label("value", value => {
      return {
        content: data => {
          return `${data.time}: ${value}`;
        }
      };
    });
  //高亮
  chart.interaction("element-highlight");
  chart.render();
};
//竖向柱状图
export const VerticalChartBar = (data, eleId) => {
  const chart = new Chart({
    container: eleId,
    autoFit: true,
    padding: [10, 10, 20, 50]
  });
  chart.data(data);
  chart.legend(false);
  chart
    .interval()
    .position("time*value")
    .color("time", ["#9A61F7", "#FFD561", "#FF5A84", "#00C2AD", "#00B1FE"]);
  chart.render();
};
//折线图
export const chartLine = (data, eleId) => {
  const chart = new Chart({
    container: eleId,
    autoFit: true,
    padding: [20, 20, 20, 30]
  });
  chart.data(data);
  chart.scale({
    time: {
      range: [0, 1]
    },
    value: {
      min: 0,
      nice: true
    }
  });
  chart
    .line()
    .position("time*value")
    .label("value")
    .shape("smooth");
  chart.point().position("time*value");
  chart.render();
};
