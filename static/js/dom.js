// It uses data_handler.js to visualize elements
let dom = {
    loadBoards: function() {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(dom.showBoards);
    },
    showBoards: function(boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let boardsHTML = [];
        for (let boardObject of boards) {
            boardsHTML.push(templateHandler.render(boardObject));
        }
        let allBoardsHTML = boardsHTML.join("\n\n");

        let boardsContainer = document.querySelector("#boards-div");

        boardsContainer.innerHTML = allBoardsHTML;

    },
    loadCards: function(boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function(cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
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
                let newBoardHTML = templateHandler.render(
                    {id: dataHandler.getBoards(dataHandler.getNextId), title: titleInput}
                    );

                dom.appendToElement(boardsContainer, newBoardHTML);
            });
        })
    },

    // here come some more features
};
