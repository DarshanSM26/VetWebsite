/*console.log("✅ pet.js Loaded");

const BASE_URL = "http://localhost:8080/demo/pet";

// Auto-fill owner name on modal open
document.addEventListener("DOMContentLoaded", () => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if (loggedUser) {
    document.getElementById("ownerName").value = loggedUser.username;
  }

  loadPets();

  // Handle Sell Pet form submit
  const sellPetForm = document.getElementById("sellPetForm");
  sellPetForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!loggedUser) {
      alert("⚠️ Please login first.");
      return;
    }

    const formData = new FormData(sellPetForm);

    const pet = {
      user: { id: loggedUser.id },
      name: formData.get("petName"),
      breed: formData.get("breed"),
      gender: formData.get("gender").toLowerCase(),
      dob: formData.get("dob"),
      vaccinationDetails: formData.get("vaccinationDetails")
    };

    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pet)
      });

      if (!res.ok) throw new Error("Failed to save pet");

      alert("✅ Pet added successfully!");
      sellPetForm.reset();
      document.getElementById("ownerName").value = loggedUser.username;
      loadPets();
    } catch (err) {
      console.error("Error saving pet:", err);
      alert("⚠️ Failed to save pet.");
    }
  });
});

async function loadPets() {
  try {
    const res = await fetch(BASE_URL + "/fetching");
    const pets = await res.json();
    console.log("📦 Pets loaded:", pets);
    // you can update pet listings here if you want
  } catch (err) {
    console.error("Error loading pets:", err);
  }
}*/


console.log("✅ pet.js Loaded");

const BASE_URL = "http://localhost:8080/demo/pet";

document.addEventListener("DOMContentLoaded", () => {
  const sellPetForm = document.getElementById("sellPetForm");
  if (!sellPetForm) {
    console.error("❌ sellPetForm not found in HTML!");
    return;
  }

  console.log("✅ Found sellPetForm");

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if (loggedUser) {
    const ownerInput = document.getElementById("ownerName");
    if (ownerInput) {
      ownerInput.value =
        loggedUser.username || loggedUser.name || loggedUser.email || "Unknown User";
    }
  }

  // Form submit
  sellPetForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("📨 Sell form submitted");

    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!loggedUser) {
      alert("⚠️ Please login first.");
      return;
    }

    const formData = new FormData(sellPetForm);
    const pet = {
      user: { id: loggedUser.id },
      name: formData.get("petName"),
      breed: formData.get("breed"),
      gender: formData.get("gender"),
      dob: formData.get("dob"),
      vaccinationDetails: formData.get("vaccinationDetails")
    };

    console.log("📦 Sending pet data:", pet);

    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pet)
      });

      console.log("🔗 Response status:", res.status);

      if (!res.ok) {
        alert("❌ Failed to save pet (status " + res.status + ")");
        return;
      }

      alert("✅ Pet added successfully!");
      sellPetForm.reset();

      const ownerInput = document.getElementById("ownerName");
      if (ownerInput) {
        ownerInput.value =
          loggedUser.username || loggedUser.name || loggedUser.email || "Unknown User";
      }

      loadPets();
    } catch (err) {
      console.error("❌ Error saving pet:", err);
      alert("⚠️ Failed to save pet. See console.");
    }
  });
});

// Load pets
async function loadPets() {
  try {
    const res = await fetch(BASE_URL + "/fetching");
    const pets = await res.json();
    console.log("🐾 Pets loaded:", pets);
  } catch (err) {
    console.error("❌ Error loading pets:", err);
  }
}

