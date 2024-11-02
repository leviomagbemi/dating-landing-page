const slider = document.querySelector("#reviews-container");
let cardWidth = 322; // card width + margin
let cards;

const reviews = [
  {
    name: "EMILY JOHNSON",
    review:
      "I had a fantastic experience with Rosmon Romance. The platform is user-friendly, and I met some amazing people. Highly recommend!",
    rating: "4.0",
    image: "https://picsum.photos/300/200",
  },
  {
    name: "JAMES SMITH",
    review:
      "Rosmon Romance exceeded my expectations. The matchmaking algorithm is impressive, and I appreciate the thoughtful profiles and genuine connections.",
    rating: "4.0",
    image: "https://picsum.photos/300/200",
  },
  {
    name: "OLIVIA WILSON",
    review:
      "Rosman Romance made online dating enjoyable. The profiles are detailed, and the support team is responsive. It's been a great experience!",
    rating: "5.0",
    image: "https://picsum.photos/300/200",
  },
  {
    name: "SOPHIA DAVIS",
    review:
      "My time on Rosmon Romance has been wonderful. The platform is well-designed, and I've had meaningful interactions with like-minded individuals.",
    rating: "3.0",
    image: "https://picsum.photos/300/200",
  },
  {
    name: "MIA THOMAS",
    review:
      "I'm really impressed with Rosmon Romance. The app is smooth, the profiles are authentic and the matches I've had have been very compatible.",
    rating: "5.0",
    image: "https://picsum.photos/300/200",
  },
  {
    name: "LUCAS ANDERSON",
    review:
      "I am extremely happy with my experience on Rosmon Romance. The platform is beautifully designed and easy to navigate, making it simple to connect with potential matches. The depth of the profiles allows for meaningful interactions, and I've been impressed with the quality of the matches I've received.",
    rating: "5.0",
    image: "https://picsum.photos/300/200",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  reviews.forEach((review) => {
    // Create the main review container
    const reviewDiv = document.createElement("div");
    reviewDiv.classList.add("review");

    // Create the quote container
    const quoteDiv = document.createElement("div");
    quoteDiv.classList.add("quote");
    const quoteImg = document.createElement("img");
    quoteImg.src = "assets/icons/quotes.png";
    quoteImg.alt = "";
    quoteDiv.appendChild(quoteImg);

    // Create the review header
    const reviewHeaderDiv = document.createElement("div");
    reviewHeaderDiv.classList.add("review-header");

    // Create the avatar container
    const avatarDiv = document.createElement("div");
    avatarDiv.classList.add("avatar");
    const avatarImg = document.createElement("img");
    avatarImg.src = review.image;
    avatarImg.alt = "User-avatar";
    avatarDiv.appendChild(avatarImg);

    // Create the user info container
    const userDiv = document.createElement("div");
    userDiv.classList.add("user");
    const userName = document.createElement("h3");
    userName.textContent = review.name;

    // Create the rating container
    const ratingDiv = document.createElement("div");
    ratingDiv.classList.add("rating");
    const ratingImg = document.createElement("span");
    const ratingImage = document.createElement("img");
    ratingImage.src = "assets/icons/rating.png";
    ratingImage.alt = "";
    ratingImg.appendChild(ratingImage);
    ratingDiv.appendChild(ratingImg);
    ratingDiv.appendChild(document.createTextNode(review.rating));

    // Append user name and rating to user div
    userDiv.appendChild(userName);
    userDiv.appendChild(ratingDiv);

    // Append avatar and user div to review header
    reviewHeaderDiv.appendChild(avatarDiv);
    reviewHeaderDiv.appendChild(userDiv);

    // Create the review text container
    const reviewTextDiv = document.createElement("div");
    reviewTextDiv.classList.add("review-text");
    const reviewText = document.createElement("p");
    reviewText.textContent = review.review;
    reviewTextDiv.appendChild(reviewText);

    // Append all parts to the main review div
    reviewDiv.appendChild(quoteDiv);
    reviewDiv.appendChild(reviewHeaderDiv);
    reviewDiv.appendChild(reviewTextDiv);

    // Finally, append the review div to the reviews container
    slider.appendChild(reviewDiv);
  });
});

setTimeout(() => {
  cards = Array.from(slider.querySelectorAll(".review"));

  // Clone first 3 and last 3 cards
  if (cards.length !== 0) {
    cards.forEach((card) => {
      card.style.width = "300px";
      card.style.minWidth = "300px";
      card.style.maxWidth = "300px";
    });

    const firstClones = cards.slice(0, 3).map((card) => card.cloneNode(true));
    const lastClones = cards.slice(-3).map((card) => card.cloneNode(true));

    // Append and prepend clones to the slider
    firstClones.forEach((clone) => slider.appendChild(clone));
    lastClones.forEach((clone) =>
      slider.insertBefore(clone, slider.firstChild)
    );

    // Set initial position to start showing original cards
    slider.style.transform = `translateX(-${cardWidth * 3}px)`;

    // Track the current index for slider position
    let currentIndex = 3;

    function slideCards() {
      currentIndex++;
      slider.style.transition = "transform 0.5s ease";
      slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

      // Reset to the beginning clones if we reach the end
      if (currentIndex === cards.length + 3) {
        setTimeout(() => {
          slider.style.transition = "none"; // Disable transition for instant reset
          currentIndex = 3; // Reset index to original starting point
          slider.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
        }, 500); // Match transition duration
      }

      // Reset to the end clones if we reach the beginning
      if (currentIndex === 0) {
        setTimeout(() => {
          slider.style.transition = "none";
          currentIndex = cards.length;
          slider.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
        }, 500);
      }
    }

    // Start the automatic sliding every 2 seconds
    setInterval(slideCards, 10000);
  }
}, 5000);
