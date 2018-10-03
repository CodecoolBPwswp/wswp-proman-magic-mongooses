let templateHandler = {
    renderBoard: function(board) {
      let boardTitle = board.title;
      let boardID = board.id;
      let boardTemplate =
          `
      <div class="board-container" data-board-id="${boardID}">
        <div class="board-header row collapsed" data-toggle="collapse" data-target="#board-${boardID}-content">
          <div class="col-sm-10 col-md-8">
            <p>${boardTitle}</p>
          </div>
          <div class="col-sm-2 col-md-4">
            <p><button class="btn btn-success"
                       id="new-card-button" 
                       data-toggle="modal" 
                       data-target="#new-card-modal" 
                       data-board-id="${boardID}">New Card</button></p>
          </div>
        </div>
        <div id="board-${boardID}-content" class="collapse">
          <div class="status-header row">
            <div class="status-head col-sm-3">New</div>
            <div class="status-head col-sm-3">In progress</div>
            <div class="status-head col-sm-3">Testing</div>
            <div class="status-head col-sm-3">Done</div>
          </div>
          <div class="status-content row">
            <div class="board-status-1 card-container col-sm-3"></div>
            <div class="board-status-2 card-container col-sm-3"></div>
            <div class="board-status-3 card-container col-sm-3"></div>
            <div class="board-status-4 card-container col-sm-3"></div>
          </div>
        </div>
      </div>
      `;
      return boardTemplate;
    },
    renderCard: function (card) {
        let cardTitle = card.title;
        let cardTemplate =
            `
            <div class="card">
                <p>${cardTitle}</p>
            </div>
            `;
        return cardTemplate;
    },
    initNewCardModal: function () {
        $("#new-card-modal").on("shown.bs.modal", dom.initSaveNewCardButton);
    }
};