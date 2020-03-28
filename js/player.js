// player
export const initPlayer = (viewElement, players, buttons) => {

    let buttonClicked;
    let playerClicked;
    let progressCurrent;

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

        const playerStr = 'player-';
        const buttonStr = 'player-control-';
        const progressStr = 'progress-bar-';

        let id = evt.target.id;
        let playerId = '#' + playerStr + id.slice(buttonStr.length);
        let progressId = '#' + progressStr + id.slice(buttonStr.length);

        playerClicked = viewElement.querySelector(playerId);
        progressCurrent = viewElement.querySelector(progressId);

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

    buttons.forEach( (button) => button.addEventListener('click', (evt) => startPlayer(evt)) );

    players.forEach((player) => player.addEventListener('timeupdate', () => updateProgress(playerClicked, progressCurrent, buttonClicked) ) );
};