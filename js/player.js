// player
export const initPlayer = (viewElement, players, buttons, statusList) => {

    let buttonClicked;
    let playerClicked;
    let progressCurrent;

    const playerStr = 'player-';
    const buttonStr = 'player-control-';
    const progressStr = 'progress-bar-';
    const statusStr = 'player-status-';

    const getItem = (insertingSrt, cuttingStr, evt) => {

        let startId = evt.target.id;
        let finalId = '#' + insertingSrt + startId.slice(cuttingStr.length);

        return viewElement.querySelector(finalId);
    };

    const toggleButtonClass = (button) => {

        button.classList.toggle('player-control--pause');
        button.classList.toggle('player-control--play');
    };

    const pauseAllExceptThis = (elem, button) => {

        players.forEach((item) => {

            if (elem == item || item.paused)  return null;

            item.pause();
            toggleButtonClass(button);

            for (const button of buttons) {

                if (button.classList.contains('player-control--pause')) {

                    toggleButtonClass(button);
                }
            }

        });
    };

    const playStopItem = (player, button) => {

        if(player.paused) {

            player.play();

        } else {

            player.pause();
        }

        toggleButtonClass(button);
    };

    const startPlayer = (evt) => {

        evt.preventDefault();

        buttonClicked = evt.target;

        playerClicked = getItem(playerStr, buttonStr, evt);
        progressCurrent = getItem(progressStr, buttonStr, evt);

        if (players.length > 1) {
            pauseAllExceptThis(playerClicked, buttonClicked);
        }

        playStopItem(playerClicked, buttonClicked);
    };

    const updateProgress = (player, progress, button) => {

        if (!player.paused) {

            let valueRaw = player.currentTime * 100 / player.duration;
            let value = Math.round(valueRaw);

            progress.value = value;

            if (value == 100) {

                toggleButtonClass(button);
                progress.value = 0;
                player.currentTime = 0;
                player.pause();

            }
        }
    };

    const rewind = (evt) => {

        if (playerClicked && !playerClicked.paused && playerClicked == getItem(playerStr, statusStr, evt)) {

            let progressLeftCoord = progressCurrent.getBoundingClientRect().left;
            let progressWidth = progressCurrent.getBoundingClientRect().right - progressCurrent.getBoundingClientRect().left;
            let progressValue = evt.pageX - progressLeftCoord;
            let progressInPers = 100 * progressValue / progressWidth;
            let timeValue = Math.round(progressInPers / 100 * playerClicked.duration);

            playerClicked.currentTime = timeValue;
            playerClicked.progressCurrent = timeValue;
        }
    };

    buttons.forEach( (button) => button.addEventListener('click', (evt) => startPlayer(evt)) );

    players.forEach((player) => player.addEventListener('timeupdate', () => updateProgress(playerClicked, progressCurrent, buttonClicked) ) );

    statusList.forEach((status) => status.addEventListener('click', (evt) => rewind(evt)) );
};