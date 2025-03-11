let initialCards = [
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
const imageLinkInput = document.querySelector("#imageLink");
const captionInput = document.querySelector("#caption");

function toggleModal(modal) {
  if (modal.id === "edit-modal") {
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileJobElement.textContent;
  } else {
    captionInput.value = "";
    imageLinkInput.value = "";
  }
  modal.classList.toggle("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  toggleModal(editModal);
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
    cardDeleteButton.closest(".card").remove();
  });
  return cardElement;
}

function handlePostFormSubmit(evt) {
  evt.preventDefault();
  const newCard = { name: String, link: String };
  newCard.name = captionInput.value;
  newCard.link = imageLinkInput.value;
  const newCardElement = getCardElement(newCard);
  cardsList.prepend(newCardElement);
  toggleModal(postModal);
}

const editProfileButton = document.querySelector(".profile__edit-btn");
editProfileButton.addEventListener("click", () => {
  toggleModal(editModal);
});

const closeModalButton = document.querySelector(".modal__close-edit-btn");
closeModalButton.addEventListener("click", () => {
  toggleModal(editModal);
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

initialCards.forEach((initialCard) => {
  const cardElement = getCardElement(initialCard);
  cardsList.append(cardElement);
});

const addProfileButton = document.querySelector(".profile__add-btn");
addProfileButton.addEventListener("click", () => {
  toggleModal(postModal);
});

const closeEditModalButton = document.querySelector(".modal__close-post-btn");
closeEditModalButton.addEventListener("click", () => {
  toggleModal(postModal);
});

postFormElement.addEventListener("submit", handlePostFormSubmit);
