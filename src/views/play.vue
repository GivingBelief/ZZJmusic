<template>
    <div class="play">
        <div class="main_box">
            <div class="background_img" id="background_img"></div>
            <p class="title_p"><span>{{album_name}}</span></p>
            <p class="singing_name">演唱:&nbsp;&nbsp;<span>{{singer_name}}</span></p>
            <img class="small_img" :src="getImgUrl()" alt="">
            <ul class="lyric_ul">
                <li>天下</li>
                <li class="lyric_li_active">作词: 周毅 作曲: 刘吉宁</li>
                <li>演唱: 张杰</li>
                <!--            <li v-for="(item,index) in lyric">{{item}}</li>-->
            </ul>

            <div class="speed_of_progress">
                <div>{{new_start_time}}</div>
                <div ref="line" class="line">
                    <div :style="{width:operatewidth +'px'}" class="add_line">
                        <span></span>
                    </div>
                </div>
                <div>{{new_end_time}}</div>
            </div>

            <div class="control_div">
                <img src="../assets/images/last_song.png" alt="">
                <div>
                    <img @click="play_click" v-if="play_or_suspend" src="../assets/images/play.png" alt="">
                    <img @click="play_click" v-else src="../assets/images/suspend.png" alt="">
                </div>
                <img src="../assets/images/next_song.png" alt="">
            </div>
            <aplayer :music="videoUpload.music"></aplayer>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import aplayer from 'vue-aplayer'
    export default {
        name: "play",
        components: {
            aplayer
        },
        data() {
            return {
                music_data: [],
                album_name: '', //演唱歌名
                singer_name: '', //演唱者
                albummid: '',//图片值
                songmid: '',//歌曲id
                new_start_time: '00:00', // 初始开始时间
                new_end_time: '03:15', // 初始开始时间
                operatewidth: 0,//进度条的进度值
                start_time: 0,// 开始时间增加值
                timer: null,
                play_or_suspend: false,
                tiemr: null,
                song_url: "https://ws.stream.qqmusic.qq.com/C400000BZ9Fg16MAU2.m4a?guid=126548448&vkey=A36BA6C8E266FFB013409D43E1597250F5C80ED1720DDF0943E67284B57AA471CDE92E61EDCF5B748EDC90C14323F4ABD8994985E8C4670B&uin=0&fromtag=66",
                videoUpload: {
                    //progress: false,
                    // progressPercent: 0,
                    // successPercent: 0,
                    theme: '#ffc0cb',
                    autoplay: true,
                    repeat: 'repeat-one', // 轮播模式。值可以是 'repeat-one'（单曲循环）'repeat-all'（列表循环）或者 'no-repeat'（不循环）。为了好记，还可以使用对应的 'music' 'list' 'none'
                    mini: true, // 迷你模式
                    float: true, // 浮动模式。你可以在页面上随意拖放你的播放器
                    music: { // 当前播放的音乐
                        title: '能够成家吗',
                        author: '咖啡少年',
                        url:"https://ws.stream.qqmusic.qq.com/C400000BZ9Fg16MAU2.m4a?guid=126548448&vkey=A36BA6C8E266FFB013409D43E1597250F5C80ED1720DDF0943E67284B57AA471CDE92E61EDCF5B748EDC90C14323F4ABD8994985E8C4670B&uin=0&fromtag=66",
                        pic:'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2366432289,1795558543&fm=26&gp=0.jpg' // 封面图片
                    }
                }
            }
        },
        computed: {},
        watch: {},

        mounted() {
            if (localStorage.getItem('every_music_data')) {
                // 演唱歌名,演唱者
                this.music_data.push(JSON.parse(localStorage.getItem('every_music_data')))
                this.album_name = this.music_data[0].albumname
                this.albummid = this.music_data[0].albummid
                this.songmid = this.music_data[0].songmid
                // console.log(this.albummid);
                this.getImgUrl() // 拼接获取小图片地址
                $('#background_img').css('background-image', 'url(http://y.gtimg.cn/music/photo_new/T002R180x180M000' + this.albummid + '.jpg)') // 修改大背景图地址
                var arrays = []
                if (this.music_data[0].singer.length > 1) {
                    for (let i = 0; i < this.music_data[0].singer.length; i++) {
                        var not_last = this.music_data[0].singer[i].name + ' / '
                        arrays.push(not_last)
                    }
                    arrays.push(arrays.pop().replace(/[ / ]/g, ''))
                    for (let j = 0; j < arrays.length; j++) {
                        this.singer_name += arrays[j]
                    }
                } else {
                    this.singer_name = this.music_data[0].singer[0].name
                }

                //获取歌词
                this.$http.get("https://api.zsfmyz.top/music/lyric?songmid=" + this.songmid, {}).then(res => {
                    console.log(res.data);
                }).catch(err => {
                    console.log(err);
                });
                // 获取播放地址
                this.$http.get("https://api.zsfmyz.top/music/song?songmid=" + this.songmid + '&guid=126548448', {}).then(res => {
                    console.log(res.data);
                }).catch(err => {
                    console.log(err);
                });

            } else {
                alert('error')
            }
        },

        methods: {
            // 图片路径
            getImgUrl() {
                return "http://y.gtimg.cn/music/photo_new/T002R180x180M000" + this.albummid + ".jpg"
            },

            play_click() {
                this.play_or_suspend = !this.play_or_suspend;
                if (this.play_or_suspend == true) {
                    this.timer = setInterval(() => {
                        this.showTime(++this.start_time)
                        this.$nextTick(() => {
                            this.operatewidth = this.$refs.line.offsetWidth / this.ChangeStrToMinutes(this.new_end_time) * this.start_time
                        })
                    }, 1000)
                } else {
                    clearInterval(this.timer)
                }

                let url = JSON.parse(localStorage.getItem('playArray'))
                // console.log(url[0].sip[0] + url[0].purl);
                $.ajax({
                    url: url[0].sip[0] + url[0].purl,
                    type: "get",
                    dataType: 'jsonp',
                    jsonp: "callback",
                    jsonpCallback: "callback",
                    success: (res) => {
                        console.log(res);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            },
            // 数字转化为时间(数字=>00:00)
            showTime(iTimelLength) {
                var str = "";
                var s = parseInt(iTimelLength % 60);
                var m = parseInt(((iTimelLength - s) / 60) % 60);
                str += (m >= 10 ? m + ":" : m > 0 ? "0" + m + ":" : "00:");
                str += (s >= 10 ? s : s > 0 ? "0" + s : "00");
                this.new_start_time = str
                // 进度条放完关闭定时器
                // this.ChangeStrToMinutes(this.new_start_time) 歌曲进度
                // this.ChangeStrToMinutes(this.new_start_time) 歌曲长度
                if (this.ChangeStrToMinutes(this.new_start_time) >= this.ChangeStrToMinutes(this.new_end_time)) {
                    clearInterval(this.timer)
                }
            },
            // 时间转化为数字(00:00=>数字)
            ChangeStrToMinutes(str) {
                var arrminutes = str.split(":");
                if (arrminutes.length == 2) {
                    var minutes = parseInt(arrminutes[0]) * 60 + parseInt(arrminutes[1]);
                    return minutes
                } else {
                    return 0;
                }
            }
        }
    }
</script>

<style scoped>
    .main_box {
        color: #fff;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .background_img {
        font-size: 0.4rem;
        color: #fff;
        background-image: url('../assets/images/background_img.jpg');
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        background-size: cover;
        background-position: center;
        filter: blur(5px);
        -webkit-filter: blur(5px);


    }

    .title_p {
        width: 8rem;
        font-size: 0.533rem;
        margin-top: 1.333rem;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
    }

    .title_p span {
        display: inline-block;
        font-size: 0.533rem;
        text-align: center;
        color: skyblue;
    }

    .singing_name {
        width: 6rem;
        /*background-color: #f00;*/
        font-size: 0.4rem;
        margin: 0.167rem 0 1.6rem 0;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        color: skyblue;
    }

    .small_img {
        display: inline-block;
        width: 6.333rem;
        height: 6.333rem;
        border-radius: 50%;
        -webkit-animation: run 40s linear infinite;
    }

    @-webkit-keyframes run {
        from {
            /* 旋转效果 */
            -webkit-transform: rotateZ(0deg);
        }
        to {
            -webkit-transform: rotateZ(720deg);
        }
    }

    .lyric_li_active {
        font-size: 0.467rem;
        color: skyblue;
    }

    .lyric_ul {
        width: 6.333rem;
        height: 3rem;
        overflow: hidden;
        color: #ccc;
        font-size: 0.333rem;
        margin-top: 0.667rem;
        margin-bottom: 1rem;
    }

    .lyric_ul li {
        width: 6.333rem;
        text-align: center;
        margin-bottom: 0.133rem;
    }

    .speed_of_progress {
        font-size: 0.267rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .speed_of_progress .line {
        width: 7rem;
        height: 0.027rem;
        background-color: #999;
        margin: 0 0.267rem 0 0.3rem;
        position: relative;
    }

    .speed_of_progress .line .add_line {
        width: 0rem;
        position: absolute;
        left: 0;
        top: 0;
        height: 0.027rem;
        background-color: #CC095B
    }

    .speed_of_progress .line .add_line span {
        width: 0.15rem;
        height: 0.15rem;
        background-color: #CC095B;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -0.075rem;
        border-radius: 50%;
        box-shadow: 0 0 0.133rem #CC095B;
    }

    .control_div {
        width: 6rem;
        margin-top: 0.5rem;
        display: flex;
        justify-content: space-around;
    }

    .control_div img {
        display: inline-block;
        width: 1.1rem;
        height: 1.1rem;

    }
</style>