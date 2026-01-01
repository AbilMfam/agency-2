// Utility to parse HTML callouts back to callout objects
export const parseHtmlCallouts = (data) => {
  if (!data) {
    return [];
  }

  // If it's already an array (JSON format from database)
  if (Array.isArray(data)) {
    return data.map((item, index) => {
      let type = 'emerald';
      
      // Map different block types to callout types
      if (item.type === 'callout') {
        type = item.callout_type === 'warning' ? 'yellow' : 
               item.callout_type === 'error' ? 'red' : 
               item.callout_type === 'success' ? 'green' : 
               item.callout_type === 'info' ? 'blue' : 'emerald';
      } else if (item.type === 'quote') {
        type = 'blue'; // Quotes use blue
      } else if (item.type === 'list') {
        type = 'green'; // Lists use green
      } else if (item.type === 'cta') {
        type = 'purple'; // CTA uses purple
      }
      
      return {
        id: item.id || Date.now() + index,
        type,
        title: item.title || '',
        content: item.content || '',
        originalType: item.type, // Keep original type for reference
        originalData: item // Keep all original data
      };
    });
  }

  // If it's a string (HTML format)
  if (typeof data === 'string' && data.trim()) {
    try {
      // Try to parse as JSON first
      const jsonData = JSON.parse(data);
      if (Array.isArray(jsonData)) {
        return jsonData.map((item, index) => ({
          id: item.id || Date.now() + index,
          type: item.type || 'emerald',
          title: item.title || '',
          content: item.content || ''
        }));
      }
    } catch (e) {
      // If not JSON, parse as HTML using DOM
      const callouts = [];
      
      // Create a temporary DOM element to parse HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = data;
      
      // Find all callout divs
      const calloutDivs = tempDiv.querySelectorAll('div[class*="bg-"][class*="-500/10"]');
      
      calloutDivs.forEach((div, index) => {
        // Extract type from class
        const classList = div.className;
        const typeMatch = classList.match(/bg-(blue|yellow|red|green|emerald|purple|orange|pink)-500/);
        const type = typeMatch ? typeMatch[1] : 'emerald';
        
        // Extract title
        const titleElement = div.querySelector('h4[class*="text-"][class*="-400"]');
        const title = titleElement ? titleElement.textContent.trim() : '';
        
        // Extract content
        const contentElement = div.querySelector('div[class*="text-dark-300"]');
        const content = contentElement ? contentElement.textContent.trim() : '';
        
        // Only add if we have content
        if (title || content) {
          callouts.push({
            id: Date.now() + index,
            type,
            title,
            content
          });
        }
      });

      return callouts;
    }
  }

  return [];
};
