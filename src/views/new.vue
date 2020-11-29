<template>
    <div class="new">
        <tab_bar v-bind:id="0"></tab_bar>
        <div class="list">
            <ul>
                <li v-for="(item,index) in albummidArray" :key="index+''" @click="list_song_click(item)">
                    <div class="border_div">
                        <img class="albummid_img" :src="getImgUrl(item.albummid)" alt="">
                    </div>
                    <span class="overflow_span">{{item.albumname}}</span>
                </li>
            </ul>

        </div>
        <aplayer  :music="videoUpload.music" :autoplay='true' ref="player"></aplayer>
    </div>
</template>

<script>
    import $ from 'jquery';
    import tabbar from '@/components/tabbar.vue';
    import aplayer from 'vue-aplayer'

    export default {
        name: "new",
        components: {
            'tab_bar': tabbar,
            'aplayer': aplayer,
        },
        data() {
            return {
                // autoplay:true,
                music_data: [],
                singer_name: '',
                albummidArray: [], //最新图片数组
                songmidArray: [],//最新歌曲源数组
                playArray: [],//当前播放的歌曲数组
                videoUpload: {
                    // theme: '#ffc0cb',
                    // autoplay: true,
                    repeat: 'repeat-one', // 轮播模式。值可以是 'repeat-one'（单曲循环）'repeat-all'（列表循环）或者 'no-repeat'（不循环）。为了好记，还可以使用对应的 'music' 'list' 'none'
                    mini: false, // 迷你模式
                    float: true, // 浮动模式。你可以在页面上随意拖放你的播放器
                    music: { // 当前播放的音乐
                        title: '能够成家吗',
                        author: '咖啡少年',
                        url: "http://ws.stream.qqmusic.qq.com/C400003iLxI62ZrITK.m4a?guid=358840384&vkey=C093AC3BECFB422C3E164F46111C7C93B800061D5F6D55123D33E0324E0AAFA811C68FAD254A0E712B33AF5E46CD7600723D77F44B6F9575&uin=0&fromtag=66",
                        pic: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2366432289,1795558543&fm=26&gp=0.jpg' // 封面图片
                    }
                },
            }
        },
        mounted() {
            var that = this
            $(document).ready(() => {
                let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923';
                $.ajax({
                    url: url,
                    type: "get",
                    dataType: 'jsonp',
                    jsonp: "jsonpCallback",
                    scriptCharset: 'GBK',//解决中文乱码
                    success: (data) => {
                        localStorage.setItem('songlist', JSON.stringify(data.songlist)) //储存最新歌单的歌曲
                        // console.log(JSON.parse(localStorage.getItem('songlist'))[0].data.albumname);
                        this.$nextTick(() => {
                            this.music_data = []
                            this.music_data.push(JSON.parse(localStorage.getItem('songlist'))[0])
                            var arrays = []
                            // console.log(this.music_data[0].data.singer);
                            if (this.music_data[0].data.singer.length > 1) {
                                for (let i = 0; i < this.music_data[0].data.singer.length; i++) {
                                    var not_last = this.music_data[0].data.singer[i].name + ' / '
                                    arrays.push(not_last)
                                }
                                arrays.push(arrays.pop().replace(/[ / ]/g, ''))
                                for (let j = 0; j < arrays.length; j++) {
                                    this.singer_name += arrays[j]
                                }
                            } else {
                                this.singer_name = this.music_data[0].data.singer[0].name
                            }
                            // console.log(this.music_data[0].data.albummid );
                            this.videoUpload.music.title = JSON.parse(localStorage.getItem('songlist'))[0].data.albumname
                            this.videoUpload.music.author = this.singer_name
                            this.videoUpload.music.pic = 'http://y.gtimg.cn/music/photo_new/T002R180x180M000' + JSON.parse(localStorage.getItem('songlist'))[0].data.albummid + '.jpg'
                            let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?format=json&data=%7B%22req_0%22%3A%7B%22module%22%3A%22vkey.GetVkeyServer%22%2C%22method%22%3A%22CgiGetVkey%22%2C%22param%22%3A%7B%22guid%22%3A%22358840384%22%2C%22songmid%22%3A%5B%22' + that.albummidArray[0].songmid + '%22%5D%2C%22songtype%22%3A%5B0%5D%2C%22uin%22%3A%221443481947%22%2C%22loginflag%22%3A1%2C%22platform%22%3A%2220%22%7D%7D%2C%22comm%22%3A%7B%22uin%22%3A%2218585073516%22%2C%22format%22%3A%22json%22%2C%22ct%22%3A24%2C%22cv%22%3A0%7D%7D'
                            $.ajax({
                                url: url,
                                type: "get",
                                dataType: 'jsonp',
                                jsonp: "callback",
                                jsonpCallback: "callback",
                                scriptCharset: 'GBK',//解决中文乱码
                                success: (res) => {
                                    var data = {};
                                    data.sip = res.req_0.data.sip
                                    data.purl = res.req_0.data.midurlinfo[0].purl
                                    // this.playArray.push(data)
                                    localStorage.setItem('playArray', JSON.stringify(data)) //储存播放地址
                                },
                                error: function (error) {
                                    console.log(error);
                                }
                            })
                            this.videoUpload.music.url = JSON.parse(localStorage.getItem('playArray')).sip[0] + JSON.parse(localStorage.getItem('playArray')).purl

                        })
                        // 图片路径
                        for (let i = 0; i < data.songlist.length; i++) {
                            var res = {};
                            res.albummid = data.songlist[i].data.albummid
                            res.songmid = data.songlist[i].data.songmid
                            res.albumname = data.songlist[i].data.albumname
                            res.albumid = data.songlist[i].data.albumid
                            res.singer = data.songlist[i].data.singer
                            that.albummidArray.push(res)
                        }
                        // 歌曲源路径
                        for (let j = 0; j < data.songlist.length; j++) {
                            that.songmidArray.push(data.songlist[j].data.songmid)
                        }
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            });
        },
        methods: {
            //点击最新里面的每一项歌曲
            list_song_click(music_data) {
                console.log(music_data);
                this.videoUpload.music.url = ''
                let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?format=json&data=%7B%22req_0%22%3A%7B%22module%22%3A%22vkey.GetVkeyServer%22%2C%22method%22%3A%22CgiGetVkey%22%2C%22param%22%3A%7B%22guid%22%3A%22358840384%22%2C%22songmid%22%3A%5B%22' + music_data.songmid + '%22%5D%2C%22songtype%22%3A%5B0%5D%2C%22uin%22%3A%221443481947%22%2C%22loginflag%22%3A1%2C%22platform%22%3A%2220%22%7D%7D%2C%22comm%22%3A%7B%22uin%22%3A%2218585073516%22%2C%22format%22%3A%22json%22%2C%22ct%22%3A24%2C%22cv%22%3A0%7D%7D'
                $.ajax({
                    url: url,
                    type: "get",
                    dataType: 'jsonp',
                    jsonp: "callback",
                    jsonpCallback: "callback",
                    scriptCharset: 'GBK',//解决中文乱码
                    success: (res) => {
                        // console.log(res);
                        var data = {};
                        data.sip = res.req_0.data.sip
                        data.purl = res.req_0.data.midurlinfo[0].purl
                        // this.playArray.push(data)
                        localStorage.setItem('playArray1', JSON.stringify(data)) //储存播放地址
                        JSON.parse(localStorage.getItem('playArray1'))
                        localStorage.setItem('every_music_data', JSON.stringify(music_data)) //点击播放音乐的一些值
                        // this.$router.push({path:'/play'})
                        var arrays = []

                        if (music_data.singer.length > 1) {
                            this.singer_name = ''
                            for (let i = 0; i < music_data.singer.length; i++) {
                                var not_last = music_data.singer[i].name + ' / '
                                arrays.push(not_last)
                            }
                            arrays.push(arrays.pop().replace(/[ / ]/g, ''))
                            for (let j = 0; j < arrays.length; j++) {
                                this.singer_name += arrays[j]
                            }
                        } else {
                            this.singer_name = music_data.singer[0].name
                        }
                        this.videoUpload.music = {
                            title: music_data.albumname,
                            author: this.singer_name,
                            url: JSON.parse(localStorage.getItem('playArray1')).sip[0] + JSON.parse(localStorage.getItem('playArray1')).purl,
                            pic: 'http://y.gtimg.cn/music/photo_new/T002R180x180M000' + music_data.albummid + '.jpg'
                        }
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
                // this.videoUpload.music.title = music_data.albumname

                // $('audio')[0].src = JSON.parse(localStorage.getItem('playArray')).sip[0] + JSON.parse(localStorage.getItem('playArray')).purl


                // console.log(JSON.parse(localStorage.getItem('playArray')).sip[0] + JSON.parse(localStorage.getItem('playArray')).purl)
                // this.autoplay = false
                // setTimeout(()=>{
                    this.autoplay = true
                // })
                // console.log(JSON.parse(localStorage.getItem('playArray')).sip[0] + JSON.parse(localStorage.getItem('playArray')).purl);
            },
            // 图片路径
            getImgUrl(icon) {
                return "http://y.gtimg.cn/music/photo_new/T002R180x180M000" + icon + ".jpg"
            },
        }
    }
</script>

<style scoped>
    .new {
        margin-top: 1.4rem;
        margin-bottom: 1.8rem;
    }

    .list ul {
        font-size: 0.4rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0.313rem 0.313rem 0 0.313rem;
    }

    .list ul li {
        display: flex;
        flex-direction: column;
        margin-bottom: 0.5rem;
    }

    .list ul li .border_div {
        width: 2.667rem;
        height: 2.667rem;
        border-radius: 0.267rem;
        overflow: hidden;
        margin-bottom: 0.2rem;
    }

    .list ul li .albummid_img {
        width: 2.667rem;
        height: 2.667rem;
    }

    .list ul li .overflow_span {
        display: inline-block;
        width: 2.667rem;
        white-space: nowrap; /*不允许换行*/
        overflow: hidden; /*超出隐藏*/
        text-overflow: ellipsis; /*文本超出三点代替*/
        text-align: center;
        font-size: 0.5rem;
    }

    .aplayer {
        margin: 0 !important;
        background-color: skyblue;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1.8rem;
    }
</style>
