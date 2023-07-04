const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const heading = $('.musicPlayback__songName h2')
const cdThump = $('.musicPlayback__songImage')
const audio = $('#audio')
const progress = $('.musicPlayback__process input')
const volumeBar = $('.musicPlayback__volume input')
const nextBtn = $('.control__nextSong')
const previousBtn = $('.control__previousSong')
const pauseIcon = $('.control__playSong .icon-pause')
const playIcon = $('.control__playSong .icon-play')

const app = {
    songs: [
        {
            name: 'Nơi này có anh',
            singer: 'Sơn Tùng',
            path: './assets/music/song_1.mp3',
            image: './assets/img/img_1.jpg',
        },
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: './assets/music/song_2.mp3',
            image: './assets/img/img_2.jpg',
        },
        {
            name: 'ĐẮM',
            singer: 'Xesi, Ricky Star',
            path: './assets/music/song_3.mp3',
            image: './assets/img/img_3.jpg',
        },
        {
            name: 'Stay',
            singer: 'Justin Bieber',
            path: './assets/music/song_4.mp3',
            image: './assets/img/img_4.jpg',
        },
        {
            name: 'Bài Ca Tuổi Trẻ',
            singer: 'TamKa PKL',
            path: './assets/music/song_5.mp3',
            image: './assets/img/img_5.jpg',
        },
        {
            name: 'Cho Tôi Đi Theo',
            singer: 'Ngọt',
            path: './assets/music/song_6.mp3',
            image: './assets/img/img_6.jpg',
        }  
    ],
    currentIndex: 0,
    renderPlayList: function() {
       const htmls = this.songs.map(function(song,index) {
        return `
            <div class="song" id="${index}">
                <div class="image">
                    <img src="${song.image}" alt="">
                </div>
                <div class="content">
                    <div class="content__name">${song.name}</div>
                    <div class="content__author">${song.singer}</div>
                </div>
                <div class="moreInformation">
                    <i class="fas fa-ellipsis-h"></i>
                </div>            
            </div>
        `
       })
       $('.listSong').innerHTML = htmls.join('');
    },
    defindeProperties: function() {
        Object.defineProperty(app,'currentSong', {
            get: function() {
                return app.songs[app.currentIndex]
            }
        })
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThump.src = this.currentSong.image
        audio.src = this.currentSong.path
    },
    handleEvent: function() {
        const img = $('.musicPlayback__songImage')
        const imgWidth = img.offsetWidth

        // Xử lý phóng to, thu nhỏ CD
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newImgwidth = imgWidth - scrollTop
            img.style.width = newImgwidth > 0 ? newImgwidth + 'px' : 0
            img.style.height = newImgwidth > 0 ? newImgwidth + 'px' : 0
            img.style.opacity = newImgwidth/imgWidth
           if (scrollTop > 260) {
            musicPlayback.classList.add('musicPlayback--scroll')
           } else {
            musicPlayback.classList.remove('musicPlayback--scroll')
           }
        }

        // Xử lý CD quay
        var CDThumpAnimate = cdThump.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000, //10 seconds
            iterations: Infinity
        })
        CDThumpAnimate.pause()
        
        // Xử lý khi click play
        const playButton = $('.control__playSong')
        const timeCurrent = $('.timeCurrent')
        const timeEnd = $('.timeEnd')
        playButton.onclick = function() {
            if (app.isPlaying) {    
                CDThumpAnimate.pause()
                audio.pause()
                pauseIcon.classList.remove('fa-pause')
                playIcon.classList.add('fa-play')
            } else {        
                CDThumpAnimate.play()
                audio.play()
                pauseIcon.classList.add('fa-pause')
                playIcon.classList.remove('fa-play')              
            }

                // khi song được play
                audio.onplay = function() {
                    app.isPlaying = true
                }
                // khi song được pause
                audio.onpause = function() {
                    app.isPlaying = false
                }
            
            // khi tiến độ bài hát thay đổi
            audio.ontimeupdate = function() {
                if (audio.duration) {
                    const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                    progress.value = progressPercent
                }

                // update thời gian của bài hát
                function timeFormat(seconds) {
                    let minute = Math.floor(seconds / 60);
                    let second = Math.floor(seconds % 60);
                    minute = minute < 10 ? "0" + minute : minute;
                    second = second < 10 ? "0" + second : second;
                    return minute + ":" + second;
                }
                
                const currentTime = timeFormat(audio.currentTime)
                timeCurrent.textContent = currentTime
                const endTime = timeFormat(audio.duration)
                if (endTime != 'NaN:NaN') {
                    timeEnd.textContent = endTime
                }
                if (audio.currentTime == audio.duration) {
                    nextSong()
                }
            }
        }
        
        // xử lý khi tua bài hát
        progress.oninput = function(e) {
            const seekTime = e.target.value * audio.duration / 100
            audio.currentTime = seekTime
        }

        // Xử lý volume của bài hát
        volumeBar.oninput = function(e) {
            const volume = e.target.value / 20
            audio.volume = volume
        }

         // Xử lý khi nghe bài hát trước đó
        previousBtn.onclick =  function() {
            app.currentIndex--
            if (app.currentIndex < 0) {
                app.currentIndex = app.songs.length -1
            }  
            app.loadCurrentSong()
            audio.play()
            CDThumpAnimate.play()
            pauseIcon.classList.add('fa-pause')
            playIcon.classList.remove('fa-play')

            console.log(app.songs.length - 1)
        }

        // Xử lý khi next bài hát
        const nextSong = function() {
            app.currentIndex++
            if (app.currentIndex >= app.songs.length) {
                app.currentIndex = 0
            }  
            app.loadCurrentSong()

            audio.play()
       
            CDThumpAnimate.play()
            pauseIcon.classList.add('fa-pause')
            playIcon.classList.remove('fa-play')
        }
        nextBtn.onclick = nextSong     
    },
    start: function() {
        // định nghĩa các thuộc tính cho object
        this.defindeProperties()

        // lắng nghe và xử lý các sự kiện
        this.handleEvent()

        // tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        // render playlist bài hát
        this.renderPlayList()
    }

}
app.start()



// SWITCH BUTTON
var btn = $('.switch')
var containerWeb =  $('.main')
var listSong = $('.listSong')
var musicPlayback = $('.musicPlayback')
btn.onclick = function() {
    setTimeout(function(){
        containerWeb.classList.toggle('main--2')
        listSong.classList.toggle('listSong--2')
        listSong.classList.toggle('listSong--1')
        musicPlayback.classList.toggle('musicPlayback--2')
    },100)
}
btn.addEventListener('mousedown', function() {
    btn.classList.add('switch--click')
})
btn.addEventListener('mouseup', function() {
    btn.classList.remove('switch--click')
})

