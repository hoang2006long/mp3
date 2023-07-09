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

const waveMusic = $('.wave')
const progessBtn = $('.musicPlayback__process input[type=range]')

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
            image: './assets/img/img_cho_toi_di_theo.jpg',
        },
        {
            name: 'Để tôi ôm em bằng giai điệu này',
            singer: 'KAI ĐINH x MIN x GREY D',
            path: './assets/music/song_de_toi_om_em_bang_giai_dieu_nay.mp3',
            image: './assets/img/img_de_toi_om_em_bang_giai_dieu_nay.jpg',
        },
        {
            name: 'Vì tôi còn sống',
            singer: 'Tiên Tiên',
            path: './assets/music/song_vi_toi_con_song.mp3',
            image: './assets/img/img_vi_toi_con_song.jpg',
        },
        {
            name: 'Lần cuối',
            singer: 'Ngọt',
            path: './assets/music/song_lan_cuoi.mp3',
            image: './assets/img/img_lan_cuoi.jpg',
        },
        {
            name: 'Lạ lùng',
            singer: 'Vũ',
            path: './assets/music/song_la_lung.mp3',
            image: './assets/img/img_la_lung.jpg',
        },
        {
            name: 'Lối nhỏ',
            singer: 'Đen - Lối Nhỏ ft. Phương Anh Đào',
            path: './assets/music/song_loi_nho.mp3',
            image: './assets/img/img_loi_nho.jpg',
        },
        {
            name: 'Suýt nữa thì',
            singer: 'ANDIEZ',
            path: './assets/music/song_suyt_nua_thi.mp3',
            image: './assets/img/img_13.jpg',
        },
        {
            name: 'Ta và nàng',
            singer: 'JGKiD ft ĐEN',
            path: './assets/music/song_ta_va_nang.mp3',
            image: './assets/img/img_ta_va_nang.jpg',
        },
        {
            name: 'Thấy chưa',
            singer: 'Ngọt',
            path: './assets/music/song_thay_chua.mp3',
            image: './assets/img/img_15.jpg',
        },
        {
            name: 'Thật ra em chẳng thương anh vậy đâu',
            singer: 'Nguyenn x Đặng Tuấn Vũ',
            path: './assets/music/song_that_ra_em_chua_thuong_anh_den_vay_dau.mp3',
            image: './assets/img/img_that_ra_em_chang_thuong_anh_den_vay_dau.jpg',
        },
        {
            name: 'Thu cuối',
            singer: ' Mr T x Yanbi x Hằng Bingboong',
            path: './assets/music/song_thu_cuoi.mp3',
            image: './assets/img/img_thu_cuoi.jpg',
        },
        {
            name: 'Túy âm',
            singer: 'Xesi x Masew x Nhatnguyen',
            path: './assets/music/song_tuy_am.mp3',
            image: './assets/img/img_tuy_am.jpg',
        },
        {
            name: 'Va vào giai điệu này',
            singer: 'MCK ',
            path: './assets/music/song_va_vao_giai_dieu_nay.mp3',
            image: './assets/img/img_va_vao_giai_dieu_nay.jpg',
        } 
    ],
    isPlaying: false,
    isRandom: false,
    isReturn: false,
    currentIndex: 0,
    // ***************************HÀM XỬ LÝ GIAO DIỆN BÀI HÁT ĐANG ĐƯỢC PHÁT******************
            addActiveCurrentSong: function() {
                $('[data-id="'+this.currentIndex+'"]').classList.add('activeSong')
            },
            removeActivePreviousSong: function(currentSong, currentWave) {
                currentSong.classList.remove('activeSong')
                currentWave.classList.remove('display-flex')
                    },

    switchBtn: function() {
        btn.onclick = function() {
            containerWeb.classList.toggle('main--2')
            listSong.classList.toggle('listSong--2')
            listSong.classList.toggle('listSong--1')
            musicPlayback.classList.toggle('musicPlayback--2')
            app.scrollToActiveSong()
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
            <div class="song" data-id="${index}">
                <div class="image">
                    <img src="${song.image}" alt="">
                    <div class="wave">
                        <div class="items"></div>
                        <div class="items"></div>
                        <div class="items"></div>
                        <div class="items"></div>
                        <div class="items"></div>
                    </div>
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
        // ĐỊNH NGHĨA CÁC THUỘC TÍNH
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
    timeUpdate: function() {
        audio.ontimeupdate = function() {
        const currentTime = timeFormat(audio.currentTime)
        timeCurrent.textContent = currentTime
        const endTime = timeFormat(audio.duration)
            // thanh progess
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
    },
    scrollToActiveSong: function() {
        setTimeout(function() {
            $('.song.activeSong').scrollIntoView({
                behavior: "smooth",
                block: 'center'
            })
        },100) 
    },
    handleEvent: function() {
        const _this = this
        const songsLength = _this.songs.length
 
        // ****************************************** XỬ LÝ CD************************************************
                //  Xử lý phóng to, thu nhỏ CD
                document.onscroll = function() {
                    const scrollTop = window.scrollY || document.documentElement.scrollTop
                    const newCdThumpwidth = cdThumpWidth - scrollTop
                    cdThump.style.width = newCdThumpwidth > 0 ? newCdThumpwidth + 'px' : 0
                    cdThump.style.height = newCdThumpwidth > 0 ? newCdThumpwidth + 'px' : 0
                    cdThump.style.opacity = newCdThumpwidth/cdThumpWidth
                    if (scrollTop > 100) {
                    musicPlayback.classList.add('musicPlayback--scroll')
                    } else {
                    musicPlayback.classList.remove('musicPlayback--scroll')
                    }
                }

                // Xử lý CD quay
                const CDThumpAnimate = cdThump.animate([
                    {transform: 'rotate(360deg)'}
                ], {
                    duration: 7000, //7 seconds
                    iterations: Infinity
                })
                CDThumpAnimate.pause()
        
        // ***************************Xử lý khi click play và nút space bar*********************************
                function whenPause() {         
                    const currentSongWave = $('[data-id="'+_this.currentIndex+'"] .wave')
                    CDThumpAnimate.pause()
                    audio.pause()
                    pauseIcon.classList.remove('fa-pause')
                    playIcon.classList.add('fa-play')
                    currentSongWave.classList.remove('display-flex') 
                }
                function whenPlay() {                  
                     const currentSongWave = $('[data-id="'+_this.currentIndex+'"] .wave')
                    CDThumpAnimate.play()
                    audio.play()
                    pauseIcon.classList.add('fa-pause')
                    playIcon.classList.remove('fa-play')
                    _this.addActiveCurrentSong() 
                    currentSongWave.classList.add('display-flex')
                }

                function clickPlay() {
                    if (_this.isPlaying) {    
                        whenPause()
                    } else {        
                        whenPlay()  
                    }
                    // khi song được play
                    audio.onplay = function() {
                        _this.isPlaying = true
                    }
                    // khi song được pause
                    audio.onpause = function() {
                        _this.isPlaying = false
                    }
                }
                playButton.onclick = clickPlay
                window.addEventListener('keydown', function(e){
                    if (e.which === 32) {
                        clickPlay()
                        e.preventDefault();
                    }
                });
        
        // *********************************************XỬ LÝ CÁC THAO TÁC TRÊN BẢNG ĐIỀU KHIỂN**************************************
                // toàn bộ hàm khi phát nhạc
                function totalPlayMusicFunction() {
                    _this.loadCurrentSong()
                    whenPlay()
                    _this.addActiveCurrentSong() 
                    _this.isPlaying = true
                    _this.scrollToActiveSong()
                }

                // tự động chuyển bài hát mới khi hết thời gian
                audio.onended = function() {
                    if(_this.isReturn === false || _this.isRandom === false) {
                        nextSong()                      
                    }  
                }
                
                // xử lý khi tua bài hát
                progress.oninput = function(e) {
                    const seekTime = e.target.value * audio.duration / 100
                    audio.currentTime = seekTime
                }

                // xử lý tắt âm khi tua bài hát trên điện thoại
                progessBtn.addEventListener('touchstart', function() {
                    whenPause()
                })
                progessBtn.addEventListener('touchend',function() {
                    clickPlay()
                })

                // xử lý tắt âm khi tua bài hát trên máy tính
                progessBtn.addEventListener('mousedown', function() {
                    whenPause()
                })
                progessBtn.addEventListener('mouseup',function() {
                    clickPlay()
                })

                // xử lý volume của bài hát
                volumeBar.oninput = function(e) {
                    audio.volume = e.target.value
                }

                // Xử lý khi nghe bài hát trước đó
                function previousSong() {
                    const currentSong = $('[data-id="'+_this.currentIndex+'"]')
                    const currentSongWave = $('[data-id="'+_this.currentIndex+'"] .wave')
                    _this.removeActivePreviousSong(currentSong,currentSongWave)
                    _this.currentIndex--
                    if (_this.currentIndex < 0) {
                        _this.currentIndex = songsLength -1
                    }  
                    totalPlayMusicFunction()
                }
                previousBtn.onclick = previousSong

                // Xử lý khi nghe bài hát tiếp theo
                function nextSong() {
                    const currentSong = $('[data-id="'+_this.currentIndex+'"]')
                    const currentSongWave = $('[data-id="'+_this.currentIndex+'"] .wave')
                    _this.removeActivePreviousSong(currentSong,currentSongWave)
                    _this.currentIndex++
                    if (_this.currentIndex >= songsLength) {
                        _this.currentIndex = 0
                    }  
                    totalPlayMusicFunction()
                }
                nextBtn.onclick = nextSong

                // Xử lý khi return bài hát
                returnBtnIcon.onclick = function() {
                    _this.isReturn =! _this.isReturn
                    _this.isRandom = false
                    returnBtnIcon.classList.toggle('activeBtn', _this.isReturn) 
                    randomBtnIcon.classList.remove('activeBtn') 
                    if (!_this.isReturn && !_this.isRandom) {
                        audio.onended = function() {
                            nextSong() 
                        } 
                        nextBtn.onclick = nextSong
                        previousBtn.onclick = previousSong    
                    } 
                    if (!_this.isReturn && _this.isRandom) {
                        nextBtn.onclick = randomSong
                        previousBtn.onclick = randomSong
                    }
                    if (_this.isReturn) {
                        audio.onended = function() {
                            audio.play() 
                        } 
                        nextBtn.onclick = nextSong
                        previousBtn.onclick = previousSong  
                    }
                }    
                
                // Xử lý khi random bài hát
                function randomSong() {
                    const currentSong = $('[data-id="'+_this.currentIndex+'"]')
                    const currentSongWave = $('[data-id="'+_this.currentIndex+'"] .wave')
                    _this.removeActivePreviousSong(currentSong,currentSongWave)
                    let newIndex
                    do {
                        newIndex = Math.floor(Math.random() * _this.songs.length)
                    } while(newIndex ==_this.currentIndex)
                    _this.currentIndex = newIndex
                    totalPlayMusicFunction()               
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
                    } 
                    if (!_this.isRandom && !_this.isReturn) {
                        nextBtn.onclick = nextSong
                        previousBtn.onclick = previousSong
                        audio.onended = nextSong
                    }
                }

                // xử lý khi click vào bài hát
                listSong.onclick = function(e) {
                    const currentSong = $('[data-id="'+_this.currentIndex+'"]')
                    const currentSongWave = $('[data-id="'+_this.currentIndex+'"] .wave')
                    const songNode = e.target.closest('.song:not(.activeSong)')
                    const optionNode =  e.target.closest('.moreInformation')
                    const img1Node = e.target.closest('.song.activeSong')
                    const imgNode = e.target.closest('.image')
                    if (imgNode && img1Node) {
                        clickPlay()
                    }
                    if (songNode || optionNode) {
                        if (songNode && !optionNode){
                            _this.removeActivePreviousSong(currentSong,currentSongWave)
                            const songIndexByClick = Number(songNode.dataset.id)
                            _this.currentIndex = songIndexByClick
                            totalPlayMusicFunction()
                        }
                        if (optionNode) {
                            alert('you just click the option icon')
                        }
                    }
                }

    },
    start: function() {      
        this.renderPlayList()  // render playlist bài hát
        this.defindeProperties()  // định nghĩa các thuộc tính cho object
        this.handleEvent() // lắng nghe và xử lý các sự kiện
        this.loadCurrentSong()  // tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.timeUpdate()  // update thời gian của bài hát
        this.addActiveCurrentSong()   // thêm activeSong ngay cho bài hát đầu tiên khi load lại trang
        this.switchBtn()  // nút đổi giao diện
    }
}

app.start()

