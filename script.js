document.getElementById("scanBtn").addEventListener("click", function() {
    // Open the demo modal
    const modal = document.getElementById("demoModal");
    modal.style.display = "block";

    // Simulate a scan
    let progress = 0;
    const progressBar = document.getElementById("progress");
    const scanResult = document.getElementById("scanResult");

    const scanInterval = setInterval(function() {
        progress += 10;
        progressBar.style.width = progress + "%";

        if (progress >= 100) {
            clearInterval(scanInterval);
            scanResult.textContent = "No threats detected. Your device is safe!";
        }
    }, 300);
});

// Close modal on clicking close button or outside modal content
document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("demoModal").style.display = "none";
});

window.onclick = function(event) {
    const modal = document.getElementById("demoModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
