import { getCommentsURL } from './comments.js'

export function viewCommentsRequest(message_id) {

    let commentSelector = ".answer-comments[data-message-id='" + message_id + "']";

    // If area already expanded, its only closing, so not worth making ajax request
    if (document.querySelector(commentSelector).classList.contains('show')) {
        toggleShowMsg(message_id, true);
        return;
    }

    ajax.sendAjaxRequest(
        'get', getCommentsURL(message_id), {}, (data) => {
            commentsHandler(data.target, message_id);
        }
    );
}

function commentsHandler(response, message_id) {
    let comments = JSON.parse(response.responseText);

    createComments(comments, message_id);
}

function createComments(comments, message_id) {

    //TODO - mby this should not be needed, handled outside and not after request
    if (comments.length == 0)
        return;

    // Direct comments container
    let secondDiv = document.createElement("div");
    secondDiv.classList.add("d-flex");
    secondDiv.classList.add("list-group");
    secondDiv.classList.add("list-group-flush");

    for (let i = 0; i < comments.length; ++i)
        secondDiv.appendChild(createCommentHTML(comments[i]));

    let firstDiv = document.createElement("div");
    firstDiv.classList.add("card-footer");
    firstDiv.classList.add("comments-card");
    firstDiv.appendChild(secondDiv);

    let commentSelector = ".answer-comments[data-message-id='" + message_id + "']";
    let final = document.querySelector(commentSelector);
    if (final.firstChild == null)
        final.appendChild(firstDiv);
    else
        final.replaceChild(firstDiv, final.firstChild);

    toggleShowMsg(message_id, false);
}

function createCommentHTML(comment) {

    let paragraph = document.createElement("p");
    paragraph.classList.add("text-center");
    paragraph.classList.add("mb-0"); 
    paragraph.classList.add("w-100");
    paragraph.appendChild(document.createTextNode(comment.score));

    let votes = document.createElement("div");
    votes.classList.add("col-1");
    votes.classList.add("my-auto"); 
    votes.classList.add("text-center");
    votes.appendChild(paragraph);

    let content = document.createElement("p");
    content.classList.add("px-2");
    content.appendChild(document.createTextNode(comment.content.version));

    let author = document.createElement("p");
    author.classList.add("discrete");
    author.classList.add("text-right");
    author.appendChild(document.createTextNode(comment.author));

    let contentDiv = document.createElement("div");
    contentDiv.classList.add("pl-3");
    contentDiv.classList.add("my-1");
    contentDiv.classList.add("col-11");
    contentDiv.appendChild(content);
    contentDiv.appendChild(author);

    let forthDiv = document.createElement("div");
    forthDiv.classList.add("mx-sm-0");
    forthDiv.classList.add("row");
    forthDiv.appendChild(votes);
    forthDiv.appendChild(contentDiv);

    let thirdDiv = document.createElement("div");
    thirdDiv.classList.add("list-group-item");
    thirdDiv.classList.add("px-0");
    thirdDiv.classList.add("bg-transparent");
    thirdDiv.appendChild(forthDiv);

    return thirdDiv;
}

/**
 * 
 * @param {String} message_id 
 * @param {boolean} show - If true, it's supposed to to 'Show Comments' , if false it's supposed to 'Hide Comments'
 */
function toggleShowMsg(message_id, show) {
    let toggler = document.querySelector("a[aria-controls='AnswerComments" + message_id + "']");

    toggler.innerHTML = (show ? "Show" : "Hide") + " Comments";
}