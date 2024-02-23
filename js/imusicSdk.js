const createEventHub = () => ({
  hub: Object.create(null),
  emit(event, data) {
    (this.hub[event] || []).forEach(handler => handler(data));
  },
  on(event, handler) {
    if (!this.hub[event]) this.hub[event] = [];
    this.hub[event].push(handler);
  },
  off(event, handler) {
    const i = (this.hub[event] || []).findIndex(h => h === handler);
    if (i > -1) this.hub[event].splice(i, 1);
    if (this.hub[event].length === 0) delete this.hub[event];
  }
});

var callbackFun;
var mlSdk = {
  hub: createEventHub(),
  init: function(phone){
    var div1 = document.createElement("div");
    // 设置一级div的id属性
    div1.id = "imusicTag";
    // 设置一级div的样式
    div1.style.background = 'rgba(0, 0, 0, 0.6)'
    div1.style.position = "fixed"
    div1.style.zIndex = 1000
    div1.style.left = '0px'
    div1.style.top = '0px'
    div1.style.display = 'block'
    div1.style['-webkit-box-align'] = 'center'
    div1.style.alignItems = 'center'
    div1.style.width = '100%'
    div1.style.height = '100%'
    div1.style.overflowY = 'scroll'
    // 设置二级子div的样式
    var div2 = document.createElement("div")
    div2.style.width = '100%'
    div2.style.display = '-webkit-box'
    div2.style.display = '-ms-flexbox'
    div2.style.display = '-webkit-flex'
    div2.style['-webkit-box-pack'] = 'center'
    div2.style['-ms-flex-pack'] = 'center'
    div2.style['-webkit-justify-conten'] = 'center'
    div2.style['-moz-justify-content'] = 'center'
    div2.style.justifyContent = 'center'
    div2.style.textAlign = 'center'
    div2.style.height = '100%'
    // 将iframe添加到二级div
    div2.appendChild(this.innerCreateFrame(phone))
    // 将二级div添加到一级div
    div1.appendChild(div2)
    // 将新创建的一级div添加到body中
    document.body.appendChild(div1)
  },
  innerCreateFrame: function(phone){
    var iframe = document.createElement("iframe");
    // 设置iframe的属性
    iframe.src = `http://127.0.0.1:8080/imusic.html?phone=${phone}`;
    iframe.name = "imusic_frame";
    iframe.style.position = "absolute";
    iframe.style.top = 0;
    iframe.style.left = 0;
    iframe.style.border = 0;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    return iframe
  },
  login: function(userName,password) {
    var data  = {
      param: {userName: userName, password: password},
      funName: "LOGIN"
    }
  },
  getUserName: function(phone, callback) {
    setTimeout(()=>{
      callback(phone + '哈哈哈')
    },1000)
  },
}
// 监听返回
window.addEventListener('message', function(messageEvent) {
  switch (messageEvent.data.funName) {
    case 'close':
    document.body.removeChild(document.getElementById("imusicTag"))
    mlSdk.hub.emit('close',{a:1, b:2})
      break;
    default:
      break;
  }
  // console.log(messageEvent)
  // if('function' == typeof(callbackFun)){
  //   console.log('callbackFun',callbackFun)
  //   callbackFun(messageEvent.data);
  //   callbackFun='';//回调完销毁
  // }
});
