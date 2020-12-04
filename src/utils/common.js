import Vue from "vue";
import { Message, MessageBox } from 'element-ui'
Vue.prototype.confirm = (text = '此操作将永久删除此数据, 是否继续?', type = 'warning') => MessageBox.confirm(text, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: type,
});


Vue.prototype.$message = Message  //提示弹框
Vue.prototype.message = (type = "error", str = "请求超时") => Message({
    message: str,
    type: type,
});