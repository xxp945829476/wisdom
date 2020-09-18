export function launchFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen()
  };
} //全屏

export function exitfullscreen(element) {
  if (element.exitFullscreen) {
    element.exitFullscreen();
  } else if (element.mozCancelFullScreen) {
    element.mozCancelFullScreen();
  } else if (element.webkitCancelFullScreen) {
    element.webkitCancelFullScreen();
  } else if (element.msExitFullscreen) {
    element.msExitFullscreen();
  }
} //退出全屏

export function isJSON(str) {
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }

    } catch (e) {
      console.log('error：' + str + '!!!' + e);
      return false;
    }
  }
} //判断字符串是否是json



/**
 * 将一维的扁平数组转换为多层级对象
 * @param  {[type]} list 一维数组，数组中每一个元素需包含id和superiorId两个属性 
 * @return {[type]} tree 多层级树状结构
 */



export function buildTree(list) {
  let temp = {};
  let tree = [];
  for (let i in list) {
    temp[list[i].id] = list[i];
  };

  for (let i in temp) {
    if (parseInt(temp[i].pid)) {
        if (!temp[temp[i].pid].children) {
          temp[temp[i].pid].children = [];
        };
        temp[temp[i].pid].children.push(temp[i]);
    } else {
      tree.push(temp[i]);
    };
  }
  return tree;
}

export function buildAreaTree(list) {
  let temp = {};
  let tree = [];
  for (let i in list) {
    temp[list[i].areaId] = list[i];
  }
  for (let i in temp) {
    if (parseInt(temp[i].pid)) {
      if (!temp[temp[i].pid].children) {
        temp[temp[i].pid].children = [];
      }
      temp[temp[i].pid].children.push(temp[i]);
    } else {
      tree.push(temp[i]);
    }
  }
  return tree;
}

// 文件流转化为bob

export function getBobimg(data) {
  let blob = new Blob([data]);
  let url = window.URL.createObjectURL(blob);
  return url
}