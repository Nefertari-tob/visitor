/*
 * @Author: Yangliwei
 * @Date: 2020-05-26 16:01:54
 * @LastEditTime: 2020-06-15 16:12:16
 * @LastEditors: Yangliwei
 * @FilePath: \express_platform_h5\src\mixin\page.js
 * @Just Think
 * @Description:
 */

export default {
  data() {
    return {
      pagination: {
        showQuickJumper: true,
        showTotal: total => {
          return this.$t("system.totalText", {
            msg: total
          });
        },
        current: 1, //初始页
        pageSize: 10, //分页大小
        total: 0 //数据总数
      }
    };
  },
  methods: {
    //清除分页,获取数据
    cleanPageGetdata() {
      this.pagination.current = 1;
      this.getData();
    },
    //改变页码
    tableChangePage(pagination) {
      this.pagination = { ...pagination };
      //获取数据
      this.getData();
    }
  }
};
