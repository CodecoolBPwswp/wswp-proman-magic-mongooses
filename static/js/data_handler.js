// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
let dataHandler = {
    keyInLocalStorage: 'proman-data', // the string that you use as a key in localStorage to save your application data
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _loadData: function (callback) {
        // it is not called from outside
        $.when(
            $.get("http://0.0.0.0:4000/api/boards", function (data) {
                dataHandler._data["boards"] = JSON.parse(data);
            }),
            $.get("http://0.0.0.0:4000/api/cards", function (data) {
                dataHandler._data["cards"] = JSON.parse(data);
            }),
            $.get("http://0.0.0.0:4000/api/statuses", function (data) {
                dataHandler._data["statuses"] = JSON.parse(data);
            }),
            $.get("http://0.0.0.0:4000/api/users", function (data) {
                dataHandler._data["users"] = JSON.parse(data);
            }),
        ).then(function () {
            callback(dataHandler._data);
        })
    },
    _saveRecord: function (newRecord, tableName) {
        // it is not called from outside
        $.post(`http://0.0.0.0:4000/api/${tableName}/insert`, newRecord);
    },
    init: function () {
        dataHandler._loadData(dom.init);

    },
    getBoards: function (callback) {
        // the boards are retrieved and then the callback function is called with the boards
        let boards = dataHandler._data.boards;
        callback(boards);
    },
    getBoard: function (boardId, callback) {
        // the board is retrieved and then the callback function is called with the board

    },
    getStatuses: function () {
        // the statuses are retrieved and then the callback function is called with the statuses
        let statuses = dataHandler._data.statuses;
        return statuses;
    },
    getStatus: function (statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: function (boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
        let cardsOfBoard = dataHandler._data.cards.filter(cardObject => cardObject.board_id === boardId);
        callback(cardsOfBoard);
    },
    getCard: function (cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: function (boardTitle, callback) {
        // creates new board, saves it and calls the callback function with its data
        let arrayOfBoards = dataHandler._data.boards;
        let nextId = dataHandler.getNextId(arrayOfBoards);
        let newBoard = {id: nextId, title: boardTitle, user_id: 2}; // TODO: get user id from session
        arrayOfBoards.push(newBoard);
        dataHandler._saveRecord(newBoard, "boards");
        callback(arrayOfBoards[arrayOfBoards.length - 1])
    },
    createNewCard: function (cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
        let arrayOfCards = dataHandler._data.cards;
        let nextId = dataHandler.getNextId(arrayOfCards);
        let newCard = {id: nextId, title: cardTitle, board_id: boardId, status_id: statusId};
        arrayOfCards.push(newCard);
        dataHandler._saveRecord(newCard, "cards");
        callback(arrayOfCards[arrayOfCards.length - 1]);
    },
    getNextId: function (arrayOfObjects) {
        let existingIds = [];
        for (let object of arrayOfObjects) { // could be a simple max algorithm
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
    getCardNewStatus: function (callback) {
        let dropable = Array.from(document.querySelectorAll('.card-container'));
        dragula(dropable).on('drop', function (actualCard) {
            let cardNewStatusId = actualCard.parentNode.dataset.statusId;
            let cardId = actualCard.dataset.cardId;
            let cardBoardId = actualCard.dataset.boardId;
            let cardTitle = actualCard.innerText;
            callback(cardNewStatusId, cardId, cardBoardId, cardTitle)
        })
    },
    saveCardNewStatus: function (cardNewStatusId, cardId, cardBoardId, cardTitle) {
        $.ajax({
            url: `http://0.0.0.0:4000/api/cards/${cardId}/update`,
            type: 'PUT',
            data: {
                "id": cardId,
                "title": cardTitle,
                "board_id": cardBoardId,
                "status_id": cardNewStatusId
            }
        });
    },
    deleteBoard: function (boardId) {
        $.ajax({
            url: `http://0.0.0.0:4000/api/boards/${boardId}/delete`,
            type: 'DELETE'
        });
    }
    // here comes more features
};
