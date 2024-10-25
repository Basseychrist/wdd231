document.getElementById('dataForm').addEventListener('submit', function(event) {
    // Capture the current timestamp
    const currentTimestamp = new Date().toLocaleString();
    document.getElementById('timestamp').value = currentTimestamp;
});

