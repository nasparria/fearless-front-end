window.addEventListener('DOMContentLoaded', async () => {
    const selectTag = document.getElementById('conference');
  
    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
  
      for (let conference of data.conferences) {
        const option = document.createElement('option');
        option.value = conference.href;
        option.innerHTML = conference.name;
        selectTag.appendChild(option);
      }

      let loadingSpinner = document.querySelector("#loading-conference-spinner")
      loadingSpinner.classList.add("d-none");
      // Here, add the 'd-none' class to the loading icon
      selectTag.classList.remove("d-none");
      const formTag = document.getElementById("create-attendee-form");
      formTag.addEventListener("submit", async(event) => {event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
        const attendeeURl = "http://localhost:8001/api/attendees/";
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type' : 'application/json',
            },
        };
        const response = await fetch(attendeeURl, fetchConfig);
        if (response.ok) {
            const newAttendee = await response.json();
            console.log(newAttendee);
        }
        formTag.classList.remove("d-none");
        document.getElementById("success-message").classList.add("d-none");
        
      })
    }
  
  });
  