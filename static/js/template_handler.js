let templateHandler = {
    renderBoard: function(board, callback) {
      let boardTitle = board.title;
      let boardID = board.id;
      let arrayOfStatuses = dataHandler.getStatuses();
      let boardTemplate =
          `
      <div class="board-container" data-board-id="${boardID}">
        <div class="board-header row collapsed" data-toggle="collapse" data-target="#board-${boardID}-content">
          <div class="heading-text col-7 col-sm-9">
            <p>${boardTitle}</p>
          </div>
          <div class="col-4 col-sm-3">
            <p><button class="btn btn-info new-cards-of-boards"
                       id="new-card-button-board-${boardID}"
                       data-toggle="modal" 
                       data-target="#new-card-modal" 
                       data-board-id="${boardID}">New Card</button></p>
          </div>
        </div>
        <div id="board-${boardID}-content" class="row collapse">
          <div class="board-status board-status-1 col-sm-6 col-md-3">
            <div class="status-head">${arrayOfStatuses[0]["name"]}</div>
            <div class="card-container" data-status-id="1"></div>
          </div>
          <div class="board-status board-status-2 col-sm-6 col-md-3">
            <div class="status-head">${arrayOfStatuses[1]["name"]}</div>
            <div class="card-container" data-status-id="2"></div>
          </div>
          <div class="board-status board-status-3 col-sm-6 col-md-3">
            <div class="status-head">${arrayOfStatuses[2]["name"]}</div>
            <div class="card-container" data-status-id="3"></div>
          </div>
          <div class="board-status board-status-4 col-sm-6 col-md-3">
            <div class="status-head">${arrayOfStatuses[3]["name"]}</div>
            <div class="card-container" data-status-id="4"></div>
          </div>
        </div>
      `;
      callback(boardTemplate);
    },
    renderCard: function (card, callback) {
        let cardTitle = card.title;
        let cardId = card.id;
        let cardBoardId = card.board_id;
        let cardTemplate =
            `
            <div class="task-card col-sm-12"
                 id="card-${cardId}"
                 data-card-id="${cardId}"
                 data-board-id="${cardBoardId}">
                <div class="d-flex justify-content-between align-items-center">
                    <p class="card-paragraph">${cardTitle}</p>
                    <p class="card-paragraph"><i class="btn fa fa-trash fa-fw delete-buttons-of-cards"
                       id="delete-card-button-${cardId}"
                       data-card-id="${cardId}"></i></p>
                </div>                             
            </div>
            `;
        callback(cardTemplate);
    }
};