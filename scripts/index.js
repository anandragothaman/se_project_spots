import { resetValidation, settings } from "../scripts/validation.js";
let initialCards = [
  {
    name: "Golden gate bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];
const profileFormElement = document.forms["edit-profile"];
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#description");
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");
const editModal = document.querySelector("#edit-modal");
const cardsList = document.querySelector(".cards__list");
const postFormElement = document.forms["new-post"];
const postModal = document.querySelector("#post-modal");
const previewModal = document.querySelector("#preview-modal");
const imageLinkInput = document.querySelector("#imageLink");
const captionInput = document.querySelector("#caption");
const previewImage = previewModal.querySelector(".modal__image");
const previewTitle = previewModal.querySelector(".modal__caption");
const modalList = document.querySelectorAll(".modal");

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
  const submitButton = profileFormElement.querySelector(".modal__submit-btn");
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  toggleModal(editModal);
  submitButton.classList.add("modal__button_disabled");
}

function getCardElement(data) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_liked");
  });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

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
  const submitButton = postFormElement.querySelector(".modal__submit-btn");
  const newCard = {};
  newCard.name = captionInput.value;
  newCard.link = imageLinkInput.value;
  const newCardElement = getCardElement(newCard);
  cardsList.prepend(newCardElement);
  toggleModal(postModal);
  evt.target.reset();
  submitButton.classList.add("modal__button_disabled");
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

const profileCloseButton = document.querySelector(".modal__close-edit-btn");
profileCloseButton.addEventListener("click", () => {
  toggleModal(editModal);
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

initialCards.forEach((initialCard) => {
  renderCard(initialCard, "append");
});

const profileAddButton = document.querySelector(".profile__add-btn");
profileAddButton.addEventListener("click", () => {
  toggleModal(postModal);
});

const newPostCloseButton = document.querySelector(".modal__close-post-btn");
newPostCloseButton.addEventListener("click", () => {
  toggleModal(postModal);
});

const previewCloseButton = document.querySelector(".modal__close-type-preview");
previewCloseButton.addEventListener("click", () => {
  toggleModal(previewModal);
});

postFormElement.addEventListener("submit", handlePostFormSubmit);

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
