let templateHandler = {
    render: function(board) {
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
            <p><button class="btn btn-success">New Card</button></p>
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
            <div class="board-status-new card-container col-sm-3"></div>
            <div class="board-status-in-progress card-container col-sm-3"></div>
            <div class="board-status-testing card-container col-sm-3"></div>
            <div class="board-status-done card-container col-sm-3"></div>
          </div>
        </div>
      </div>
      `;
      return boardTemplate;
  },
};