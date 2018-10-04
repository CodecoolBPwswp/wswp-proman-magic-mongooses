// It is just an idea how you can structure your data during your page is running.
// You can use it for testing purposes by simply copy/paste/run in the Console tab in your browser

let keyInLocalStorage = 'proman-data';

let demoData = {
    "statuses": [
        {
            "id": 1,
            "name": "Todo"
        },
        {
            "id": 2,
            "name": "In progress"
        },
        {
            "id": 3,
            "name": "Might be ready"
        },
        {
            "id": 4,
            "name": "Done for sure"
        }
    ],
    "boards": [
        {
            "id": 1,
            "title": "Death Star",
            "is_active": true
        },
        {
            "id": 2,
            "title": "Dealing with Rebels",
            "is_active": true
        },
        {
            "id": 3,
            "title": "Outfit",
            "is_active": true
        }
    ],
    "cards": [
        {
            "id": 1,
            "title": "destroy Endor",
            "board_id": 1,
            "status_id": 1,
            "order": 3
        },
        {
            "id": 2,
            "title": "engage weapon system",
            "board_id": 1,
            "status_id": 2,
            "order": 2
        },
        {
            "id": 3,
            "title": "deploy Death Star skeleton to space",
            "board_id": 1,
            "status_id": 4,
            "order": 1
        },
        {
            "id": 4,
            "title": "finding every rebel base",
            "board_id": 2,
            "status_id": 1,
            "order": 3
        },
        {
            "id": 5,
            "title": "turning Luke to the dark side",
            "board_id": 2,
            "status_id": 2,
            "order": 2
        },
        {
            "id": 6,
            "title": "killing Obi-Wan",
            "board_id": 2,
            "status_id": 3,
            "order": 1
        },
        {
            "id": 7,
            "title": "getting a warmer robe",
            "board_id": 3,
            "status_id": 1,
            "order": 2
        },
        {
            "id": 8,
            "title": "showing my face more often",
            "board_id": 3,
            "status_id": 2,
            "order": 1
        }
    ]
};

localStorage.setItem(keyInLocalStorage, JSON.stringify(demoData));

