require.config({
    baseUrl:'../../js/video',
    paths: {
        bootstrap:"../../plugs/js/bootstrap.min",
        jquery:"../../plugs/js/jquery",
        hls:"https://cdn.jsdelivr.net/hls.js/latest/hls.min"
    }
});
var serverurl="http://192.168.1.10:8080";
var plugs=[
    'jquery',
    'bootstrap'
];
var routeurl={
    index:'./index',
    videoList:'./videoList',
    video:'./video'
}