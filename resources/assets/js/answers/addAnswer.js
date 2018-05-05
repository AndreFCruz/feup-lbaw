var ajax = require('../ajax.js');
var alert = require('../alerts.js');

export function addAnswerRequest(message_id) {

    let contentSelector = ".new-answer-content[data-message-id='" + message_id + "']";

    let contentNode = document.querySelector(contentSelector);
    if (contentNode == null || contentNode.value == "")
        return;

    let requestBody = {
        "content": contentNode.value,
        "commentable": message_id
    };

    /*ajax.sendAjaxRequest(
        'post', getCommentsURL(message_id), requestBody, (data) => {
            addCommentHandler(data.target, message_id);
        }
    );*/
}

function addAnswerHandler(response, message_id) {
    if (response.status == 403) {
        alert.displayError("You have no permission to execute this action");
        return;
    }
    else if (response.status != 200) {
        alert.displayError("Failed to add a new Answer");
        return;
    }

    // TODO
}