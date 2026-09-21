const SERVER_IP = "opcity.pfmc.ir";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";


function copyIP() {

    navigator.clipboard.writeText(SERVER_IP)

        .then(() => {

            alert(
                "✅ IP سرور کپی شد!\n\n" +
                SERVER_IP
            );

        })

        .catch(() => {

            alert(
                "IP سرور:\n\n" +
                SERVER_IP
            );

        });

}



async function getServerStatus() {

    const status =
        document.getElementById("serverStatus");

    const statusText =
        document.getElementById("statusText");

    const players =
        document.getElementById("players");

    const playersInfo =
        document.getElementById("playersInfo");

    const lastCheck =
        document.getElementById("lastCheck");


    try {

        const url =
            "https://api.mcstatus.io/v2/status/java/" +
            encodeURIComponent(SERVER_IP);


        const response =
            await fetch(url, {
                method: "GET",
                cache: "no-store"
            });


        if (!response.ok) {

            throw new Error(
                "HTTP Error: " +
                response.status
            );

        }


        const data =
            await response.json();


        console.log(
            "OP CITY SERVER:",
            data
        );


        if (data.online === true) {

            if (status) {

                status.textContent =
                    "آنلاین 🟢";

                status.style.color =
                    "#00ff88";

            }


            if (statusText) {

                statusText.textContent =
                    "آنلاین 🟢";

                statusText.style.color =
                    "#00ff88";

            }


            const online =
                data.players?.online ?? 0;

            const max =
                data.players?.max ?? 0;


            if (players) {

                players.textContent =
                    `${online} / ${max}`;

            }


            if (playersInfo) {

                playersInfo.textContent =
                    `${online} / ${max}`;

            }

        } else {

            if (status) {

                status.textContent =
                    "آفلاین 🔴";

                status.style.color =
                    "#ff4d4d";

            }


            if (statusText) {

                statusText.textContent =
                    "آفلاین 🔴";

                statusText.style.color =
                    "#ff4d4d";

            }


            if (players) {

                players.textContent =
                    "0";

            }


            if (playersInfo) {

                playersInfo.textContent =
                    "0";

            }

        }


        if (lastCheck) {

            lastCheck.textContent =
                new Date().toLocaleTimeString("fa-IR");

        }

    } catch (error) {

        console.error(
            "OP CITY STATUS ERROR:",
            error
        );


        if (status) {

            status.textContent =
                "خطا در بررسی ⚠️";

            status.style.color =
                "#ffaa00";

        }


        if (statusText) {

            statusText.textContent =
                "خطا در بررسی ⚠️";

            statusText.style.color =
                "#ffaa00";

        }


        if (players) {

            players.textContent =
                "--";

        }


        if (playersInfo) {

            playersInfo.textContent =
                "--";

        }


        if (lastCheck) {

            lastCheck.textContent =
                new Date().toLocaleTimeString("fa-IR");

        }

    }

}



function buyProduct(product, price) {

    const orderSection =
        document.getElementById("orderSection");

    const selectedProduct =
        document.getElementById("selectedProduct");

    const selectedPrice =
        document.getElementById("selectedPrice");

    const productDisplay =
        document.getElementById("productDisplay");

    const priceDisplay =
        document.getElementById("priceDisplay");


    if (selectedProduct) {

        selectedProduct.value =
            product;

    }


    if (selectedPrice) {

        selectedPrice.value =
            Number(price).toLocaleString("fa-IR") +
            " تومان";

    }


    if (productDisplay) {

        productDisplay.textContent =
            product;

    }


    if (priceDisplay) {

        priceDisplay.textContent =
            Number(price).toLocaleString("fa-IR") +
            " تومان";

    }


    if (orderSection) {

        orderSection.style.display =
            "block";


        orderSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}



function closeOrder() {

    const orderSection =
        document.getElementById("orderSection");


    if (orderSection) {

        orderSection.style.display =
            "none";


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

}



async function submitOrder(event) {

    event.preventDefault();


    const form =
        document.getElementById("orderForm");

    const button =
        document.getElementById("submitOrder");

    const message =
        document.getElementById("formMessage");


    if (!form) {

        return;

    }


    const username =
        document.getElementById(
            "minecraftUsername"
        );


    const transaction =
        document.getElementById(
            "transaction"
        );


    const receipt =
        document.getElementById(
            "receipt"
        );


    if (!username.value.trim()) {

        message.textContent =
            "❌ نام Minecraft را وارد کنید.";

        message.style.color =
            "#ff4d4d";

        return;

    }


    if (!transaction.value.trim()) {

        message.textContent =
            "❌ شماره پیگیری را وارد کنید.";

        message.style.color =
            "#ff4d4d";

        return;

    }


    if (!receipt.files.length) {

        message.textContent =
            "❌ لطفاً تصویر رسید را انتخاب کنید.";

        message.style.color =
            "#ff4d4d";

        return;

    }


    if (button) {

        button.disabled =
            true;

        button.textContent =
            "⏳ در حال ارسال سفارش...";

    }


    if (message) {

        message.textContent =
            "⏳ لطفاً صبر کنید...";

        message.style.color =
            "#00ffff";

    }


    try {

        const formData =
            new FormData(form);


        const response =
            await fetch(
                WEB3FORMS_URL,
                {
                    method: "POST",
                    body: formData
                }
            );


        const result =
            await response.json();


        console.log(
            "WEB3FORMS RESULT:",
            result
        );


        if (
            result.success === true ||
            result.success === "true"
        ) {

            message.textContent =
                "✅ سفارش با موفقیت ارسال شد!\n" +
                "مدیریت سفارش شما را بررسی خواهد کرد.";

            message.style.color =
                "#00ff88";


            form.reset();


            setTimeout(() => {

                closeOrder();

                message.textContent = "";

            }, 4000);

        }

        else {

            throw new Error(
                result.message ||
                "ارسال ناموفق بود."
            );

        }

    }

    catch (error) {

        console.error(
            "ORDER ERROR:",
            error
        );


        message.textContent =
            "❌ ارسال سفارش انجام نشد.\n" +
            "لطفاً دوباره امتحان کنید.";

        message.style.color =
            "#ff4d4d";

    }

    finally {

        if (button) {

            button.disabled =
                false;

            button.textContent =
                "📤 ارسال سفارش";

        }

    }

}



document.addEventListener(
    "DOMContentLoaded",
    () => {

        getServerStatus();


        setInterval(
            getServerStatus,
            60000
        );


        const orderForm =
            document.getElementById(
                "orderForm"
            );


        if (orderForm) {

            orderForm.addEventListener(
                "submit",
                submitOrder
            );

        }

    }
);
