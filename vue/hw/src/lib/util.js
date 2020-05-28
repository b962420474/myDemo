
function getRotate(matrix) {
    var aa = Math.round(180 * Math.asin(matrix[0]) / Math.PI);
    var bb = Math.round(180 * Math.acos(matrix[1]) / Math.PI);
    var cc = Math.round(180 * Math.asin(matrix[2]) / Math.PI);
    var dd = Math.round(180 * Math.acos(matrix[3]) / Math.PI);
    var deg = 0;
    if (aa == bb || -aa == bb) {
        deg = dd;
    } else if (-aa + bb == 180) {
        deg = 180 + cc;
    } else if (aa + bb == 180) {
        deg = 360 - cc || 360 - dd;
    }
    return deg >= 360 ? 0 : deg;

}
export function getTranslate(node, sty) {//获取transform值
    var translates = document.defaultView.getComputedStyle(node, null).webkitTransform.substring(7);
    var result = translates.match(/\(([^)]*)\)/);// 正则()内容
    var matrix = result ? result[1].split(',') : translates.split(',');
    if (sty == "x" || sty == undefined) {
        return matrix.length > 6 ? parseFloat(matrix[12]) : parseFloat(matrix[4]);
    } else if (sty == "y") {
        return matrix.length > 6 ? parseFloat(matrix[13]) : parseFloat(matrix[5]);
    } else if (sty == "z") {
        return matrix.length > 6 ? parseFloat(matrix[14]) : 0;
    } else if (sty == "rotate") {
        return matrix.length > 6 ? getRotate([parseFloat(matrix[0]), parseFloat(matrix[1]), parseFloat(matrix[4]), parseFloat(matrix[5])]) : getRotate(matrix);
    }
}
export function getIndex(elt) {
    return [].indexOf.call(elt.parentNode.querySelectorAll(elt.tagName), elt);
  }
