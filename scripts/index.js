const initialCards = [
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
const profileFormElement = document.querySelector("#edit-profile");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#description");
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");

function toggleEditModal() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  const modalContainer = document.querySelector("#edit-modal");
  modalContainer.classList.toggle("modal__opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  toggleEditModal();
}

function getCardElement(data) {
  const cardsList = document.querySelector(".cards_list");
  for (let i = 0; i < data.length; i++) {
    const cardTemplate = document.querySelector("#card").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__image").src = data[i].link;
    cardElement.querySelector(".card__image").alt = data[i].name;
    cardElement.querySelector(".card__title").textContent = data[i].name;
    cardsList.append(cardElement);
  }
}
getCardElement(initialCards);

const editProfileButton = document.querySelector(".profile__edit-btn");
editProfileButton.addEventListener("click", toggleEditModal);

const closeModalButton = document.querySelector(".modal__close-btn");
closeModalButton.addEventListener("click", toggleEditModal);

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
