(function() {
  class ProofPopifyWidget {
    constructor() {
      this.transactions = [];
      this.currentIndex = 0;
      this.isVisible = false;
      this.cycleInterval = null;
      
      // Default settings
      this.themeColor = '#00B4D8';
      this.backgroundColor = '#ffffff';
      this.actionText = 'subscribed';
      this.showRealNames = true;
      this.position = 'bottom-left';

      this.headingFontSize = '14px';
      this.bodyFontSize = '12px';
      
      this.elements = {};
      
      this.init();
    }

    init() {
      // Try multiple strategies to find the script tag.
      // document.currentScript only works during synchronous execution,
      // so it fails when the script is loaded with async/defer.
      const scriptTag = document.currentScript
        || document.querySelector('script[data-proofpopify]')
        || document.querySelector('script[src*="embed.js"]');
      if (!scriptTag) {
        console.error("ProofPopify: Embed script tag not found. Make sure the script tag has a 'data-proofpopify' attribute or its src contains 'embed.js'.");
        return;
      }

      this.urlObj = new URL(scriptTag.getAttribute('src'), window.location.href);
      this.startupId = this.urlObj.searchParams.get('id');
      this.isTest = this.urlObj.searchParams.get('test') === 'true';
      this.apiBase = this.urlObj.origin;

      if (!this.startupId) {
        console.error("ProofPopify: Missing 'id' parameter in embed script URL.");
        return;
      }

      this.injectCSS();
      this.createDOM();
      this.fetchData();
    }

    injectCSS() {
      if (document.getElementById('proofpopify-styles')) return;
      const style = document.createElement('style');
      style.id = 'proofpopify-styles';
      style.innerHTML = `
        @media (max-width: 640px) {
          #proofpopify-container {
            /* Align to left smoothly without stretching to right */
            left: 16px !important;
            right: auto !important;
          }
          /* Force bottom positioning on mobile for better UX */
          #proofpopify-container.mobile-bottom {
            bottom: 16px !important;
            top: auto !important;
          }
          /* Force top positioning on mobile */
          #proofpopify-container.mobile-top {
            top: 16px !important;
            bottom: auto !important;
          }
          /* Make the card smaller instead of full width */
          #proofpopify-container > div {
            width: max-content !important;
            max-width: 280px !important;  
            padding: 12px 14px !important;
            box-sizing: border-box;
          }
          /* Shrink the text slightly */
          #proofpopify-container p {
            font-size: 13px !important;
          }
          /* Shrink the metadata row slightly */
          #proofpopify-container span, #proofpopify-container a {
            font-size: 11px !important;
          }
          #proofpopify-container svg {
            width: 14px !important;
            height: 14px !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    createDOM() {
      // Container
      const container = document.createElement('div');
      container.id = 'proofpopify-container';
      Object.assign(container.style, {
        position: 'fixed',
        zIndex: '999999',
        opacity: '0',
        transition: 'opacity 0.5s ease-in-out',
        pointerEvents: 'none',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      });
      this.elements.container = container;

      // this is where we change style of Card
      const card = document.createElement('div');
      Object.assign(card.style, {
        backgroundColor: this.backgroundColor,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        border: '1px solid #e5e7eb',
        width: 'max-content',
        maxWidth: '350px',
        boxSizing: 'border-box'
      });
      this.elements.card = card;

      // Text Container
      const textContainer = document.createElement('div');
      textContainer.style.display = 'flex';
      textContainer.style.flexDirection = 'column';

      // Title Row
      const titleRow = document.createElement('p');
      Object.assign(titleRow.style, { margin: '0', fontSize: this.headingFontSize, fontWeight: '500', color: '#374151' });
      this.elements.titleRow = titleRow;

      const nameSpan = document.createElement('span');
      this.elements.nameSpan = nameSpan;

      const inTextNode = document.createTextNode(' in ');
      this.elements.inTextNode = inTextNode;

      const locationSpan = document.createElement('span');
      locationSpan.style.fontWeight = '600';
      this.elements.locationSpan = locationSpan;

      const actionTextNode = document.createTextNode(` ${this.actionText}`);
      this.elements.actionTextNode = actionTextNode;

      titleRow.append(nameSpan, inTextNode, locationSpan, actionTextNode);

      // Meta Row
      const metaRow = document.createElement('div');
      Object.assign(metaRow.style, { display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' });

      const timeSpan = document.createElement('span');
      Object.assign(timeSpan.style, { fontSize: '12px', color: '#6b7280' });
      this.elements.timeSpan = timeSpan;

      // Verify Link
      const verifyLink = document.createElement('a');
      verifyLink.href = `${this.apiBase}/verified`;
      verifyLink.target = '_blank';
      verifyLink.rel = 'noreferrer';
      Object.assign(verifyLink.style, {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'opacity 0.2s ease-in-out'
      });
      verifyLink.onmouseover = function() { this.style.opacity = '1'; };
      verifyLink.onmouseout = function() { this.style.opacity = '0.8'; };
      this.elements.verifyLink = verifyLink;

      const verifyIcon = document.createElement('div');
      verifyIcon.style.display = 'flex';
      verifyIcon.innerHTML = `<svg style="width:16px; height:16px;" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>`;
      this.elements.verifyIcon = verifyIcon;

      const verifyText = document.createElement('span');
      Object.assign(verifyText.style, { fontSize: '12px', display: 'flex', gap: '3px' });
      verifyText.innerHTML = `Verified by <span style="color: #635BFF; font-weight: 600; opacity: 1;">Stripe</span>`;
      this.elements.verifyText = verifyText;

      verifyLink.append(verifyIcon, verifyText);
      metaRow.append(timeSpan, document.createTextNode(' | '), verifyLink);

      textContainer.append(titleRow, metaRow);
      card.appendChild(textContainer);
      container.appendChild(card);
      document.body.appendChild(container);
    }

    applyStyles() {
      const { card, container, titleRow, timeSpan, verifyLink, verifyText, verifyIcon } = this.elements;
      
      card.style.backgroundColor = this.backgroundColor;
      card.style.border = `1px solid ${this.getBorderColor(this.backgroundColor)}`;
      
      const textColor = this.getContrastYIQ(this.backgroundColor);
      titleRow.style.color = textColor;
      timeSpan.style.color = textColor;
      verifyLink.style.opacity = '0.8';
      verifyText.style.color = textColor;
      timeSpan.style.opacity = '0.6';
      verifyText.style.opacity = '0.8';
      verifyIcon.style.color = this.themeColor;

      // Position
      Object.assign(container.style, { top: 'auto', bottom: 'auto', left: 'auto', right: 'auto' });
      
      // Determine mobile class
      container.classList.remove('mobile-top', 'mobile-bottom');
      if (this.position.includes('top')) {
        container.classList.add('mobile-top');
      } else {
        container.classList.add('mobile-bottom');
      }
      const positionPixel = '24px'
      if (this.position === 'top-left') {
        container.style.top = positionPixel;
        container.style.left = positionPixel;
      } else if (this.position === 'top-right') {
        container.style.top = positionPixel;
        container.style.right = positionPixel;
      } else if (this.position === 'bottom-right') {
        container.style.bottom = positionPixel;
        container.style.right = positionPixel;
      } else {
        container.style.bottom = positionPixel;
        container.style.left = positionPixel;
      }
    }

    showNotification() {
      if (this.transactions.length === 0) return;
      const currentTx = this.transactions[this.currentIndex];
      const { nameSpan, inTextNode, locationSpan, actionTextNode, timeSpan, container } = this.elements;

      this.applyStyles();

      // Content
      actionTextNode.nodeValue = ` ${this.actionText}`;
      nameSpan.innerText = this.showRealNames ? (currentTx.name || "Someone") : "Someone";
      
      let locationText = "";
      if (currentTx.city && currentTx.city !== "Unknown City") {
        locationText = `${currentTx.city} (${currentTx.country || 'Unknown'})`;
      } else if (currentTx.country) {
        locationText = `${currentTx.country}`;
      }

      if (!locationText) {
        inTextNode.nodeValue = " ";
        locationSpan.style.display = "none";
      } else {
        inTextNode.nodeValue = " in ";
        locationSpan.style.display = "inline";
        locationSpan.innerText = locationText;
        locationSpan.style.color = this.themeColor;
      }

      timeSpan.innerText = this.getTimeAgo(currentTx.created);

      // Update Verify Link with proof_id
      const { verifyLink } = this.elements;
      if (verifyLink) {
          verifyLink.href = `${this.apiBase}/verified?proof_id=${this.startupId}`;
      }

      // Fade In
      container.style.opacity = '1';
      container.style.pointerEvents = 'auto';
      this.isVisible = true;

      // Fade Out after 4s
      setTimeout(() => {
        container.style.opacity = '0';
        container.style.pointerEvents = 'none';
        this.isVisible = false;
        this.currentIndex = (this.currentIndex + 1) % this.transactions.length;
      }, 4000);
    }

    async fetchData() {
      try {
        const res = await fetch(`${this.apiBase}/api/public/transactions?proof_id=${this.startupId}`);
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error(`ProofPopify: API returned ${res.status} - ${errorData.error || 'Unknown error'}`);
          
          // Still allow test mode to show dummy data even if API fails
          if (this.isTest) {
            this.transactions = [
              { name: "John Doe", city: "San Francisco", country: "United States", created: Math.floor(Date.now() / 1000) - 120 },
            ];
            this.startCycle();
          }
          return;
        }

        const data = await res.json();
        
        if (data.transactions && data.transactions.length > 0) {
          this.transactions = data.transactions;
          this.startupName = data.startupName || this.startupName;
        } else if (this.isTest) {
          this.transactions = [
            { name: "John Doe", city: "San Francisco", country: "United States", created: Math.floor(Date.now() / 1000) - 120 },
          ];
        }

        if (this.transactions.length > 0) {
          // Default data
          if (data.themeColor) this.themeColor = data.themeColor;
          if (data.backgroundColor) this.backgroundColor = data.backgroundColor;
          if (data.actionText) this.actionText = data.actionText;
          if (data.showRealNames !== undefined) this.showRealNames = data.showRealNames;
          if (data.position) this.position = data.position;
          
          // Test overrides
          const forceTheme = this.urlObj.searchParams.get('theme');
          const forceBg = this.urlObj.searchParams.get('bg');
          const forceAction = this.urlObj.searchParams.get('action');
          const forceRealNames = this.urlObj.searchParams.get('realNames');
          const forcePosition = this.urlObj.searchParams.get('position');

          if (forceTheme) this.themeColor = decodeURIComponent(forceTheme);
          if (forceBg) this.backgroundColor = decodeURIComponent(forceBg);
          if (forceAction) this.actionText = decodeURIComponent(forceAction);
          if (forceRealNames !== null) this.showRealNames = forceRealNames === 'true';
          if (forcePosition) this.position = forcePosition;

          this.startCycle();
        } else {
          console.warn('ProofPopify: No transactions found. The popup will not appear.');
        }
      } catch (err) {
        console.error("ProofPopify: Error fetching data", err);
        
        // Allow test mode fallback even on network errors
        if (this.isTest) {
          this.transactions = [
            { name: "John Doe", city: "San Francisco", country: "United States", created: Math.floor(Date.now() / 1000) - 120 },
          ];
          this.startCycle();
        }
      }
    }

    startCycle() {
      this.showNotification();
      this.cycleInterval = setInterval(() => {
        if (!document.body.contains(this.elements.container)) {
          clearInterval(this.cycleInterval);
          return;
        }
        if (!this.isVisible) {
          this.showNotification();
        }
      }, 5000);
    }

    // Helpers
    getContrastYIQ(hexcolor){
      hexcolor = hexcolor.replace("#", "");
      var r = parseInt(hexcolor.substr(0, 2), 16);
      var g = parseInt(hexcolor.substr(2, 2), 16);
      var b = parseInt(hexcolor.substr(4, 2), 16);
      var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
      return (yiq >= 128) ? '#374151' : '#f3f4f6'; 
    }
    
    getBorderColor(hexcolor){
      hexcolor = hexcolor.replace("#", "");
      var r = parseInt(hexcolor.substr(0, 2), 16);
      var g = parseInt(hexcolor.substr(2, 2), 16);
      var b = parseInt(hexcolor.substr(4, 2), 16);
      var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
      return (yiq >= 128) ? '#e5e7eb' : '#374151'; 
    }

    getTimeAgo(timestamp) {
      const seconds = Math.floor(Date.now() / 1000) - timestamp;
      if (seconds < 60) return "Just now";
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return `${minutes} minutes ago`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours} hours ago`;
      const days = Math.floor(hours / 24);
      return `${days} days ago`;
    }
  }

  new ProofPopifyWidget();
})();
