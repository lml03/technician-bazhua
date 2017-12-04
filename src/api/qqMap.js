module.exports = function (args) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = "http://map.qq.com/api/js?v=2.exp";
    document.head.appendChild(script);
};

