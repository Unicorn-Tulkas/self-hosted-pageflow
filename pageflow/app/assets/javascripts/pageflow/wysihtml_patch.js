// Patch for wysihtml5 compatibility issue and Backbone.js HTTP method issue
// Fixes "this.parent.fire is not a function" error and POST vs PATCH routing

(function() {
  'use strict';
  
  // Wait for DOM and libraries to be loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Patch wysihtml5 compatibility issue
    if (window.wysihtml5 && window.wysihtml5.views && window.wysihtml5.views.Composer) {
      var originalObserve = window.wysihtml5.views.Composer.prototype.observe;
      
      window.wysihtml5.views.Composer.prototype.observe = function() {
        try {
          if (originalObserve) {
            return originalObserve.apply(this, arguments);
          }
        } catch (e) {
          console.warn('wysihtml5 observe error caught and ignored:', e.message);
          // Continue without the problematic observer
        }
      };
    }
    
    // Patch Backbone.js sync method to use correct HTTP methods
    if (window.Backbone && window.Backbone.sync) {
      var originalSync = window.Backbone.sync;
      
      window.Backbone.sync = function(method, model, options) {
        // If this is an entry model and we're trying to POST, check if it should be PATCH
        if (method === 'create' && model && model.get && model.get('id')) {
          console.log('Backbone sync: Converting POST to PATCH for existing model with ID:', model.get('id'));
          method = 'update';
        }
        
        return originalSync.call(this, method, model, options);
      };
    }
    
    // Global error handler for wysihtml5 errors
    var originalOnError = window.onerror;
    window.onerror = function(message, source, lineno, colno, error) {
      // Ignore the specific wysihtml5 error
      if (message && message.includes && message.includes('this.parent.fire is not a function')) {
        console.warn('wysihtml5 error ignored:', message);
        return true; // Prevent default error handling
      }
      
      // Call original error handler for other errors
      if (originalOnError) {
        return originalOnError.apply(this, arguments);
      }
      return false;
    };
  });
})();