let templateHandler = {
    renderBoard: function(board) {
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
            <p><button class="btn btn-info"
                       id="new-card-button-board-${boardID}" 
                       data-toggle="modal" 
                       data-target="#new-card-modal" 
                       data-board-id="${boardID}">New Card</button></p>
          </div>
        </div>
        <div id="board-${boardID}-content" class="row collapse">
          <div class="board-status board-status-1 col-sm-6 col-md-3">
            <div class="status-head">${arrayOfStatuses[0]["name"]}</div>
            <div class="card-container"></div>
          </div>
          <div class="board-status board-status-2 col-sm-6 col-md-3">
            <div class="status-head">${arrayOfStatuses[1]["name"]}</div>
            <div class="card-container"></div>
          </div>
          <div class="board-status board-status-3 col-sm-6 col-md-3">
            <div class="status-head">${arrayOfStatuses[2]["name"]}</div>
            <div class="card-container"></div>
          </div>
          <div class="board-status board-status-4 col-sm-6 col-md-3">
            <div class="status-head">${arrayOfStatuses[3]["name"]}</div>
            <div class="card-container"></div>
          </div>
        </div>
      `;
      return boardTemplate;
    },
    renderCard: function (card) {
        let cardTitle = card.title;
        let cardTemplate =
            `
            <div class="task-card col-sm-12">
                ${cardTitle}
            </div>
            `;
        return cardTemplate;
    }
};