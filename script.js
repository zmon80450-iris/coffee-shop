/*1. navigation*/
/*1.1 mobile Menu*/
document.addEventListener("DOMContentLoaded", () => {

    const mobileMenu = document.getElementById("mobileMenu");
    const navLinks = document.getElementById("navLinks");

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const icon = mobileMenu.querySelector("i");
            if (icon) {    /*menu click → nav show/hide*/
                if (navLinks.classList.contains("active")) {
                    icon.classList.remove("bi-list"); /*when active*/
                    icon.classList.add("bi-x");
                } else {

                    icon.classList.remove("bi-x"); /* when get out*/
                    icon.classList.add("bi-list");
                }
            }
        });
    }
});

/*2. coffee selection page*/

/*2.1 card scroll animation*/
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.coffee-card');

    const observerOptions = {
        root: null,
        threshold: 0.15
    };

    const cardObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);


    cards.forEach(card => {
        cardObserver.observe(card);
    });
});


/* 2.2 see more/ see less*/
document.addEventListener('DOMContentLoaded', function () {
    const containers = document.querySelectorAll('.sele-container');
    const initialItems = 2;      /* only 2 before click see more*/

    containers.forEach(container => {
        const grid = container.querySelector('.sele-grid');
        const cards = grid.querySelectorAll('.coffee-card');

        const wrapper = container.nextElementSibling;
        let seeMoreBtn = null;
        if (wrapper && wrapper.classList.contains('see-more-wrapper')) {
            seeMoreBtn = wrapper.querySelector('.see-more-btn');
        }

        cards.forEach((card, index) => {
            if (index >= initialItems) {
                card.classList.add('hidden');   /*extra cards hide*/
            }
        });

        if (seeMoreBtn) {
            seeMoreBtn.addEventListener('click', function () {
                this.classList.toggle('active');
                const isExpanded = this.classList.contains('active');

                cards.forEach((card, index) => {
                    if (index >= initialItems) {
                        if (isExpanded) {
                            card.classList.remove('hidden');
                            setTimeout(() => {
                                card.classList.add('show');
                            }, 50);
                        } else {
                            card.classList.remove('show');
                            card.classList.add('hidden');
                        }
                    }
                });

                if (isExpanded) {     /*button text change*/
                    this.innerHTML = `See Less <i class="bi bi-chevron-down arrowIcon"></i>`;
                } else {
                    this.innerHTML = `See More <i class="bi bi-chevron-down arrowIcon"></i>`;
                }
            });
        }
    });
});


/* 2.3 Search & filter*/
document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;
    const cards = document.querySelectorAll(".coffee-card");
    const filterBtns = document.querySelectorAll(".control-btn");

    const seeMoreBtns = document.querySelectorAll(".see-more-wrapper");
    const sectionTitles = document.querySelectorAll(".powder");

    let currentFilter = "all";

    function updateDisplay() {

        const keyword = searchInput.value.toLowerCase().trim();

        let hasSearch = keyword.length > 0;

        cards.forEach(card => {

            const title = card.querySelector(".item")?.innerText.toLowerCase() || "";
            const desc = card.querySelector(".desc")?.innerText.toLowerCase() || "";
            const category = card.dataset.name?.toLowerCase() || "";

            const matchSearch =
                title.includes(keyword) ||
                desc.includes(keyword) ||
                category.includes(keyword);

            const matchFilter =
                currentFilter === "all" ||
                card.classList.contains(currentFilter);

            // 🔥 SEARCH MODE
            if (hasSearch) {
                if (matchSearch) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            }
            // 🔥 FILTER MODE
            else {
                if (matchFilter) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            }
        });

        // 🔥 titles + see more control
        if (hasSearch || currentFilter !== "all") {

            seeMoreBtns.forEach(btn => btn.style.display = "none");
            sectionTitles.forEach(title => title.style.display = "none");

        } else {

            seeMoreBtns.forEach(btn => btn.style.display = "block");
            sectionTitles.forEach(title => title.style.display = "block");
        }
    }

    // filter UI part
    if (currentFilter !== "all") {
        seeMoreBtns.forEach(btn => btn.style.display = "none");
        sectionTitles.forEach(title => title.style.display = "none");
    } else {
        seeMoreBtns.forEach(btn => btn.style.display = "block");
        sectionTitles.forEach(title => title.style.display = "block");
    }


    searchInput.addEventListener("input", updateDisplay);

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {

            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            currentFilter = btn.dataset.filter;
            updateDisplay();
        });
    });
});

/*2.4 heart icon in coffee selection*/
document.querySelectorAll(".wish-btn").forEach(btn => {

    btn.addEventListener("click", function (e) {

        e.stopPropagation();

        this.classList.toggle("active");

        const icon = this.querySelector("i");

        if (this.classList.contains("active")) {
            icon.classList.remove("bi-heart");
            icon.classList.add("bi-heart-fill");
        } else {
            icon.classList.remove("bi-heart-fill");
            icon.classList.add("bi-heart");
        }

    });

});

/* 3. event page*/
/* 3.1 open registration*/
function openRegister(eventName) {
    document.getElementById("selectedEvent").value = eventName;
    document.getElementById("registerModal").style.display = "flex";
}

/* 3.2 close registration*/
function closeRegister() {
    document.getElementById("registerModal").style.display = "none";
}
/*3.3 open success*/
function submitForm(event) {
    event.preventDefault();
    closeRegister();
    document.getElementById("successModal").style.display = "flex";
}

/*3.4 close success*/
function closeSuccessModal() {
    document.getElementById("successModal").style.display = "none";
}

