const API_BASE = "https://little-oranges-stay.loca.lt";


// =====================================================
// OP CITY SERVER STATUS
// =====================================================

const SERVER_API =
    "https://api.mcstatus.io/v2/status/java/opcity.pfmc.ir";

async function updateServerStatus() {

    const statusElement =
        document.getElementById("serverStatus");

    const statusText =
        document.getElementById("statusText");

    const playersElement =
        document.getElementById("players");

    const playersInfoElement =
        document.getElementById("playersInfo");

    const lastCheckElement =
        document.getElementById("lastCheck");

    if (!statusElement && !statusText && !playersElement) {
        return;
    }

    try {

        const response = await fetch(
            SERVER_API + "?t=" + Date.now()
        );

        if (!response.ok) {
            throw new Error("Server API Error");
        }

        const data = await response.json();

        if (data.online === true) {

            if (statusElement) {
                statusElement.textContent = "🟢 ONLINE";
            }

            if (statusText) {
                statusText.textContent = "سرور آنلاین است";
            }

            const onlinePlayers =
                data.players?.online ?? 0;

            const maxPlayers =
                data.players?.max ?? 0;

            if (playersElement) {
                playersElement.textContent =
                    onlinePlayers;
            }

            if (playersInfoElement) {
                playersInfoElement.textContent =
                    `${onlinePlayers} / ${maxPlayers}`;
            }

        } else {

            if (statusElement) {
                statusElement.textContent = "🔴 OFFLINE";
            }

            if (statusText) {
                statusText.textContent =
                    "سرور آفلاین است";
            }

            if (playersElement) {
                playersElement.textContent = "0";
            }

            if (playersInfoElement) {
                playersInfoElement.textContent = "0 / 0";
            }
        }

        if (lastCheckElement) {

            const now = new Date();

            lastCheckElement.textContent =
                "آخرین بررسی: " +
                now.toLocaleTimeString("fa-IR");
        }

    } catch (error) {

        console.error(
            "Server status error:",
            error
        );

        if (statusElement) {
            statusElement.textContent =
                "🟡 UNKNOWN";
        }

        if (statusText) {
            statusText.textContent =
                "بررسی وضعیت سرور ناموفق بود";
        }

        if (playersElement) {
            playersElement.textContent =
                "?";
        }

        if (playersInfoElement) {
            playersInfoElement.textContent =
                "نامشخص";
        }
    }
}


// =====================================================
// COPY IP
// =====================================================

function copyServerIP() {

    const ip =
        "opcity.pfmc.ir";

    navigator.clipboard.writeText(ip)
        .then(() => {

            alert(
                "✅ آی‌پی سرور کپی شد:\n" +
                ip
            );

        })
        .catch(() => {

            alert(
                "❌ کپی آی‌پی انجام نشد."
            );
        });
}


// =====================================================
// COPY CARD
// =====================================================

function copyCardNumber() {

    const cardNumber =
        "6219861922871396";

    navigator.clipboard.writeText(cardNumber)
        .then(() => {

            alert(
                "✅ شماره کارت کپی شد."
            );

        })
        .catch(() => {

            alert(
                "❌ کپی شماره کارت انجام نشد."
            );
        });
}


// =====================================================
// SHOP ORDER
// =====================================================

const orderForm =
    document.getElementById("orderForm");

if (orderForm) {

    orderForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const result =
                document.getElementById(
                    "orderResult"
                );

            const submitButton =
                document.getElementById(
                    "submitOrder"
                );

            const product =
                document.getElementById(
                    "product"
                ).value;

            const username =
                document.getElementById(
                    "minecraft_username"
                ).value.trim();

            const phone =
                document.getElementById(
                    "phone"
                ).value.trim();

            const transaction =
                document.getElementById(
                    "transaction"
                ).value.trim();

            const message =
                document.getElementById(
                    "message"
                ).value.trim();

            const receiptInput =
                document.getElementById(
                    "receipt"
                );

            if (!product) {

                showOrderResult(
                    "❌ لطفاً محصول را انتخاب کن.",
                    false
                );

                return;
            }

            if (!username) {

                showOrderResult(
                    "❌ نام کاربری Minecraft را وارد کن.",
                    false
                );

                return;
            }

            if (!phone) {

                showOrderResult(
                    "❌ شماره تماس را وارد کن.",
                    false
                );

                return;
            }

            if (!transaction) {

                showOrderResult(
                    "❌ شماره تراکنش را وارد کن.",
                    false
                );

                return;
            }

            if (
                !receiptInput.files ||
                receiptInput.files.length === 0
            ) {

                showOrderResult(
                    "❌ لطفاً عکس رسید را انتخاب کن.",
                    false
                );

                return;
            }

            const receipt =
                receiptInput.files[0];

            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/webp"
            ];

            if (
                !allowedTypes.includes(
                    receipt.type
                )
            ) {

                showOrderResult(
                    "❌ فرمت رسید باید JPG، PNG یا WEBP باشد.",
                    false
                );

                return;
            }

            const maxSize =
                10 * 1024 * 1024;

            if (receipt.size > maxSize) {

                showOrderResult(
                    "❌ حجم عکس رسید نباید بیشتر از 10MB باشد.",
                    false
                );

                return;
            }


            // Disable button
            submitButton.disabled = true;

            submitButton.textContent =
                "⏳ در حال ارسال سفارش...";


            try {

                const formData =
                    new FormData();

                formData.append(
                    "product",
                    product
                );

                formData.append(
                    "minecraft_username",
                    username
                );

                formData.append(
                    "phone",
                    phone
                );

                formData.append(
                    "transaction",
                    transaction
                );

                formData.append(
                    "message",
                    message
                );

                formData.append(
                    "receipt",
                    receipt
                );


                const response =
                    await fetch(
                        API_BASE + "/order",
                        {
                            method: "POST",

                            headers: {
                                "bypass-tunnel-reminder": "true"
                            },

                            body: formData
                        }
                    );


                const contentType =
                    response.headers.get(
                        "content-type"
                    ) || "";


                let data;


                if (
                    contentType.includes(
                        "application/json"
                    )
                ) {

                    data =
                        await response.json();

                } else {

                    const text =
                        await response.text();

                    throw new Error(
                        "پاسخ نامعتبر از سرور دریافت شد."
                    );
                }


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        data.error ||
                        "ارسال سفارش ناموفق بود."
                    );
                }


                showOrderResult(
                    "✅ سفارش با موفقیت ثبت شد!<br>📨 اطلاعات سفارش و رسید برای ادمین ارسال شد.",
                    true
                );


                orderForm.reset();


            } catch (error) {

                console.error(
                    "Order error:",
                    error
                );


                showOrderResult(
                    "❌ ارسال سفارش انجام نشد.<br>" +
                    "لطفاً چند لحظه بعد دوباره تلاش کن.",
                    false
                );

            } finally {

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "🚀 ثبت سفارش";
            }

        }
    );
}


// =====================================================
// ORDER RESULT
// =====================================================

function showOrderResult(
    message,
    success
) {

    const result =
        document.getElementById(
            "orderResult"
        );

    if (!result) {
        return;
    }

    result.innerHTML =
        message;

    result.className =
        success
            ? "success"
            : "error";

    result.style.display =
        "block";

    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


// =====================================================
// START SERVER STATUS
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateServerStatus();

        setInterval(
            updateServerStatus,
            60000
        );

    }
);
