Modularity = Modularity || {};
Modularity.Helpers = Modularity.Helpers || {};

Modularity.Helpers.Widget = (function ($) {

    var editingWidget = false;

    function Widget() {
        $(function(){

            /* Import */
            $(document).on('click', '.modularity-js-thickbox-widget-import', function (e) {
                e.preventDefault();

                editingWidget = $(e.target).parents('.widget-inside');

                var importUrl = Modularity.Editor.Module.getImportUrl({
                    postType: $(e.target).parents('.widget-inside').find('.modularity-widget-module-type select').val()
                });

                Modularity.Editor.Module.editingModule = $(e.target).closest('.widget-inside');

                Modularity.Editor.Thickbox.postAction = 'import-widget';
                Modularity.Prompt.Modal.open(importUrl);
            });


            /* Edit */
            $(document).on('click', '.modularity-js-thickbox-open', function (e) {
                e.preventDefault();

                var el = $(e.target).closest('a');
                if (el.attr('href').indexOf('post.php') > -1) {
                    Modularity.Editor.Thickbox.postAction = 'edit';
                }

                editingModule = $(e.target).closest('li');

                Modularity.Prompt.Modal.open($(e.target).closest('a').attr('href'));
            }.bind(this));


        }.bind(this));
    }

    Widget.prototype.isEditingWidget = function () {
        return editingWidget;
    };

    Widget.prototype.updateWidget = function (widget, data) {
        $(widget).find('.modularity-widget-module-id-span').html(data.post_id);
        $(widget).find('.modularity-widget-module-id').val(data.post_id);
        $(widget).find('.modularity-widget-module-edit').attr('href','post.php?post=' + data.post_id + '&action=edit&is_thickbox=true').removeClass('hidden');
        $(widget).find('.modularity-widget-module-title-span').html(data.title);
        $(widget).find('.modularity-widget-module-title').val(data.title);
    };

    return new Widget();

})(jQuery);
