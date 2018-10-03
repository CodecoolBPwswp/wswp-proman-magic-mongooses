// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
let dataHandler = {
    keyInLocalStorage: 'proman-data', // the string that you use as a key in localStorage to save your application data
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _loadData: function() {
        // it is not called from outside
        // loads data from local storage, parses it and put into this._data property
        dataHandler._data = JSON.parse(localStorage.getItem(dataHandler.keyInLocalStorage));
    },
    _saveData: function() {
        // it is not called from outside
        // saves the data from this._data to local storage
    },
    init: function() {
        dataHandler._loadData();
        dom.initSaveBoardButton();
    },
    getBoards: function(callback) {
        // the boards are retrieved and then the callback function is called with the boards
        let boards = dataHandler._data.boards;
        callback(boards);
    },
    getBoard: function(boardId, callback) {
        // the board is retrieved and then the callback function is called with the board

    },
    getStatuses: function(callback) {
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: function(statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: function(boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
        let cardsOfBoard = dataHandler._data.cards.filter(cardObject => cardObject.board_id === boardId);
        callback(cardsOfBoard);
    },
    getCard: function(cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: function(boardTitle, callback) {
        // creates new board, saves it and calls the callback function with its data
        let arrayOfBoards = dataHandler._data.boards;
        let nextId = dataHandler.getNextId(arrayOfBoards);
        arrayOfBoards.push({id: nextId, title: boardTitle, is_active: true});
        localStorage.setItem(dataHandler.keyInLocalStorage, JSON.stringify(dataHandler._data));
        callback(arrayOfBoards[arrayOfBoards.length - 1])
    },
    createNewCard: function(cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
        let arrayOfCards = dataHandler._data.cards;
        let nextId = dataHandler.getNextId(arrayOfCards);
        arrayOfCards.push({id: nextId, title: cardTitle, board_id: boardId, status_id: statusId, order: 33})
        localStorage.setItem(dataHandler.keyInLocalStorage, JSON.stringify(dataHandler._data));
        callback(arrayOfCards[arrayOfCards.length - 1]);
    },
    getNextId: function (arrayOfObjects) {
        let existingIds = [];
        for (let object of arrayOfObjects) {
            existingIds.push(object["id"]);
        }
        let nextId = Math.max(...existingIds) + 1;
        return nextId;
    },
    getGreatestId: function (dataType) {
        let arrayOfData = dataHandler._data[dataType];
        let arrayOfIds = [];
        for (let dataObject of arrayOfData) {
            arrayOfIds.push(dataObject["id"]);
        }
        let greatestId = Math.max(...arrayOfIds);
        return greatestId;
    },
    getOrderLast: function (boardId, statusID) {


    }
    // here comes more features
};
