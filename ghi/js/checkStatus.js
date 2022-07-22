  // Get the cookie out of the cookie store
  const payloadCookie = await cookieStore.get("jwt_access_payload");
  if (payloadCookie) {
    // The cookie value is a JSON-formatted string, so parse it
    const encodedPayload = JSON.parse(payloadCookie.value);
  
    // Convert the encoded payload from base64 to normal string
    const decodedPayload = atob(encodedPayload);
  
    // The payload is a JSON-formatted string, so parse it
    const payload = JSON.parse(decodedPayload);
  
    // Print the payload
    console.log(payload);
  
    // Check if "events.add_conference" is in the permissions.
    // If it is, remove 'd-none' from the link
   if (payload.user.perms.includes("events.add_conference")) {
      const agregarConferencia = document.getElementById('agregarConferencia');
      agregarConferencia.classList.remove('d-none');
   }
   if(payload.user.perms.includes("events.add_location")){
      const agregarUbicacion = document.getElementById('agregarUbicacion');
      agregarUbicacion.classList.remove('d-none');
   }
   if(payload.user.perms.includes("presentations.add_presentation")){
      const newPresentation = document.getElementById('newPresentation');
      newPresentation.classList.remove('d-none');
   }
  
    // Check if "events.add_location" is in the permissions.
    // If it is, remove 'd-none' from the link
  
  }
  