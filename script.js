const resumeFields = [
  { id: "fullName", target: "previewFullName", defaultText: "Your Name" },
  { id: "professionalTitle", target: "previewProfessionalTitle", defaultText: "Your Profession" },
  { id: "email", target: "previewEmail", defaultText: "you@example.com" },
  { id: "phone", target: "previewPhone", defaultText: "+1 (555) 123-4567" },
  { id: "location", target: "previewLocation", defaultText: "City, Country" },
  { id: "website", target: "previewWebsite", defaultText: "yourportfolio.com" },
  { id: "summary", target: "previewSummary", defaultText: "Add a short summary describing your skills, goals, and strengths." },
  { id: "education", target: "previewEducation", defaultText: "Add your education details here." },
  { id: "experience", target: "previewExperience", defaultText: "Add your work or internship experience here." },
  { id: "projects", target: "previewProjects", defaultText: "Add your main projects here." },
  { id: "skills", target: "previewSkills", defaultText: "Add your technical and soft skills here." },
  { id: "awards", target: "previewAwards", defaultText: "Add awards or certifications here." },
  { id: "languages", target: "previewLanguages", defaultText: "Add languages you speak here." }
];

const coverFields = [
  { id: "coverName", target: "coverPreviewName", defaultText: "Your Name" },
  { id: "coverEmail", target: "coverPreviewEmail", defaultText: "you@example.com" },
  { id: "coverPhone", target: "coverPreviewPhone", defaultText: "+1 (555) 123-4567" },
  { id: "companyName", target: "coverPreviewCompany", defaultText: "Company Name" },
  { id: "hiringManager", target: "coverPreviewManager", defaultText: "Hiring Manager / Recruitment Team" },
  { id: "coverDate", target: "coverPreviewDate", defaultText: "Date" },
  { id: "coverGreeting", target: "coverPreviewGreeting", defaultText: "Dear Hiring Manager," },
  { id: "coverBody", target: "coverPreviewBody", defaultText: "Write a cover letter explaining why you are interested in the role and what makes you a strong candidate." },
  { id: "coverClosing", target: "coverPreviewClosing", defaultText: "Sincerely," }
];

function updatePreviewField(inputId, targetId, defaultText) {
  const input = document.getElementById(inputId);
  const output = document.getElementById(targetId);

  if (!input || !output) return;

  const value = input.value.trim();
  output.textContent = value || defaultText;
}

resumeFields.forEach(({ id, target, defaultText }) => {
  const input = document.getElementById(id);

  if (!input) return;

  input.addEventListener("input", () => {
    updatePreviewField(id, target, defaultText);
  });
});

coverFields.forEach(({ id, target, defaultText }) => {
  const input = document.getElementById(id);

  if (!input) return;

  input.addEventListener("input", () => {
    const output = document.getElementById(target);

    if (!output) return;

    const value = input.value.trim();

    if (id === "coverDate") {
      const formattedDate = input.value
        ? new Date(input.value).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })
        : defaultText;

      output.textContent = formattedDate;
      return;
    }

    output.textContent = value || defaultText;
  });
});

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const resumePreview = document.getElementById("resumePreview");
const coverPreview = document.getElementById("coverPreview");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = button.dataset.target;

    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(targetTab).classList.add("active");

    if (targetTab === "resumeTab") {
      resumePreview.classList.add("active-preview");
      coverPreview.classList.remove("active-preview");
    } else {
      coverPreview.classList.add("active-preview");
      resumePreview.classList.remove("active-preview");
    }
  });
});

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "Light Mode";
  } else {
    themeToggle.textContent = "Dark Mode";
  }
});

document.getElementById("printBtn").addEventListener("click", () => {
  window.print();
});

document.getElementById("savePdfBtn").addEventListener("click", () => {
  window.print();
});

const profileImageInput = document.getElementById("profileImage");
const profilePreview = document.getElementById("profilePreview");
const resumePhoto = document.getElementById("resumePhoto");

profileImageInput.addEventListener("change", function () {
  const file = this.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    const imageData = event.target.result;

    if (profilePreview) {
      profilePreview.src = imageData;
    }

    if (resumePhoto) {
      resumePhoto.src = imageData;
    }
  };

  reader.readAsDataURL(file);
});