async function handleSubmit() {
    const jsonInput = document.getElementById('jsonInput').value;
    const dropdown = document.getElementById('dropdown');
    const selectedOptions = [...dropdown.selectedOptions].map(option => option.value);

    try {
        console.log('JSON Input:', jsonInput);
        const parsedInput = JSON.parse(jsonInput); // Validate and parse JSON input
        console.log('Parsed Input:', parsedInput);

        const response = await fetch('https://evening-crag-92032-a7f73982b1a6.herokuapp.com/bfhl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(parsedInput),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('API Response:', data);

        let displayData = {};
        if (selectedOptions.includes('Alphabets')) displayData.alphabets = data.alphabets;
        if (selectedOptions.includes('Numbers')) displayData.numbers = data.numbers;
        if (selectedOptions.includes('Highest Lowercase Alphabet')) displayData.highest_lowercase_alphabet = data.highest_lowercase_alphabet;

        document.getElementById('responseOutput').textContent = JSON.stringify(displayData, null, 2);
    } catch (error) {
        alert('Invalid JSON input or API call failed');
        console.error('There was an error:', error);
    }
}
