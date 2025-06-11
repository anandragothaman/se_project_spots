import "./index.css";
import Api from "../utils/Api.js";
import { setButtonText } from "../utils/helpers.js";
import {
  toggleButtonState,
  resetValidation,
  settings,
  enableValidation,
} from "../scripts/validation.js";
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9cdd6a42-f1f2-470f-aae3-a3aeb4ec8482",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach((initialCard) => {
      renderCard(initialCard, "append");
    });
    profileNameElement.textContent = userInfo.name;
    profileJobElement.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
  })
  .catch((err) => {
    console.error(err);
  });

const profileFormElement = document.forms["edit-profile"];
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#description");
const profileAvatar = document.querySelector(".profile__avatar");
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");
const editModal = document.querySelector("#edit-modal");
const avatarForm = document.forms["edit-avatar-form"];
const avatarInput = document.querySelector("#profile-avatar-input");
const avatarModal = document.querySelector("#avatar-modal");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = document.forms["delete-form"];
const cancelDeleteBtn = document.querySelector(".modal__cancel-btn");
const cardsList = document.querySelector(".cards__list");
const postFormElement = document.forms["new-post"];
const postModal = document.querySelector("#post-modal");
const previewModal = document.querySelector("#preview-modal");
const imageLinkInput = document.querySelector("#imageLink");
const captionInput = document.querySelector("#caption");
const previewImage = previewModal.querySelector(".modal__image");
const previewTitle = previewModal.querySelector(".modal__caption");
const modalList = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".modal__close-btn");
let selectedCard, selectedCardId;

function toggleModal(modal) {
  modal.classList.toggle("modal_opened");
  handleKeydownEvent(modal);
}

function handleKeydownEvent(modal) {
  if (modal.classList.contains("modal_opened")) {
    document.addEventListener("keydown", closeModalOnEscape);
  } else {
    document.removeEventListener("keydown", closeModalOnEscape);
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  api
    .editUserInfo({ name: nameInput.value, about: jobInput.value })
    .then((data) => {
      profileNameElement.textContent = data.name;
      profileJobElement.textContent = data.about;
      toggleModal(editModal);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function getCardElement(data) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  if (data.isLiked) {
    cardLikeButton.classList.add("card__like-button_liked");
  }
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardLikeButton.addEventListener("click", (evt) => handleLike(evt, data._id));

  cardDeleteButton.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id)
  );

  function handleDeleteCard(cardElement, cardId) {
    selectedCard = cardElement;
    selectedCardId = cardId;
    toggleModal(deleteModal);
  }

  cancelDeleteBtn.addEventListener("click", () => {
    toggleModal(deleteModal);
  });

  function handleLike(evt, id) {
    const isLiked = evt.target.classList.contains("card__like-button_liked");
    api
      .changeLikeStatus(id, isLiked)
      .then(() => {
        evt.target.classList.toggle("card__like-button_liked");
      })
      .catch((err) => console.error(err));
  }

  cardImage.addEventListener("click", () => {
    previewImage.src = cardImage.src;
    previewImage.alt = cardImage.alt;
    previewTitle.textContent = data.name;
    toggleModal(previewModal);
  });
  return cardElement;
}

function handlePostFormSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  api
    .addNewCards({ name: captionInput.value, link: imageLinkInput.value })
    .then((data) => {
      const newCard = {};
      newCard.name = data.name;
      newCard.link = data.link;
      renderCard(data, "prepend");
      toggleModal(postModal);
      evt.target.reset();
      toggleButtonState([captionInput, imageLinkInput], submitBtn, settings);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  api
    .editAvatarInfo({ avatar: avatarInput.value })
    .then((data) => {
      profileAvatar.src = data.avatar;
      toggleModal(avatarModal);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Delete", "Deleting...");
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      toggleModal(deleteModal);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      setButtonText(submitBtn, false, "Delete", "Deleting...");
    });
}

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}

const editProfileButton = document.querySelector(".profile__edit-btn");
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  resetValidation(profileFormElement, [nameInput, jobInput], settings);
  toggleModal(editModal);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => toggleModal(popup));
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

const profileAddButton = document.querySelector(".profile__add-btn");
profileAddButton.addEventListener("click", () => {
  toggleModal(postModal);
});

postFormElement.addEventListener("submit", handlePostFormSubmit);

avatarModalBtn.addEventListener("click", () => {
  toggleModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

deleteForm.addEventListener("submit", handleDeleteSubmit);

function closeModalOnOverlay(evt, modal) {
  if (evt.target === modal) {
    toggleModal(modal);
  }
}

function closeModalOnEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      toggleModal(openedModal);
    }
  }
}

modalList.forEach((modal) => {
  modal.addEventListener("click", (evt) => closeModalOnOverlay(evt, modal));
});

enableValidation(settings);
