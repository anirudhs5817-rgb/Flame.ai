async function startPurchase(planType) {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'flex';

    try {
        // Calls the universal endpoint in your FastAPI main.py
        const response = await fetch(`http://127.0.0.1:8000/api/v1/buy?plan_type=${planType}`, {
            method: 'POST'
        });

        const result = await response.json();

        if (response.ok && result.status === 'success') {
            window.location.href = 'success.html';
        } else {
            throw new Error(result.detail || "Transaction Cancelled");
        }
    } catch (error) {
        alert("Store Error: " + error.message);
        if (overlay) overlay.style.display = 'none';
    }
}
