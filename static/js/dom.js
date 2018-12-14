// It uses data_handler.js to visualize elements
let dom = {
    init: function () {
        dom.loadBoards();
        dom.initNewBoardButton();
        dom.initSaveBoardButton();
        dom.setBoardIdOnNewCardModal();
        dom.initNewCardButton();
        dom.loadAllCards();
        dom.initDeleteCardButtons();
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
        }
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let boardsContainer = document.querySelector("#boards-div");
        boardsContainer.innerHTML = "";

        for (let boardObject of boards) {
            templateHandler.renderBoard(boardObject, dom.appendNewBoard);
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
                templateHandler.renderCard(singleCard, function (renderedCard) {
                    dom.appendNewCard(renderedCard, boardId, statusId)
                });
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

        for (let childNode of fakeDiv.childNodes) {
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
            dataHandler.createNewBoard(titleInput);
        })
    },
    saveNewCard: function (boardId) {
        let cardTitleInput = document.querySelector("#new-card-title").value;
        if (cardTitleInput === "") {
            return false;
        }
        dataHandler.createNewCard(cardTitleInput, boardId)
    },
    initNewBoardButton: function () {
        let newBoardButton = document.querySelector("#new-board-button");
        newBoardButton.addEventListener("click", function () {
            let boardTitleInput = document.querySelector("#new-board-title");
            boardTitleInput.value = "";
        })
    },
    initDeleteCardButtons: function () {
        let deleteCardButtons = document.querySelectorAll(".delete-buttons-of-cards");
        for (let deleteCardButton of deleteCardButtons) {
              deleteCardButton.addEventListener("click", function () {
                  let cardId = deleteCardButton.dataset.cardId;
                  dataHandler.deleteCard(cardId);
                  dom.removeCard(cardId);
              })
        }
    },
    removeCard: function (cardId) {
        let cardToRemove = document.querySelector(`#card-${cardId}`);
        $(cardToRemove).remove();
    },
    setDeleteButtonOnNewCard: function (cardId) {
        let deleteCardButton = document.querySelector(`#delete-card-button-${cardId}`);
        deleteCardButton.addEventListener("click", function () {
            dataHandler.deleteCard(cardId);
            dom.removeCard(cardId);
        })
    },
    appendNewBoard: function (boardHTML) {
        let boardContainer = document.querySelector("#boards-div");
        dom.appendToElement(boardContainer, boardHTML);
    },
    appendNewCard: function (cardHTML, boardId, statusId) {
        let boardStatusDiv = document.querySelector(`#board-${boardId}-content .board-status-${statusId} .card-container`);
        dom.appendToElement(boardStatusDiv, cardHTML);
    }
};
