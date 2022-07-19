function createCard(name, description, pictureUrl, newStartDate, newEndDate) {
  return `
    <div class="col">
      <div class="shadow mb-5 bg-body card rounded">
        <img src="${pictureUrl}" class="card-img-top"> 
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer text-muted">
          <small class="text-muted"> ${newStartDate} - ${newEndDate} </small>
        </div>
      </div>
    </div>
  `;
}

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        console.error("Response couldn't load.")
      } else {
        const data = await response.json();

        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            const title = details.conference.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            
            let startDate = details.conference.starts;
            let d1 = new Date(startDate)
            let newStartDate = (d1.getMonth()+1) + "/" + d1.getDate() + "/" + d1.getFullYear()
            let endDate = details.conference.ends;
            let ld = new Date(endDate)
            let newEndDate = (ld.getMonth()+1) + "/" + ld.getDate() + "/" + ld.getFullYear()

            const html = createCard(title, description, pictureUrl, newStartDate, newEndDate);
            const column = document.querySelector('.row');
            column.innerHTML += html;
          }
        }
  
      }
    } catch (e) {
      console.error("error");
    }
  
  });
  

  
