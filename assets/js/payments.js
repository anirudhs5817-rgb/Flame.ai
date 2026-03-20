async function startPurchase(planType) {
    const overlay = document.getElementById('loading-overlay');
    
    // 1. Show the "Contacting Bank" animation
    if (overlay) overlay.style.display = 'flex';

    try {
        // 2. Call your local FastAPI backend
        // We use the 'universal' buy endpoint we created in main.py
        const response = await fetch(`http://127.0.0.1:8000/api/v1/buy?plan_type=${planType}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        const result = await response.json();

        if (response.ok && result.status === 'success') {
            // 3. Success! Redirect to the success page
            window.location.href = '../transactions/success.html';
        } else {
            throw new Error(result.detail || "Transaction Declined");
        }

    } catch (error) {
        alert("Payment Error: " + error.message);
        if (overlay) overlay.style.display = 'none';
    }
}
