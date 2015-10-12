var DismissMessage = Class.create();

DismissMessage.prototype = {
    /**
     * @returns {boolean}
     */
    initialize: function() {
        var container = this._getContainer();
        var messages = this._getMessages(container);
        this._addCloseButtonToMessages(messages);
        this._bindCloseActionToButtons(container);
    },
    /**
     * @returns {Array}
     * @private
     */
    _getContainer: function() {
        return $$('ul.messages');
    },
    /**
     * @param {Array} container
     * @returns {Array}
     * @private
     */
    _getMessages: function(container) {
        var messages = [];
        container.each(function(span) {
            messages = messages.concat(span.select('span'));
        });

        return messages;
    },
    /**
     * @param {Array} messages
     * @private
     */
    _addCloseButtonToMessages: function(messages) {
        var template = this._getTemplate();
        messages.each(function(span) {
            span.insert({after: template})
        });
    },
    /**
     * @returns {string}
     * @private
     */
    _getTemplate: function() {
        return '<a href="#" class="close">&times;</a>';
    },
    /**
     * @param {Array} container
     * @private
     */
    _bindCloseActionToButtons: function(container) {
        var self = this;
        container.each(function(message) {
            message.select('a.close').each(function(close) {
                close.observe('click', self._dismissMessage);
            });
        });
    },
    /**
     * @param {Event} event
     * @private
     */
    _dismissMessage: function(event) {
        this.up('li').addClassName('removed');
        event.stop();
    }
};

document.observe('dom:loaded', function() {
   new DismissMessage();
});
