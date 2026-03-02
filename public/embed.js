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
      this.showIcon = false;
      this.position = 'bottom-left';
      this.avatarUrlBase = "https://api.dicebear.com/9.x/micah/svg?backgroundColor=transparent&seed="; // Fallback

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
        @keyframes proofpopify-slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes proofpopify-slideDown {
          from { opacity: 0; transform: translateY(-20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes proofpopify-fadeOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(10px) scale(0.95); }
        }
        @keyframes proofpopify-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        @keyframes proofpopify-ring {
          0% { transform: rotate(0deg); }
          15% { transform: rotate(12deg); }
          30% { transform: rotate(-10deg); }
          45% { transform: rotate(8deg); }
          60% { transform: rotate(-6deg); }
          75% { transform: rotate(3deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes proofpopify-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        #proofpopify-container.ppfy-animate-in-bottom {
          animation: proofpopify-slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        #proofpopify-container.ppfy-animate-in-top {
          animation: proofpopify-slideDown 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        #proofpopify-container.ppfy-animate-out {
          animation: proofpopify-fadeOut 0.4s ease-in forwards;
        }
        #proofpopify-emoji {
          animation: proofpopify-pulse 0.6s ease-in-out 0.3s 1;
          display: inline-block;
        }
        #proofpopify-bell {
          animation: proofpopify-ring 0.6s ease-in-out 0.1s 1;
          display: inline-block;
          transform-origin: top center;
        }
        @media (max-width: 640px) {
          #proofpopify-container {
            left: 12px !important;
            right: auto !important;
          }
          #proofpopify-container.mobile-bottom {
            bottom: 12px !important;
            top: auto !important;
          }
          #proofpopify-container.mobile-top {
            top: 12px !important;
            bottom: auto !important;
          }
          #proofpopify-container > div {
            width: max-content !important;
            max-width: calc(100vw - 24px) !important;
            padding: 10px 12px !important;
            box-sizing: border-box;
          }
          #proofpopify-container p {
            font-size: 12px !important;
          }
          #proofpopify-container span, #proofpopify-container a {
            font-size: 10px !important;
          }
          #proofpopify-container svg {
            width: 12px !important;
            height: 12px !important;
          }
          #proofpopify-emoji-wrap {
            width: 32px !important;
            height: 32px !important;
            font-size: 16px !important;
            border-radius: 8px !important;
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
        pointerEvents: 'none',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      });
      this.elements.container = container;

      // Card
      const card = document.createElement('div');
      Object.assign(card.style, {
        backgroundColor: this.backgroundColor,
        boxShadow: '0 20px 30px -8px rgba(0, 0, 0, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.08)',
        borderRadius: '14px',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        border: '1px solid #e5e7eb',
        width: 'max-content',
        maxWidth: '370px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden'
      });
      this.elements.card = card;

      // Shimmer overlay (subtle premium shine effect)
      const shimmer = document.createElement('div');
      Object.assign(shimmer.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
        backgroundSize: '200% 100%',
        animation: 'proofpopify-shimmer 2s ease-in-out 0.5s 1',
        pointerEvents: 'none',
        borderRadius: '14px'
      });
      card.appendChild(shimmer);

      // Avatar icon container (hidden by default, shown if showIcon is true)
      const emojiContainer = document.createElement('div');
      emojiContainer.id = 'proofpopify-avatar-wrap';
      Object.assign(emojiContainer.style, {
        width: '42px',
        height: '42px',
        borderRadius: '50%', // Circle for avatars
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: '0',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#f3f4f6', // Light gray background for the avatar
        border: '2px solid #ffffff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
      });
      this.elements.emojiContainer = emojiContainer;

      const emojiSpan = document.createElement('img');
      emojiSpan.id = 'proofpopify-avatar-img';
      Object.assign(emojiSpan.style, {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      });
      emojiContainer.appendChild(emojiSpan);
      this.elements.emojiSpan = emojiSpan;

      // Text Container
      const textContainer = document.createElement('div');
      textContainer.style.display = 'flex';
      textContainer.style.flexDirection = 'column';
      textContainer.style.gap = '3px';
      textContainer.style.position = 'relative';

      // Title Row
      const titleRow = document.createElement('p');
      Object.assign(titleRow.style, { margin: '0', fontSize: this.headingFontSize, fontWeight: '500', color: '#374151', lineHeight: '1.4' });
      this.elements.titleRow = titleRow;

      const nameSpan = document.createElement('span');
      nameSpan.style.fontWeight = '700';
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
      Object.assign(metaRow.style, { display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' });

      // Time with a small clock
      const timeSpan = document.createElement('span');
      Object.assign(timeSpan.style, { fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '3px' });
      this.elements.timeSpan = timeSpan;

      // Dot separator
      const dot = document.createElement('span');
      Object.assign(dot.style, { width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#d1d5db', flexShrink: '0' });

      // Verify Link
      const verifyLink = document.createElement('a');
      verifyLink.href = `${this.apiBase}/verified`;
      verifyLink.target = '_blank';
      verifyLink.rel = 'noreferrer';
      Object.assign(verifyLink.style, {
        display: 'flex',
        alignItems: 'center',
        gap: '3px',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'opacity 0.2s ease-in-out',
        opacity: '0.7'
      });
      verifyLink.onmouseover = function() { this.style.opacity = '1'; };
      verifyLink.onmouseout = function() { this.style.opacity = '0.7'; };
      this.elements.verifyLink = verifyLink;

      const verifyIcon = document.createElement('div');
      verifyIcon.style.display = 'flex';
      verifyIcon.innerHTML = `<svg style="width:14px; height:14px;" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>`;
      this.elements.verifyIcon = verifyIcon;

      const verifyText = document.createElement('span');
      Object.assign(verifyText.style, { fontSize: '11px', display: 'flex', gap: '2px' });
      verifyText.innerHTML = `Verified by <span style="color: #635BFF; font-weight: 600;">Stripe</span>`;
      this.elements.verifyText = verifyText;

      verifyLink.append(verifyIcon, verifyText);
      metaRow.append(timeSpan, dot, verifyLink);

      textContainer.append(titleRow, metaRow);
      card.appendChild(emojiContainer);
      card.appendChild(textContainer);
      container.appendChild(card);
      document.body.appendChild(container);
    }

    applyStyles() {
      const { card, container, titleRow, timeSpan, verifyLink, verifyText, verifyIcon, emojiContainer } = this.elements;
      
      card.style.backgroundColor = this.backgroundColor;
      card.style.border = `1px solid ${this.getBorderColor(this.backgroundColor)}`;
      
      const textColor = this.getContrastYIQ(this.backgroundColor);
      titleRow.style.color = textColor;
      timeSpan.style.color = textColor;
      verifyLink.style.opacity = '0.7';
      verifyText.style.color = textColor;
      timeSpan.style.opacity = '0.6';
      verifyText.style.opacity = '0.8';
      verifyIcon.style.color = this.themeColor;

      // Instead of theme background, avatar uses its own styling set in createDOM

      // Show/hide icon based on setting
      emojiContainer.style.display = this.showIcon ? 'flex' : 'none';

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

    getAvatarUrl(name) {
      // Use dynamic global avatar URL set by the server
      const safeName = encodeURIComponent(name || "Someone");
      return `${this.avatarUrlBase}${safeName}`;
    }

    showNotification() {
      if (this.transactions.length === 0) return;
      const currentTx = this.transactions[this.currentIndex];
      const { nameSpan, inTextNode, locationSpan, actionTextNode, timeSpan, container, emojiSpan } = this.elements;

      this.applyStyles();
      
      const displayName = this.showRealNames ? (currentTx.name || "Someone") : "Someone";

      // Set avatar image
      emojiSpan.src = this.getAvatarUrl(displayName);
      // Re-trigger pulse animation slightly modified for avatar
      emojiSpan.style.animation = 'none';
      emojiSpan.offsetHeight; // force reflow
      emojiSpan.style.animation = 'proofpopify-pulse 0.6s ease-in-out 0.2s 1';

      // Content
      actionTextNode.nodeValue = ` ${this.actionText}`;
      nameSpan.innerText = displayName;
      
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

      // Slide In (direction based on position)
      container.classList.remove('ppfy-animate-out', 'ppfy-animate-in-top', 'ppfy-animate-in-bottom');
      container.style.opacity = '1';
      container.style.pointerEvents = 'auto';
      
      if (this.position.includes('top')) {
        container.classList.add('ppfy-animate-in-top');
      } else {
        container.classList.add('ppfy-animate-in-bottom');
      }
      this.isVisible = true;

      // Slide Out after 4s
      setTimeout(() => {
        container.classList.remove('ppfy-animate-in-top', 'ppfy-animate-in-bottom');
        container.classList.add('ppfy-animate-out');
        
        setTimeout(() => {
          container.style.opacity = '0';
          container.style.pointerEvents = 'none';
          container.classList.remove('ppfy-animate-out');
          this.isVisible = false;
          this.currentIndex = (this.currentIndex + 1) % this.transactions.length;
        }, 400);
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
          if (data.showIcon !== undefined) this.showIcon = data.showIcon;
          if (data.position) this.position = data.position;
          if (data.avatarUrlBase) this.avatarUrlBase = data.avatarUrlBase;
          
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
          const forceShowIcon = this.urlObj.searchParams.get('showIcon');
          if (forceShowIcon !== null) this.showIcon = forceShowIcon === 'true';
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
