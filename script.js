document.addEventListener('DOMContentLoaded', function() {
    const currencySelect = document.getElementById('currency');

    // استدعاء API للحصول على قائمة بأشهر 50 عملة رقمية
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1')
        .then(response => response.json())
        .then(data => {
            data.forEach(coin => {
                const option = document.createElement('option');
                option.value = coin.id;
                option.textContent = `${coin.name} (${coin.symbol.toUpperCase()})`;
                currencySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    document.getElementById('crypto-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const amount = parseFloat(document.getElementById('amount').value);
        const currency = document.getElementById('currency').value;
        const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=usd`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const price = data[currency].usd;
                const tax = amount * 0.10;
                const finalAmount = (amount - tax) / price;

                document.getElementById('price').textContent = `السعر الحالي: $${price}`;
                document.getElementById('tax').textContent = `الضريبة (10%): $${tax.toFixed(2)}`;
                document.getElementById('final-amount').textContent = `المبلغ بالعملة الرقمية: ${finalAmount.toFixed(6)} ${currency.charAt(0).toUpperCase() + currency.slice(1)}`;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });
});
