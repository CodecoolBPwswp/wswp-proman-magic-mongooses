// This function is to initialize the application
function init() {
    // init data
    dataHandler.init();
    // loads the boards to the screen
    dom.loadBoards();
    // loads the cards for each board
    dom.loadAllCards();
    // initializes new card modal
    templateHandler.initNewCardModal();
}

init();

