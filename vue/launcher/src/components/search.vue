<template>
  <div id="page-search" class="page-main" tabIndex="-1">
    <h2 class="search-input">Search</h2>
    <div class="search_select" data-id="select" data-bottom=".inputBox" data-type="ytb">
        <ul>
            <li data-id="ytb"><a><img src="../img/a1.png"></a></li>
            <li data-id="megogo" data-supid="10049"><a><img src="../img/megogo.png"></a></li>
            <li data-id="ivi" data-supid="10011"><a><img src="../img/app-ivi.png"></a></li>
            <li data-id="yupptv" data-supid="10086"><a><img src="../img/yupptv-icon.png"></a></li>
            <li data-id="erosnow" data-supid="megogo"><a><img src="../img/erosnow-icon.png"></a></li>
            <li data-id="hungama" data-supid="megogo"><a><img src="../img/Hungama-icon.png"></a></li>
        </ul>
    </div>
    <div class="inputs" data-top=".search_select li" data-bottom="#recommendList li|.search_result li">
        <div>
        <div id="inputBox" class="inputBox"><i style="background-image: url(../img/a1.png);" class="icon_select"></i><input type="text"><span id="searchIcon" class="iconfont">&#Xe61b;</span></div>
        </div>
    </div>
    <div class="search-suggest" data-id="suggest">
      <ul  id="recommendList">
          <!-- <li></li> -->
      </ul>
    </div>
    <!--点击推荐或搜索  出来的资源 -->
    <div class="search_result" data-id="result">
        <ul>
        </ul>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {}
    }
}
</script>

