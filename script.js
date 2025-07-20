document.addEventListener("DOMContentLoaded", function () {
  let clickCount = 0;
  const maxClicks = 5;
  const shareBtn = document.getElementById("whatsappShare");
  const clickCounter = document.getElementById("clickCounter");
  const shareMessage = document.getElementById("shareMessage");
  const form = document.getElementById("registrationForm");
  const finalMessage = document.getElementById("finalMessage");
  const submitBtn = document.getElementById("submitBtn");

  // Disable form if already submitted
  if (localStorage.getItem("formSubmitted") === "true") {
    disableForm();
    finalMessage.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
    finalMessage.classList.remove("hidden");
  }

  // WhatsApp Share Button
  shareBtn.addEventListener("click", () => {
    if (clickCount >= maxClicks) return;

    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    const whatsappURL = `https://wa.me/?text=${message}`;
    window.open(whatsappURL, '_blank');

    clickCount++;
    clickCounter.textContent = `Click count: ${clickCount}/${maxClicks}`;

    if (clickCount === maxClicks) {
      shareMessage.textContent = "✅ Sharing complete. Please continue.";
      shareMessage.classList.remove("hidden");
      shareBtn.disabled = true;
      shareBtn.style.opacity = "0.6";
    }
  });

  // Form Submit Handler
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (clickCount < maxClicks) {
      alert("Please complete sharing on WhatsApp before submitting.");
      return;
    }

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const college = document.getElementById("college").value.trim();
    const screenshot = document.getElementById("screenshot").files[0];

    if (!name || !phone || !email || !college || !screenshot) {
      alert("Please fill in all fields and upload a screenshot.");
      return;
    }

    const formData = {
      name,
      phone,
      email,
      college,
      screenshotName: screenshot.name
    };

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwtudhv78pITOw4XziM4QlF9NvqUdddTGsuZPChOTED9dgf8p_u-GKq5kVoFJVkZvo/exec', {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(formData)
      });

      // Don't try to parse response (no-cors blocks reading it)
      localStorage.setItem("formSubmitted", "true");
      disableForm();
      finalMessage.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
      finalMessage.classList.remove("hidden");

    } catch (err) {
      console.error("Error:", err);
      alert("❌ Network or server error.");
    }
  });

  // 🔧 Correct Placement of This Function
  function disableForm() {
    const inputs = form.querySelectorAll("input, button");
    inputs.forEach(input => {
      input.disabled = true;
      input.style.opacity = "0.7";
    });
  }
});
