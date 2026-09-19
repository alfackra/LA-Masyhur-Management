/* =========================================================
   MASYHUR MANAGEMENT GROUP
   SCRIPT.JS V2
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
     ======================================================= */

  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  const minusButton = document.getElementById("minusJamaah");
  const plusButton = document.getElementById("plusJamaah");

  const jamaahValue = document.getElementById("jamaahValue");
  const pricePerPerson = document.getElementById("pricePerPerson");
  const totalPrice = document.getElementById("totalPrice");

  const calculatorButton =
    document.querySelector(".calculator-button");

  const filterButtons =
    document.querySelectorAll(".package-filter-btn");

  const packageCards =
    document.querySelectorAll(".package-card");


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

      mobileMenu.classList.toggle("active");

      if (mobileMenu.classList.contains("active")) {

        menuButton.textContent = "✕";
        menuButton.setAttribute("aria-label", "Tutup menu");

      } else {

        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Buka menu");

      }

    });


    /* Tutup menu setelah link ditekan */

    const mobileLinks =
      mobileMenu.querySelectorAll("a");

    mobileLinks.forEach((link) => {

      link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

        menuButton.textContent = "☰";

      });

    });

  }


  /* =======================================================
     SMOOTH SCROLL
     ======================================================= */

  const internalLinks =
    document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {

    link.addEventListener("click", function (event) {

      const targetId =
        this.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const header =
        document.querySelector(".header");

      const headerHeight =
        header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top
        + window.pageYOffset
        - headerHeight
        - 15;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* =======================================================
     LA CALCULATOR
     ======================================================= */

  let jamaah = 45;


  /*
     Harga estimasi berdasarkan jumlah jamaah.

     Ini hanya estimator website,
     bukan quotation final.
  */

  function calculatePricePerPerson(totalJamaah) {

    if (totalJamaah >= 100) {
      return 52;
    }

    if (totalJamaah >= 80) {
      return 55;
    }

    if (totalJamaah >= 60) {
      return 59;
    }

    if (totalJamaah >= 45) {
      return 64;
    }

    if (totalJamaah >= 30) {
      return 69;
    }

    if (totalJamaah >= 20) {
      return 75;
    }

    if (totalJamaah >= 10) {
      return 85;
    }

    return 95;

  }


  /* FORMAT USD */

  function formatUSD(number) {

    return new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      }
    ).format(number);

  }


  /* UPDATE CALCULATOR */

  function updateCalculator() {

    if (
      !jamaahValue ||
      !pricePerPerson ||
      !totalPrice
    ) {
      return;
    }


    const price =
      calculatePricePerPerson(jamaah);

    const total =
      jamaah * price;


    jamaahValue.textContent =
      jamaah;

    pricePerPerson.textContent =
      formatUSD(price);

    totalPrice.textContent =
      formatUSD(total);


    /* ===============================================
       UPDATE WHATSAPP MESSAGE
       =============================================== */

    if (calculatorButton) {

      const message =
        `Assalamualaikum Masyhur Management,

Saya ingin meminta quotation Land Arrangement.

Jumlah jamaah: ${jamaah} orang
Estimasi website: ${formatUSD(price)} / pax
Estimasi total: ${formatUSD(total)}

Mohon informasi rate dan layanan yang tersedia.`;

      calculatorButton.href =
        "https://wa.me/6281805234529?text="
        + encodeURIComponent(message);

    }

  }


  /* MINUS */

  if (minusButton) {

    minusButton.addEventListener(
      "click",
      () => {

        /*
          Minimum 5 jamaah
        */

        if (jamaah > 5) {

          jamaah--;

          updateCalculator();

        }

      }
    );

  }


  /* PLUS */

  if (plusButton) {

    plusButton.addEventListener(
      "click",
      () => {

        /*
          Maksimal estimator 200 jamaah
        */

        if (jamaah < 200) {

          jamaah++;

          updateCalculator();

        }

      }
    );

  }


  /*
     Jalankan pertama kali
  */

  updateCalculator();


  /* =======================================================
     PACKAGE FILTER
     ======================================================= */

  filterButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const filter =
          button.dataset.filter;


        /*
          Hapus active dari semua button
        */

        filterButtons.forEach(
          (btn) =>
            btn.classList.remove("active")
        );


        /*
          Active button yang dipilih
        */

        button.classList.add("active");


        /*
          Filter card
        */

        packageCards.forEach((card) => {

          const category =
            card.dataset.category;


          if (
            filter === "all" ||
            category === filter
          ) {

            card.style.display = "";

            /*
              Animasi kecil
            */

            card.animate(
              [
                {
                  opacity: 0,
                  transform:
                    "translateY(10px)"
                },

                {
                  opacity: 1,
                  transform:
                    "translateY(0)"
                }
              ],
              {
                duration: 280,
                easing: "ease-out"
              }
            );

          } else {

            card.style.display =
              "none";

          }

        });

      }
    );

  });


  /* =======================================================
     HEADER SHADOW ON SCROLL
     ======================================================= */

  const header =
    document.querySelector(".header");

  function updateHeader() {

    if (!header) {
      return;
    }

    if (window.scrollY > 30) {

      header.style.boxShadow =
        "0 8px 30px rgba(0,0,0,.18)";

    } else {

      header.style.boxShadow =
        "none";

    }

  }

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();


  /* =======================================================
     CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
     ======================================================= */

  document.addEventListener(
    "click",
    (event) => {

      if (
        !menuButton ||
        !mobileMenu
      ) {
        return;
      }


      const clickedMenu =
        mobileMenu.contains(event.target);

      const clickedButton =
        menuButton.contains(event.target);


      if (
        !clickedMenu &&
        !clickedButton
      ) {

        mobileMenu.classList.remove(
          "active"
        );

        menuButton.textContent =
          "☰";

      }

    }
  );


  /* =======================================================
     ESC KEY CLOSE MENU
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        mobileMenu
      ) {

        mobileMenu.classList.remove(
          "active"
        );

        if (menuButton) {

          menuButton.textContent =
            "☰";

        }

      }

    }
  );


  /* =======================================================
     SERVICE CARD CLICK FEEDBACK
     ======================================================= */

  const miniServices =
    document.querySelectorAll(
      ".mini-service"
    );

  miniServices.forEach(
    (service) => {

      service.addEventListener(
        "click",
        () => {

          miniServices.forEach(
            item =>
              item.classList.remove(
                "selected-service"
              )
          );

          service.classList.add(
            "selected-service"
          );

        }
      );

    }
  );


  /* =======================================================
     CONSOLE
     ======================================================= */

  console.log(
    "Masyhur Management Group website ready."
  );

});
