document.addEventListener('DOMContentLoaded', function() {
    const timeInfo = document.getElementById('time-info');
    let data = null;

    function fetchTimeData() {
        fetch('https://api.j3.cx/time')
            .then(response => response.json())
            .then(apiData => {
                data = apiData;
                displayTime();
            })
            .catch(error => {
                timeInfo.innerHTML = 'Failed to load time data.';
                console.error('Error fetching time data:', error);
            });
    }

    function displayTime() {
        if (!data) {
            timeInfo.innerHTML = 'Loading...';
            return;
        }

        const offsetHours = parseInt(data.utc_offset.split(':')[0]);
        const offsetMinutes = parseInt(data.utc_offset.split(':')[1]);
        const now = new Date();
        now.setHours(now.getHours() + offsetHours);
        now.setMinutes(now.getMinutes() + offsetMinutes);

        timeInfo.innerHTML = `
            <p><em>The current time is...</em></p>
            <h2>${now.toLocaleTimeString('en-DE')}</h2>
            <strong>${now.toLocaleDateString('en-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong>
            <p>${data.timezone} (${data.abbreviation}) // Timezone & Abbreviation</p>
            <p>UTC${data.utc_offset} // UTC Offset</p>
        `;
    }

    fetchTimeData();

    setInterval(() => {
        if (data) {
            displayTime();
        }
    }, 1000);
});
