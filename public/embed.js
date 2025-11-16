(function () {
    // Wait for DOM to be ready
    function initWidget() {
      // Check if widget already exists
      if (document.getElementById("newvision-widget-root")) {
        console.log("[NewVision] Widget already exists, skipping initialization.");
        return;
      }

      // Find the <script> tag that loaded this file
      let currentScript = document.currentScript;
      
      // Fallback: if currentScript is not available (e.g., dynamically loaded),
      // try to find the script tag by src attribute
      if (!currentScript) {
        const scripts = document.getElementsByTagName('script');
        for (let i = scripts.length - 1; i >= 0; i--) {
          if (scripts[i].src && scripts[i].src.includes('embed.js')) {
            currentScript = scripts[i];
            break;
          }
        }
      }
    
      // Read projectId from data-project-id attribute
      const projectId = (currentScript && currentScript.getAttribute("data-project-id")) || "default_project";
    
      // Create a container for the widget
      const container = document.createElement("div");
      container.id = "newvision-widget-root";
      container.style.position = "fixed";
      container.style.bottom = "20px";
      container.style.right = "20px";
      container.style.zIndex = "99999";
      container.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  
    // Button + hidden panel
    container.innerHTML = `
      <button
        id="newvision-toggle"
        style="
          background: #0f172a;
          color: white;
          border-radius: 999px;
          padding: 10px 16px;
          border: none;
          font-size: 14px;
          font-weight: 500;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.4);
          cursor: pointer;
        "
      >
        ✨ Feedback
      </button>
  
      <div
        id="newvision-panel"
        style="
          display: none;
          margin-top: 8px;
          width: 320px;
          max-width: 90vw;
          border-radius: 16px;
          background: #020617;
          color: #e5e7eb;
          padding: 16px;
          box-shadow: 0 18px 45px rgba(15, 23, 42, 0.7);
        "
      >
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div>
            <div style="font-size: 14px; font-weight: 600;">Share your feedback</div>
            <div style="font-size: 12px; color: #9ca3af;">Help us improve this experience.</div>
          </div>
          <button
            id="newvision-close"
            style="
              background: transparent;
              border: none;
              color: #6b7280;
              font-size: 16px;
              cursor: pointer;
            "
          >
            ×
          </button>
        </div>
  
        <form id="newvision-form" style="display: flex; flex-direction: column; gap: 8px; margin-top: 4px;">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            style="
              padding: 8px 10px;
              border-radius: 8px;
              border: 1px solid #1f2937;
              background: #020617;
              color: #e5e7eb;
              font-size: 13px;
            "
            required
          />
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            style="
              padding: 8px 10px;
              border-radius: 8px;
              border: 1px solid #1f2937;
              background: #020617;
              color: #e5e7eb;
              font-size: 13px;
            "
            required
          />
          <textarea
            name="message"
            placeholder="Your feedback..."
            rows="3"
            style="
              padding: 8px 10px;
              border-radius: 8px;
              border: 1px solid #1f2937;
              background: #020617;
              color: #e5e7eb;
              font-size: 13px;
              resize: vertical;
            "
            required
          ></textarea>
  
          <button
            type="submit"
            id="newvision-submit"
            style="
              margin-top: 4px;
              padding: 8px 12px;
              border-radius: 999px;
              border: none;
              background: #0ea5e9;
              color: #0f172a;
              font-size: 13px;
              font-weight: 600;
              cursor: pointer;
            "
          >
            Send feedback
          </button>
  
          <div
            id="newvision-status"
            style="
              margin-top: 4px;
              font-size: 12px;
              color: #9ca3af;
              min-height: 16px;
            "
          ></div>
        </form>
      </div>
    `;
  
      // Wait for body to be available
      if (!document.body) {
        console.warn("[NewVision] document.body not ready, waiting...");
        setTimeout(initWidget, 100);
        return;
      }

      document.body.appendChild(container);
    
      // Use setTimeout to ensure DOM is fully rendered
      setTimeout(() => {
        const toggleBtn = document.getElementById("newvision-toggle");
        const panel = document.getElementById("newvision-panel");
        const closeBtn = document.getElementById("newvision-close");
        const form = document.getElementById("newvision-form");
        const statusEl = document.getElementById("newvision-status");
        const submitBtn = document.getElementById("newvision-submit");
      
        if (!toggleBtn || !panel || !closeBtn || !form || !statusEl || !submitBtn) {
          console.error("[NewVision] Some widget elements are missing:", {
            toggleBtn: !!toggleBtn,
            panel: !!panel,
            closeBtn: !!closeBtn,
            form: !!form,
            statusEl: !!statusEl,
            submitBtn: !!submitBtn
          });
          return;
        }
      
        toggleBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const isHidden = panel.style.display === "none" || !panel.style.display;
          panel.style.display = isHidden ? "block" : "none";
        });
      
        closeBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          panel.style.display = "none";
        });
      
        form.addEventListener("submit", async (event) => {
          event.preventDefault();
          event.stopPropagation();
    
          const formData = new FormData(form);
          const name = (formData.get("name") || "").toString();
          const email = (formData.get("email") || "").toString();
          const message = (formData.get("message") || "").toString();
    
          if (!name || !email || !message) {
            statusEl.textContent = "Please fill in all fields.";
            statusEl.style.color = "#fecaca";
            return;
          }
    
          submitBtn.setAttribute("disabled", "true");
          submitBtn.textContent = "Sending...";
          statusEl.textContent = "";
          statusEl.style.color = "#9ca3af";
    
          try {
            const res = await fetch("/api/feedback", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                message,
                projectId: projectId || "default_project",
              }),
            });
            
            const data = await res.json().catch(() => null);
      
            if (!res.ok) {
              console.error("[NewVision] Error response:", data);
              statusEl.textContent =
                (data && (data.error || data.details)) ||
                "Something went wrong. Please try again.";
              statusEl.style.color = "#fecaca";
            } else {
              statusEl.textContent = "Thank you! Your feedback has been sent ✅";
              statusEl.style.color = "#bbf7d0";
              form.reset();
              // Auto-close after 2 seconds
              setTimeout(() => {
                panel.style.display = "none";
              }, 2000);
            }
          } catch (err) {
            console.error("[NewVision] Network error:", err);
            statusEl.textContent = "Network error. Please try again.";
            statusEl.style.color = "#fecaca";
          } finally {
            submitBtn.removeAttribute("disabled");
            submitBtn.textContent = "Send feedback";
          }
        });

        console.log("[NewVision] Widget initialized successfully!");
      }, 50);
    }

    // Initialize when DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initWidget);
    } else {
      // DOM is already ready
      initWidget();
    }
  })();
  