/*3.5 event search bar*/

function searchEvents() {
    let filterValue = document.getElementById("eventSearch").value.toLowerCase();
    let cards = document.querySelectorAll(".w_card");

    cards.forEach(card => {
        let textContext = card.getAttribute("data-title");
        if (textContext.includes(filterValue)) {
            card.style.display = "flex";
            card.classList.add("fade-in-animate");
        } else {
            card.style.display = "none";
        }
    });
}

/*3.6 category filter*/
function filterCategory(category, button) {
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    let cards = document.querySelectorAll(".w_card");
    cards.forEach(card => {
        if (category === "all" || card.classList.contains(category)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

/* ့home page*/
/*4.1 Welcome Discount */
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");

    if (modal) {
        modal.style.display = "flex";
    }

    // Swiper
    if (document.querySelector(".coffee-slider")) {
        new Swiper(".coffee-slider", {

            loop: true,

            speed: 1200,

            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },

            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            }
        });
    }

    // Click outside modal
    window.onclick = function (e) {
        const modal = document.getElementById("modal");

        if (modal && e.target === modal) {
            closeModal();
        }
    };
});

/* subscribe Function */
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function subscribe() {
    const email = document.getElementById("email").value.trim();

    if (email === "") {
        alert("Please enter your email.");
        return;
    }

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    closeModal();

    const toast = document.getElementById("toast");
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

/*4.5 about our story*/
document.addEventListener("DOMContentLoaded", function () {
    const aboutImage = document.querySelector(".about-image");
    if (!aboutImage) return;

    const aboutText = document.querySelector(".about-text");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                aboutImage.classList.add("appear");
                if (aboutText) aboutText.classList.add("appear");
            } else {
                aboutImage.classList.remove("appear");
                if (aboutText) aboutText.classList.remove("appear");
            }
        });
    }, {
        threshold: 0.15
    });
    observer.observe(aboutImage);
});

/*5. Product Cart*/

/*5.1 add coffee product to cart*/

document.addEventListener('DOMContentLoaded', function () {
    const catalogContainers = document.querySelectorAll('.sele-container');

    if (catalogContainers.length === 0) {
        return;
    }

    catalogContainers.forEach(function (catalogGrid) {
        catalogGrid.addEventListener('click', function (e) {
            if (e.target.classList.contains('add_cart')) {
                const card = e.target.closest('.coffee-card');
                const title = card.querySelector('.item').innerText;

                const price = card.querySelector('.price').innerText.replace('$', '').replace('Price:', '').trim();
                const imgSrc = card.querySelector('.image-box img').src;

                const product = {
                    title: title,
                    price: price,
                    imgSrc: imgSrc,
                    quantity: 1
                };

                let cart = JSON.parse(localStorage.getItem('productCart')) || [];
                const existingProductIndex = cart.findIndex(item => item.title === product.title);

                if (existingProductIndex > -1) {
                    cart[existingProductIndex].quantity += 1;
                } else {
                    cart.push(product);
                }

                localStorage.setItem('productCart', JSON.stringify(cart));

                Swal.fire({
                    icon: 'success',
                    title: 'Added to Cart!',
                    text: `${title} has been added to your cart.`,
                    background: '#fffaf5',
                    color: '#5c4033',
                    iconColor: '#6f4e37',
                    confirmButtonColor: '#6f4e37',
                    timer: 1800,
                    showConfirmButton: false
                });
            }
        });
    });
});

/*6 equipment*/
document.addEventListener('DOMContentLoaded', function () {
    const catalogContainers = document.querySelectorAll('.equipment-container');

    if (catalogContainers.length === 0) {
        console.log("can't find container");
        return;
    }

    catalogContainers.forEach(function (catalogGrid) {
        catalogGrid.addEventListener('click', function (e) {
            if (e.target.classList.contains('action-btn')) {
                const card = e.target.closest('.equipment-card');
                const title = card.querySelector('.Title').innerText;

                const price = card.querySelector('.eprice').innerText.replace('$', '').replace('Price:', '').trim();
                const imgSrc = card.querySelector('img').src; // Variable name မှန်အောင် ပြင်ဆင်ပြီး

                const product = {
                    title: title,
                    price: price,
                    imgSrc: imgSrc,
                    quantity: 1
                };

                let cart = JSON.parse(localStorage.getItem('productCart')) || [];
                const existingProductIndex = cart.findIndex(item => item.title === product.title);

                if (existingProductIndex > -1) {
                    cart[existingProductIndex].quantity += 1;
                } else {
                    cart.push(product);
                }

                localStorage.setItem('productCart', JSON.stringify(cart));

                Swal.fire({
                    icon: 'success',
                    title: 'Added to Cart!',
                    text: `${title} has been added to your cart.`,
                    background: '#fffaf5',
                    color: '#5c4033',
                    iconColor: '#6f4e37',
                    confirmButtonColor: '#6f4e37',
                    timer: 1800,
                    showConfirmButton: false
                });
            }
        });
    });
});



/* OFFER PAGE MOTION */
document.addEventListener("DOMContentLoaded", () => {

    const offerElements = document.querySelectorAll(
        ".offer-header, .offer-card, .discount-card, .latte, .reward-left, .reward-item, .plan-card, .benefit-card"
    );


    const offerObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry, index) => {

            if(entry.isIntersecting){

                setTimeout(() => {
                    entry.target.classList.add("offer-show");
                }, index * 100);

                offerObserver.unobserve(entry.target);
            }

        });

    },{
        threshold:0.15
    });



    offerElements.forEach(element=>{
        offerObserver.observe(element);
    });

});