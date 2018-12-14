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
        ).then(function () {
            callback(dataHandler._data);
        })
    },
    _saveRecord: function (newRecord, tableName) {
        // it is not called from outside
        $.post(`http://0.0.0.0:4000/api/${tableName}/insert`, newRecord, function (data) {
            let objectOfNewRecord = JSON.parse(data);
            dataHandler._data[tableName].push(objectOfNewRecord);
            if (tableName === "boards") {
                templateHandler.renderBoard(objectOfNewRecord, dom.appendNewBoard);
            } else {
                templateHandler.renderCard(objectOfNewRecord, function (renderedCard) {
                    let boardId = objectOfNewRecord["board_id"];
                    let statusId = objectOfNewRecord["status_id"];
                    let cardId = objectOfNewRecord["id"];
                    dom.appendNewCard(renderedCard, boardId, statusId);
                    dom.setDeleteButtonOnNewCard(cardId);
                });
            }
        }); // TODO: add callback
    },
    _deleteRecord: function (tableName, recordId) {
        $.ajax({
            url: `http://0.0.0.0:4000/api/${tableName}/${recordId}/delete`,
            type: "DELETE"
        });
    },
    init: function () {
        dataHandler._loadData(dom.init);

    },
    getBoards: function (callback) {
        // the boards are retrieved and then the callback function is called with the boards
        let boards = dataHandler._data.boards;
        callback(boards);
    },
    getStatuses: function () {
        // the statuses are retrieved and then the callback function is called with the statuses
        let statuses = dataHandler._data.statuses;
        return statuses;
    },
    getCardsByBoardId: function (boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
        let cardsOfBoard = dataHandler._data.cards.filter(cardObject => cardObject.board_id === boardId);
        callback(cardsOfBoard);
    },
    createNewBoard: function (boardTitle) {
        // creates new board, saves it and calls the callback function with its data
        let newBoard = {title: boardTitle};  // TODO: doesn't work if _data only contains one user's content!!
        dataHandler._saveRecord(newBoard, "boards");
    },
    createNewCard: function (cardTitle, boardId, statusId) {
        // creates new card, saves it and calls the callback function with its data
        let initialStatusId = 1;
        let newCard = {title: cardTitle, board_id: boardId, status_id: initialStatusId};
        dataHandler._saveRecord(newCard, "cards");
    },
    deleteCard: function (cardId) {
        dataHandler._deleteRecord("cards", cardId);
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
    }
    // here comes more features
};
