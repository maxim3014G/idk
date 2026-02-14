 (function() {
            // Получаем секции
            const sectionStart = document.getElementById('section-start');
            const sectionImage = document.getElementById('section-image');
            const sectionVideo = document.getElementById('section-video');
            const sectionletter = document.getElementById('section-letter');
            document.getElementsByClassName('center-wrapper')[0].classList.add('background_img_1');
            // Кнопки
            // Кнопки
            const startBtn = document.getElementById('start-button');
            const yesBtn = document.getElementById('btn-yes');
            const noBtn = document.getElementById('btn-no');               
            const letterBtn = document.getElementById('letterbtn');
            // Функции для переключения секций
            function showSection(sectionToShow) {
                // Скрываем все секции
                sectionStart.classList.add('hidden');
                sectionImage.classList.add('hidden');
                sectionVideo.classList.add('hidden');
                sectionletter.classList.add('hidden');
                // Показываем нужную
                sectionToShow.classList.remove('hidden');
            }

            // 1. При нажатии на стартовую кнопку -> переходим к секции с картинкой
            startBtn.addEventListener('click', function() {
                showSection(sectionImage);
                document.getElementsByClassName('center-wrapper')[0].classList.remove('background_img_1');
                document.getElementsByClassName('center-wrapper')[0].classList.add('background_img_2');
            });

            // 2. При нажатии "Нет" -> возврат на самый главный экран (start)
            noBtn.addEventListener('click', function() {
                showSection(sectionStart);
                document.getElementsByClassName('center-wrapper')[0].classList.remove('background_img_2');
            });

            // 3. При нажатии "Да" -> скрыть текущий контент и показать секцию с видео
            yesBtn.addEventListener('click', function() {
                showSection(sectionletter);
                document.getElementsByClassName('center-wrapper')[0].classList.remove('background_img_2');
                letterBtn.classList.add('un_button');
            });

            letterBtn.addEventListener('click', function() {
                showSection(sectionVideo);
                document.getElementsByClassName('center-wrapper')[0].classList.remove('background_img_2');
            });

            // Дополнительно: если нужно, чтобы видео не проигрывалось в фоне, можно его останавливать при скрытии секции
            // но для простоты оставим так. Можно добавить остановку видео при уходе с секции, но это опционально.
            const videoElement = document.querySelector('video');

            // Слушаем изменения видимости секции видео (чтобы ставить на паузу, когда секция скрыта)
            // Простейший вариант: при скрытии любой секции, если видео играет, ставим на паузу.
            function stopVideoIfPlaying() {
                if (videoElement && !videoElement.paused) {
                    videoElement.pause();
                }
            }

            // Переопределим showSection, чтобы останавливать видео при уходе с video секции
            const originalShowSection = showSection;
            showSection = function(sectionToShow) {
                // Если текущая секция video (или мы с неё уходим), принудительно ставим видео на паузу
                if (!sectionVideo.classList.contains('hidden')) {
                    // Значит секция видео видима и мы от неё уходим
                    stopVideoIfPlaying();
                }
                // Вызываем исходную функцию
                originalShowSection(sectionToShow);
            };

            // Перезапишем, чтобы работало (просто обновим ссылку)
            window.showSection = showSection;

            // Исправим обработчики, чтобы использовать обновлённую функцию
            startBtn.onclick = function() { showSection(sectionImage); };
            noBtn.onclick = function() { showSection(sectionStart); };
            yesBtn.onclick = function() { 
                showSection(sectionletter); 
            };
            letterBtn.onclick = function(){showSection(sectionVideo); };

            // Если хотим, чтобы кнопка "Назад" на телефоне не ломала логику (опционально) — можно игнорировать.
        })();