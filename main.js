const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const btn = $('.switch')
const containerWeb =  $('.main')
const listSong = $('.listSong')
const musicPlayback = $('.musicPlayback')

const heading = $('.musicPlayback__songName h2')
const cdThump = $('.musicPlayback__songImage')
const cdThumpWidth = cdThump.offsetWidth
const audio = $('#audio')
const progress = $('.musicPlayback__process input')
const volumeBar = $('.musicPlayback__volume input')

const returnBtn = $('.control__return')
const returnBtnIcon = $('.control__return i')
const previousBtn = $('.control__previousSong')
const nextBtn = $('.control__nextSong')
const randomBtn = $('.control__random')
const randomBtnIcon = $('.control__random i')

const playButton = $('.control__playSong')
const playIcon = $('.control__playSong .icon-play')
const pauseIcon = $('.control__playSong .icon-pause')

const timeCurrent = $('.timeCurrent')
const timeEnd = $('.timeEnd')

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
    isPlaying: false,
    isRandom: false,
    isReturn: false,
    currentIndex: 0,
    switchBtn: function() {
        btn.onclick = function() {
            containerWeb.classList.toggle('main--2')
            listSong.classList.toggle('listSong--2')
            listSong.classList.toggle('listSong--1')
            musicPlayback.classList.toggle('musicPlayback--2')
        }
        btn.addEventListener('mousedown', function() {
            btn.classList.add('switch--click')
        })
        btn.addEventListener('mouseup', function() {
            btn.classList.remove('switch--click')
        })
    },
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
        Object.defineProperty(this,'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThump.src = this.currentSong.image
        audio.src = this.currentSong.path
    },
    handleEvent: function() {
        const _this = this
        const songsLength = _this.songs.length
        // Xử lý phóng to, thu nhỏ CD
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdThumpwidth = cdThumpWidth - scrollTop
            cdThump.style.width = newCdThumpwidth > 0 ? newCdThumpwidth + 'px' : 0
            cdThump.style.height = newCdThumpwidth > 0 ? newCdThumpwidth + 'px' : 0
            cdThump.style.opacity = newCdThumpwidth/cdThumpWidth
           if (scrollTop > 260) {
            musicPlayback.classList.add('musicPlayback--scroll')
           } else {
            musicPlayback.classList.remove('musicPlayback--scroll')
           }
        }

        // Xử lý CD quay
        const CDThumpAnimate = cdThump.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000, //10 seconds
            iterations: Infinity
        })
        CDThumpAnimate.pause()
        
        // Xử lý khi click play
        function whenPlay() {
            CDThumpAnimate.pause()
            audio.pause()
            pauseIcon.classList.remove('fa-pause')
            playIcon.classList.add('fa-play')
        }
        function whenPause() {
            CDThumpAnimate.play()
            audio.play()
            pauseIcon.classList.add('fa-pause')
            playIcon.classList.remove('fa-play')
        }
        playButton.onclick = function() {
            if (_this.isPlaying) {    
                whenPlay()
            } else {        
                whenPause()  
                         
            }

            // khi song được play
            audio.onplay = function() {
                _this.isPlaying = true
            }
            // khi song được pause
            audio.onpause = function() {
                _this.isPlaying = false
            }
        
            // khi tiến độ bài hát thay đổi
            audio.ontimeupdate = function() {
                const currentTime = timeFormat(audio.currentTime)
                timeCurrent.textContent = currentTime
                const endTime = timeFormat(audio.duration)

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
                if (endTime != 'NaN:NaN') {
                    timeEnd.textContent = endTime
                }
            }
        }
        audio.onended = function() {
            if(_this.isReturn == false | _this.isRandom == false) {
                nextSong()
            }  
        }
        
        // xử lý khi tua bài hát
        progress.oninput = function(e) {
            const seekTime = e.target.value * audio.duration / 100
            audio.currentTime = seekTime
        }

        // Xử lý volume của bài hát
        volumeBar.oninput = function(e) {
            audio.volume = e.target.value
        }

         // Xử lý khi nghe bài hát trước đó
        function previousSong() {
            _this.currentIndex--
            if (_this.currentIndex < 0) {
                _this.currentIndex = songsLength -1
            }  
            _this.loadCurrentSong()
            whenPause()
        }
        previousBtn.onclick = previousSong

        // Xử lý khi nghe bài hát tiếp theo
        function nextSong() {
            _this.currentIndex++
            if (_this.currentIndex >= songsLength) {
                _this.currentIndex = 0
            }  
            _this.loadCurrentSong()
            whenPause()
        }
        nextBtn.onclick = nextSong
  
        // Xử lý khi return bài hát
        returnBtnIcon.onclick = function() {
            _this.isReturn =! _this.isReturn
            _this.isRandom = false
            returnBtnIcon.classList.toggle('activeBtn', _this.isReturn) 
            randomBtnIcon.classList.remove('activeBtn') 
            if (_this.isReturn) {
                audio.onended = function() {
                    audio.play() 
                } 
            } else {
                audio.onended = nextSong
            }       
        }    
        
        // Xử lý khi random bài hát
        function randomSong() {
            var newIndex
            do {
                newIndex = Math.floor(Math.random() * _this.songs.length)
            } while(newIndex ==_this.currentIndex)
            _this.currentIndex = newIndex
            _this.loadCurrentSong()
            console.log(123)
            whenPause()
        }
        randomBtn.onclick = function() {
            _this.isRandom =! _this.isRandom
            _this.isReturn = false
            randomBtnIcon.classList.toggle('activeBtn', _this.isRandom)    
            returnBtnIcon.classList.remove('activeBtn')    
        
            if (_this.isRandom) {
                nextBtn.onclick = randomSong
                previousBtn.onclick = randomSong
                audio.onended = randomSong
            } else {
                nextBtn.onclick = nextSong
                previousBtn.onclick = previousSong
            }
        }
    },
    start: function() {      
       
        // nút đổi giao diện
        this.switchBtn()

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