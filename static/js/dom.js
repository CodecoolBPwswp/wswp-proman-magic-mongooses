// It uses data_handler.js to visualize elements
let dom = {
    init: function () {
        dom.loadBoards();
        dom.initNewBoardButton();
        dom.initSaveBoardButton();
        dom.setBoardIdOnNewCardModal();
        dom.initNewCardButton();
        dom.loadAllCards();
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(dom.showBoards);
    },
    initNewCardButton: function () {
        let saveNewCardButton = document.querySelector(`#save-card-button`);// get board id from dataset
        saveNewCardButton.addEventListener("click", function () {
            let newCardModal = document.querySelector('#new-card-modal');
            let boardId = newCardModal.dataset.boardId;
            dom.saveNewCard(boardId);
        })
    },
    setBoardIdOnNewCardModal: function () {
        let newCardButtons = document.getElementsByClassName('new-cards-of-boards');
        for (let i = 0; i < newCardButtons.length; i++) {
            let newCardButton = newCardButtons[i];
            newCardButton.addEventListener('click', function () {
                let boardId = newCardButton.dataset.boardId;
                let newCardModal = document.querySelector('#new-card-modal');
                newCardModal.dataset.boardId = boardId;
                let newCardTitle = document.querySelector("#new-card-title");
                newCardTitle.value = "";
            })
        };
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let boardsContainer = document.querySelector("#boards-div");
        boardsContainer.innerHTML = "";

        for (let boardObject of boards) {
            let boardHTML = templateHandler.renderBoard(boardObject);
            dom.appendToElement(boardsContainer, boardHTML);
        }
        dataHandler.getCardNewStatus(dataHandler.saveCardNewStatus);

    },
    loadCardsByBoard: function (arrayOfBoards) {
        // retrieves cards and makes showCards called
        for (let board of arrayOfBoards) {
            dataHandler.getCardsByBoardId(board["id"], dom.showCards);
        }
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        if (cards.length > 0) {
            let boardId = cards[0].board_id;

            for (let singleCard of cards) {
                let statusId = singleCard.status_id;
                let boardStatusDiv = document.querySelector(`#board-${boardId}-content .board-status-${statusId} .card-container`);
                let cardHTML = templateHandler.renderCard(singleCard);
                dom.appendToElement(boardStatusDiv, cardHTML);
            }
        }

    },
    loadAllCards: function () {
        dataHandler.getBoards(dom.loadCardsByBoard);

    },
    appendToElement: function (elementToExtend, textToAppend, prepend = false) {
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
            if (titleInput === "") {
                alert("Please enter a title");
                return false;
            }
            dataHandler.createNewBoard(titleInput, function () {
                let boardsContainer = document.querySelector("#boards-div");
                let newBoardId = dataHandler.getGreatestId("boards");
                let newBoardHTML = templateHandler.renderBoard(
                    {id: newBoardId, title: titleInput}
                );

                dom.appendToElement(boardsContainer, newBoardHTML);
            });
        })
    },
    saveNewCard: function (boardId) {
        let cardTitleInput = document.querySelector("#new-card-title").value;
        if (cardTitleInput === "") {
            return false;
        }
        let initialStatusId = 1;
        dataHandler.createNewCard(cardTitleInput, boardId, initialStatusId, function () {
            let boardStatusDiv = document.querySelector(`#board-${boardId}-content .board-status-${initialStatusId}`);
            let newCardHTML = templateHandler.renderCard(
                {id: dataHandler.getGreatestId("cards"), title: cardTitleInput}
            );
            dom.appendToElement(boardStatusDiv, newCardHTML);
        });
    },
    initNewBoardButton: function () {
        let newBoardButton = document.querySelector("#new-board-button");
        newBoardButton.addEventListener("click", function () {
            let boardTitleInput = document.querySelector("#new-board-title");
            boardTitleInput.value = "";
        })
    }
};
