// It uses data_handler.js to visualize elements
let dom = {
    loadBoards: function() {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(dom.showBoards);
    },
    showBoards: function(boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let boardsContainer = document.querySelector("#boards-div");
        boardsContainer.innerHTML = "";

        for (let boardObject of boards) {
            let boardHTML = templateHandler.renderBoard(boardObject);
            dom.appendToElement(boardsContainer, boardHTML);
        }
    },
    loadCardsByBoard: function(arrayOfBoards) {
        // retrieves cards and makes showCards called
        for (let board of arrayOfBoards) {
            dataHandler.getCardsByBoardId(board["id"], dom.showCards);
        }
    },
    showCards: function(cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        if (cards.length > 0) {
                let boardId = cards[0].board_id;

            for (let singleCard of cards) {
                let statusId = singleCard.status_id;
                let boardStatusDiv = document.querySelector(`#board-${boardId}-content .board-status-${statusId}`);
                let cardHTML = templateHandler.renderCard(singleCard);
                dom.appendToElement(boardStatusDiv, cardHTML);
            }
        }
    },
    loadAllCards: function () {
        dataHandler.getBoards(dom.loadCardsByBoard);

    },
    appendToElement: function(elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    },
    initSaveBoardButton: function () {
        let button = document.querySelector("#save-board-button");

        button.addEventListener("click", function () {
            let titleInput = document.querySelector("#new-board-title").value;
            dataHandler.createNewBoard(titleInput, function () {
                let boardsContainer = document.querySelector("#boards-div");
                let newBoardHTML = templateHandler.renderBoard(
                    {id: dataHandler.getGreatestId("boards"), title: titleInput}
                    );

                dom.appendToElement(boardsContainer, newBoardHTML);
            });
        })
    },
    initSaveNewCardButton: function () {
        let cardTitleInput = document.querySelector("#new-card-title").value;
        let boardIdOfCard = Number(document.querySelector("#new-card-button").dataset.boardId);
        let initialStatusId = 1;
        dataHandler.createNewCard(cardTitleInput, boardIdOfCard, initialStatusId, function () {
            let boardStatusDiv = document.querySelector(`#board-${boardIdOfCard}-content .board-status-${initialStatusId}`);
            let newCardHTML = templateHandler.renderCard(
                {id: dataHandler.getGreatestId("cards"), title: cardTitleInput}
                );
            dom.appendToElement(boardStatusDiv, newCardHTML);
        })
    }

    // here come some more features
};
