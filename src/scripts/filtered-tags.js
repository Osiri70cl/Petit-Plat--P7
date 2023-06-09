// List tags item
const listTagsItem = document.querySelectorAll(".list-tags-item");

//filtered tags
const filteredTagsList = document.querySelector(".filtered-tags-list");
const filteredTagsItem = document.getElementsByClassName("filtered-tags-item");

let filteredTagsArr = [];
let filteredTagValue;

let tagBgColorArray = [];
let tagBgColor;

function addNewTag(event, tagBgColor) {
  filteredTagValue = event.target.dataset.value;
  if (filteredTagsArr.includes(filteredTagValue)) {
    return;
  } else {
    filteredTagsArr.push(filteredTagValue);
    tagBgColor = event.target.dataset.color;
    tagBgColorArray.push(tagBgColor);

    renderFilteredTags();
    handlerRequestByTags();
  }
  console.log(filteredTagsArr);
}

function renderFilteredTags() {
  let newTag = "";
  for (let i = 0; i < filteredTagsArr.length; i++) {
    newTag += `
        <li class="filtered-tags-item list-group-item bg-${tagBgColorArray[i]}"
           data-tag="#${i}">
                ${filteredTagsArr[i]}
            <button class="filtered-tags-btn" type="button" aria-label="Supprimer le tag" onclick="deleteTag(${i})"></button>
        </li>`;
  }
  //adding new tag inside ul tag
  filteredTagsList.innerHTML = newTag;
  closeAllDropdowns();
}

function deleteTag(index) {
  // delete or remove the tag name
  filteredTagsArr.splice(index, 1);
  // delete or remove the tag color
  tagBgColorArray.splice(index, 1);

  renderFilteredTags();
  handlerRequestByTags();
  console.log(filteredTagsArr);
}
