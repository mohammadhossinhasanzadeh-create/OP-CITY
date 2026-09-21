const SERVER_IP = "opcity.pfmc.ir";

function copyIP() {
    navigator.clipboard.writeText(SERVER_IP)
        .then(() => {
            alert("✅ IP سرور کپی شد!\n\n" + SERVER_IP);
        })
        .catch(() => {
            alert("IP سرور:\n\n" + SERVER_IP);
        });
}


async function getServerStatus() {

    const status = document.getElementById("serverStatus");
    const statusText = document.getElementById("statusText");

    const players = document.getElementById("players");
    const playersInfo = document.getElementById("playersInfo");

    const lastCheck = document.getElementById("lastCheck");


    try {

        /*
         * Minecraft Java Status API
         * mcstatus.io
         */

        const url =
            "https://api.mcstatus.io/v2/status/java/" +
            encodeURIComponent(SERVER_IP);


        const response = await fetch(url, {
            method: "GET",
            cache: "no-store"
        });


        if (!response.ok) {
            throw new Error(
                "HTTP Error: " + response.status
            );
        }


        const data = await response.json();


        console.log(
            "OP CITY SERVER:",
            data
        );


        /* =========================
           ONLINE
        ========================== */

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

        }


        /* =========================
           OFFLINE
        ========================== */

        else {

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
                players.textContent = "0";
            }


            if (playersInfo) {
                playersInfo.textContent = "0";
            }

        }


        /* =========================
           LAST CHECK
        ========================== */

        if (lastCheck) {

            const now = new Date();

            lastCheck.textContent =
                now.toLocaleTimeString("fa-IR");
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
            players.textContent = "--";
        }


        if (playersInfo) {
            playersInfo.textContent = "--";
        }


        if (lastCheck) {

            const now = new Date();

            lastCheck.textContent =
                now.toLocaleTimeString("fa-IR");
        }

    }

}


/* =========================
   SHOP
========================= */

function buyProduct(product) {

    alert(
        "🛒 محصول انتخاب شد:\n\n" +
        product +
        "\n\nسیستم پرداخت به‌زودی فعال می‌شود."
    );

}


/* =========================
   START
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        getServerStatus();

        /*
         * هر 60 ثانیه وضعیت بررسی می‌شود.
         */

        setInterval(
            getServerStatus,
            60000
        );

    }
);