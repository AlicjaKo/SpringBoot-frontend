var icon = $('.search-icon');
var form = $('form.search');

icon.click(function() 
{
    form.toggleClass('open');
    if (form.hasClass('open')) 
    {
        form.children('input.search').focus();
    }
});